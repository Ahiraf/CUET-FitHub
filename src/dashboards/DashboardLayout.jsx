import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getRoleConfig } from './config';
import AIChat from '../components/AIChat';
import api from '../api';
import '../styles/dashboard.css';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const { section } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return undefined;
    let alive = true;
    api.getNotifications?.().then((items) => { if (alive) setNotifications(items || []); }).catch(() => {});
    return () => { alive = false; };
  }, [user?.email]);

  // Not signed in → bounce to login.
  if (!user) return <Navigate to="/login" replace />;
  const config = getRoleConfig(user.role);
  const allItems = [...config.nav, ...config.support];

  // Unknown section → land on the role's first page.
  if (!section) return <Navigate to="/dashboard/overview" replace />;
  const active = allItems.find((i) => i.slug === section);
  if (!active) return <Navigate to="/dashboard/overview" replace />;

  const PageComponent = active.component;
  const roleLabel = user.role === 'trainer' ? 'Trainer' : 'Student';
  const navUser = { ...user, subtitle: `${user.department ? user.department + ' · ' : ''}${roleLabel}` };

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
        notifications={notifications}
        unreadNotifications={notifications.filter((item) => !item.read).length}
        onNotificationClick={async () => { setNotifications((items) => items.map((item) => ({ ...item, read: true }))); await api.markNotificationsRead?.(notifications.map((item) => item.id)); showToast('Notifications marked as read.'); }}
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
      {section !== 'ai-coach' && <AIChat />}
      <Footer variant="app" />
    </div>
  );
}
