import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { StatCard, QuickAction, HourBars } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getOccupancy, toggleCheckIn } from '../api';
import { weeklyActivity, equipmentInventory, upcoming, hourlyOccupancy } from '../data';

export default function Overview() {
  const { user } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('Thu');
  const [occ, setOcc] = useState(() => getOccupancy(user));

  const firstName = (user?.name || '').trim().split(/\s+/)[0] || 'there';
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  }, []);
  const today = useMemo(() => new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), []);
  const peakHour = useMemo(() => hourlyOccupancy.reduce((a, b) => (b.value > a.value ? b : a)).hour, []);

  const handleCheckIn = () => {
    if (!occ.checkedIn && occ.full) { showToast('The gym is at capacity — please wait.'); return; }
    const next = toggleCheckIn(user);
    setOcc(next);
    showToast(next.checkedIn ? 'Checked in — enjoy your session!' : 'Checked out. See you next time!');
  };

  return (
    <div className="dashboard-container">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">{today}</p>
          <h1>{greeting}, <span>{firstName}</span> <span aria-label="wave" role="img">👋</span></h1>
          <p className="welcome-copy">Ready to make today count? Here&apos;s your fitness snapshot.</p>
        </div>
        <div className="date-chip"><Icon name="calendar" size={15} /> {today}</div>
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
            <div className={`occupancy-status ${occ.full ? 'full' : ''}`}><span className={`status-dot ${occ.full ? 'red' : ''}`} /><span>{occ.full ? 'Gym full' : 'Open now'}</span></div>
          </div>
          <div className="occupancy-main">
            <div className="occupancy-ring" style={{ '--ring-deg': `${occ.percent * 3.6}deg` }}>
              <div className="ring-copy"><strong>{occ.count}</strong><span>of {occ.capacity} students</span></div>
            </div>
            <div className="occupancy-copy">
              <h3>{occ.full ? 'The gym is at capacity' : 'Plenty of room right now'}</h3>
              <p>The gym is at <strong>{occ.percent}% capacity</strong>. {occ.full ? 'Please wait for it to clear before heading over.' : 'You can check in without waiting.'}</p>
              <div className="checkin-row">
                <button className={`btn ${occ.checkedIn ? 'danger' : 'success'}`} disabled={!occ.checkedIn && occ.full} onClick={handleCheckIn} type="button">
                  <Icon name={occ.checkedIn ? 'logout' : 'check'} size={14} /> {occ.checkedIn ? 'Check out' : 'Check in'}
                </button>
                <span className="checkin-hint">{occ.checkedIn ? "You're checked in at the gym." : 'Tap when you arrive at the gym.'}</span>
              </div>
            </div>
          </div>
        </article>

        <article className="panel chart-panel">
          <div className="panel-header"><div><h2 className="panel-title">Weekly activity</h2><p className="panel-subtitle">Minutes active per day</p></div><div className="chart-legend"><span className="legend-dot" /> This week</div></div>
          <div aria-label="Weekly activity chart" className="bars">
            {weeklyActivity.map((item) => (
              <button aria-label={`${item.day}: ${item.value} minutes`} className={`bar-column ${selectedDay === item.day ? 'selected' : ''}`} key={item.day} onClick={() => setSelectedDay(item.day)} type="button">
                <span className="bar-track"><span className="bar-fill" style={{ height: `${item.value}%` }} /></span>
                <span className="bar-label">{item.day}</span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section aria-label="Quick actions" className="quick-actions">
        <QuickAction description="Track your sets and routine" icon="plus" onClick={() => navigate('/dashboard/my-workout')} title="Log a workout" tone="blue" />
        <QuickAction description="Find a class that fits" icon="calendar" onClick={() => navigate('/dashboard/classes')} title="Book a class" tone="orange" />
        <QuickAction description="Report a broken machine" icon="wrench" onClick={() => navigate('/dashboard/facilities')} title="Facilities" tone="green" />
      </section>

      <section className="content-grid split-wide">
        <article className="panel">
          <div className="panel-header"><div><h2 className="panel-title">Busy hours today</h2><p className="panel-subtitle">Average students per hour · peak at {peakHour}</p></div><Icon name="clock" size={18} /></div>
          <HourBars data={hourlyOccupancy} peakHour={peakHour} />
        </article>

        <article className="panel">
          <div className="panel-header"><div><h2 className="panel-title">Equipment availability</h2><p className="panel-subtitle">Updated 2 minutes ago</p></div><button className="panel-link" onClick={() => navigate('/dashboard/facilities')} type="button">All <Icon name="arrowRight" size={13} /></button></div>
          <div className="equipment-list">
            {equipmentInventory.slice(0, 4).map((item) => (
              <div className="equipment-row" key={item.name}>
                <Icon name="dumbbell" size={16} />
                <div className="equipment-copy"><strong>{item.name}</strong><div className="progress-track"><div className={`progress-fill ${item.tone}`} style={{ width: `${(item.available / item.total) * 100}%` }} /></div></div>
                <div className="equipment-count"><strong>{item.available}</strong>/{item.total} free</div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="page-section">
        <article className="panel">
          <div className="panel-header"><div><h2 className="panel-title">Upcoming for you</h2><p className="panel-subtitle">Your plan for the next few days</p></div><button className="panel-link" onClick={() => navigate('/dashboard/classes')} type="button">View classes <Icon name="arrowRight" size={13} /></button></div>
          <div className="upcoming-list">
            {upcoming.map((event) => (
              <div className="upcoming-item" key={event.title}>
                <div className={`event-date ${event.color}`}><strong>{event.date}</strong><span>{event.month}</span></div>
                <div className="event-copy"><strong>{event.title}</strong><span><Icon name="clock" size={11} /> {event.meta}</span></div>
                <span className={`event-type ${event.color}`}>{event.type}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
