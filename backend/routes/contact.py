"""
contact.py — POST /api/contact

Receives contact form submissions and sends email via Resend.
Resend's free tier = 3,000 emails/month. No credit card needed.
Sign up at resend.com — takes 2 minutes.

If RESEND_API_KEY isn't set (local dev) we just log the message
instead of crashing. Good for testing the form without real email.
"""
from __future__ import annotations

import logging
import os

import resend
from fastapi          import APIRouter, HTTPException, Request
from pydantic         import BaseModel, EmailStr, field_validator

from middleware.security import limiter, sanitize, sanitize_email

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
    """
    Send notification email via Resend API.
    Falls back to logging if the API key isn't configured (dev mode).
    """
    api_key  = os.getenv("RESEND_API_KEY", "")
    to_addr  = os.getenv("CONTACT_EMAIL_TO", "alhasanal_qaysi@yahoo.com")

    if not api_key:
        # dev mode — just log it so the form still works locally
        logger.warning(
            "RESEND_API_KEY not set — would have emailed: %s <%s> | %s",
            payload.name, payload.email, payload.subject,
        )
        return

    resend.api_key = api_key

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #333;">
      <h2 style="color: #38bdf8; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px;">
        New message from your portfolio
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; width: 80px; color: #666;">From</td>
          <td style="padding: 10px 0;">{payload.name} &lt;{payload.email}&gt;</td>
        </tr>
        <tr style="border-top: 1px solid #f0f0f0;">
          <td style="padding: 10px 0; font-weight: bold; color: #666;">Subject</td>
          <td style="padding: 10px 0;">{payload.subject}</td>
        </tr>
        <tr style="border-top: 1px solid #f0f0f0;">
          <td style="padding: 10px 0; font-weight: bold; color: #666; vertical-align: top;">Message</td>
          <td style="padding: 10px 0; white-space: pre-wrap; line-height: 1.6;">{payload.message}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #999;">
        Sent via portfolio contact form
      </p>
    </div>
    """

    resend.Emails.send({
        "from":     "Portfolio <onboarding@resend.dev>",  # resend default sender for free tier
        "to":       [to_addr],
        "reply_to": payload.email,
        "subject":  f"[Portfolio] {payload.subject}",
        "html":     html,
    })


@router.post("/contact")
@limiter.limit("5/hour")
async def contact(request: Request, payload: ContactPayload):
    """
    Handle contact form submissions.
    5/hour rate limit per IP to stop spam.
    """
    try:
        _send_email(payload)
        logger.info("contact form: %s <%s>", payload.name, payload.email)
        return {"success": True, "message": "Got it — I'll get back to you soon!"}

    except Exception as exc:
        logger.exception("Error in /contact: %s", exc)
        raise HTTPException(
            status_code=500,
            detail="Couldn't send the message right now. Please email me directly at alhasanal_qaysi@yahoo.com",
        )
