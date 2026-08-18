import React, { createContext, useContext, useMemo, useState } from 'react';
import { getSession, setSession, clearSession } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  const value = useMemo(() => ({
    user,
    login: (nextUser) => { setSession(nextUser); setUser(nextUser); },
    logout: () => { clearSession(); setUser(null); },
    updateUser: (nextUser) => { setSession(nextUser); setUser(nextUser); },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
