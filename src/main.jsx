import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from './LandingPage';
import StudentDashboard from './StudentDashboard';
import './index.css';

function App() {
  const [page, setPage] = useState('landing');

  return page === 'landing' ? <LandingPage onOpenDashboard={() => setPage('dashboard')} /> : <StudentDashboard />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
