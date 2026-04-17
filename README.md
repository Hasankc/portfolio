# 🚀 Alhasan Al-Qaysi — Portfolio

> Full-stack portfolio website built with **Next.js 14 + TypeScript** (frontend) and **Python FastAPI** (backend).  
> Features an AI-powered chat assistant, contact form with email, live GitHub repo integration, dark/light mode, and a fully responsive design.

**Live:** https://hasankc.netlify.app  
**Backend:** Deploy on [Railway](https://railway.app) or [Render](https://render.com)

---

## ✨ Features

| Feature | Details |
|---|---|
| **AI Chat Assistant** | Powered by Claude (Anthropic) — answers questions about skills, experience & availability |
| **Contact Form** | Validated with Zod + React Hook Form, emails sent via SMTP (aiosmtplib) |
| **GitHub Projects** | Live GitHub API integration — fetches and displays your latest repos |
| **Dark / Light Mode** | Persistent theme with smooth CSS variable transitions |
| **Animated UI** | Typewriter hero, animated skill bars, scroll reveals, cursor glow, star field |
| **Security** | CSP headers, rate limiting (slowapi), input sanitisation (bleach), XSS prevention |
| **SEO** | Full OpenGraph + Twitter Card metadata, sitemap-ready |
| **Responsive** | Mobile-first design — optimised for all screen sizes |
| **TypeScript** | End-to-end type safety on the frontend |

---

## 🗂 Project Structure

```
portfolio/
├── frontend/               # Next.js 14 + TypeScript
│   ├── app/
│   │   ├── layout.tsx      # Root layout + SEO metadata
│   │   ├── page.tsx        # Main page (all sections)
│   │   └── globals.css     # Design system (CSS variables, animations)
│   ├── components/
│   │   ├── Navbar.tsx      # Sticky nav with active section tracking
│   │   ├── Footer.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── CursorGlow.tsx
│   │   ├── StarField.tsx
│   │   └── sections/
│   │       ├── Hero.tsx        # Typewriter + profile image
│   │       ├── About.tsx       # Bio + stats
│   │       ├── Skills.tsx      # Animated skill bars with tabs
│   │       ├── Experience.tsx  # Timeline (work + education)
│   │       ├── Projects.tsx    # GitHub API + featured projects
│   │       ├── AiChat.tsx      # AI portfolio assistant
│   │       └── Contact.tsx     # Contact form
│   ├── types/index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js      # Security headers
│   └── vercel.json
│
├── backend/                # Python FastAPI
│   ├── main.py             # App factory, CORS, middleware
│   ├── routes/
│   │   ├── contact.py      # POST /api/contact → SMTP email
│   │   └── ai.py           # POST /api/chat → Anthropic Claude
│   ├── middleware/
│   │   └── security.py     # Rate limiting, sanitisation, headers
│   ├── requirements.txt
│   ├── Procfile            # For Railway/Render
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.11+
- An **Anthropic API key** (get one at [console.anthropic.com](https://console.anthropic.com))
- A Gmail account (or any SMTP provider) for the contact form

---

### 1. Clone the repo

```bash
git clone https://github.com/Hasankc/portfolio.git
cd portfolio
```

---

### 2. Backend setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Open .env and fill in your keys (see Environment Variables section below)

# Start the backend
uvicorn main:app --reload --port 8000
```

Backend will be running at **http://localhost:8000**  
API docs (dev only): **http://localhost:8000/docs**

---

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local — set NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Start the dev server
npm run dev
```

Frontend will be running at **http://localhost:3000**

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude AI chat | `sk-ant-...` |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port (587 for TLS) | `587` |
| `SMTP_USER` | SMTP username / sender email | `you@gmail.com` |
| `SMTP_PASSWORD` | SMTP password or App Password | `xxxx xxxx xxxx xxxx` |
| `CONTACT_EMAIL_TO` | Where to receive contact emails | `alhasanal_qaysi@yahoo.com` |
| `ALLOWED_ORIGINS` | Comma-separated allowed frontend origins | `http://localhost:3000,https://yourdomain.com` |
| `ENVIRONMENT` | `development` or `production` | `production` |

> **Gmail tip:** Enable 2FA on your Google account, then generate an **App Password** at  
> https://myaccount.google.com/apppasswords — use that as `SMTP_PASSWORD`.

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | URL of your deployed (or local) FastAPI backend |

---

## 🚀 Deployment

### Frontend → Vercel (recommended)

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Select your repo, set **Root Directory** to `frontend`
4. Add environment variable: `NEXT_PUBLIC_BACKEND_URL` = your backend URL
5. Click **Deploy** ✅

### Backend → Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
2. Select your repo, set **Root Directory** to `backend`
3. Add all environment variables from the table above
4. Railway auto-detects the `Procfile` and deploys ✅

### Backend → Render (alternative)

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo, set **Root Directory** to `backend`
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables → **Deploy** ✅

---

## 🔒 Security

The portfolio includes multiple layers of protection:

- **Rate limiting** — contact form: 5 req/hour/IP; AI chat: 20 req/hour/IP
- **Input sanitisation** — all user input stripped of HTML via `bleach` before processing
- **Security headers** — CSP, X-Frame-Options, X-Content-Type-Options, HSTS, etc.
- **CORS whitelist** — only your frontend domain is allowed
- **Pydantic validation** — strict schema validation on all API inputs
- **No secrets in frontend** — API keys live only in the backend `.env`

---

## 🛠 Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form validation
- [Lucide React](https://lucide.dev/) — icons

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) — modern Python web framework
- [Uvicorn](https://www.uvicorn.org/) — ASGI server
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-python) — Claude AI integration
- [aiosmtplib](https://aiosmtplib.readthedocs.io/) — async SMTP email
- [slowapi](https://github.com/laurentS/slowapi) — rate limiting
- [bleach](https://bleach.readthedocs.io/) — HTML sanitisation
- [Pydantic v2](https://docs.pydantic.dev/) — data validation

---

## 📝 Customisation

1. **Update personal data** — edit `components/sections/Hero.tsx`, `About.tsx`, `Experience.tsx`
2. **Change colours** — edit CSS variables in `app/globals.css` (`:root` block)
3. **Add projects** — update the `featured` array in `components/sections/Projects.tsx`
4. **Update CV PDF** — drop `Alhasan_Alqaysi_CV.pdf` into `frontend/public/`
5. **AI persona** — edit `SYSTEM_CONTEXT` in `AiChat.tsx` and `DEFAULT_SYSTEM` in `backend/routes/ai.py`

---

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio!

---

*Built with ❤️ by Alhasan Al-Qaysi — Helsinki, Finland*
