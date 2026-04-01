/**
 * server.js — ChefAI Vision Backend
 *
 * Routes the frontend actually calls:
 *   GET  /api/health              — status check (returns services flags)
 *   POST /api/vision/analyze      — vision AI, streaming SSE
 *   POST /api/voice/tts           — ElevenLabs TTS, returns audio blob
 *   POST /api/auth/register       — user registration
 *   POST /api/auth/login          — user login
 *   GET  /api/auth/me             — get current user
 *   PUT  /api/auth/profile        — update profile
 */

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const https    = require('https');
const fs       = require('fs');

// ── Database (creates file + schema automatically) ─────────────────────────
require('./db');

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '20mb' }));
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  credentials: true,
}));

// ── Auth routes (register / login / me / profile) ─────────────────────────
const authRouter = require('./auth');
app.use('/api/auth', authRouter);

// ── GET /api/health ────────────────────────────────────────────────────────
// Returns the exact shape the frontend checks:
//   data?.services?.anthropicConfigured
//   data?.services?.elevenLabsConfigured
app.get('/api/health', (_req, res) => {
  const hasElevenLabs = !!process.env.ELEVENLABS_API_KEY &&
    process.env.ELEVENLABS_API_KEY !== 'your_elevenlabs_key_here_optional';

  res.json({
    ok: true,
    services: {
      anthropicConfigured: !!process.env.OPENAI_API_KEY,
      elevenLabsConfigured: hasElevenLabs,
    },
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  });
});

// ── POST /api/vision/analyze ───────────────────────────────────────────────
// Frontend sends OpenAI-format messages with base64 image.
// Expects Anthropic-style SSE back:
//   data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"..."}}
//   data: [DONE]
app.post('/api/vision/analyze', (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'OPENAI_API_KEY not set in backend/.env' });
  }

  const { messages, system, max_tokens } = req.body;

  const systemText = Array.isArray(system)
    ? system.map(s => s.text || '').join('\n')
    : (system || '');

  const openaiMessages = [
    ...(systemText ? [{ role: 'system', content: systemText }] : []),
    ...(messages || []),
  ];

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const requestBody = JSON.stringify({
    model,
    max_tokens: max_tokens || 300,
    stream: true,
    messages: openaiMessages,
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  const apiReq = https.request(options, (apiRes) => {
    let buffer = '';

    apiRes.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') {
          res.write('data: [DONE]\n\n');
          if (!res.writableEnded) res.end();
          return;
        }
        try {
          const evt = JSON.parse(data);
          const content = evt.choices?.[0]?.delta?.content;
          if (content) {
            // Re-emit in Anthropic SSE format — frontend parser expects this shape
            res.write(`data: ${JSON.stringify({
              type: 'content_block_delta',
              delta: { type: 'text_delta', text: content },
            })}\n\n`);
          }
        } catch (_) { /* partial JSON chunk — keep buffering */ }
      }
    });

    apiRes.on('end', () => {
      if (!res.writableEnded) {
        res.write('data: [DONE]\n\n');
        res.end();
      }
    });

    apiRes.on('error', (err) => {
      console.error('[Vision] Stream error:', err.message);
      if (!res.writableEnded) res.end();
    });
  });

  apiReq.on('error', (err) => {
    console.error('[Vision] Request error:', err.message);
    if (!res.headersSent) {
      res.status(502).json({ error: 'Failed to reach OpenAI API' });
    } else if (!res.writableEnded) {
      res.end();
    }
  });

  req.on('close', () => apiReq.destroy());
  apiReq.write(requestBody);
  apiReq.end();
});

// ── POST /api/voice/tts ────────────────────────────────────────────────────
// Proxies to ElevenLabs, streams audio blob back to frontend.
app.post('/api/voice/tts', (req, res) => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const hasKey = apiKey && apiKey !== 'your_elevenlabs_key_here_optional';

  if (!hasKey) {
    return res.status(503).json({ error: 'ELEVENLABS_API_KEY not configured' });
  }

  const { text, voiceId } = req.body;
  if (!text || !voiceId) {
    return res.status(400).json({ error: 'text and voiceId are required' });
  }

  const requestBody = JSON.stringify({
    text,
    model_id: 'eleven_monolingual_v1',
    voice_settings: { stability: 0.5, similarity_boost: 0.75 },
  });

  const options = {
    hostname: 'api.elevenlabs.io',
    path: `/v1/text-to-speech/${voiceId}`,
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  const apiReq = https.request(options, (apiRes) => {
    if (apiRes.statusCode !== 200) {
      console.error('[TTS] ElevenLabs status:', apiRes.statusCode);
      if (!res.headersSent) {
        res.status(apiRes.statusCode).json({ error: 'ElevenLabs API error' });
      }
      return;
    }
    res.setHeader('Content-Type', 'audio/mpeg');
    apiRes.pipe(res);
  });

  apiReq.on('error', (err) => {
    console.error('[TTS] Request error:', err.message);
    if (!res.headersSent) res.status(502).json({ error: 'Failed to reach ElevenLabs' });
  });

  apiReq.write(requestBody);
  apiReq.end();
});

// ── Serve built React app (production) ────────────────────────────────────
const DIST = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST, 'index.html')));
}

// ── Start ──────────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, () => {
  const hasEleven = !!process.env.ELEVENLABS_API_KEY &&
    process.env.ELEVENLABS_API_KEY !== 'your_elevenlabs_key_here_optional';

  console.log(`\n✅ ChefAI Vision backend running on http://localhost:${PORT}`);
  console.log(`   OpenAI key:     ${process.env.OPENAI_API_KEY ? '✓ configured' : '✗ MISSING — add OPENAI_API_KEY to backend/.env'}`);
  console.log(`   ElevenLabs key: ${hasEleven ? '✓ configured' : '— not set (browser speech will be used instead)'}`);
  console.log(`   Model:          ${process.env.OPENAI_MODEL || 'gpt-4o-mini'}\n`);
});
