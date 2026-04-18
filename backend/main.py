import os
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins.split(",")],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.post("/api/chat")
async def chat(request: Request):
    try:
        from groq import Groq
        data = await request.json()
        messages = data.get("messages", [])
        system = data.get("system", "You are a helpful assistant for Alhasan Al-Qaysi's portfolio.")

        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            return {"reply": "AI not configured yet.", "success": False}

        client = Groq(api_key=api_key)
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "system", "content": system}, *messages],
            max_tokens=512,
        )
        return {"reply": response.choices[0].message.content, "success": True}
    except Exception as e:
        logger.error("Chat error: %s", e)
        return JSONResponse(status_code=500, content={"detail": str(e)})

@app.post("/api/contact")
async def contact(request: Request):
    try:
        import resend
        data = await request.json()
        name    = data.get("name", "")
        email   = data.get("email", "")
        subject = data.get("subject", "")
        message = data.get("message", "")

        api_key = os.getenv("RESEND_API_KEY", "")
        to_addr = os.getenv("CONTACT_EMAIL_TO", "alhasanal_qaysi@yahoo.com")

        if not api_key:
            logger.warning("No RESEND_API_KEY — contact from %s", email)
            return {"success": True, "message": "Got it!"}

        resend.api_key = api_key
        resend.Emails.send({
            "from": "Portfolio <onboarding@resend.dev>",
            "to": [to_addr],
            "reply_to": email,
            "subject": f"[Portfolio] {subject}",
            "html": f"<p><b>From:</b> {name} &lt;{email}&gt;</p><p><b>Message:</b><br>{message}</p>",
        })
        return {"success": True, "message": "Got it — I'll get back to you soon!"}
    except Exception as e:
        logger.error("Contact error: %s", e)
        return JSONResponse(status_code=500, content={"detail": str(e)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)