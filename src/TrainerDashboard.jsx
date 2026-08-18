import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import Icon from './Icon';
import { initials } from './Navbar';
import { DASHBOARD_CSS } from './dashboardStyles';
import { trainerMembers, bookingRequests, gymClasses, exerciseLibrary, sampleRoutine } from './data';

const navItems = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Members', icon: 'users' },
  { label: 'Routines', icon: 'clipboard' },
  { label: 'Classes', icon: 'calendar' },
  { label: 'Bookings', icon: 'ticket' },
];

const statusTone = { 'On track': 'green', 'Needs nudge': 'orange', 'At risk': 'red' };

function StatCard({ icon, label, value, detail, accent }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${accent}`}><Icon name={icon} size={19} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value-row"><strong>{value}</strong></div>
      <div className="stat-detail">{detail}</div>
    </article>
  );
}

function Members({ showToast }) {
  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Your athletes</p>
        <h1>Members</h1>
        <p className="page-sub">Students following your routines. Keep an eye on adherence and nudge anyone falling behind.</p>
      </header>
      <div className="list">
        {trainerMembers.map((m) => (
          <div className="list-row" key={m.name}>
            <span className="row-icon">{initials(m.name)}</span>
            <div className="row-main"><strong>{m.name}</strong><span>{m.dept} · {m.plan}</span></div>
            <div style={{ width: 150 }}>
              <div className="progress-track"><div className={`progress-fill ${m.adherence >= 70 ? 'green' : m.adherence >= 50 ? 'orange' : 'red'}`} style={{ width: `${m.adherence}%` }} /></div>
              <div style={{ color: '#93a0b6', fontSize: 9, marginTop: 5 }}>{m.adherence}% adherence</div>
            </div>
            <span className={`tag ${statusTone[m.status]}`}>{m.status}</span>
            <button className="btn sm ghost" onClick={() => showToast(`Message sent to ${m.name}.`)} type="button">Nudge</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Routines({ showToast }) {
  const [routine, setRoutine] = useState(sampleRoutine);
  const [assignee, setAssignee] = useState(trainerMembers[0].name);

  const remove = (name) => setRoutine(routine.filter((r) => r.name !== name));
  const add = (name) => {
    if (routine.some((r) => r.name === name)) return;
    setRoutine([...routine, { name, target: '3 × 10' }]);
    showToast(`${name} added to routine.`);
  };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Programming</p>
        <h1>Routines</h1>
        <p className="page-sub">Build a workout routine and assign it to a member. They'll be able to follow and check it off.</p>
      </header>

      <section className="content-grid" style={{ gridTemplateColumns: 'minmax(0, 1.3fr) minmax(280px, .7fr)' }}>
        <article className="panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Current routine</h2><p className="panel-subtitle">{routine.length} exercises</p></div>
          </div>
          <div className="list" style={{ marginTop: 14 }}>
            {routine.map((r, i) => (
              <div className="list-row" key={r.name}>
                <span className="row-icon" style={{ background: '#eef2ff' }}>{i + 1}</span>
                <div className="row-main"><strong>{r.name}</strong><span>{r.target}</span></div>
                <button className="panel-link" onClick={() => remove(r.name)} type="button">Remove</button>
              </div>
            ))}
            {routine.length === 0 && <div className="empty-state"><Icon name="clipboard" size={24} /> Add exercises from the library.</div>}
          </div>

          <div className="form-grid" style={{ gridTemplateColumns: '1fr auto', alignItems: 'end', marginTop: 18 }}>
            <div className="field">
              <label htmlFor="assignee">Assign to</label>
              <select id="assignee" className="select" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                {trainerMembers.map((m) => <option key={m.name}>{m.name}</option>)}
              </select>
            </div>
            <button className="btn" disabled={routine.length === 0} onClick={() => showToast(`Routine assigned to ${assignee}.`)} type="button">
              <Icon name="check" size={14} /> Assign routine
            </button>
          </div>
        </article>

        <article className="panel" style={{ alignSelf: 'flex-start' }}>
          <h2 className="panel-title">Exercise library</h2>
          <p className="panel-subtitle">Tap to add to the routine</p>
          <div className="list" style={{ marginTop: 14 }}>
            {exerciseLibrary.slice(0, 8).map((ex) => (
              <div className="list-row" key={ex.name}>
                <span className="row-icon"><Icon name="dumbbell" size={17} /></span>
                <div className="row-main"><strong>{ex.name}</strong><span>{ex.muscle}</span></div>
                <button className="btn sm" onClick={() => add(ex.name)} type="button"><Icon name="plus" size={13} /></button>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function TrainerClasses({ showToast }) {
  const led = gymClasses.filter((c) => ['Tanvir Ahmed', 'Nusrat Jahan', 'Rakib Hasan'].includes(c.coach));
  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Sessions you run</p>
        <h1>Classes</h1>
        <p className="page-sub">Manage the group sessions you lead and see how many students have signed up.</p>
      </header>
      <div className="card-grid">
        {led.map((c) => {
          const pct = Math.round((c.filled / c.spots) * 100);
          return (
            <article className="info-card" key={c.id}>
              <div className="ic-head">
                <span className="ic-avatar" style={{ background: '#eef2ff', color: '#556fe0' }}><Icon name="calendar" size={20} /></span>
                <div><h4>{c.title}</h4><div className="ic-role">{c.day} · {c.time}</div></div>
                <span className={`tag ${c.color}`} style={{ marginLeft: 'auto' }}>{c.type}</span>
              </div>
              <div>
                <div className="progress-track"><div className={`progress-fill ${pct >= 100 ? 'red' : 'blue'}`} style={{ width: `${pct}%` }} /></div>
                <div style={{ color: '#93a0b6', fontSize: 10, marginTop: 6 }}>{c.filled} / {c.spots} enrolled</div>
              </div>
              <div className="ic-foot">
                <span style={{ color: '#9aa4b4', fontSize: 10 }}>Coach: you</span>
                <button className="btn sm ghost" onClick={() => showToast(`Attendance for ${c.title} opened.`)} type="button">Take attendance</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Bookings({ showToast }) {
  const [rows, setRows] = useState(bookingRequests.map((b) => ({ ...b })));
  const set = (name, status) => {
    setRows(rows.map((r) => (r.name === name ? { ...r, status } : r)));
    showToast(`${status === 'Confirmed' ? 'Confirmed' : 'Declined'} session with ${name}.`);
  };
  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Personal training</p>
        <h1>Bookings</h1>
        <p className="page-sub">One-on-one session requests from students. Confirm or decline based on your availability.</p>
      </header>
      <div className="list">
        {rows.map((b) => (
          <div className="list-row" key={b.name}>
            <span className="row-icon">{initials(b.name)}</span>
            <div className="row-main"><strong>{b.name}</strong><span>{b.dept} · {b.goal}</span></div>
            <div className="row-meta"><strong>{b.slot}</strong><span>requested</span></div>
            {b.status === 'Pending' ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn sm ghost" onClick={() => set(b.name, 'Declined')} type="button">Decline</button>
                <button className="btn sm" onClick={() => set(b.name, 'Confirmed')} type="button">Confirm</button>
              </div>
            ) : (
              <span className={`tag ${b.status === 'Confirmed' ? 'green' : 'red'}`}>{b.status}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrainerDashboard({ user, onLogout, onUpdateUser }) {
  const [activeItem, setActiveItem] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');

  const firstName = (user?.name || '').trim().split(/\s+/)[0] || 'Coach';
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleNavigate = (item) => {
    setActiveItem(item);
    setSidebarOpen(false);
  };

  const navUser = { ...user, subtitle: 'Trainer · CUET FitHub' };
  const pendingCount = bookingRequests.filter((b) => b.status === 'Pending').length;

  const renderOverview = () => (
    <div className="dashboard-container">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">{today}</p>
          <h1>Welcome back, <span>{firstName}</span> 🏋️</h1>
          <p className="welcome-copy">Here&apos;s how your athletes and sessions are looking today.</p>
        </div>
        <div className="date-chip"><Icon name="ticket" size={15} /> {pendingCount} booking requests pending</div>
      </section>

      <section className="grid-4">
        <StatCard accent="blue" detail="Following your plans" icon="users" label="Active members" value={String(trainerMembers.length)} />
        <StatCard accent="orange" detail="Across the week" icon="calendar" label="Classes led" value="4" />
        <StatCard accent="violet" detail="1-on-1 sessions" icon="clock" label="Sessions this week" value="12" />
        <StatCard accent="green" detail="Across all members" icon="target" label="Avg. adherence" value="68%" />
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Members needing attention</h2><p className="panel-subtitle">Lowest adherence this week</p></div>
            <button className="panel-link" onClick={() => handleNavigate('Members')} type="button">All members <Icon name="arrowRight" size={13} /></button>
          </div>
          <div className="list" style={{ marginTop: 14 }}>
            {[...trainerMembers].sort((a, b) => a.adherence - b.adherence).slice(0, 3).map((m) => (
              <div className="list-row" key={m.name}>
                <span className="row-icon">{initials(m.name)}</span>
                <div className="row-main"><strong>{m.name}</strong><span>{m.dept} · {m.plan}</span></div>
                <span className={`tag ${statusTone[m.status]}`}>{m.status}</span>
                <button className="btn sm ghost" onClick={() => showToast(`Message sent to ${m.name}.`)} type="button">Nudge</button>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Pending bookings</h2><p className="panel-subtitle">Awaiting your confirmation</p></div>
            <button className="panel-link" onClick={() => handleNavigate('Bookings')} type="button">Manage <Icon name="arrowRight" size={13} /></button>
          </div>
          <div className="upcoming-list">
            {bookingRequests.filter((b) => b.status === 'Pending').map((b) => (
              <div className="upcoming-item" key={b.name}>
                <div className="event-date blue"><strong>{b.slot.split(' ')[0]}</strong><span>{b.slot.split(' ').slice(1).join(' ')}</span></div>
                <div className="event-copy"><strong>{b.name}</strong><span>{b.goal}</span></div>
                <span className="event-type blue">1-on-1</span>
              </div>
            ))}
            {pendingCount === 0 && <div className="empty-state"><Icon name="check" size={24} /> All caught up!</div>}
          </div>
        </article>
      </section>
    </div>
  );

  const renderPage = () => {
    switch (activeItem) {
      case 'Members': return <Members showToast={showToast} />;
      case 'Routines': return <Routines showToast={showToast} />;
      case 'Classes': return <TrainerClasses showToast={showToast} />;
      case 'Bookings': return <Bookings showToast={showToast} />;
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
        breadcrumb={activeItem === 'Overview' ? 'Trainer dashboard' : activeItem}
        onLogout={onLogout}
        onMenuClick={() => setSidebarOpen(true)}
        onNotificationClick={() => showToast(`${pendingCount} booking requests pending.`)}
        onSearch={() => handleNavigate('Members')}
      />
      <Sidebar
        activeItem={activeItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
        navItems={navItems}
        subtitle="Trainer workspace"
        bottomCard={{ icon: 'users', title: 'Your athletes', subtitle: `${trainerMembers.length} members active` }}
      />

      <main className="main-content">
        {renderPage()}
      </main>

      {toast && <div className="toast"><Icon name="check" size={15} /> {toast}</div>}
    </div>
  );
}
