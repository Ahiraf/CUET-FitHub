import React, { useMemo, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Workout from './components/Workout';
import Exercises from './pages/Exercises';
import Classes from './pages/Classes';
import TrainersPage from './pages/TrainersPage';
import ProgressPage from './pages/ProgressPage';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import { DASHBOARD_CSS } from './dashboardStyles';
import { GYM_CAPACITY } from './data';

const weeklyActivity = [
  { day: 'Mon', value: 58 },
  { day: 'Tue', value: 76 },
  { day: 'Wed', value: 46 },
  { day: 'Thu', value: 88 },
  { day: 'Fri', value: 63 },
  { day: 'Sat', value: 35 },
  { day: 'Sun', value: 12 },
];

const equipment = [
  { name: 'Power racks', available: 3, total: 4, tone: 'green' },
  { name: 'Treadmills', available: 6, total: 8, tone: 'green' },
  { name: 'Cable machines', available: 1, total: 3, tone: 'orange' },
  { name: 'Bench press', available: 0, total: 2, tone: 'red' },
];

const upcoming = [
  { date: '18', month: 'JUN', title: 'Upper body strength', meta: 'Today · 6:30 PM', type: 'Workout', color: 'violet' },
  { date: '20', month: 'JUN', title: 'Functional fitness', meta: 'Friday · 5:00 PM', type: 'Class', color: 'blue' },
  { date: '22', month: 'JUN', title: 'Lower body + core', meta: 'Sunday · 7:00 AM', type: 'Workout', color: 'orange' },
];

const iconPaths = {
  activity: 'M3 12h4l2-7 4 14 2-7h6',
  arrowUp: 'M5 15l5-5 3 3 6-7M15 6h4v4',
  arrowRight: 'M5 12h13m-5-5 5 5-5 5',
  bolt: 'm13 2-9 12h7l-1 8 9-12h-7l1-8Z',
  calendar: 'M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  check: 'm5 12 4 4L19 6',
  clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  dumbbell: 'M6 8v8m12-8v8M3 10v4m18-4v4M6 12h12',
  fire: 'M12 22c4 0 7-2.8 7-6.8 0-2.7-1.4-5-3.8-7.2.1 2.2-1 3.3-2.1 4.1.2-4.4-1.7-7-5.2-10.1.1 4.5-3 6.7-3 10.1C3.9 17.1 7.1 22 12 22Z',
  info: 'M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  play: 'm10 8 6 4-6 4V8Z',
  plus: 'M12 5v14M5 12h14',
  target: 'M12 12h.01M19.1 4.9a10 10 0 1 1-14.2 0M16.3 7.7a6 6 0 1 1-8.6 0',
};

function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d={iconPaths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
  );
}

