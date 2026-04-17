"""
main.py — portfolio backend

FastAPI app. No slowapi dependency — rate limiting is handled
by the custom limiter in middleware/security.py using stdlib only.

Local:      uvicorn main:app --reload --port 8000
Production: Render reads the start command from the dashboard
"""
from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from middleware.security import SECURITY_HEADERS
from routes import contact, ai

load_dotenv()

logging.basicConfig(
    level  = logging.INFO,
    format = "%(asctime)s  %(levelname)-8s  %(name)s — %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("portfolio backend starting — Groq (AI) + Resend (email), both free")
    yield
    logger.info("portfolio backend shutting down")


app = FastAPI(
    title     = "Alhasan Al-Qaysi — Portfolio API",
    version   = "1.0.0",
    docs_url  = "/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url = None,
    lifespan  = lifespan,
)

# CORS
raw_origins    = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [o.strip() for o in raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins     = allowed_origins,
    allow_credentials = False,
    allow_methods     = ["GET", "POST"],
    allow_headers     = ["Content-Type", "Accept"],
)

# security headers on every response
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    for key, value in SECURITY_HEADERS.items():
        response.headers[key] = value
    return response

# routes
app.include_router(contact.router, prefix="/api")
app.include_router(ai.router,      prefix="/api")


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "portfolio-api", "version": "1.0.0"}


@app.exception_handler(404)
async def not_found(_: Request, __: Exception) -> JSONResponse:
    return JSONResponse(status_code=404, content={"detail": "not found"})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
