import React, { useState } from 'react';
import { shellStyles, apiRegister } from './shared';

export default function SignupPage({ onSignup, onGoLogin }) {
  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const user = await apiRegister({
        name:     form.name.trim(),
        email:    form.email.trim(),
        password: form.password,
      });
      onSignup(user);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ ...shellStyles.page, display: 'grid', placeItems: 'center' }}>
      <div style={{ ...shellStyles.card, width: '100%', maxWidth: 460, padding: 32 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#fbbf24', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            ChefAI Vision
          </div>
          <h1 style={{ fontSize: 32, margin: '0 0 8px' }}>Create account</h1>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6, fontSize: '0.9rem' }}>
            Your data is stored securely on the backend.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <input
            style={shellStyles.input}
            placeholder="Full name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
            autoComplete="name"
          />
          <input
            style={shellStyles.input}
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            required
            autoComplete="email"
          />
          <input
            style={shellStyles.input}
            type="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            required
            autoComplete="new-password"
          />
          <input
            style={shellStyles.input}
            type="password"
            placeholder="Confirm password"
            value={form.confirm}
            onChange={(e) => update('confirm', e.target.value)}
            required
            autoComplete="new-password"
          />

          {error && <div style={shellStyles.errorBox}>{error}</div>}

          <button
            type="submit"
            style={{ ...shellStyles.button, opacity: loading ? 0.7 : 1, width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={onGoLogin}
            style={{ background: 'none', border: 'none', color: '#fbbf24', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
