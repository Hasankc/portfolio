"""
tests/test_security.py

Unit tests for security middleware and request validation.
Run with: pytest tests/ -v

These don't make any real API calls — all external services are
mocked out via the conftest.py fixture that clears env vars.
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

@pytest.mark.skipif(not HAS_DEPS, reason="bleach not installed")
class TestSanitize:
    def test_strips_script_tags(self):
        result = sanitize("<script>alert('xss')</script>hello")
        assert "<script>" not in result
        assert "hello" in result

    def test_strips_nested_html(self):
        assert sanitize("<b><i>text</i></b>") == "text"

    def test_collapses_whitespace(self):
        assert sanitize("hello   world\n\nfoo") == "hello world foo"

    def test_trims_to_max_len(self):
        assert len(sanitize("a" * 3000, max_len=100)) == 100

    def test_plain_text_unchanged(self):
        t = "Hello, my name is Alhasan."
        assert sanitize(t) == t

    def test_empty_string(self):
        assert sanitize("") == ""

    def test_strips_img_src(self):
        result = sanitize('<img src="http://evil.com/x.png"/>')
        assert "evil.com" not in result


@pytest.mark.skipif(not HAS_DEPS, reason="bleach not installed")
class TestSanitizeEmail:
    def test_valid_email(self):
        assert sanitize_email("user@example.com") == "user@example.com"

    def test_lowercases(self):
        assert sanitize_email("USER@EXAMPLE.COM") == "user@example.com"

    def test_rejects_no_at(self):
        with pytest.raises(ValueError):
            sanitize_email("notanemail")

    def test_rejects_no_domain(self):
        with pytest.raises(ValueError):
            sanitize_email("user@")

    def test_strips_html_from_email(self):
        result = sanitize_email("<b>user</b>@example.com")
        assert "<b>" not in result


# ── ContactPayload validation ─────────────────────────────────────────────────

@pytest.mark.skipif(not HAS_DEPS, reason="pydantic not installed")
class TestContactPayload:
    def setup_method(self):
        from routes.contact import ContactPayload
        self.Model = ContactPayload

    def _valid(self, **overrides):
        data = {
            "name":    "Jane Smith",
            "email":   "jane@example.com",
            "subject": "Hello there",
            "message": "This is a test message that is long enough.",
        }
        data.update(overrides)
        return data

    def test_valid_payload(self):
        obj = self.Model(**self._valid())
        assert obj.name == "Jane Smith"

    def test_short_name_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.Model(**self._valid(name="J"))

    def test_invalid_email_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.Model(**self._valid(email="notanemail"))

    def test_short_message_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.Model(**self._valid(message="short"))

    def test_html_stripped_from_name(self):
        obj = self.Model(**self._valid(name="<b>Jane</b>"))
        assert "<b>" not in obj.name
        assert "Jane" in obj.name

    def test_script_stripped_from_message(self):
        obj = self.Model(**self._valid(message="<script>evil()</script>normal message here"))
        assert "<script>" not in obj.message
        assert "normal" in obj.message


# ── ChatPayload validation ────────────────────────────────────────────────────

@pytest.mark.skipif(not HAS_DEPS, reason="pydantic not installed")
class TestChatPayload:
    def setup_method(self):
        from routes.ai import ChatPayload
        self.Payload = ChatPayload

    def test_valid_message(self):
        p = self.Payload(messages=[{"role": "user", "content": "hello"}])
        assert len(p.messages) == 1

    def test_empty_messages_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.Payload(messages=[])

    def test_truncates_to_20(self):
        msgs = [{"role": "user", "content": f"msg {i}"} for i in range(25)]
        p = self.Payload(messages=msgs)
        assert len(p.messages) == 20
        # should keep the LAST 20
        assert p.messages[-1].content == "msg 24"

    def test_html_stripped_from_content(self):
        p = self.Payload(messages=[{"role": "user", "content": "<b>hello</b>"}])
        assert "<b>" not in p.messages[0].content
        assert "hello" in p.messages[0].content

    def test_invalid_role_rejected(self):
        from pydantic import ValidationError
        with pytest.raises(ValidationError):
            self.Payload(messages=[{"role": "system", "content": "hack"}])


# ── health endpoint ───────────────────────────────────────────────────────────

@pytest.mark.skipif(not HAS_DEPS, reason="fastapi not installed")
class TestHealthEndpoint:
    def test_health_returns_ok(self):
        try:
            from fastapi.testclient import TestClient
            from main import app
            client   = TestClient(app)
            response = client.get("/api/health")
            assert response.status_code == 200
            assert response.json()["status"] == "ok"
        except ImportError:
            pytest.skip("httpx not installed")
