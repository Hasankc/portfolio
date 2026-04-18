"""
ai.py — POST /api/chat

Proxies to Groq's free API (Llama 3.1). 
Rate limited to 20 requests per IP per hour.
"""
from __future__ import annotations

import logging
import os
from typing import Literal

from groq import Groq
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator

from middleware.security import rate_limit, sanitize

logger = logging.getLogger(__name__)
router = APIRouter()

_client: Groq | None = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError("GROQ_API_KEY not set — add it in Render environment variables")
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
        return v[-20:] if len(v) > 20 else v

    @field_validator("system")
    @classmethod
    def clean_system(cls, v: str | None) -> str | None:
        return sanitize(v, max_len=2000) if v else None


DEFAULT_SYSTEM = """
You are an AI assistant on Alhasan Al-Qaysi's portfolio website.
Alhasan is a full-stack web developer in Helsinki, Finland.
Stack: React, TypeScript, Next.js, Vue.js, Node.js, Python/FastAPI, PostgreSQL, MongoDB, Docker.
Works at Cyberday building cybersecurity compliance software for 1,000+ organizations.
Won 2nd place at Junction 2022 for a Web3 marketplace project.
Contact: alhasanal_qaysi@yahoo.com | GitHub: github.com/Hasankc
Be friendly, concise, and honest. Don't make things up.
""".strip()


@router.post("/chat")
@rate_limit(max_requests=20, window_seconds=3600)
async def chat(request: Request, payload: ChatPayload):
    try:
        client   = _get_client()
        messages = [
            {"role": "system", "content": payload.system or DEFAULT_SYSTEM},
            *[{"role": m.role, "content": m.content} for m in payload.messages],
        ]
        response = client.chat.completions.create(
            model       = "llama-3.1-8b-instant",
            messages    = messages,  # type: ignore[arg-type]
            max_tokens  = 512,
            temperature = 0.7,
        )
        reply = response.choices[0].message.content or "Sorry, couldn't generate a response."
        return {"reply": reply, "success": True}

    except RuntimeError as exc:
        logger.error("Groq client init: %s", exc)
        return JSONResponse(status_code=503, content={"detail": "AI service not configured."})
    except Exception as exc:
        logger.exception("Chat error: %s", exc)
        return JSONResponse(status_code=500, content={"detail": "Something went wrong, try again."})