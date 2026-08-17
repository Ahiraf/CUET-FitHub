import Login from './Login';
import Register from './Register';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from './LandingPage';
import StudentDashboard from './StudentDashboard';
import './index.css';

function App() {
  const [page, setPage] = useState('login');

  if (page === 'landing') {
    return <LandingPage onOpenDashboard={() => setPage('dashboard')} />;
  }

  if (page === 'register') {
    return (
      <Register
        onRegister={() => setPage('dashboard')}
        onOpenLogin={() => setPage('login')}
        onBack={() => setPage('landing')}
      />
    );
  }

  if (page === 'dashboard') {
    return <StudentDashboard />;
  }

  return (
    <Login
      onLogin={() => setPage('dashboard')}
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
