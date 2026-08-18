import React from 'react';
import Icon from './Icon';

export default function Sidebar({
  activeItem = 'Overview',
  onNavigate,
  isOpen = false,
  onClose,
  navItems = [],
  supportItems = [],
  subtitle = 'Student wellness',
  bottomCard = { icon: 'activity', title: 'Keep moving', subtitle: '12-day streak active' },
  footerNote = 'Made for the CUET community',
}) {
  const renderItem = (item) => (
    <button
      aria-current={activeItem === item.label ? 'page' : undefined}
      className={`nav-item ${activeItem === item.label ? 'active' : ''}`}
      key={item.label}
      onClick={() => onNavigate?.(item)}
      type="button"
    >
      <Icon name={item.icon} size={19} />
      <span>{item.label}</span>
      {activeItem === item.label && <span className="active-indicator" />}
    </button>
  );

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
          {navItems.map(renderItem)}
        </nav>

        {supportItems.length > 0 && (
          <>
            <div className="sidebar-section-label">Support</div>
            <nav aria-label="Support navigation" className="sidebar-nav">
              {supportItems.map(renderItem)}
            </nav>
          </>
        )}

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
