import React from 'react';

const navItems = [
  { label: 'Overview', icon: 'grid' },
  { label: 'My workout', icon: 'dumbbell' },
  { label: 'Exercises', icon: 'activity' },
  { label: 'Classes', icon: 'calendar' },
  { label: 'Trainers', icon: 'users' },
  { label: 'Progress', icon: 'chart' },
];

const iconPaths = {
  activity: 'M3 12h4l2-7 4 14 2-7h6',
  arrow: 'M5 12h13m-5-5 5 5-5 5',
  calendar: 'M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  chart: 'M5 20V10m7 10V4m7 16v-7',
  dumbbell: 'M6 8v8m12-8v8M3 10v4m18-4v4M6 12h12',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  help: 'M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4m.1 3h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.4-3.5 1.3-1-.9-2.1-1.6.2a7 7 0 0 0-1.2-1.2l.2-1.6-2.1-.9-1 1.3a7 7 0 0 0-1.7 0l-1-1.3-2.1.9.2 1.6A7 7 0 0 0 8.3 9l-1.6-.2-.9 2.1 1.3 1a7 7 0 0 0 0 1.7l-1.3 1 .9 2.1 1.6-.2a7 7 0 0 0 1.2 1.2l-.2 1.6 2.1.9 1-1.3a7 7 0 0 0 1.7 0l1 1.3 2.1-.9-.2-1.6a7 7 0 0 0 1.2-1.2l1.6.2.9-2.1-1.3-1a7 7 0 0 0 0-1.7Z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-3a4 4 0 0 1 0 7.7M22 21v-2a4 4 0 0 0-3-3.9',
};

function Icon({ name, size = 19, strokeWidth = 1.8 }) {
  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d={iconPaths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
  );
}
export default function Sidebar({ activeItem = 'Overview', onNavigate, isOpen = false, onClose }) {
  return (
    <>
      <div aria-hidden="true" className={`sidebar-overlay ${isOpen ? 'is-visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><span>CF</span></div>
          <div>
            <strong>CUET FitHub</strong>
            <span>Student wellness</span>
          </div>
        </div>

        <div className="sidebar-section-label">Main menu</div>
        <nav aria-label="Main navigation" className="sidebar-nav">
          {navItems.map((item) => (
            <button
              className={`nav-item ${activeItem === item.label ? 'active' : ''}`}
              key={item.label}
              onClick={() => onNavigate?.(item.label)}
              type="button"
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {activeItem === item.label && <span className="active-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-section-label sidebar-section-label-spaced">Support</div>
        <nav aria-label="Support navigation" className="sidebar-nav">
          <button className="nav-item" onClick={() => onNavigate?.('Help center')} type="button">
            <Icon name="help" />
            <span>Help center</span>
          </button>
          <button className="nav-item" onClick={() => onNavigate?.('Settings')} type="button">
            <Icon name="settings" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom-card">
          <div className="mini-card-icon"><Icon name="activity" size={16} /></div>
          <div>
            <strong>Keep moving</strong>
            <span>12-day streak active</span>
          </div>
          <Icon name="arrow" size={17} />
        </div>

        <div className="sidebar-footer">Made for the CUET community <span>·</span> v1.0</div>
      </aside>
    </>
  );
}
