import React from 'react';
import { createRoot } from 'react-dom/client';
import StudentDashboard from './StudentDashboard';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudentDashboard />
  </React.StrictMode>,
);
