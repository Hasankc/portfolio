#!/bin/bash
# deploy-backend.sh
#
# Quick local setup script for the backend.
# Run this once after cloning — it creates the venv, installs deps,
# and copies the .env template if you haven't set one up yet.
#
# Usage: cd backend && bash deploy-backend.sh

set -e  # exit on any error

echo "── Portfolio Backend Setup ──"
echo ""

# check python version
PY=$(python3 --version 2>&1)
echo "Python: $PY"

# create venv if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
fi

# activate venv
source venv/bin/activate

# install deps
echo "Installing dependencies..."
pip install --upgrade pip -q
pip install -r requirements.txt -q

echo ""
echo "✅ Dependencies installed"

# copy .env if missing
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo ""
  echo "⚠️  .env file created from template."
  echo "    Open backend/.env and fill in:"
  echo "      ANTHROPIC_API_KEY  — get from console.anthropic.com"
  echo "      SMTP_USER          — your Gmail address"
  echo "      SMTP_PASSWORD      — Gmail App Password"
  echo "      CONTACT_EMAIL_TO   — where to receive messages"
  echo "      ALLOWED_ORIGINS    — your frontend URL"
  echo ""
fi

echo "── Starting development server ──"
echo "API docs will be at: http://localhost:8000/docs"
echo ""
uvicorn main:app --reload --port 8000
