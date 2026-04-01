# 🍳 Cooking Assistant

AI-powered cooking assistant with live vision coaching, step-by-step guidance, voice prompts, and a global recipe library.

## Quick Start (Windows)

1. Extract this ZIP
2. Copy `backend/.env.example` → `backend/.env` and add your `OPENAI_API_KEY`
3. Double-click `start-windows.bat`
4. Open [http://localhost:3001](http://localhost:3001)

## Stack

- **Frontend**: React 18 + Tailwind CSS + Vite (PWA-ready)
- **Backend**: Node.js + Express — proxies OpenAI API securely
- **AI**: OpenAI `gpt-4o-mini` for vision coaching and recipe assistance
- **Voice**: ElevenLabs TTS (optional) with browser speech fallback

## Android

Open the live URL in Chrome on Android → menu → **Add to Home Screen**.  
The app installs as a full-screen PWA — no App Store needed.

## Deployment

See **DEPLOYMENT-GUIDE.txt** for full instructions:
- Free: Render, Railway, Fly.io
- Paid: VPS (Hetzner/DigitalOcean) with custom domain + SSL

## Environment Variables

| Variable | Required | Default |
|---|---|---|
| `OPENAI_API_KEY` | ✅ Yes | — |
| `OPENAI_MODEL` | No | `gpt-4o-mini` |
| `PORT` | No | `3001` |
| `FRONTEND_ORIGIN` | No | `http://localhost:5173` |
| `ELEVENLABS_API_KEY` | No | — |
