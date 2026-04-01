import React, { useState } from 'react';
import { shellStyles, apiUpdateProfile } from './shared';

export default function ProfilePage({ user, onUpdateUser, onLogout, onGoRecipes, onGoGenerate }) {
  const [form, setForm]       = useState({
    name:             user?.name  || '',
    email:            user?.email || '',
    bio:              user?.bio   || '',
    current_password: '',
    new_password:     '',
  });
  const [message,  setMessage]  = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (form.new_password && form.new_password.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name:  form.name,
        email: form.email,
        bio:   form.bio,
        ...(form.new_password ? {
          current_password: form.current_password,
          new_password:     form.new_password,
        } : {}),
      };
      const updated = await apiUpdateProfile(payload);
      onUpdateUser(updated);
      setMessage('Profile saved successfully.');
      setForm((prev) => ({ ...prev, current_password: '', new_password: '' }));
    } catch (err) {
      setError(err.message || 'Could not save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={shellStyles.page}>
      {/* Nav */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        <button onClick={onGoRecipes}  style={shellStyles.navButton}>← Dashboard</button>
        <button onClick={onGoGenerate} style={shellStyles.navButton}>Recipe Planner</button>
        <button onClick={onLogout}     style={shellStyles.secondaryButton}>Logout</button>
      </div>

      <div style={{ ...shellStyles.card, maxWidth: 600, padding: 28 }}>
        <h1 style={{ marginTop: 0, fontSize: 28 }}>Your Profile</h1>

        <form onSubmit={handleSave} style={{ display: 'grid', gap: 14 }}>
          <label style={{ color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Name</label>
          <input style={shellStyles.input} value={form.name}  onChange={(e) => update('name',  e.target.value)} placeholder="Full name" />

          <label style={{ color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email</label>
          <input style={shellStyles.input} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email" />

          <label style={{ color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Bio</label>
          <textarea
            style={{ ...shellStyles.input, minHeight: 100, resize: 'vertical' }}
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            placeholder="Tell us about yourself…"
          />

          <div style={{ borderTop: '1px solid rgba(148,163,184,0.12)', paddingTop: 14, marginTop: 4 }}>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>
              Change Password (optional)
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              <input
                style={shellStyles.input}
                type="password"
                placeholder="Current password"
                value={form.current_password}
                onChange={(e) => update('current_password', e.target.value)}
                autoComplete="current-password"
              />
              <input
                style={shellStyles.input}
                type="password"
                placeholder="New password (min 6 characters)"
                value={form.new_password}
                onChange={(e) => update('new_password', e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>

          {error   && <div style={shellStyles.errorBox}>{error}</div>}
          {message && <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '10px 14px', color: '#86efac', fontSize: '0.875rem' }}>{message}</div>}

          <button
            type="submit"
            style={{ ...shellStyles.button, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
