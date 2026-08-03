import React, { useMemo, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

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

export default function StudentDashboard() {
  const [activeItem, setActiveItem] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [selectedDay, setSelectedDay] = useState('Thu');

  const occupancy = 38;
  const capacity = 50;
  const occupancyPercent = Math.round((occupancy / capacity) * 100);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleNavigate = (item) => {
    setActiveItem(item);
    setSidebarOpen(false);
    if (item !== 'Overview') showToast(`${item} is ready to explore.`);
  };

  return (
    <div className="fithub-app">
      <style>{`
        :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #f6f8fc; color: #182338; }
        button { font: inherit; }
        .fithub-app { --ink: #182338; --muted: #778196; --border: #e8edf5; --blue: #4968e8; --navy: #17233e; min-height: 100vh; background: #f6f8fc; }
        .topbar { align-items: center; background: rgba(255,255,255,.94); border-bottom: 1px solid var(--border); display: flex; height: 76px; justify-content: space-between; left: 258px; padding: 0 42px; position: fixed; right: 0; top: 0; z-index: 20; }
        .topbar-left, .topbar-actions, .profile-menu, .stat-value-row { align-items: center; display: flex; }
        .topbar-left { gap: 25px; }
        .breadcrumb { align-items: center; color: var(--ink); display: flex; font-size: 13px; gap: 10px; }
        .breadcrumb-muted, .breadcrumb-divider { color: #9aa3b5; }
        .icon-button { align-items: center; background: transparent; border: 0; border-radius: 10px; color: #68748b; cursor: pointer; display: inline-flex; height: 38px; justify-content: center; padding: 0; position: relative; transition: .2s ease; width: 38px; }
        .icon-button:hover { background: #f0f3fb; color: var(--blue); }
        .menu-button { display: none; }
        .topbar-actions { gap: 8px; }
        .notification-button { margin-right: 15px; }
        .notification-dot { background: #f07866; border: 2px solid white; border-radius: 50%; height: 8px; position: absolute; right: 7px; top: 7px; width: 8px; }
        .profile-menu { border-left: 1px solid var(--border); gap: 10px; padding-left: 23px; }
        .profile-menu > svg { color: #8e98aa; margin-left: 5px; }
        .profile-copy { display: flex; flex-direction: column; gap: 2px; }
        .profile-copy strong { color: #27344b; font-size: 12px; font-weight: 700; }
        .profile-copy span { color: #99a2b3; font-size: 11px; }
        .avatar { align-items: center; background: #dce5ff; border-radius: 50%; color: #4a62c5; display: inline-flex; font-weight: 800; justify-content: center; }
        .avatar-small { font-size: 11px; height: 36px; width: 36px; }

        .sidebar { background: var(--navy); bottom: 0; color: white; display: flex; flex-direction: column; left: 0; padding: 27px 17px 18px; position: fixed; top: 0; width: 258px; z-index: 30; }
        .brand-lockup { align-items: center; display: flex; gap: 11px; padding: 0 12px; }
        .brand-lockup > div:last-child { display: flex; flex-direction: column; gap: 3px; }
        .brand-lockup strong { color: #fff; font-size: 15px; letter-spacing: -.2px; }
        .brand-lockup span:not(.brand-mark span) { color: #8895b0; font-size: 10px; }
        .brand-mark { align-items: center; background: linear-gradient(145deg, #6688ff, #435dd6); border-radius: 11px; box-shadow: 0 8px 18px rgba(43,70,173,.35); display: flex; height: 38px; justify-content: center; width: 38px; }
        .brand-mark span { color: white; font-size: 12px; font-weight: 900; letter-spacing: -.6px; }
        .sidebar-section-label { color: #687795; font-size: 10px; font-weight: 800; letter-spacing: .12em; margin: 45px 12px 12px; text-transform: uppercase; }
        .sidebar-section-label-spaced { margin-top: 35px; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
        .nav-item { align-items: center; background: transparent; border: 0; border-radius: 10px; color: #97a5c1; cursor: pointer; display: flex; font-size: 12px; gap: 14px; padding: 12px 13px; position: relative; text-align: left; transition: .2s ease; width: 100%; }
        .nav-item:hover { background: rgba(255,255,255,.06); color: #e5eaff; }
        .nav-item.active { background: rgba(87,112,230,.2); color: #fff; font-weight: 700; }
        .nav-item.active svg { color: #91a7ff; }
        .active-indicator { background: #7890ff; border-radius: 2px; height: 19px; position: absolute; right: 0; width: 3px; }
        .sidebar-bottom-card { align-items: center; background: linear-gradient(135deg, rgba(85,110,226,.3), rgba(50,70,139,.15)); border: 1px solid rgba(141,158,255,.12); border-radius: 12px; display: flex; gap: 9px; margin: auto 5px 15px; padding: 12px 10px; }
        .mini-card-icon { align-items: center; background: rgba(133,154,255,.18); border-radius: 8px; color: #aabdff; display: flex; height: 29px; justify-content: center; width: 29px; }
        .sidebar-bottom-card > div:nth-child(2) { display: flex; flex: 1; flex-direction: column; gap: 3px; }
        .sidebar-bottom-card strong { color: #e9edff; font-size: 11px; }
        .sidebar-bottom-card span { color: #96a5d0; font-size: 9px; }
        .sidebar-bottom-card > svg { color: #96a5d0; }
        .sidebar-footer { color: #60708f; font-size: 9px; padding: 0 8px; }
        .sidebar-footer span { color: #8491ac; padding: 0 3px; }
        .sidebar-overlay { display: none; }

        .main-content { margin-left: 258px; min-height: 100vh; padding: 76px 42px 45px; }
        .dashboard-container { margin: 0 auto; max-width: 1390px; }
        .welcome-row { align-items: flex-end; display: flex; justify-content: space-between; padding: 38px 1px 28px; }
        .eyebrow { color: #7c89a0; font-size: 11px; font-weight: 700; letter-spacing: .08em; margin: 0 0 9px; text-transform: uppercase; }
        .welcome-row h1 { color: var(--ink); font-size: clamp(24px, 3vw, 30px); letter-spacing: -.8px; line-height: 1.15; margin: 0; }
        .welcome-row h1 span { color: var(--blue); }
        .welcome-copy { color: #8994a6; font-size: 12px; margin: 9px 0 0; }
        .date-chip { align-items: center; background: #fff; border: 1px solid var(--border); border-radius: 9px; color: #7c879a; display: flex; font-size: 11px; gap: 9px; padding: 10px 13px; }
        .date-chip svg { color: #6a80e3; }
        .grid-4 { display: grid; gap: 15px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .stat-card { background: #fff; border: 1px solid var(--border); border-radius: 12px; min-height: 150px; padding: 18px 18px 16px; }
        .stat-icon { align-items: center; border-radius: 9px; display: flex; height: 35px; justify-content: center; margin-bottom: 15px; width: 35px; }
        .stat-icon.blue { background: #e8edff; color: #536fe5; }
        .stat-icon.orange { background: #fff0e2; color: #ed984b; }
        .stat-icon.violet { background: #f0eafd; color: #8a6bd4; }
        .stat-icon.green { background: #e4f7f0; color: #3aa77b; }
        .stat-label { color: #7c879a; font-size: 11px; }
        .stat-value-row { gap: 10px; margin-top: 4px; }
        .stat-value-row strong { color: #202c43; font-size: 25px; letter-spacing: -.7px; }
        .trend { align-items: center; color: #3aa77b; display: inline-flex; font-size: 10px; font-weight: 700; gap: 2px; }
        .stat-detail { color: #a1a9b8; font-size: 10px; margin-top: 3px; }
        .content-grid { display: grid; gap: 15px; grid-template-columns: minmax(0, 1.25fr) minmax(300px, .75fr); margin-top: 15px; }
        .panel { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 22px; }
        .panel-header { align-items: flex-start; display: flex; justify-content: space-between; }
        .panel-title { color: #253149; font-size: 14px; font-weight: 800; margin: 0; }
        .panel-subtitle { color: #9ca5b4; font-size: 10px; margin: 5px 0 0; }
        .panel-link { align-items: center; background: transparent; border: 0; color: #5b73dc; cursor: pointer; display: inline-flex; font-size: 10px; gap: 5px; padding: 3px; }

        .occupancy-panel { min-height: 225px; }
        .occupancy-status { align-items: center; display: flex; gap: 7px; }
        .status-dot { background: #48bc8d; border-radius: 50%; box-shadow: 0 0 0 4px #e5f7ef; height: 7px; width: 7px; }
        .occupancy-status span:last-child { color: #3ea77e; font-size: 10px; font-weight: 800; }
        .occupancy-main { align-items: center; display: flex; gap: 30px; margin-top: 27px; }
        .occupancy-ring { align-items: center; background: conic-gradient(#5772e7 ${occupancyPercent * 3.6}deg, #eef1f7 0); border-radius: 50%; display: flex; height: 128px; justify-content: center; position: relative; width: 128px; }
        .occupancy-ring:before { background: #fff; border-radius: 50%; content: ''; height: 102px; position: absolute; width: 102px; }
        .ring-copy { align-items: center; display: flex; flex-direction: column; position: relative; }
        .ring-copy strong { color: #253149; font-size: 28px; letter-spacing: -1px; line-height: 1; }
        .ring-copy span { color: #99a3b3; font-size: 10px; margin-top: 5px; }
        .occupancy-copy { flex: 1; }
        .occupancy-copy h3 { color: #26334b; font-size: 15px; margin: 0 0 7px; }
        .occupancy-copy p { color: #8d98aa; font-size: 11px; line-height: 1.6; margin: 0; max-width: 300px; }
        .occupancy-copy strong { color: #29354a; }
        .occupancy-note { align-items: center; color: #9aa4b4; display: flex; font-size: 10px; gap: 6px; margin-top: 17px; }
        .occupancy-note svg { color: #93a0b6; }
        .chart-panel { min-height: 225px; }
        .chart-legend { align-items: center; color: #94a0b1; display: flex; font-size: 10px; gap: 6px; }
        .legend-dot { background: #6c85ee; border-radius: 50%; height: 6px; width: 6px; }
        .bars { align-items: flex-end; display: flex; gap: 14px; height: 130px; margin-top: 25px; padding: 0 4px; }
        .bar-column { align-items: center; cursor: pointer; display: flex; flex: 1; flex-direction: column; height: 100%; justify-content: flex-end; }
        .bar-track { align-items: flex-end; background: #f1f3f8; border-radius: 6px 6px 3px 3px; display: flex; height: 105px; overflow: hidden; width: 100%; }
        .bar-fill { background: linear-gradient(180deg, #758bf2, #536fe5); border-radius: 6px 6px 3px 3px; min-height: 7px; transition: .25s ease; width: 100%; }
        .bar-column:hover .bar-fill, .bar-column.selected .bar-fill { background: linear-gradient(180deg, #304fc7, #6c85ee); }
        .bar-label { color: #9da6b6; font-size: 9px; margin-top: 9px; }
        .bar-column.selected .bar-label { color: #5069d9; font-weight: 800; }

        .quick-actions { display: grid; gap: 10px; grid-template-columns: repeat(3, 1fr); margin-top: 15px; }
        .quick-action { align-items: center; background: #fff; border: 1px solid var(--border); border-radius: 12px; cursor: pointer; display: flex; gap: 11px; min-height: 76px; padding: 13px 15px; text-align: left; transition: .2s ease; }
        .quick-action:hover { border-color: #cfd8fb; box-shadow: 0 8px 22px rgba(44,64,125,.06); transform: translateY(-1px); }
        .quick-action-icon { align-items: center; border-radius: 9px; display: flex; flex: 0 0 35px; height: 35px; justify-content: center; }
        .quick-action-icon.blue { background: #e8edff; color: #536fe5; }
        .quick-action-icon.orange { background: #fff0e2; color: #e79442; }
        .quick-action-icon.green { background: #e4f7f0; color: #32a276; }
        .quick-action-copy { display: flex; flex: 1; flex-direction: column; gap: 4px; }
        .quick-action-copy strong { color: #2a354c; font-size: 11px; }
        .quick-action-copy small { color: #9ba4b3; font-size: 9px; }
        .quick-action-arrow { color: #a1aaba; }
        .lower-grid { display: grid; gap: 15px; grid-template-columns: minmax(0, 1.25fr) minmax(300px, .75fr); margin-top: 15px; }
        .upcoming-list { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
        .upcoming-item { align-items: center; display: flex; gap: 12px; }
        .event-date { align-items: center; background: #f1f3ff; border-radius: 8px; display: flex; flex: 0 0 39px; flex-direction: column; height: 42px; justify-content: center; }
        .event-date.violet { background: #f1edff; color: #8269d2; }
        .event-date.blue { background: #eaf0ff; color: #5b76e2; }
        .event-date.orange { background: #fff1e4; color: #e7994e; }
        .event-date strong { font-size: 14px; line-height: 1; }
        .event-date span { font-size: 7px; font-weight: 800; margin-top: 3px; }
        .event-copy { display: flex; flex: 1; flex-direction: column; gap: 4px; }
        .event-copy strong { color: #303b51; font-size: 11px; }
        .event-copy span { color: #9aa4b4; font-size: 9px; }
        .event-type { border-radius: 5px; font-size: 8px; font-weight: 800; padding: 5px 7px; }
        .event-type.violet { background: #f4f1ff; color: #8269d2; }
        .event-type.blue { background: #eef3ff; color: #5c77de; }
        .event-type.orange { background: #fff5ea; color: #dd9147; }
        .equipment-list { display: flex; flex-direction: column; gap: 16px; margin-top: 21px; }
        .equipment-row { align-items: center; display: flex; gap: 10px; }
        .equipment-row > svg { color: #8591a6; }
        .equipment-copy { flex: 1; }
        .equipment-copy strong { color: #354057; display: block; font-size: 10px; font-weight: 700; margin-bottom: 6px; }
        .progress-track { background: #eff2f7; border-radius: 4px; height: 5px; overflow: hidden; width: 100%; }
        .progress-fill { border-radius: 4px; height: 100%; }
        .progress-fill.green { background: #51bd91; }.progress-fill.orange { background: #f0a159; }.progress-fill.red { background: #ed7c77; }
        .equipment-count { color: #8994a6; font-size: 9px; white-space: nowrap; }
        .equipment-count strong { color: #38445b; font-size: 11px; }
        .toast { align-items: center; background: #25345d; border-radius: 9px; bottom: 25px; box-shadow: 0 10px 30px rgba(23,35,62,.2); color: #fff; display: flex; font-size: 11px; gap: 8px; left: 50%; padding: 12px 16px; position: fixed; transform: translateX(-50%); z-index: 100; }
        .toast svg { color: #8fa6ff; }

        @media (max-width: 1100px) { .topbar { padding: 0 25px; } .main-content { padding-left: 25px; padding-right: 25px; } .occupancy-main { gap: 20px; } .bars { gap: 8px; } }
        @media (max-width: 850px) { .sidebar { box-shadow: 12px 0 30px rgba(11,21,49,.12); transform: translateX(-100%); transition: transform .25s ease; } .sidebar.is-open { transform: translateX(0); } .sidebar-overlay.is-visible { background: rgba(17,27,52,.35); bottom: 0; display: block; left: 0; position: fixed; right: 0; top: 0; z-index: 25; } .topbar { left: 0; } .menu-button { display: inline-flex; } .main-content { margin-left: 0; } .grid-4 { grid-template-columns: repeat(2, 1fr); } .content-grid, .lower-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .topbar { height: 66px; padding: 0 16px; } .breadcrumb { display: none; } .profile-copy, .profile-menu > svg { display: none; } .profile-menu { border: 0; padding-left: 0; } .notification-button { margin-right: 3px; } .main-content { padding: 66px 15px 28px; } .welcome-row { align-items: flex-start; flex-direction: column; gap: 17px; padding: 27px 0 22px; } .date-chip { align-self: stretch; justify-content: center; } .grid-4, .quick-actions { grid-template-columns: 1fr 1fr; } .quick-action { padding: 12px; } .quick-action-copy small { display: none; } .quick-action-arrow { display: none; } .panel { padding: 17px; } .occupancy-main { align-items: flex-start; flex-direction: column; gap: 20px; } .occupancy-ring { align-self: center; } .occupancy-copy { width: 100%; } .bars { gap: 6px; } .panel-link { font-size: 9px; } }
        @media (max-width: 390px) { .grid-4 { gap: 8px; } .stat-card { padding: 13px; } .stat-value-row strong { font-size: 22px; } .quick-actions { gap: 8px; } }
      `}</style>

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
        onNotificationClick={() => showToast('You have 3 new updates.')}
        onSearch={() => showToast('Search is ready for your workouts and classes.')}
      />
      <Sidebar activeItem={activeItem} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={handleNavigate} />

      <main className="main-content">
        <div className="dashboard-container">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">Tuesday, 18 June 2024</p>
              <h1>{greeting}, <span>Arif</span> <span aria-label="wave" role="img">👋</span></h1>
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
                <div className="occupancy-status"><span className="status-dot" /><span>Open now</span></div>
              </div>
              <div className="occupancy-main">
                <div className="occupancy-ring"><div className="ring-copy"><strong>{occupancy}</strong><span>of {capacity} students</span></div></div>
                <div className="occupancy-copy"><h3>Plenty of room right now</h3><p>The gym is at <strong>{occupancyPercent}% capacity</strong>. You can check in without waiting.</p><div className="occupancy-note"><Icon name="clock" size={14} /> Usually busiest between 5:00 - 7:00 PM</div></div>
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
            <QuickAction description="Track your sets and progress" icon="plus" onClick={() => showToast('Workout logger opened.')} title="Log a workout" tone="blue" />
            <QuickAction description="Find a class that fits" icon="calendar" onClick={() => showToast('Showing upcoming classes.')} title="Book a class" tone="orange" />
            <QuickAction description="See what is free right now" icon="dumbbell" onClick={() => showToast('Equipment availability refreshed.')} title="Check equipment" tone="green" />
          </section>

          <section className="lower-grid">
            <article className="panel">
              <div className="panel-header"><div><h2 className="panel-title">Upcoming for you</h2><p className="panel-subtitle">Your plan for the next few days</p></div><button className="panel-link" onClick={() => showToast('Your full schedule is ready.')} type="button">View calendar <Icon name="arrowRight" size={13} /></button></div>
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
      </main>

      {toast && <div className="toast"><Icon name="check" size={15} /> {toast}</div>}
    </div>
  );
}
