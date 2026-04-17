"""
security.py — rate limiting, input sanitisation, response headers

Replaced slowapi with a simple built-in rate limiter to avoid the
slowapi/limits version conflict that was crashing the app on Render.

The custom limiter stores request counts in a plain dict — totally
fine for a portfolio site that gets maybe a few dozen requests a day.
If this ever needs to scale, swap it for Redis + a proper library.
"""
from __future__ import annotations

import re
import time
import bleach
from collections import defaultdict
from fastapi import Request
from fastapi.responses import JSONResponse


# ── simple in-memory rate limiter ─────────────────────────────────────────────

# stores: { ip: [(timestamp, endpoint), ...] }
_request_log: dict[str, list[tuple[float, str]]] = defaultdict(list)


def _check_rate_limit(request: Request, max_requests: int, window_seconds: int) -> bool:
    """
    Returns True if the request is allowed, False if rate limit exceeded.
    Cleans up old entries on every call so memory doesn't grow forever.
    """
    ip       = request.client.host if request.client else "unknown"
    endpoint = request.url.path
    now      = time.time()
    cutoff   = now - window_seconds

    # remove entries older than the window
    _request_log[ip] = [
        (ts, ep) for ts, ep in _request_log[ip]
        if ts > cutoff and ep == endpoint
    ]

    if len(_request_log[ip]) >= max_requests:
        return False

    _request_log[ip].append((now, endpoint))
    return True


def rate_limit(max_requests: int, window_seconds: int = 3600):
    """
    Decorator factory — use like:
        @router.post("/contact")
        @rate_limit(max_requests=5, window_seconds=3600)
        async def contact(request: Request, ...):
    """
    def decorator(func):
        import functools

        @functools.wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            if not _check_rate_limit(request, max_requests, window_seconds):
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Too many requests — slow down and try again later."},
                )
            return await func(request, *args, **kwargs)

        return wrapper
    return decorator


# ── input sanitisation ────────────────────────────────────────────────────────

def sanitize(value: str, max_len: int = 2000) -> str:
    """Strip all HTML, collapse whitespace, trim to max_len."""
    cleaned = bleach.clean(value, tags=[], attributes={}, strip=True)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned[:max_len]


def sanitize_email(email: str) -> str:
    """Sanitize then basic format check."""
    clean = sanitize(email, max_len=254).lower()
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", clean):
        raise ValueError(f"invalid email: {email!r}")
    return clean


# ── security response headers ─────────────────────────────────────────────────

SECURITY_HEADERS: dict[str, str] = {
    "X-Content-Type-Options":    "nosniff",
    "X-Frame-Options":           "DENY",
    "X-XSS-Protection":          "1; mode=block",
    "Referrer-Policy":           "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Permissions-Policy":        "camera=(), microphone=(), geolocation=()",
}
