#!/bin/bash
# start.sh — run both frontend and backend in parallel
#
# Requires two terminals OR uses background processes.
# Usage: bash start.sh
#
# To stop everything: Ctrl+C (kills both processes)

set -e

echo ""
echo "  ╔══════════════════════════════════╗"
echo "  ║   Alhasan's Portfolio — Dev Mode  ║"
echo "  ╚══════════════════════════════════╝"
echo ""
echo "  Frontend → http://localhost:3000"
echo "  Backend  → http://localhost:8000"
echo "  API docs → http://localhost:8000/docs"
echo ""
echo "  Press Ctrl+C to stop both servers."
echo ""

# ── backend ───────────────────────────────────────────────
cd backend

if [ ! -d "venv" ]; then
  echo "[backend] Creating venv..."
  python3 -m venv venv
fi

source venv/bin/activate

echo "[backend] Installing deps..."
pip install -r requirements.txt -q

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "[backend] ⚠️  Created .env from template — fill in your keys before using AI chat or contact form."
fi

# start backend in background
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
echo "[backend] Started (PID $BACKEND_PID)"

cd ..

# ── frontend ──────────────────────────────────────────────
cd frontend

if [ ! -d "node_modules" ]; then
  echo "[frontend] Installing npm packages..."
  npm install
fi

if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
fi

# start frontend in foreground so Ctrl+C works naturally
npm run dev &
FRONTEND_PID=$!
echo "[frontend] Started (PID $FRONTEND_PID)"

cd ..

# wait for either process to exit, then kill both
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Stopped.'" EXIT

wait
