import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../Icon';
import { initials } from '../../Navbar';
import { StatCard, HourBars } from '../../components/ui';
import { useToast } from '../../context/ToastContext';
import {
  listMembers, setAccountVerified, getOccupancy, getTickets, setTicketStatus,
  getAnnouncements, addAnnouncement,
} from '../../api';
import { equipmentInventory, hourlyOccupancy } from '../../data';

const ticketTone = { Open: 'red', 'In progress': 'orange', Resolved: 'green' };
const roleTone = { student: 'blue', trainer: 'violet', admin: 'orange' };
const peakHour = hourlyOccupancy.reduce((a, b) => (b.value > a.value ? b : a)).hour;

export function AdminOverview() {
  const navigate = useNavigate();
  const members = listMembers();
  const occ = getOccupancy();
  const pendingVerif = members.filter((m) => !m.verified).length;
  const openTickets = getTickets().filter((t) => t.status !== 'Resolved').length;
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="dashboard-container">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">{today}</p>
          <h1>Operations <span>overview</span> 🛠️</h1>
          <p className="welcome-copy">Monitor gym capacity, verify members and keep the facility running.</p>
        </div>
        <div className={`date-chip`}><Icon name="users" size={15} /> {occ.count}/{occ.capacity} in the gym now</div>
      </section>

      <section className="grid-4">
        <StatCard accent="blue" detail="Registered accounts" icon="users" label="Total members" value={String(members.length)} />
        <StatCard accent={occ.full ? 'red' : 'green'} detail={occ.full ? 'At capacity' : 'Below the 50 limit'} icon="activity" label="In gym now" value={`${occ.count}/${occ.capacity}`} />
        <StatCard accent="orange" detail="Awaiting approval" icon="shield" label="Pending verifications" value={String(pendingVerif)} />
        <StatCard accent="violet" detail="Needing attention" icon="wrench" label="Open tickets" value={String(openTickets)} />
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header"><div><h2 className="panel-title">Attendance by hour</h2><p className="panel-subtitle">Busiest at {peakHour} · plan staffing around peaks</p></div><Icon name="chart" size={18} /></div>
          <HourBars data={hourlyOccupancy} peakHour={peakHour} />
        </article>

        <article className="panel">
          <div className="panel-header"><div><h2 className="panel-title">Needs verification</h2><p className="panel-subtitle">New student accounts</p></div><button className="panel-link" onClick={() => navigate('/dashboard/members')} type="button">Review <Icon name="arrowRight" size={13} /></button></div>
          <div className="list" style={{ marginTop: 14 }}>
            {members.filter((m) => !m.verified).slice(0, 4).map((m) => (
              <div className="list-row" key={m.email}>
                <span className="row-icon">{initials(m.name)}</span>
                <div className="row-main"><strong>{m.name}</strong><span>{m.studentId} · {m.dept || m.role}</span></div>
                <span className="tag orange">Pending</span>
              </div>
            ))}
            {pendingVerif === 0 && <div className="empty-state"><Icon name="check" size={24} /> All members verified.</div>}
          </div>
        </article>
      </section>
    </div>
  );
}

export function AdminMembers() {
  const showToast = useToast();
  const [members, setMembers] = useState(() => listMembers());
  const [filter, setFilter] = useState('All');

  const verify = (email, name, verified) => {
    setAccountVerified(email, verified);
    setMembers(listMembers());
    showToast(verified ? `${name} verified.` : `${name} set to pending.`);
  };

  const filters = ['All', 'Pending', 'Students', 'Trainers'];
  const visible = members.filter((m) => (
    filter === 'All' ? true
      : filter === 'Pending' ? !m.verified
        : filter === 'Students' ? m.role === 'student'
          : m.role === 'trainer'
  ));

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Membership</p>
        <h1>Members</h1>
        <p className="page-sub">Verify that accounts belong to genuine CUET students and manage trainer access.</p>
      </header>
      <div className="tabs">
        {filters.map((f) => <button className={`tab ${filter === f ? 'active' : ''}`} key={f} onClick={() => setFilter(f)} type="button">{f}</button>)}
      </div>
      <div className="list">
        {visible.map((m) => (
          <div className="list-row" key={m.email}>
            <span className="row-icon">{initials(m.name)}</span>
            <div className="row-main"><strong>{m.name}</strong><span>{m.email} · {m.studentId}</span></div>
            <span className={`tag ${roleTone[m.role] || 'grey'}`}>{m.role}</span>
            <span className={`tag ${m.verified ? 'green' : 'orange'}`}>{m.verified ? 'Verified' : 'Pending'}</span>
            <button className={`btn sm ${m.verified ? 'ghost' : ''}`} onClick={() => verify(m.email, m.name, !m.verified)} type="button">
              {m.verified ? 'Revoke' : 'Verify'}
            </button>
          </div>
        ))}
        {visible.length === 0 && <div className="empty-state"><Icon name="users" size={24} /> No members in this view.</div>}
      </div>
    </div>
  );
}

