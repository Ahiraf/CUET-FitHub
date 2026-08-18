import React, { useState } from 'react';
import Icon from '../Icon';
import { useToast } from '../context/ToastContext';
import { useApi } from '../hooks/useApi';
import api from '../api';

const filters = ['All', 'Yoga', 'Cardio', 'Strength', 'Self-defense'];

export default function Classes() {
  const showToast = useToast();
  const [filter, setFilter] = useState('All');
  const { data: classes, setData: setClasses } = useApi(() => api.getClasses(), []);

  const list = classes || [];

  const toggle = async (cls) => {
    try {
      const updated = await api.toggleEnroll(cls.id);
      setClasses(list.map((c) => (c.id === cls.id ? updated : c)));
      showToast(updated.enrolled ? `You're signed up for ${cls.title}!` : `Left ${cls.title}.`);
    } catch (e) { showToast(e.message); }
  };

  const visible = list.filter((c) => filter === 'All' || c.type === filter);

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Group sessions</p>
        <h1>Classes</h1>
        <p className="page-sub">Sign up for instructor-led yoga, cardio, strength and self-defense sessions at the CUET gym. Spots are limited.</p>
      </header>

      <div className="tabs">
        {filters.map((f) => <button className={`tab ${filter === f ? 'active' : ''}`} key={f} onClick={() => setFilter(f)} type="button">{f}</button>)}
      </div>

      <div className="card-grid">
        {visible.map((cls) => {
          const spotsLeft = cls.spots - cls.filled;
          const full = spotsLeft <= 0 && !cls.enrolled;
          const pct = Math.min(100, Math.round((cls.filled / cls.spots) * 100));
          return (
            <article className="info-card" key={cls.id}>
              <div className="ic-head">
                <span className="ic-avatar" style={{ background: '#eef2ff', color: '#556fe0' }}><Icon name="calendar" size={20} /></span>
                <div><h4>{cls.title}</h4><div className="ic-role">{cls.day} · {cls.time}</div></div>
                <span className={`tag ${cls.color}`} style={{ marginLeft: 'auto' }}>{cls.type}</span>
              </div>
              <p className="ic-body">Led by <strong style={{ color: '#4a5c86' }}>{cls.coach}</strong></p>
              <div>
                <div className="progress-track"><div className={`progress-fill ${full ? 'red' : 'blue'}`} style={{ width: `${pct}%` }} /></div>
                <div style={{ color: '#93a0b6', fontSize: 10, marginTop: 6 }}>{full ? 'Class full' : `${Math.max(0, spotsLeft)} spot${spotsLeft === 1 ? '' : 's'} left`} · {cls.spots} capacity</div>
              </div>
              <div className="ic-foot">
                {cls.enrolled ? <span className="tag green">Enrolled</span> : <span style={{ color: '#9aa4b4', fontSize: 10 }}>Not enrolled</span>}
                <button className={`btn sm ${cls.enrolled ? 'ghost' : ''}`} disabled={full} onClick={() => toggle(cls)} type="button">
                  {cls.enrolled ? 'Cancel' : full ? 'Full' : 'Sign up'}
                </button>
              </div>
            </article>
          );
        })}
        {list.length === 0 && <div className="empty-state"><Icon name="calendar" size={26} /> Loading classes…</div>}
      </div>
    </div>
  );
}