function StatCard({ icon, label, value, detail, accent, trend }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${accent}`}><Icon name={icon} size={19} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value-row">
        <strong>{value}</strong>
        {trend && <span className="trend"><Icon name="arrowUp" size={13} /> {trend}</span>}
      </div>
      <div className="stat-detail">{detail}</div>
    </article>
  );
}

function QuickAction({ icon, title, description, tone, onClick }) {
  return (
    <button className="quick-action" onClick={onClick} type="button">
      <span className={`quick-action-icon ${tone}`}><Icon name={icon} size={20} /></span>
      <span className="quick-action-copy"><strong>{title}</strong><small>{description}</small></span>
      <span className="quick-action-arrow"><Icon name="arrowRight" size={17} /></span>
    </button>
  );
}

export default function StudentDashboard({ user, onLogout, onUpdateUser }) {
  const [activeItem, setActiveItem] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [selectedDay, setSelectedDay] = useState('Thu');

  const occupancy = 38;
  const capacity = GYM_CAPACITY;
  const occupancyPercent = Math.round((occupancy / capacity) * 100);
  const isFull = occupancy >= capacity;

  const firstName = (user?.name || '').trim().split(/\s+/)[0] || 'there';

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const today = useMemo(() => new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), []);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleNavigate = (item) => {
    setActiveItem(item);
    setSidebarOpen(false);
  };

  const navUser = { ...user, subtitle: `${user?.dept ? user.dept + ' · ' : ''}Student` };

  const renderOverview = () => (
    <div className="dashboard-container">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">{today}</p>
          <h1>{greeting}, <span>{firstName}</span> <span aria-label="wave" role="img">👋</span></h1>
          <p className="welcome-copy">Ready to make today count? Here&apos;s your fitness snapshot.</p>
        </div>
        <div className="date-chip"><Icon name="calendar" size={15} /> Last synced today at 09:42 AM</div>
      </section>

      <section aria-label="Your fitness summary" className="grid-4">
        <StatCard accent="blue" detail="+2 from last week" icon="activity" label="Workouts completed" trend="12%" value="08" />
        <StatCard accent="orange" detail="Best: 14 day streak" icon="fire" label="Current streak" trend="4 days" value="12 days" />
        <StatCard accent="violet" detail="Across 8 workouts" icon="bolt" label="Total active time" trend="8%" value="06h 40m" />
        <StatCard accent="green" detail="Your best: 85 kg" icon="target" label="Personal best" trend="New" value="92 kg" />
      </section>

      <section className="content-grid">
        <article className="panel occupancy-panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Live gym occupancy</h2><p className="panel-subtitle">Real-time capacity for the CUET gym</p></div>
            <div className={`occupancy-status ${isFull ? 'full' : ''}`}><span className={`status-dot ${isFull ? 'red' : ''}`} /><span>{isFull ? 'Gym full' : 'Open now'}</span></div>
          </div>
          <div className="occupancy-main">
            <div className="occupancy-ring" style={{ '--ring-deg': `${occupancyPercent * 3.6}deg` }}><div className="ring-copy"><strong>{occupancy}</strong><span>of {capacity} students</span></div></div>
            <div className="occupancy-copy"><h3>{isFull ? 'The gym is at capacity' : 'Plenty of room right now'}</h3><p>The gym is at <strong>{occupancyPercent}% capacity</strong>. {isFull ? 'Please wait for it to clear before heading over.' : 'You can check in without waiting.'}</p><div className="occupancy-note"><Icon name="clock" size={14} /> Usually busiest between 5:00 - 7:00 PM</div></div>
          </div>
        </article>

        <article className="panel chart-panel">
          <div className="panel-header"><div><h2 className="panel-title">Weekly activity</h2><p className="panel-subtitle">Minutes active per day</p></div><div className="chart-legend"><span className="legend-dot" /> This week</div></div>
          <div aria-label="Weekly activity chart" className="bars">
            {weeklyActivity.map((item) => <button aria-label={`${item.day}: ${item.value} minutes`} className={`bar-column ${selectedDay === item.day ? 'selected' : ''}`} key={item.day} onClick={() => setSelectedDay(item.day)} type="button"><span className="bar-track"><span className="bar-fill" style={{ height: `${item.value}%` }} /></span><span className="bar-label">{item.day}</span></button>)}
          </div>
        </article>
      </section>

      <section aria-label="Quick actions" className="quick-actions">
        <QuickAction description="Track your sets and progress" icon="plus" onClick={() => handleNavigate('My workout')} title="Log a workout" tone="blue" />
        <QuickAction description="Find a class that fits" icon="calendar" onClick={() => handleNavigate('Classes')} title="Book a class" tone="orange" />
        <QuickAction description="See what is free right now" icon="dumbbell" onClick={() => handleNavigate('Exercises')} title="Browse exercises" tone="green" />
      </section>

      <section className="lower-grid">
        <article className="panel">
          <div className="panel-header"><div><h2 className="panel-title">Upcoming for you</h2><p className="panel-subtitle">Your plan for the next few days</p></div><button className="panel-link" onClick={() => handleNavigate('Classes')} type="button">View classes <Icon name="arrowRight" size={13} /></button></div>
          <div className="upcoming-list">
            {upcoming.map((event) => <div className="upcoming-item" key={event.title}><div className={`event-date ${event.color}`}><strong>{event.date}</strong><span>{event.month}</span></div><div className="event-copy"><strong>{event.title}</strong><span><Icon name="clock" size={11} /> {event.meta}</span></div><span className={`event-type ${event.color}`}>{event.type}</span></div>)}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header"><div><h2 className="panel-title">Equipment availability</h2><p className="panel-subtitle">Updated 2 minutes ago</p></div><button className="panel-link" onClick={() => showToast('Equipment list refreshed.')} type="button">Refresh <Icon name="arrowRight" size={13} /></button></div>
          <div className="equipment-list">
            {equipment.map((item) => <div className="equipment-row" key={item.name}><Icon name="dumbbell" size={16} /><div className="equipment-copy"><strong>{item.name}</strong><div className="progress-track"><div className={`progress-fill ${item.tone}`} style={{ width: `${(item.available / item.total) * 100}%` }} /></div></div><div className="equipment-count"><strong>{item.available}</strong>/{item.total} free</div></div>)}
          </div>
        </article>
      </section>
    </div>
  );

  const renderPage = () => {
    switch (activeItem) {
      case 'My workout': return <Workout />;
      case 'Exercises': return <Exercises user={user} showToast={showToast} />;
      case 'Classes': return <Classes user={user} showToast={showToast} />;
      case 'Trainers': return <TrainersPage user={user} showToast={showToast} />;
      case 'Progress': return <ProgressPage user={user} />;
      case 'Settings': return <Settings user={user} onUpdateUser={onUpdateUser} showToast={showToast} />;
      case 'Help center': return <HelpCenter showToast={showToast} />;
      default: return renderOverview();
    }
  };

  return (
    <div className="fithub-app">
      <style>{DASHBOARD_CSS}</style>

      <Navbar
        user={navUser}
        breadcrumb={activeItem === 'Overview' ? 'Student dashboard' : activeItem}
        onLogout={onLogout}
        onMenuClick={() => setSidebarOpen(true)}
        onNotificationClick={() => showToast('You have 3 new updates.')}
        onSearch={() => handleNavigate('Exercises')}
      />
      <Sidebar activeItem={activeItem} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={handleNavigate} />

      <main className="main-content">
        {renderPage()}
      </main>

      {toast && <div className="toast"><Icon name="check" size={15} /> {toast}</div>}
    </div>
  );
}
