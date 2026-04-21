"""
main.py — portfolio backend (single file, no sub-folders needed)
All logic here: CORS, rate limiting, contact form, AI chat.
"""
import os, logging, time, re
from contextlib import asynccontextmanager
from collections import defaultdict
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, field_validator

load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

# ── in-memory rate limiter (no external packages needed) ──────────────────────
_log: dict = defaultdict(list)

def _allow(ip: str, path: str, limit: int, window: int = 3600) -> bool:
    now = time.time()
    key = f"{ip}:{path}"
    _log[key] = [t for t in _log[key] if t > now - window]
    if len(_log[key]) >= limit:
        return False
    _log[key].append(now)
    return True

# ── input sanitiser ───────────────────────────────────────────────────────────
def clean(v: str, max_len: int = 2000) -> str:
    try:
        import bleach
        v = bleach.clean(v, tags=[], attributes={}, strip=True)
    except ImportError:
        v = re.sub(r'<[^>]+>', '', v)
    v = re.sub(r"\s+", " ", v).strip()
    return v[:max_len]

# ── app setup ─────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("portfolio backend starting")
    yield
    logger.info("portfolio backend shutting down")

app = FastAPI(
    title="Portfolio API",
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url=None,
    lifespan=lifespan,
)

# CORS — reads from env var, accepts multiple comma-separated origins
raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
origins = [o.strip() for o in raw.split(",") if o.strip()]
logger.info("CORS allowed origins: %s", origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)

HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
}

@app.middleware("http")
async def add_headers(request: Request, call_next):
    response = await call_next(request)
    for k, v in HEADERS.items():
        response.headers[k] = v
    return response

# ── request models ────────────────────────────────────────────────────────────
class ContactBody(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

    @field_validator("name")
    @classmethod
    def v_name(cls, v: str) -> str:
        v = clean(v, 80)
        if len(v) < 2:
            raise ValueError("too short")
        return v

    @field_validator("subject")
    @classmethod
    def v_subject(cls, v: str) -> str:
        v = clean(v, 120)
        if len(v) < 2:
            raise ValueError("too short")
        return v

    @field_validator("message")
    @classmethod
    def v_message(cls, v: str) -> str:
        v = clean(v, 2000)
        if len(v) < 5:
            raise ValueError("too short")
        return v

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatBody(BaseModel):
    messages: list[ChatMessage]
    system: str | None = None

# ── routes ────────────────────────────────────────────────────────────────────
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "portfolio-api", "version": "2.0.0"}

@app.post("/api/contact")
async def contact(request: Request, body: ContactBody):
    ip = request.client.host if request.client else "unknown"
    if not _allow(ip, "/api/contact", limit=5):
        return JSONResponse(status_code=429, content={"detail": "Too many requests. Try again later."})

    api_key = os.getenv("RESEND_API_KEY", "")
    to_addr = os.getenv("CONTACT_EMAIL_TO", "alhasanal_qaysi@yahoo.com")

    if not api_key:
        logger.warning("RESEND_API_KEY not set — logging contact from %s", body.email)
        return {"success": True, "message": "Got it!"}

    try:
        import resend
        resend.api_key = api_key
        resend.Emails.send({
            "from": "Portfolio <onboarding@resend.dev>",
            "to": [to_addr],
            "reply_to": str(body.email),
            "subject": f"[Portfolio] {body.subject}",
            "html": f"""
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px">
              <h2 style="color:#0d9488">New message from your portfolio</h2>
              <p><strong>From:</strong> {body.name} &lt;{body.email}&gt;</p>
              <p><strong>Subject:</strong> {body.subject}</p>
              <hr/>
              <p style="white-space:pre-wrap">{body.message}</p>
            </div>
            """,
        })
        logger.info("contact email sent from %s", body.email)
        return {"success": True, "message": "Got it — I'll get back to you soon!"}
    except Exception as e:
        logger.error("contact error: %s", e)
        return JSONResponse(
            status_code=500,
            content={"detail": "Could not send email. Please email alhasanal_qaysi@yahoo.com directly."}
        )

@app.post("/api/chat")
async def chat(request: Request, body: ChatBody):
    ip = request.client.host if request.client else "unknown"
    if not _allow(ip, "/api/chat", limit=20):
        return JSONResponse(status_code=429, content={"detail": "Too many requests."})

    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        return JSONResponse(status_code=503, content={"detail": "AI not configured yet."})

    system = body.system or (
        "You are an AI assistant on Alhasan Al-Qaysi's portfolio website. "
        "Alhasan is a full-stack developer in Helsinki, Finland with 5+ years experience. "
        "Stack: React, TypeScript, Next.js, Vue.js, Node.js, Python, PostgreSQL, MongoDB. "
        "Works at Cyberday | Agendium Oy building compliance software for 1,000+ organizations. "
        "Won 2nd place at Junction 2022 Web3 hackathon. "
        "Contact: alhasanal_qaysi@yahoo.com | GitHub: Hasankc. "
        "Be friendly, concise, and honest. Answer in the same language the user writes in."
    )

    messages = [{"role": "system", "content": system}]
    for m in body.messages[-20:]:
        role = m.role if m.role in ("user", "assistant") else "user"
        messages.append({"role": role, "content": clean(m.content, 1000)})

    try:
        from groq import Groq
        client = Groq(api_key=api_key)
        res = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            max_tokens=512,
            temperature=0.7,
        )
        reply = res.choices[0].message.content or "Sorry, I could not generate a response."
        return {"reply": reply, "success": True}
    except Exception as e:
        logger.error("chat error: %s", e)
        return JSONResponse(status_code=500, content={"detail": "AI error, please try again."})

@app.exception_handler(404)
async def not_found(_: Request, __: Exception):
    return JSONResponse(status_code=404, content={"detail": "not found"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
