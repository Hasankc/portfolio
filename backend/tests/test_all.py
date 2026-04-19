"""
test_all.py — comprehensive backend tests

Run: pytest tests/ -v
All tests avoid real API calls (env vars are cleared in conftest.py).
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pytest

try:
    from middleware.security import sanitize, sanitize_email
    HAS_DEPS = True
except ImportError:
    HAS_DEPS = False


# ── sanitize() ────────────────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestSanitize:
    def test_strips_script_tags(self):
        result = sanitize("<script>alert('xss')</script>hello")
        assert "<script>" not in result
        assert "hello" in result

    def test_strips_all_html(self):
        assert sanitize("<b><i><u>text</u></i></b>") == "text"

    def test_collapses_whitespace(self):
        assert sanitize("hello   world\n\n\nfoo") == "hello world foo"

    def test_trims_to_max_len(self):
        assert len(sanitize("a" * 5000, max_len=100)) == 100

    def test_empty_string_ok(self):
        assert sanitize("") == ""

    def test_plain_text_unchanged(self):
        t = "Hello, I am Alhasan."
        assert sanitize(t) == t

    def test_strips_img_tag(self):
        result = sanitize('<img src="http://evil.com/x.png"/>')
        assert "evil.com" not in result

    def test_strips_onclick(self):
        result = sanitize('<div onclick="evil()">text</div>')
        assert "onclick" not in result
        assert "text" in result


@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestSanitizeEmail:
    def test_valid_email_passes(self):
        assert sanitize_email("user@example.com") == "user@example.com"

    def test_lowercases(self):
        assert sanitize_email("USER@EXAMPLE.COM") == "user@example.com"

    def test_rejects_missing_at(self):
        with pytest.raises(ValueError):
            sanitize_email("notanemail")

    def test_rejects_empty_domain(self):
        with pytest.raises(ValueError):
            sanitize_email("user@")

    def test_strips_html_from_email(self):
        result = sanitize_email("<b>user</b>@example.com")
        assert "<b>" not in result


# ── ContactPayload ────────────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestContactPayload:
    def setup_method(self):
        from routes.contact import ContactPayload
        self.M = ContactPayload

    def _v(self, **kw):
        d = dict(name="Jane Smith", email="jane@example.com", subject="Hello", message="This is a long enough message.")
        d.update(kw)
        return d

    def test_valid_payload(self):
        obj = self.M(**self._v())
        assert obj.name == "Jane Smith"
        assert obj.email == "jane@example.com"

    def test_short_name_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.M(**self._v(name="J"))

    def test_invalid_email_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.M(**self._v(email="notanemail"))

    def test_short_message_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.M(**self._v(message="short"))

    def test_html_stripped_from_name(self):
        obj = self.M(**self._v(name="<b>Jane</b>"))
        assert "<b>" not in obj.name
        assert "Jane" in obj.name

    def test_script_stripped_from_message(self):
        obj = self.M(**self._v(message="<script>evil()</script>this is a normal message here"))
        assert "<script>" not in obj.message
        assert "normal" in obj.message


# ── ChatPayload ───────────────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestChatPayload:
    def setup_method(self):
        from routes.ai import ChatPayload
        self.P = ChatPayload

    def test_valid_message(self):
        p = self.P(messages=[{"role": "user", "content": "hello there"}])
        assert len(p.messages) == 1

    def test_empty_messages_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.P(messages=[])

    def test_truncates_to_20(self):
        msgs = [{"role": "user", "content": f"msg {i}"} for i in range(25)]
        p = self.P(messages=msgs)
        assert len(p.messages) == 20
        assert p.messages[-1].content == "msg 24"  # keeps LAST 20

    def test_html_stripped_from_content(self):
        p = self.P(messages=[{"role": "user", "content": "<b>hello</b> world"}])
        assert "<b>" not in p.messages[0].content
        assert "hello" in p.messages[0].content

    def test_invalid_role_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.P(messages=[{"role": "system", "content": "hack"}])

    def test_optional_system_accepted(self):
        p = self.P(messages=[{"role": "user", "content": "hi"}], system="You are helpful.")
        assert p.system == "You are helpful."

    def test_none_system_accepted(self):
        p = self.P(messages=[{"role": "user", "content": "hi"}], system=None)
        assert p.system is None


# ── Health endpoint ───────────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestHealth:
    def test_health_returns_ok(self):
        try:
            from fastapi.testclient import TestClient
            from main import app
            client = TestClient(app)
            r = client.get("/api/health")
            assert r.status_code == 200
            data = r.json()
            assert data["status"] == "ok"
            assert "service" in data
        except ImportError:
            pytest.skip("httpx not installed")

    def test_unknown_route_returns_404(self):
        try:
            from fastapi.testclient import TestClient
            from main import app
            client = TestClient(app)
            r = client.get("/api/this-does-not-exist")
            assert r.status_code == 404
        except ImportError:
            pytest.skip("httpx not installed")


# ── Rate limiter ──────────────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestRateLimiter:
    def test_check_rate_limit_allows_under_limit(self):
        from middleware.security import _check_rate_limit, _request_log
        from unittest.mock import MagicMock

        # clear state
        _request_log.clear()

        req = MagicMock()
        req.client.host = "1.2.3.4"
        req.url.path    = "/api/test-limit"

        # should allow first 5
        for _ in range(5):
            assert _check_rate_limit(req, max_requests=5, window_seconds=3600) is True

        # 6th should be blocked
        assert _check_rate_limit(req, max_requests=5, window_seconds=3600) is False

    def test_different_ips_are_independent(self):
        from middleware.security import _check_rate_limit, _request_log
        from unittest.mock import MagicMock

        _request_log.clear()

        def make_req(ip: str):
            r = MagicMock()
            r.client.host = ip
            r.url.path    = "/api/ip-test"
            return r

        req_a = make_req("10.0.0.1")
        req_b = make_req("10.0.0.2")

        # fill up IP A
        for _ in range(3):
            _check_rate_limit(req_a, max_requests=3, window_seconds=3600)

        # IP A blocked
        assert _check_rate_limit(req_a, max_requests=3, window_seconds=3600) is False
        # IP B still allowed
        assert _check_rate_limit(req_b, max_requests=3, window_seconds=3600) is True
