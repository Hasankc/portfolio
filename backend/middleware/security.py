"""
security.py — rate limiting, input sanitisation, response headers

Nothing here is magic — it's just a few standard tools wired together:
  - slowapi for rate limiting (per IP, in-memory)
  - bleach for stripping HTML from user input
  - a hardcoded dict of security headers we attach to every response
"""
from __future__ import annotations

import re
import bleach
from slowapi import Limiter
from slowapi.util import get_remote_address
from fastapi import Request
from fastapi.responses import JSONResponse


# limiter instance — imported by main.py and the individual route files
# using the client IP as the key. for prod behind a proxy, make sure
# FORWARDED or X-Real-IP headers are trusted (depends on your hosting setup)
limiter = Limiter(key_func=get_remote_address, default_limits=["200/hour"])


def rate_limit_exceeded_handler(request: Request, exc: Exception) -> JSONResponse:
    """return a friendly 429 instead of the default slowapi error format"""
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests — slow down and try again in a bit."},
    )


# ── input sanitisation ────────────────────────────────────────────────────────

def sanitize(value: str, max_len: int = 2000) -> str:
    """
    Strip all HTML tags from a string, collapse whitespace, and trim to max_len.

    Using bleach here because it handles edge cases (malformed tags, entities)
    better than a simple regex would. The empty tags/attrs lists mean we strip
    absolutely everything — no exceptions.
    """
    cleaned = bleach.clean(value, tags=[], attributes={}, strip=True)
    # collapse multiple spaces/newlines down to single spaces
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned[:max_len]


def sanitize_email(email: str) -> str:
    """sanitize then do a basic format check — pydantic catches most email issues
    upstream but this is a second line of defence"""
    clean = sanitize(email, max_len=254).lower()
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", clean):
        raise ValueError(f"email address looks invalid: {email!r}")
    return clean


# ── security response headers ─────────────────────────────────────────────────
# These get attached to every response by the middleware in main.py.
# Adjust CSP if you add third-party scripts in the future.
SECURITY_HEADERS: dict[str, str] = {
    "X-Content-Type-Options":    "nosniff",
    "X-Frame-Options":           "DENY",
    "X-XSS-Protection":          "1; mode=block",
    "Referrer-Policy":           "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Permissions-Policy":        "camera=(), microphone=(), geolocation=()",
}
