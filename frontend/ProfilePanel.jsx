/**
 * ProfilePanel.jsx
 * Slide-in profile / settings panel.
 * Shows user info, avatar, dietary prefs, and lets user update their profile.
 */

import { useState, useEffect } from 'react';
import { useAuth, authHeader } from './AuthContext';

const API = '/api/auth';

const DIETARY_OPTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
  'Keto', 'Halal', 'Kosher', 'Nut-Free', 'Low-Sodium',
];

// ── Avatar ─────────────────────────────────────────────────────────────────
export function UserAvatar({ user, size = 'md', onClick }) {
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
  };

  return (
    <button
      onClick={onClick}
      title={user?.name || 'Profile'}
      className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition flex-shrink-0`}
    >
      {initials}
    </button>
  );
}

// ── Profile panel ──────────────────────────────────────────────────────────
export function ProfilePanel({ onClose }) {
  const { user, token, logout, updateUser } = useAuth();
  const [tab, setTab] = useState('info'); // 'info' | 'security'
  const [form, setForm] = useState({
    name: '', email: '', phone: '', bio: '', dietary_preferences: '',
    current_password: '', new_password: '', confirm_password: '',
  });
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text }

  useEffect(() => {
    if (user) {
      const diets = user.dietary_preferences ? user.dietary_preferences.split(',').map(s => s.trim()) : [];
      setSelectedDiets(diets);
      setForm(f => ({
        ...f,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        dietary_preferences: user.dietary_preferences || '',
      }));
    }
  }, [user]);

  function set(field) { return v => setForm(f => ({ ...f, [field]: v })); }

  function toggleDiet(d) {
    setSelectedDiets(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  }

  async function saveProfile(e) {
    e.preventDefault();
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch(`${API}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(token) },
        body: JSON.stringify({
          name: form.name,
          email: form.email || undefined,
          phone: form.phone || undefined,
          bio: form.bio,
          dietary_preferences: selectedDiets.join(', '),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setMessage({ type: 'error', text: data.error }); return; }
      updateUser(data.user);
      setMessage({ type: 'success', text: 'Profile updated!' });
    } catch {
      setMessage({ type: 'error', text: 'Network error.' });
    } finally {
      setBusy(false);
    }
  }

  async function savePassword(e) {
    e.preventDefault();
    setMessage(null);
    if (form.new_password !== form.confirm_password) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`${API}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(token) },
        body: JSON.stringify({
          current_password: form.current_password,
          new_password: form.new_password,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setMessage({ type: 'error', text: data.error }); return; }
      updateUser(data.user);
      setForm(f => ({ ...f, current_password: '', new_password: '', confirm_password: '' }));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Network error.' });
    } finally {
      setBusy(false);
    }
  }

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden animate-slide-in-right">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-8 flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl leading-none">✕</button>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              {user?.email && <p className="text-orange-100 text-sm">{user.email}</p>}
              {user?.phone && <p className="text-orange-100 text-sm">{user.phone}</p>}
              <p className="text-orange-200 text-xs mt-1">
                Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : '—'}
              </p>
            </div>
          </div>
          {user?.bio && <p className="text-orange-50 text-sm mt-3 italic">"{user.bio}"</p>}
          {selectedDiets.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {selectedDiets.map(d => (
                <span key={d} className="px-2.5 py-0.5 bg-white/20 text-white text-xs rounded-full">{d}</span>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 flex-shrink-0">
          {[{ id: 'info', label: '👤 Profile' }, { id: 'security', label: '🔒 Security' }].map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setMessage(null); }}
              className={`flex-1 py-3 text-sm font-medium transition ${tab === t.id ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6">

          {message && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
              <span>{message.text}</span>
            </div>
          )}

          {tab === 'info' && (
            <form onSubmit={saveProfile} className="flex flex-col gap-4">
              <InputField label="Full Name" value={form.name} onChange={set('name')} required />
              <InputField label="Email" type="email" value={form.email} onChange={set('email')} placeholder="optional" />
              <InputField label="Phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="optional" />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={e => set('bio')(e.target.value)}
                  placeholder="Tell us about your cooking style…"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400 resize-none text-sm transition"
                />
              </div>

              {/* Dietary preferences */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Dietary Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDiet(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${selectedDiets.includes(d) ? 'bg-orange-400 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold shadow hover:shadow-md active:scale-95 transition disabled:opacity-60"
              >
                {busy ? 'Saving…' : 'Save Profile'}
              </button>
            </form>
          )}

          {tab === 'security' && (
            <form onSubmit={savePassword} className="flex flex-col gap-4">
              <p className="text-sm text-gray-500">Change your password below. Leave blank if you don't want to change it.</p>
              <InputField label="Current Password" type="password" value={form.current_password} onChange={set('current_password')} required />
              <InputField label="New Password" type="password" value={form.new_password} onChange={set('new_password')} placeholder="Min 6 characters" required />
              <InputField label="Confirm New Password" type="password" value={form.confirm_password} onChange={set('confirm_password')} required />

              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold shadow hover:shadow-md active:scale-95 transition disabled:opacity-60"
              >
                {busy ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 pt-0 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 active:scale-95 transition text-sm"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared field ───────────────────────────────────────────────────────────
function InputField({ label, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400 text-sm transition"
      />
    </div>
  );
}
