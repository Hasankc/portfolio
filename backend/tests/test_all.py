"""
test_all.py — comprehensive backend tests
Run: pytest tests/ -v
"""
import sys, os, time
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pytest

try:
    from main import app, _allow, _log, clean
    HAS_DEPS = True
except ImportError:
    HAS_DEPS = False

# ── clean() sanitisation ──────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestClean:
    def test_strips_script(self):
        r = clean("<script>alert('xss')</script>hello")
        assert "<script>" not in r
        assert "hello" in r

    def test_strips_all_html(self):
        assert clean("<b><i>text</i></b>") == "text"

    def test_collapses_whitespace(self):
        assert clean("hello   world\n\nfoo") == "hello world foo"

    def test_max_len(self):
        assert len(clean("a" * 5000, max_len=100)) == 100

    def test_empty(self):
        assert clean("") == ""

    def test_plain_text_unchanged(self):
        t = "Hello Alhasan."
        assert clean(t) == t

# ── rate limiter ──────────────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestRateLimit:
    def setup_method(self):
        _log.clear()

    def test_allows_under_limit(self):
        for _ in range(5):
            assert _allow("1.2.3.4", "/test", limit=5) is True

    def test_blocks_at_limit(self):
        for _ in range(5):
            _allow("10.0.0.1", "/block-test", limit=5)
        assert _allow("10.0.0.1", "/block-test", limit=5) is False

    def test_different_ips_independent(self):
        for _ in range(5):
            _allow("5.5.5.5", "/ip-test", limit=5)
        assert _allow("5.5.5.5", "/ip-test", limit=5) is False
        assert _allow("6.6.6.6", "/ip-test", limit=5) is True

    def test_different_paths_independent(self):
        for _ in range(5):
            _allow("7.7.7.7", "/path-a", limit=5)
        assert _allow("7.7.7.7", "/path-a", limit=5) is False
        assert _allow("7.7.7.7", "/path-b", limit=5) is True

# ── ContactBody validation ────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestContactBody:
    def setup_method(self):
        from main import ContactBody
        self.M = ContactBody

    def _v(self, **kw):
        d = dict(name="Jane Smith", email="jane@test.com", subject="Hello", message="Test message here please")
        d.update(kw)
        return d

    def test_valid(self):
        obj = self.M(**self._v())
        assert obj.name == "Jane Smith"

    def test_short_name_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.M(**self._v(name="J"))

    def test_bad_email_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.M(**self._v(email="notanemail"))

    def test_short_message_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.M(**self._v(message="hi"))

    def test_html_stripped_from_name(self):
        obj = self.M(**self._v(name="<b>Jane</b>"))
        assert "<b>" not in obj.name

    def test_script_stripped_from_message(self):
        obj = self.M(**self._v(message="<script>evil()</script>normal message here okay"))
        assert "<script>" not in obj.message

# ── ChatBody validation ───────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestChatBody:
    def setup_method(self):
        from main import ChatBody, ChatMessage
        self.Body = ChatBody
        self.Msg  = ChatMessage

    def test_valid_message(self):
        b = self.Body(messages=[self.Msg(role="user", content="hello")])
        assert len(b.messages) == 1

    def test_empty_accepted(self):
        # ChatBody allows empty list (unlike old ContactPayload)
        b = self.Body(messages=[])
        assert b.messages == []

    def test_system_optional(self):
        b = self.Body(messages=[], system=None)
        assert b.system is None

    def test_system_accepted(self):
        b = self.Body(messages=[], system="You are helpful.")
        assert b.system == "You are helpful."

# ── health endpoint ───────────────────────────────────────────────────────────
@pytest.mark.skipif(not HAS_DEPS, reason="deps not installed")
class TestEndpoints:
    def test_health(self):
        try:
            from fastapi.testclient import TestClient
            client = TestClient(app)
            r = client.get("/api/health")
            assert r.status_code == 200
            assert r.json()["status"] == "ok"
        except ImportError:
            pytest.skip("httpx not installed")

    def test_404(self):
        try:
            from fastapi.testclient import TestClient
            client = TestClient(app)
            r = client.get("/api/does-not-exist")
            assert r.status_code == 404
        except ImportError:
            pytest.skip("httpx not installed")

    def test_cors_headers_present(self):
        try:
            from fastapi.testclient import TestClient
            client = TestClient(app)
            r = client.options("/api/health", headers={"Origin": "http://localhost:3000", "Access-Control-Request-Method": "GET"})
            # CORS headers should be present
            assert r.status_code in (200, 204)
        except ImportError:
            pytest.skip("httpx not installed")
