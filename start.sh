#!/usr/bin/env bash
set -e

echo "============================================"
echo "  🍳 Cooking Assistant - Starting Up"
echo "============================================"
echo

# Check Node
if ! command -v node &>/dev/null; then
  echo "[ERROR] Node.js not found. Install from https://nodejs.org"
  exit 1
fi

# Setup backend .env
if [ ! -f "backend/.env" ]; then
  echo "[SETUP] Creating backend/.env from example..."
  cp backend/.env.example backend/.env
  echo
  echo "*** IMPORTANT ***"
  echo "Edit backend/.env and add your OPENAI_API_KEY, then re-run this script."
  exit 0
fi

# Install deps
if [ ! -d "backend/node_modules" ]; then
  echo "[SETUP] Installing backend dependencies..."
  npm install --prefix backend
fi

if [ ! -d "frontend/node_modules" ]; then
  echo "[SETUP] Installing frontend dependencies..."
  npm install --prefix frontend
fi

# Build frontend if needed
if [ ! -f "frontend/dist/index.html" ]; then
  echo "[BUILD] Building frontend..."
  npm run build --prefix frontend
fi

echo
echo "[START] Server running at http://localhost:3001"
echo "        Open that URL in your browser."
echo "        Press Ctrl+C to stop."
echo

cd backend && node server.js
