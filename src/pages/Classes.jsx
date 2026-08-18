import React, { useState } from 'react';
import Icon from '../Icon';
import { gymClasses } from '../data';
import { loadJSON, saveJSON, userKey } from '../store';

const filters = ['All', 'Yoga', 'Cardio', 'Strength', 'Self-defense'];

export default function Classes({ user, showToast }) {
  const key = userKey(user, 'classes');
  const [filter, setFilter] = useState('All');
  const [joined, setJoined] = useState(() => loadJSON(key, []));

  const isJoined = (id) => joined.includes(id);

  const toggle = (cls) => {
    if (!isJoined(cls.id) && cls.filled >= cls.spots) {
      showToast?.(`${cls.title} is full right now.`);
      return;
    }
    const next = isJoined(cls.id) ? joined.filter((c) => c !== cls.id) : [...joined, cls.id];
    setJoined(next);
    saveJSON(key, next);
    showToast?.(isJoined(cls.id) ? `Left ${cls.title}.` : `You're signed up for ${cls.title}!`);
  };

  const visible = gymClasses.filter((c) => filter === 'All' || c.type === filter);

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Group sessions</p>
        <h1>Classes</h1>
        <p className="page-sub">Sign up for instructor-led yoga, cardio, strength and self-defense sessions at the CUET gym. Spots are limited.</p>
      </header>

      <div className="tabs">
        {filters.map((f) => (
          <button className={`tab ${filter === f ? 'active' : ''}`} key={f} onClick={() => setFilter(f)} type="button">{f}</button>
        ))}
      </div>

      <div className="card-grid">
        {visible.map((cls) => {
          const spotsLeft = cls.spots - cls.filled - (isJoined(cls.id) ? 1 : 0);
          const full = spotsLeft <= 0 && !isJoined(cls.id);
          const pct = Math.min(100, Math.round(((cls.filled + (isJoined(cls.id) ? 1 : 0)) / cls.spots) * 100));
          return (
            <article className="info-card" key={cls.id}>
              <div className="ic-head">
                <span className="ic-avatar" style={{ background: '#eef2ff', color: '#556fe0' }}><Icon name="calendar" size={20} /></span>
                <div>
                  <h4>{cls.title}</h4>
                  <div className="ic-role">{cls.day} · {cls.time}</div>
                </div>
                <span className={`tag ${cls.color}`} style={{ marginLeft: 'auto' }}>{cls.type}</span>
              </div>
              <p className="ic-body">Led by <strong style={{ color: '#4a5c86' }}>{cls.coach}</strong></p>
              <div>
                <div className="progress-track"><div className={`progress-fill ${full ? 'red' : 'blue'}`} style={{ width: `${pct}%` }} /></div>
                <div style={{ color: '#93a0b6', fontSize: 10, marginTop: 6 }}>
                  {full ? 'Class full' : `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left`} · {cls.spots} capacity
                </div>
              </div>
              <div className="ic-foot">
                {isJoined(cls.id) ? <span className="tag green">Enrolled</span> : <span style={{ color: '#9aa4b4', fontSize: 10 }}>Not enrolled</span>}
                <button className={`btn sm ${isJoined(cls.id) ? 'ghost' : ''}`} disabled={full} onClick={() => toggle(cls)} type="button">
                  {isJoined(cls.id) ? 'Cancel' : full ? 'Full' : 'Sign up'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
