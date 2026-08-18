import React, { useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getRoleConfig } from './config';
import '../styles/dashboard.css';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const { section } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Not signed in → bounce to login.
  if (!user) return <Navigate to="/login" replace />;

  const config = getRoleConfig(user.role);
  const allItems = [...config.nav, ...config.support];

  // Unknown section → land on the role's first page.
  if (!section) return <Navigate to="/dashboard/overview" replace />;
  const active = allItems.find((i) => i.slug === section);
  if (!active) return <Navigate to="/dashboard/overview" replace />;

  const PageComponent = active.component;
  const roleLabel = user.role === 'trainer' ? 'Trainer' : user.role === 'admin' ? 'Admin' : 'Student';
  const navUser = { ...user, subtitle: `${user.dept ? user.dept + ' · ' : ''}${roleLabel}` };

  const go = (item) => {
    navigate(`/dashboard/${item.slug}`);
    setSidebarOpen(false);
  };

  return (
    <div className="fithub-app">
      <Navbar
        user={navUser}
        breadcrumb={active.slug === 'overview' ? config.breadcrumbBase : active.label}
        onLogout={() => { logout(); navigate('/login'); }}
        onMenuClick={() => setSidebarOpen(true)}
        onNotificationClick={() => showToast('You have 3 new updates.')}
        onSearch={() => go(config.nav[Math.min(1, config.nav.length - 1)])}
      />
      <Sidebar
        activeItem={active.label}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={go}
        navItems={config.nav}
        supportItems={config.support}
        subtitle={config.subtitle}
        bottomCard={config.bottomCard}
      />
      <main className="main-content">
        <PageComponent />
      </main>
    </div>
  );
}
