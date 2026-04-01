/**
 * auth.js  —  Authentication routes
 * POST /api/auth/register
 * POST /api/auth/login
 * POST /api/auth/logout
 * GET  /api/auth/me
 * PUT  /api/auth/profile
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'cooking-assistant-secret-change-in-production';
const JWT_EXPIRES = '7d';

// ── helpers ────────────────────────────────────────────────────────────────

function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function safe(user) {
  // strip password before sending to client
  const { password_hash, ...rest } = user;
  return rest;
}

// ── middleware: require auth ───────────────────────────────────────────────

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// export so server.js can use it on other routes too
router.requireAuth = requireAuth;

// ── POST /api/auth/register ────────────────────────────────────────────────

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required.' });
    }
    if (!email && !phone) {
      return res.status(400).json({ error: 'Provide at least an email or phone number.' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    if (phone && !/^\+?[\d\s\-().]{7,20}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    // duplicate check
    if (email) {
      const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
      if (existing) return res.status(409).json({ error: 'Email already registered.' });
    }
    if (phone) {
      const existing = db.prepare('SELECT id FROM users WHERE phone = ?').get(phone);
      if (existing) return res.status(409).json({ error: 'Phone number already registered.' });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const result = db.prepare(`
      INSERT INTO users (name, email, phone, password_hash, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).run(name.trim(), email ? email.toLowerCase() : null, phone || null, password_hash);

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    const token = signToken(user.id);

    res.status(201).json({ token, user: safe(user) });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ── POST /api/auth/login ───────────────────────────────────────────────────

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = email OR phone
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Identifier and password are required.' });
    }

    const isEmail = identifier.includes('@');
    const field = isEmail ? 'email' : 'phone';
    const value = isEmail ? identifier.toLowerCase() : identifier;

    const user = db.prepare(`SELECT * FROM users WHERE ${field} = ?`).get(value);
    if (!user) return res.status(401).json({ error: 'No account found with those details.' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Incorrect password.' });

    // update last_login
    db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").run(user.id);

    const token = signToken(user.id);
    res.json({ token, user: safe(user) });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// ── GET /api/auth/me ───────────────────────────────────────────────────────

router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ user: safe(user) });
});

// ── PUT /api/auth/profile ──────────────────────────────────────────────────

router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { name, email, phone, bio, dietary_preferences, current_password, new_password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // password change
    let password_hash = user.password_hash;
    if (new_password) {
      if (!current_password) return res.status(400).json({ error: 'Current password required to set a new one.' });
      const match = await bcrypt.compare(current_password, user.password_hash);
      if (!match) return res.status(401).json({ error: 'Current password is incorrect.' });
      if (new_password.length < 6) return res.status(400).json({ error: 'New password must be at least 6 characters.' });
      password_hash = await bcrypt.hash(new_password, 12);
    }

    db.prepare(`
      UPDATE users SET
        name = ?, email = ?, phone = ?, bio = ?,
        dietary_preferences = ?, password_hash = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(
      name || user.name,
      email ? email.toLowerCase() : user.email,
      phone || user.phone,
      bio !== undefined ? bio : user.bio,
      dietary_preferences !== undefined ? dietary_preferences : user.dietary_preferences,
      password_hash,
      req.userId
    );

    const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
    res.json({ user: safe(updated) });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Profile update failed.' });
  }
});

module.exports = router;
