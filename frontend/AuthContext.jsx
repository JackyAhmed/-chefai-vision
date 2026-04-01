/**
 * AuthContext.jsx
 * Provides { user, token, login, logout, updateUser, loading } to the whole app.
 * Token is persisted in localStorage so sessions survive page refreshes.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API = '/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('ca_token'));
  const [loading, setLoading] = useState(true);

  // On mount or token change: verify the stored token with the backend
  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch(`${API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(({ user }) => setUser(user))
      .catch(() => {
        localStorage.removeItem('ca_token');
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = useCallback(({ token: t, user: u }) => {
    localStorage.setItem('ca_token', t);
    setToken(t);
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ca_token');
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback(u => setUser(u), []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Convenience: returns Authorization header object or {} */
export function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
