/**
 * shared.js — API helpers + shared styles
 *
 * All auth calls go through the backend now.
 * No more localStorage user store — the backend + JWT handles it.
 */

const API_BASE = (
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:3001'
).replace(/\/$/, '');

// ── Token storage ──────────────────────────────────────────────────────────
export const getToken  = ()        => localStorage.getItem('chefai_token');
export const setToken  = (tok)     => localStorage.setItem('chefai_token', tok);
export const clearToken = ()       => localStorage.removeItem('chefai_token');

// ── Generic fetch with auth header ────────────────────────────────────────
export async function apiFetch(path, opts = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ── Auth API calls ─────────────────────────────────────────────────────────
export async function apiLogin(identifier, password) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
  setToken(data.token);
  return data.user;
}

export async function apiRegister({ name, email, password, level, bio }) {
  const data = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  setToken(data.token);
  return data.user;
}

export async function apiMe() {
  const data = await apiFetch('/api/auth/me');
  return data.user;
}

export async function apiUpdateProfile(updates) {
  const data = await apiFetch('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return data.user;
}

export function apiLogout() {
  clearToken();
}

// ── Shared UI styles ───────────────────────────────────────────────────────
export const shellStyles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
    color: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: '24px',
    boxSizing: 'border-box',
  },
  card: {
    background: 'rgba(15, 23, 42, 0.85)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
    borderRadius: 20,
    boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
    backdropFilter: 'blur(10px)',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid rgba(148, 163, 184, 0.22)',
    background: 'rgba(15, 23, 42, 0.9)',
    color: '#f8fafc',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
  },
  button: {
    padding: '12px 16px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    transition: 'opacity 0.2s',
  },
  secondaryButton: {
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid rgba(148, 163, 184, 0.22)',
    background: 'rgba(30, 41, 59, 0.85)',
    color: '#e2e8f0',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
  },
  navButton: {
    padding: '10px 14px',
    borderRadius: 12,
    border: '1px solid rgba(148, 163, 184, 0.18)',
    background: 'rgba(30, 41, 59, 0.85)',
    color: '#e2e8f0',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
  },
  errorBox: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 10,
    padding: '10px 14px',
    color: '#fca5a5',
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
};
