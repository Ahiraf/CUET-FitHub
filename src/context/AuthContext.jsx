import React, { createContext, useContext, useMemo, useState } from 'react';
import api, { getStoredSession, setStoredSession, clearStoredSession } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getStoredSession());
  const user = session?.user || null;

  const value = useMemo(() => ({
    user,
    signIn: async (credentials, portal) => {
      const adminPortal = portal === 'admin';
      const result = await (adminPortal ? api.adminLogin(credentials) : api.login(credentials));
      if ((result.user.role === 'admin') !== adminPortal)
        throw new Error(adminPortal ? 'This portal is for administrators only.' : 'Administrators must sign in through /admin.');
      setStoredSession(result);
      setSession(result);
      return result.user;
    },
    signUp: async (dto) => {
      const result = await api.register(dto);
      setStoredSession(result);
      setSession(result);
      return result.user;
    },
    logout: () => { clearStoredSession(); setSession(null); },
    updateUser: (nextUser) => {
      const next = { token: session?.token, user: nextUser };
      setStoredSession(next);
      setSession(next);
    },
  }), [user, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
