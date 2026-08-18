import React, { useState } from 'react';
import Icon from '../Icon';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getTickets, createTicket } from '../api';
import { equipmentInventory } from '../data';

const statusTone = { Open: 'red', 'In progress': 'orange', Resolved: 'green' };

export default function Facilities() {
  const { user } = useAuth();
  const showToast = useToast();
  const [tickets, setTickets] = useState(() => getTickets());
  const [form, setForm] = useState({ item: equipmentInventory[0].name, issue: '' });

  // Show this user's own reports first (plus seeded ones for context).
  const myName = user?.name;

  const submit = (e) => {
    e.preventDefault();
    if (!form.issue.trim()) { showToast('Please describe the issue.'); return; }
    const next = createTicket({ item: form.item, issue: form.issue.trim(), by: myName || 'A student' });
    setTickets(next);
    setForm({ ...form, issue: '' });
    showToast('Report submitted — thanks for flagging it.');
  };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Gym facilities</p>
        <h1>Facilities</h1>
        <p className="page-sub">Check what's free before you go, and report broken equipment so the team can fix it fast.</p>
      </header>

      <section className="content-grid split-wide">
        <article className="panel">
          <h2 className="panel-title">Equipment availability</h2>
          <p className="panel-subtitle">Live status across the gym floor</p>
          <div className="equipment-list">
            {equipmentInventory.map((item) => (
              <div className="equipment-row" key={item.name}>
                <Icon name="dumbbell" size={16} />
                <div className="equipment-copy"><strong>{item.name}</strong><div className="progress-track"><div className={`progress-fill ${item.tone}`} style={{ width: `${(item.available / item.total) * 100}%` }} /></div></div>
                <div className="equipment-count"><strong>{item.available}</strong>/{item.total} free</div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel" style={{ alignSelf: 'flex-start' }}>
          <h2 className="panel-title">Report an issue</h2>
          <p className="panel-subtitle">Flag broken or unsafe equipment</p>
          <form onSubmit={submit} style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="field">
              <label htmlFor="f-item">Equipment</label>
              <select id="f-item" className="select" value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })}>
                {equipmentInventory.map((i) => <option key={i.name}>{i.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-issue">What's wrong?</label>
              <textarea id="f-issue" className="text-input" placeholder="Describe the problem…" value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} />
            </div>
            <button className="btn full" type="submit"><Icon name="wrench" size={14} /> Submit report</button>
          </form>
        </article>
      </section>

      <section className="page-section">
        <h3 className="section-title">Maintenance tickets</h3>
        <p className="section-sub">Reported issues and their current status.</p>
        <div className="list">
          {tickets.map((t) => (
            <div className="list-row" key={t.id}>
              <span className="row-icon"><Icon name="wrench" size={17} /></span>
              <div className="row-main"><strong>{t.item}</strong><span>{t.issue}</span></div>
              <div className="row-meta"><span>by {t.by} · {t.date}</span></div>
              <span className={`tag ${statusTone[t.status] || 'grey'}`}>{t.status}</span>
            </div>
          ))}
          {tickets.length === 0 && <div className="empty-state"><Icon name="check" size={24} /> No open issues. Everything's working!</div>}
        </div>
      </section>
    </div>
  );
}
