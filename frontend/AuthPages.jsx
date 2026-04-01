/**
 * AuthPages.jsx
 * Exports <LoginPage /> and <RegisterPage />
 * Both share the same visual shell; swap by prop.
 */

import { useState } from 'react';
import { useAuth } from './AuthContext';

const API = '/api/auth';

// ── Shared input ───────────────────────────────────────────────────────────
function Field({ label, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
      />
    </div>
  );
}

// ── Shell ──────────────────────────────────────────────────────────────────
function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg mb-4">
            <span className="text-3xl">🍳</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-orange-100 p-8">
          {children}
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-6">{footer}</p>
      </div>
    </div>
  );
}

// ── Register ───────────────────────────────────────────────────────────────
export function RegisterPage({ onNavigate }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function set(field) { return v => setForm(f => ({ ...f, [field]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (!form.email && !form.phone) { setError('Enter at least an email or phone number.'); return; }
    setBusy(true);
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email || undefined,
          phone: form.phone || undefined,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Registration failed.'); return; }
      login(data);
    } catch {
      setError('Network error. Is the server running?');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join the cooking community"
      footer={<>Already have an account? <button onClick={() => onNavigate('login')} className="text-orange-500 font-semibold hover:underline">Sign in</button></>}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Full Name" value={form.name} onChange={set('name')} placeholder="Jane Smith" required />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" />
          <Field label="Phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+880 17..." />
        </div>
        <p className="text-xs text-gray-400 -mt-2">Provide at least one of email or phone.</p>

        <Field label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Min 6 characters" required />
        <Field label="Confirm Password" type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" required />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-base shadow-md hover:shadow-lg hover:from-orange-500 hover:to-amber-600 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy ? 'Creating account…' : 'Create Account'}
        </button>
      </form>
    </AuthShell>
  );
}

// ── Login ──────────────────────────────────────────────────────────────────
export function LoginPage({ onNavigate }) {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed.'); return; }
      login(data);
    } catch {
      setError('Network error. Is the server running?');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back!"
      subtitle="Sign in to your cooking assistant"
      footer={<>Don't have an account? <button onClick={() => onNavigate('register')} className="text-orange-500 font-semibold hover:underline">Sign up free</button></>}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field
          label="Email or Phone"
          value={identifier}
          onChange={setIdentifier}
          placeholder="jane@example.com or +880 17..."
          required
        />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" required />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-base shadow-md hover:shadow-lg hover:from-orange-500 hover:to-amber-600 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </AuthShell>
  );
}
