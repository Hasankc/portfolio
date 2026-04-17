#!/bin/bash
# run-dev.sh
#
# First-time setup and dev server for the frontend.
# Run from the frontend/ directory.
#
# Usage: cd frontend && bash run-dev.sh

set -e

echo "── Portfolio Frontend Setup ──"
echo ""

# check node
NODE=$(node --version 2>&1)
echo "Node: $NODE"

# install if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing npm packages (this takes a minute the first time)..."
  npm install
else
  echo "node_modules already exists — skipping install"
fi

# create .env.local if missing
if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
  echo ""
  echo "⚠️  .env.local created."
  echo "    Make sure NEXT_PUBLIC_BACKEND_URL points to your backend."
  echo "    Default is http://localhost:8000 (fine for local dev)."
  echo ""
fi

echo "── Starting dev server ──"
echo "App will be at: http://localhost:3000"
echo ""
npm run dev
