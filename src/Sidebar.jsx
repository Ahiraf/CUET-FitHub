import React from 'react';

const defaultNavItems = [
  { label: 'Overview', icon: 'grid' },
  { label: 'My workout', icon: 'dumbbell' },
  { label: 'Exercises', icon: 'activity' },
  { label: 'Classes', icon: 'calendar' },
  { label: 'Trainers', icon: 'users' },
  { label: 'Progress', icon: 'chart' },
];

const defaultSupportItems = [
  { label: 'Help center', icon: 'help' },
  { label: 'Settings', icon: 'settings' },
];

const iconPaths = {
  activity: 'M3 12h4l2-7 4 14 2-7h6',
  arrow: 'M5 12h13m-5-5 5 5-5 5',
  calendar: 'M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  chart: 'M5 20V10m7 10V4m7 16v-7',
  clipboard: 'M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Zm-1 2H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2m-8 6h8m-8 4h5',
  dumbbell: 'M6 8v8m12-8v8M3 10v4m18-4v4M6 12h12',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  help: 'M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4m.1 3h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.4-3.5 1.3-1-.9-2.1-1.6.2a7 7 0 0 0-1.2-1.2l.2-1.6-2.1-.9-1 1.3a7 7 0 0 0-1.7 0l-1-1.3-2.1.9.2 1.6A7 7 0 0 0 8.3 9l-1.6-.2-.9 2.1 1.3 1a7 7 0 0 0 0 1.7l-1.3 1 .9 2.1 1.6-.2a7 7 0 0 0 1.2 1.2l-.2 1.6 2.1.9 1-1.3a7 7 0 0 0 1.7 0l1 1.3 2.1-.9-.2-1.6a7 7 0 0 0 1.2-1.2l1.6.2.9-2.1-1.3-1a7 7 0 0 0 0-1.7Z',
  ticket: 'M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Zm10-2v12',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-3a4 4 0 0 1 0 7.7M22 21v-2a4 4 0 0 0-3-3.9',
};

function Icon({ name, size = 19, strokeWidth = 1.8 }) {
  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d={iconPaths[name] || iconPaths.grid} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
  );
}

export default function Sidebar({
  activeItem = 'Overview',
  onNavigate,
  isOpen = false,
  onClose,
  navItems = defaultNavItems,
  supportItems = defaultSupportItems,
  subtitle = 'Student wellness',
  bottomCard = { icon: 'activity', title: 'Keep moving', subtitle: '12-day streak active' },
  footerNote = 'Made for the CUET community',
}) {
  return (
    <>
      <div aria-hidden="true" className={`sidebar-overlay ${isOpen ? 'is-visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><span>CF</span></div>
          <div>
            <strong>CUET FitHub</strong>
            <span>{subtitle}</span>
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
          {supportItems.map((item) => (
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

        <div className="sidebar-bottom-card">
          <div className="mini-card-icon"><Icon name={bottomCard.icon} size={16} /></div>
          <div>
            <strong>{bottomCard.title}</strong>
            <span>{bottomCard.subtitle}</span>
          </div>
          <Icon name="arrow" size={17} />
        </div>

        <div className="sidebar-footer">{footerNote} <span>·</span> v1.0</div>
      </aside>
    </>
  );
}
