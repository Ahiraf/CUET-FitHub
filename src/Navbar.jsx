import React from 'react';

const iconPaths = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  search: 'm21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
  chevron: 'm6 9 6 6 6-6',
};

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={iconPaths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
  );
}
export default function Navbar({ onMenuClick, onSearch, onNotificationClick }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button aria-label="Open navigation" className="icon-button menu-button" onClick={onMenuClick} type="button">
          <Icon name="menu" />
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-muted">Workspace</span>
          <span className="breadcrumb-divider">/</span>
          <strong>Student dashboard</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button aria-label="Search" className="icon-button" onClick={onSearch} type="button">
          <Icon name="search" />
        </button>
        <button aria-label="Notifications" className="icon-button notification-button" onClick={onNotificationClick} type="button">
          <Icon name="bell" />
          <span className="notification-dot" />
        </button>
        <div className="profile-menu">
          <div className="avatar avatar-small">AS</div>
          <div className="profile-copy">
            <strong>Arif Siam</strong>
            <span>Student · CSE 22</span>
          </div>
          <Icon name="chevron" size={16} />
        </div>
      </div>
    </header>
  );
}
