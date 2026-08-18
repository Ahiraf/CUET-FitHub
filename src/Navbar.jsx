import React from 'react';
import Icon from './Icon';

export function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'CF';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Navbar({ user, breadcrumb = 'Dashboard', onMenuClick, onSearch, onNotificationClick, onLogout }) {
  const name = user?.name || 'CUET Student';
  const subtitle = user?.subtitle || 'CUET FitHub member';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button aria-label="Open navigation" className="icon-button menu-button" onClick={onMenuClick} type="button">
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
        <button aria-label="Notifications" className="icon-button notification-button" onClick={onNotificationClick} type="button">
          <Icon name="bell" size={20} />
          <span className="notification-dot" />
        </button>
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
