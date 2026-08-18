import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './Login';
import Register from './Register';
import LandingPage from './LandingPage';
import StudentDashboard from './StudentDashboard';
import TrainerDashboard from './TrainerDashboard';
import { loadJSON, saveJSON, removeKey } from './store';
import './index.css';

function App() {
  const [user, setUser] = useState(() => loadJSON('session', null));
  const [page, setPage] = useState('login');

  const login = (nextUser) => {
    saveJSON('session', nextUser);
    setUser(nextUser);
  };

  const logout = () => {
    removeKey('session');
    setUser(null);
    setPage('login');
  };

  const updateUser = (nextUser) => {
    saveJSON('session', nextUser);
    setUser(nextUser);
  };

  // Signed in — route by role.
  if (user) {
    return user.role === 'trainer'
      ? <TrainerDashboard user={user} onLogout={logout} onUpdateUser={updateUser} />
      : <StudentDashboard user={user} onLogout={logout} onUpdateUser={updateUser} />;
  }

  // Signed out — auth + marketing flows.
  if (page === 'landing') {
    return <LandingPage onOpenDashboard={() => setPage('login')} />;
  }

  if (page === 'register') {
    return (
      <Register
        onRegister={login}
        onOpenLogin={() => setPage('login')}
        onBack={() => setPage('landing')}
      />
    );
  }

  return (
    <Login
      onLogin={login}
      onOpenRegister={() => setPage('register')}
      onBack={() => setPage('landing')}
    />
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
