import React, { useEffect, useRef, useState } from 'react';
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

export default function DashboardLayout({ portal = 'dashboard' }) {
  const { user, logout } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const { section } = useParams();
  const mobileQuery = '(max-width: 850px)';
  const [sidebarOpen, setSidebarOpen] = useState(() => !window.matchMedia(mobileQuery).matches);
  const [sidebarWidth, setSidebarWidth] = useState(258);
  const menuButton = useRef(null);
  const closeSidebar = () => {
    setSidebarOpen(false);
    requestAnimationFrame(() => menuButton.current?.focus());
  };

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const resize = event => setSidebarOpen(!event.matches);
    media.addEventListener('change', resize);
    return () => media.removeEventListener('change', resize);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const escape = event => {
      if (event.key === 'Escape') closeSidebar();
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [sidebarOpen]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return undefined;
    let alive = true;
    const loadNotifications = () => api.getNotifications?.()
      .then((items) => { if (alive) setNotifications(items || []); })
      .catch(() => {});
    loadNotifications();
    const timer = window.setInterval(loadNotifications, 30000);
    return () => { alive = false; window.clearInterval(timer); };
  }, [user?.email]);

  // Not signed in → bounce to login.
  if (!user) return <Navigate to="/login" replace />;
  if (portal === 'admin' && user.role !== 'admin') return <Navigate to="/admin" replace />;
  if (portal !== 'admin' && user.role === 'admin') return <Navigate to="/admin/overview" replace />;
  const config = getRoleConfig(user.role);
  const allItems = [...config.nav, ...config.support];

  // Unknown section → land on the role's first page.
  if (!section) return <Navigate to={`/${portal}/overview`} replace />;
  const active = allItems.find((i) => i.slug === section);
  if (!active) return <Navigate to={`/${portal}/overview`} replace />;

  const PageComponent = active.component;
  const roleLabel = user.role === 'trainer' ? 'Trainer' : user.role === 'admin' ? 'Admin' : 'Student';
  const navUser = { ...user, subtitle: `${user.department ? user.department + ' · ' : ''}${roleLabel}` };

  const go = (item) => {
    navigate(`/${portal}/${item.slug}`);
    if (window.matchMedia(mobileQuery).matches) closeSidebar();
  };

  return (
    <div className="fithub-app" data-role={user.role} data-sidebar-open={sidebarOpen} style={{ '--sidebar-width': `${sidebarWidth}px` }}>
      <Navbar
        user={navUser}
        breadcrumb={active.slug === 'overview' ? config.breadcrumbBase : active.label}
        onLogout={() => { logout(); navigate(portal === 'admin' ? '/admin' : '/login'); }}
        menuButton={menuButton}
        sidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
        notifications={notifications}
        unreadNotifications={notifications.filter((item) => !item.read).length}
        onNotificationClick={async () => {
          const latest = await api.getNotifications?.().catch(() => null);
          if (latest) setNotifications(latest);
          setNotifications((items) => items.map((item) => ({ ...item, read: true })));
          await api.markNotificationsRead?.(notifications.map((item) => item.id));
          showToast('Notifications marked as read.');
        }}
        onSearch={() => go(config.nav[Math.min(1, config.nav.length - 1)])}
      />
      <Sidebar
        activeItem={active.label}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        width={sidebarWidth}
        onResize={value => setSidebarWidth(Math.max(225, Math.min(340, value)))}
        onNavigate={go}
        navItems={config.nav}
        supportItems={config.support}
        subtitle={config.subtitle}
        bottomCard={config.bottomCard}
      />
      <main className="main-content">
        <PageComponent />
      </main>
      {portal === 'dashboard' && section !== 'ai-coach' && <AIChat />}
      <Footer variant="app" />
    </div>
  );
}
