"""
ai.py — POST /api/chat

Uses Groq's free API to power the portfolio AI chat.
Groq runs Llama 3 and gives you 14,400 free requests per day —
more than enough for a portfolio site.

Sign up at console.groq.com, create an API key, done.
No credit card, no billing, nothing.
"""
from __future__ import annotations

import logging
import os
from typing import Literal

from groq import Groq
from fastapi  import APIRouter, HTTPException, Request
from pydantic import BaseModel, field_validator

from middleware.security import limiter, sanitize

logger = logging.getLogger(__name__)
router = APIRouter()

# lazy-init so a missing key doesn't crash the whole app on startup
_client: Groq | None = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError("GROQ_API_KEY is not set — add it in your Render environment variables")
        _client = Groq(api_key=api_key)
    return _client


class ChatMessage(BaseModel):
    role:    Literal["user", "assistant"]
    content: str

    @field_validator("content")
    @classmethod
    def clean(cls, v: str) -> str:
        return sanitize(v, max_len=1000)


class ChatPayload(BaseModel):
    messages: list[ChatMessage]
    system:   str | None = None

    @field_validator("messages")
    @classmethod
    def validate_messages(cls, v: list[ChatMessage]) -> list[ChatMessage]:
        if not v:
            raise ValueError("messages list can't be empty")
        # cap history to 20 turns so nobody burns through the free quota
        return v[-20:] if len(v) > 20 else v

    @field_validator("system")
    @classmethod
    def clean_system(cls, v: str | None) -> str | None:
        return sanitize(v, max_len=2000) if v else None


DEFAULT_SYSTEM = """
You are an AI assistant on Alhasan Al-Qaysi's portfolio website.
Alhasan is a full-stack web developer based in Helsinki, Finland.
His stack: React, TypeScript, Next.js, Vue.js, Node.js, Python/FastAPI, PostgreSQL, MongoDB, Docker.
He works at Cyberday | Agendium Oy building a cybersecurity compliance platform for 1,000+ organizations.
Won 2nd place at Junction 2022 for a Web3 marketplace project.
Contact: alhasanal_qaysi@yahoo.com | GitHub: github.com/Hasankc
Be friendly and concise. Don't make things up.
""".strip()


@router.post("/chat")
@limiter.limit("20/hour")
async def chat(request: Request, payload: ChatPayload):
    """
    Chat endpoint — proxies to Groq (free Llama 3.1 model).
    Rate limited to 20/hour per IP to protect the free quota.
    """
    try:
        client = _get_client()

        # build the messages list with the system prompt prepended
        messages = [
            {"role": "system", "content": payload.system or DEFAULT_SYSTEM},
            *[{"role": m.role, "content": m.content} for m in payload.messages],
        ]

        response = client.chat.completions.create(
            model       = "llama-3.1-8b-instant",  # fast, free, good enough for Q&A
            messages    = messages,                 # type: ignore[arg-type]
            max_tokens  = 512,
            temperature = 0.7,
        )

        reply = response.choices[0].message.content or "Sorry, I couldn't come up with a response."
        return {"reply": reply, "success": True}

    except RuntimeError as exc:
        logger.error("Groq client init failed: %s", exc)
        raise HTTPException(status_code=503, detail="AI service isn't configured yet.")

    except Exception as exc:
        logger.exception("Unexpected error in /chat: %s", exc)
        raise HTTPException(status_code=500, detail="Something went wrong — try again in a moment.")
