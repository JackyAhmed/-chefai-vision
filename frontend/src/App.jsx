import React, { useEffect, useState } from 'react';
import CookingAssistant from './CookingAssistant';
import LoginPage    from './pages/LoginPage';
import SignupPage   from './pages/SignupPage';
import ProfilePage  from './pages/ProfilePage';
import RecipesPage  from './pages/RecipesPage';
import GeneratePage from './pages/GeneratePage';
import { apiMe, apiLogout, getToken } from './pages/shared';

const PAGE_KEY = 'chefai_page';

export default function App() {
  const [page,    setPage]    = useState('login');
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true); // checking saved session

  // ── Restore session from saved JWT on first load ─────────────────────────
  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }

    apiMe()
      .then((u) => {
        setUser(u);
        const saved = localStorage.getItem(PAGE_KEY);
        setPage(['recipes', 'generate', 'profile', 'app'].includes(saved) ? saved : 'recipes');
      })
      .catch(() => {
        // Token expired or invalid — clear it and show login
        apiLogout();
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Persist current page ─────────────────────────────────────────────────
  useEffect(() => {
    if (user) localStorage.setItem(PAGE_KEY, page);
  }, [page, user]);

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleLogin  = (u) => { setUser(u); setPage('recipes'); };
  const handleSignup = (u) => { setUser(u); setPage('recipes'); };
  const handleLogout = ()  => { apiLogout(); setUser(null); setPage('login'); localStorage.removeItem(PAGE_KEY); };

  // ── Loading splash ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#94a3b8', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🍳</div>
          <div>Loading ChefAI Vision…</div>
        </div>
      </div>
    );
  }

  // ── Not logged in ─────────────────────────────────────────────────────────
  if (!user) {
    if (page === 'signup') return <SignupPage onSignup={handleSignup} onGoLogin={() => setPage('login')} />;
    return <LoginPage onLogin={handleLogin} onGoSignup={() => setPage('signup')} />;
  }

  // ── Recipes dashboard ─────────────────────────────────────────────────────
  if (page === 'recipes') {
    return (
      <RecipesPage
        user={user}
        onLogout={handleLogout}
        onGoProfile={() => setPage('profile')}
        onGoGenerate={() => setPage('generate')}
        onStartRecipe={() => setPage('app')}
      />
    );
  }

  // ── Recipe planner ────────────────────────────────────────────────────────
  if (page === 'generate') {
    return (
      <GeneratePage
        user={user}
        onLogout={handleLogout}
        onGoRecipes={() => setPage('recipes')}
        onGoProfile={() => setPage('profile')}
      />
    );
  }

  // ── Profile ───────────────────────────────────────────────────────────────
  if (page === 'profile') {
    return (
      <ProfilePage
        user={user}
        onUpdateUser={(u) => setUser(u)}
        onLogout={handleLogout}
        onGoRecipes={() => setPage('recipes')}
        onGoGenerate={() => setPage('generate')}
      />
    );
  }

  // ── Main cooking assistant ────────────────────────────────────────────────
  return (
    <div>
      {/* Floating back button */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999 }}>
        <button
          onClick={() => setPage('recipes')}
          style={{
            padding: '0.75rem 1.1rem',
            borderRadius: 999,
            background: 'rgba(245,158,11,0.92)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            boxShadow: '0 12px 30px rgba(0,0,0,0.28)',
          }}
        >
          ← Dashboard
        </button>
      </div>
      <CookingAssistant />
    </div>
  );
}
