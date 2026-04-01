import React, { useState } from 'react';
import { shellStyles, apiLogin } from './shared';

export default function LoginPage({ onLogin, onGoSignup }) {
  const [identifier, setIdentifier] = useState('');
  const [password,   setPassword]   = useState('');
  const [error,      setError]      = useState('');
  const [loading,    setLoading]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await apiLogin(identifier.trim(), password);
      onLogin(user);
    } catch (err) {
      setError(err.message || 'Login failed. Check your details and try again.');
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
          <h1 style={{ fontSize: 32, margin: '0 0 8px' }}>Sign in</h1>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6, fontSize: '0.9rem' }}>
            Enter your email and password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <input
            style={shellStyles.input}
            type="email"
            placeholder="Email address"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            style={shellStyles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && <div style={shellStyles.errorBox}>{error}</div>}

          <button
            type="submit"
            style={{ ...shellStyles.button, opacity: loading ? 0.7 : 1, width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onGoSignup}
            style={{ background: 'none', border: 'none', color: '#fbbf24', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}
