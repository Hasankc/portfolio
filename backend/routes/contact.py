"""
contact.py — POST /api/contact

Validates and sanitises the contact form, then sends an email via Resend.
Rate limited to 5 requests per IP per hour using the built-in limiter.
"""
from __future__ import annotations

import logging
import os

import resend
from fastapi  import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, field_validator

from middleware.security import rate_limit, sanitize, sanitize_email

logger = logging.getLogger(__name__)
router = APIRouter()


class ContactPayload(BaseModel):
    name:    str
    email:   EmailStr
    subject: str
    message: str

    @field_validator("name")
    @classmethod
    def clean_name(cls, v: str) -> str:
        v = sanitize(v, max_len=80)
        if len(v) < 2:
            raise ValueError("name too short")
        return v

    @field_validator("email")
    @classmethod
    def clean_email(cls, v: str) -> str:
        return sanitize_email(v)

    @field_validator("subject")
    @classmethod
    def clean_subject(cls, v: str) -> str:
        v = sanitize(v, max_len=120)
        if len(v) < 3:
            raise ValueError("subject too short")
        return v

    @field_validator("message")
    @classmethod
    def clean_message(cls, v: str) -> str:
        v = sanitize(v, max_len=2000)
        if len(v) < 10:
            raise ValueError("message too short")
        return v


def _send_email(payload: ContactPayload) -> None:
    """Send via Resend. Logs only if key not configured (local dev)."""
    api_key = os.getenv("RESEND_API_KEY", "")
    to_addr = os.getenv("CONTACT_EMAIL_TO", "alhasanal_qaysi@yahoo.com")

    if not api_key:
        logger.warning("RESEND_API_KEY not set — contact from %s <%s>", payload.name, payload.email)
        return

    resend.api_key = api_key

    html_body = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;color:#333">
      <h2 style="color:#38bdf8;border-bottom:2px solid #f0f0f0;padding-bottom:12px">
        New message from your portfolio
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr>
          <td style="padding:10px 0;font-weight:bold;width:80px;color:#666">From</td>
          <td style="padding:10px 0">{payload.name} &lt;{payload.email}&gt;</td>
        </tr>
        <tr style="border-top:1px solid #f0f0f0">
          <td style="padding:10px 0;font-weight:bold;color:#666">Subject</td>
          <td style="padding:10px 0">{payload.subject}</td>
        </tr>
        <tr style="border-top:1px solid #f0f0f0">
          <td style="padding:10px 0;font-weight:bold;color:#666;vertical-align:top">Message</td>
          <td style="padding:10px 0;white-space:pre-wrap;line-height:1.6">{payload.message}</td>
        </tr>
      </table>
      <p style="margin-top:24px;font-size:12px;color:#999">Sent via portfolio contact form</p>
    </div>
    """

    params: resend.Emails.SendParams = {
        "from":     "Portfolio <onboarding@resend.dev>",
        "to":       [to_addr],
        "reply_to": payload.email,
        "subject":  f"[Portfolio] {payload.subject}",
        "html":     html_body,
    }
    resend.Emails.send(params)


@router.post("/contact")
@rate_limit(max_requests=5, window_seconds=3600)
async def contact(request: Request, payload: ContactPayload):
    try:
        _send_email(payload)
        logger.info("contact form: %s <%s>", payload.name, payload.email)
        return {"success": True, "message": "Got it — I'll get back to you soon!"}
    except Exception as exc:
        logger.exception("contact email failed: %s", exc)
        return JSONResponse(
            status_code=500,
            content={"detail": "Couldn't send right now. Email alhasanal_qaysi@yahoo.com directly."},
        )
