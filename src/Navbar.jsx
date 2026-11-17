import React from 'react';
import Icon from './Icon';

export function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'CF';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Navbar({ user, breadcrumb = 'Dashboard', onMenuClick, menuButton, sidebarOpen, onSearch, onNotificationClick, onLogout, notifications = [], unreadNotifications = 0 }) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const popover = React.useRef(null);
  const bell = React.useRef(null);
  React.useEffect(() => {
    if (!showNotifications) return;
    const dismiss = event => {
      if (!popover.current?.contains(event.target)) setShowNotifications(false);
    };
    const escape = event => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        bell.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [showNotifications]);
  const name = user?.name || 'CUET Student';
  const subtitle = user?.subtitle || 'CUET FitHub member';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button ref={menuButton} aria-controls="workspace-sidebar" aria-expanded={sidebarOpen} aria-label="Open navigation" className="icon-button menu-button" onClick={onMenuClick} type="button">
          <Icon name="menu" size={20} />
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-muted">Workspace</span>
          <span className="breadcrumb-divider">/</span>
          <strong>{breadcrumb}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button aria-label="Search" className="icon-button" onClick={onSearch} type="button">
          <Icon name="search" size={20} />
        </button>
        <div className="notification-wrap" ref={popover}>
        <button ref={bell} aria-expanded={showNotifications} aria-controls="notification-feed" aria-label="Notifications" className="icon-button notification-button" onClick={() => { setShowNotifications((open) => !open); if (!showNotifications) onNotificationClick?.(); }} type="button">
          <Icon name="bell" size={20} />
          {unreadNotifications > 0 && <span className="notification-dot" />}
        </button>
        {showNotifications && <section id="notification-feed" aria-label="Notifications" className="notification-popover">
          <div className="notification-popover-head"><strong><Icon name="bell" size={19} /> Notifications</strong>{unreadNotifications > 0 && <span>{unreadNotifications} new</span>}</div>
          {notifications.length === 0 && <p className="notification-empty">Nothing new yet.</p>}
          {notifications.map((item) => <div className={`notification-item ${item.read ? '' : 'unread'}`} key={item.id}><span className={`notification-icon ${item.type === 'maintenance' ? 'maintenance' : ''}`}><Icon name={item.type === 'maintenance' ? 'wrench' : 'megaphone'} size={18} /></span><div><strong>{item.title}</strong><p>{item.body}</p></div></div>)}
        </section>}
        </div>
        <div className="profile-menu">
          <div className="avatar avatar-small">{initials(name)}</div>
          <div className="profile-copy">
            <strong>{name}</strong>
            <span>{subtitle}</span>
          </div>
          <Icon name="chevron" size={16} />
        </div>
        {onLogout && (
          <button className="logout-button" onClick={onLogout} type="button"><Icon name="logout" size={14} /> Log out</button>
        )}
      </div>
    </header>
  );
}
