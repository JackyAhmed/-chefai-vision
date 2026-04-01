/**
 * App.jsx  —  Updated root component
 *
 * Wraps the app in <AuthProvider>, shows Login/Register until the user
 * is authenticated, then renders the main cooking app with the profile
 * avatar in the navbar.
 *
 * HOW TO USE:
 *   1. Replace your existing App.jsx with this file (or copy the pattern).
 *   2. Put your existing main cooking UI inside <CookingApp />.
 */

import { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { LoginPage, RegisterPage } from './auth/AuthPages';
import { ProfilePanel, UserAvatar } from './auth/ProfilePanel';

// ── Your existing cooking app goes here ────────────────────────────────────
// Replace this placeholder with your real component
function CookingApp() {
  return (
    <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
      🍳 Your cooking app content goes here
    </div>
  );
}

// ── Top navbar with avatar ──────────────────────────────────────────────────
function Navbar() {
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <nav className="h-14 bg-white border-b border-orange-100 flex items-center justify-between px-4 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍳</span>
          <span className="font-bold text-gray-800 text-lg">Cooking Assistant</span>
        </div>

        {/* Profile avatar — clearly visible in top-right */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden sm:block">Hi, {user?.name?.split(' ')[0]}!</span>
          <UserAvatar user={user} size="md" onClick={() => setProfileOpen(true)} />
        </div>
      </nav>

      {profileOpen && <ProfilePanel onClose={() => setProfileOpen(false)} />}
    </>
  );
}

// ── Auth gate ───────────────────────────────────────────────────────────────
function AuthGate() {
  const { user, loading } = useAuth();
  const [authPage, setAuthPage] = useState('login');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🍳</div>
          <p className="text-gray-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return authPage === 'register'
      ? <RegisterPage onNavigate={setAuthPage} />
      : <LoginPage onNavigate={setAuthPage} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <CookingApp />
    </div>
  );
}

// ── Root export ────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
