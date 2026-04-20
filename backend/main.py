"""
main.py — complete portfolio backend in one file
No separate routes/ or middleware/ folders needed.
"""
import os, logging, time, re
from contextlib import asynccontextmanager
from collections import defaultdict
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr

load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

# ── rate limiter (built-in, no extra packages) ────────────────────────────────
_log: dict = defaultdict(list)

def _allow(ip: str, path: str, limit: int, window: int = 3600) -> bool:
    now    = time.time()
    key    = f"{ip}:{path}"
    _log[key] = [t for t in _log[key] if t > now - window]
    if len(_log[key]) >= limit:
        return False
    _log[key].append(now)
    return True

# ── input sanitiser ───────────────────────────────────────────────────────────
def clean(v: str, max_len: int = 2000) -> str:
    import bleach
    v = bleach.clean(v, tags=[], attributes={}, strip=True)
    v = re.sub(r"\s+", " ", v).strip()
    return v[:max_len]

# ── app ───────────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("backend starting")
    yield

app = FastAPI(
    title="Portfolio API",
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url=None,
    lifespan=lifespan,
)

origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",") if o.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=False, allow_methods=["GET","POST"], allow_headers=["Content-Type","Accept"])

HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
}

@app.middleware("http")
async def sec(request: Request, call_next):
    r = await call_next(request)
    for k, v in HEADERS.items():
        r.headers[k] = v
    return r

# ── schemas ───────────────────────────────────────────────────────────────────
class ContactBody(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ChatMsg(BaseModel):
    role: str
    content: str

class ChatBody(BaseModel):
    messages: list[ChatMsg]
    system: str | None = None

# ── routes ────────────────────────────────────────────────────────────────────
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "portfolio-api"}

@app.post("/api/contact")
async def contact(request: Request, body: ContactBody):
    ip = request.client.host if request.client else "unknown"
    if not _allow(ip, "/api/contact", limit=5):
        return JSONResponse(status_code=429, content={"detail": "Too many requests."})

    name    = clean(body.name, 80)
    subject = clean(body.subject, 120)
    message = clean(body.message, 2000)
    email   = body.email

    api_key = os.getenv("RESEND_API_KEY", "")
    to_addr = os.getenv("CONTACT_EMAIL_TO", "alhasanal_qaysi@yahoo.com")

    if not api_key:
        logger.warning("No RESEND_API_KEY — contact from %s", email)
        return {"success": True, "message": "Got it!"}

    try:
        import resend
        resend.api_key = api_key
        resend.Emails.send({
            "from": "Portfolio <onboarding@resend.dev>",
            "to": [to_addr],
            "reply_to": str(email),
            "subject": f"[Portfolio] {subject}",
            "html": f"<p><b>From:</b> {name} &lt;{email}&gt;</p><p><b>Subject:</b> {subject}</p><p>{message}</p>",
        })
        logger.info("contact email sent from %s", email)
        return {"success": True, "message": "Got it — I'll get back to you soon!"}
    except Exception as e:
        logger.error("contact error: %s", e)
        return JSONResponse(status_code=500, content={"detail": "Could not send email. Please try alhasanal_qaysi@yahoo.com directly."})

@app.post("/api/chat")
async def chat(request: Request, body: ChatBody):
    ip = request.client.host if request.client else "unknown"
    if not _allow(ip, "/api/chat", limit=20):
        return JSONResponse(status_code=429, content={"detail": "Too many requests."})

    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        return JSONResponse(status_code=503, content={"detail": "AI not configured."})

    system = body.system or "You are an AI assistant on Alhasan Al-Qaysi's portfolio. He is a full-stack developer in Helsinki with 5+ years experience. Stack: React, TypeScript, Next.js, Vue.js, Node.js, Python. Works at Cyberday. Won 2nd place Junction 2022 Web3 hackathon. Be friendly and concise."

    messages = [{"role": "system", "content": system}]
    for m in body.messages[-20:]:
        messages.append({"role": m.role, "content": clean(m.content, 1000)})

    try:
        from groq import Groq
        client = Groq(api_key=api_key)
        res = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            max_tokens=512,
            temperature=0.7,
        )
        reply = res.choices[0].message.content or "Sorry, no response."
        return {"reply": reply, "success": True}
    except Exception as e:
        logger.error("chat error: %s", e)
        return JSONResponse(status_code=500, content={"detail": "AI error, try again."})

@app.exception_handler(404)
async def not_found(_: Request, __: Exception):
    return JSONResponse(status_code=404, content={"detail": "not found"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