export function Attendance() {
  const occ = getOccupancy();
  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Capacity control</p>
        <h1>Attendance</h1>
        <p className="page-sub">Live headcount against the 50-student daily limit, plus peak-hour analytics for planning.</p>
      </header>

      <section className="content-grid">
        <article className="panel occupancy-panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Live occupancy</h2><p className="panel-subtitle">Today's headcount</p></div>
            <div className={`occupancy-status ${occ.full ? 'full' : ''}`}><span className={`status-dot ${occ.full ? 'red' : ''}`} /><span>{occ.full ? 'At capacity' : 'Below limit'}</span></div>
          </div>
          <div className="occupancy-main">
            <div className="occupancy-ring" style={{ '--ring-deg': `${occ.percent * 3.6}deg` }}>
              <div className="ring-copy"><strong>{occ.count}</strong><span>of {occ.capacity} students</span></div>
            </div>
            <div className="occupancy-copy">
              <h3>{occ.percent}% full</h3>
              <p>The gym {occ.full ? 'has reached' : 'is under'} its <strong>{occ.capacity}-student</strong> daily cap. The public status shows <strong>{occ.full ? 'FULL' : 'OPEN'}</strong>.</p>
              <div className="occupancy-note"><Icon name="clock" size={14} /> Busiest between 5:00 - 7:00 PM</div>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header"><div><h2 className="panel-title">Peak hours</h2><p className="panel-subtitle">Average students · peak at {peakHour}</p></div><Icon name="chart" size={18} /></div>
          <HourBars data={hourlyOccupancy} peakHour={peakHour} />
        </article>
      </section>
    </div>
  );
}

export function Equipment() {
  const showToast = useToast();
  const [tickets, setTickets] = useState(() => getTickets());

  const change = (id, status) => { setTickets(setTicketStatus(id, status)); showToast(`Ticket marked ${status}.`); };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Facilities</p>
        <h1>Equipment & maintenance</h1>
        <p className="page-sub">Track inventory availability and resolve maintenance tickets reported by members.</p>
      </header>

      <section className="page-section">
        <h3 className="section-title">Inventory</h3>
        <p className="section-sub">Machines and racks across the gym floor.</p>
        <div className="grid-2">
          {equipmentInventory.map((i) => (
            <div className="list-row" key={i.name}>
              <span className="row-icon"><Icon name="dumbbell" size={17} /></span>
              <div className="row-main"><strong>{i.name}</strong><span>{i.available} of {i.total} available</span></div>
              <div style={{ width: 90 }}><div className="progress-track"><div className={`progress-fill ${i.tone}`} style={{ width: `${(i.available / i.total) * 100}%` }} /></div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <h3 className="section-title">Maintenance tickets</h3>
        <p className="section-sub">Update status as issues get fixed.</p>
        <div className="list">
          {tickets.map((t) => (
            <div className="list-row" key={t.id}>
              <span className="row-icon"><Icon name="wrench" size={17} /></span>
              <div className="row-main"><strong>{t.item}</strong><span>{t.issue}</span></div>
              <div className="row-meta"><span>by {t.by} · {t.date}</span></div>
              <span className={`tag ${ticketTone[t.status]}`}>{t.status}</span>
              <select className="select" style={{ width: 140 }} value={t.status} onChange={(e) => change(t.id, e.target.value)}>
                <option>Open</option><option>In progress</option><option>Resolved</option>
              </select>
            </div>
          ))}
          {tickets.length === 0 && <div className="empty-state"><Icon name="check" size={24} /> No maintenance tickets.</div>}
        </div>
      </section>
    </div>
  );
}

export function Announcements() {
  const showToast = useToast();
  const [items, setItems] = useState(() => getAnnouncements());
  const [form, setForm] = useState({ title: '', body: '', type: 'Notice' });

  const post = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) { showToast('Add a title and message.'); return; }
    setItems(addAnnouncement(form));
    setForm({ title: '', body: '', type: 'Notice' });
    showToast('Announcement posted.');
  };

  const typeTone = { Maintenance: 'orange', Event: 'violet', Notice: 'blue' };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Communications</p>
        <h1>Announcements</h1>
        <p className="page-sub">Post notices, events and maintenance updates that appear on every member's Community page.</p>
      </header>

      <section className="content-grid split-wide">
        <article className="panel">
          <h2 className="panel-title">Posted announcements</h2>
          <p className="panel-subtitle">{items.length} live</p>
          {items.map((a) => (
            <div className="announce" key={a.id}>
              <div className="an-head"><span className={`tag ${typeTone[a.type] || 'grey'}`}>{a.type}</span><h4>{a.title}</h4><span className="an-date">{a.date}</span></div>
              <p>{a.body}</p>
            </div>
          ))}
        </article>

        <article className="panel" style={{ alignSelf: 'flex-start' }}>
          <h2 className="panel-title">New announcement</h2>
          <p className="panel-subtitle">Broadcast to all members</p>
          <form onSubmit={post} style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="field">
              <label htmlFor="an-type">Type</label>
              <select id="an-type" className="select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option>Notice</option><option>Event</option><option>Maintenance</option>
              </select>
            </div>
            <div className="field"><label htmlFor="an-title">Title</label><input id="an-title" className="text-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Short headline" /></div>
            <div className="field"><label htmlFor="an-body">Message</label><textarea id="an-body" className="text-input" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Details for members…" /></div>
            <button className="btn full" type="submit"><Icon name="megaphone" size={14} /> Post announcement</button>
          </form>
        </article>
      </section>
    </div>
  );
}
