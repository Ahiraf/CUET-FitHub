import React, { useState } from 'react';
import Icon from '../Icon';
import { initials } from '../Navbar';
import { useToast } from '../context/ToastContext';
import { useApi } from '../hooks/useApi';
import api from '../api';
import { buddies, dietTips } from '../data';

const tabs = ['Announcements', 'Buddy finder', 'Nutrition'];
const typeTone = { Maintenance: 'orange', Event: 'violet', Notice: 'blue' };

export default function Community() {
  const showToast = useToast();
  const [tab, setTab] = useState('Announcements');
  const [connected, setConnected] = useState(() => new Set());
  const [lang, setLang] = useState('en');
  const { data: announcements } = useApi(() => api.getAnnouncements(), []);

  const toggleBuddy = (b) => {
    setConnected((prev) => {
      const next = new Set(prev);
      next.has(b.id) ? next.delete(b.id) : next.add(b.id);
      return next;
    });
    showToast(connected.has(b.id) ? `Removed ${b.name} as a buddy.` : `Buddy request sent to ${b.name}.`);
  };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Community</p>
        <h1>Community</h1>
        <p className="page-sub">Stay in the loop with gym announcements, find a workout partner, and pick up nutrition tips for student life.</p>
      </header>

      <div className="tabs">
        {tabs.map((t) => <button className={`tab ${tab === t ? 'active' : ''}`} key={t} onClick={() => setTab(t)} type="button">{t}</button>)}
      </div>

      {tab === 'Announcements' && (
        <article className="panel page-section">
          <h2 className="panel-title">Announcements & events</h2>
          <p className="panel-subtitle">Latest from the CUET gym</p>
          {(announcements || []).map((a) => (
            <div className="announce" key={a.id} style={{ borderLeftColor: a.type === 'Maintenance' ? '#f0c39a' : a.type === 'Event' ? '#cbb8ef' : '#b8c8f2' }}>
              <div className="an-head">
                <span className={`tag ${typeTone[a.type] || 'grey'}`}>{a.type}</span>
                <h4>{a.title}</h4>
                <span className="an-date">{a.date}</span>
              </div>
              <p>{a.body}</p>
            </div>
          ))}
          {!announcements && <div className="empty-state">Loading…</div>}
        </article>
      )}

      {tab === 'Buddy finder' && (
        <div className="card-grid">
          {buddies.map((b) => (
            <article className="info-card" key={b.id}>
              <div className="ic-head">
                <span className="ic-avatar" style={{ background: b.color }}>{initials(b.name)}</span>
                <div><h4>{b.name}</h4><div className="ic-role">{b.dept}</div></div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="tag blue">{b.goal}</span>
                <span className="tag grey">{b.times}</span>
              </div>
              <div className="ic-foot">
                <span style={{ color: '#9aa4b4', fontSize: 10 }}>{connected.has(b.id) ? 'Request sent' : 'Similar goals'}</span>
                <button className={`btn sm ${connected.has(b.id) ? 'ghost' : ''}`} onClick={() => toggleBuddy(b)} type="button">
                  {connected.has(b.id) ? 'Connected' : 'Connect'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === 'Nutrition' && (
        <div className="page-section">
          <div className="tabs" style={{ marginTop: 0 }}>
            <button className={`tab ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')} type="button">English</button>
            <button className={`tab ${lang === 'bn' ? 'active' : ''}`} onClick={() => setLang('bn')} type="button">বাংলা</button>
          </div>
          <div className="grid-2" style={{ marginTop: 14 }}>
            {dietTips.map((tip, i) => (
              <div className="tip-card" key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span className="stat-icon green" style={{ height: 28, width: 28, marginBottom: 0 }}><Icon name="leaf" size={15} /></span>
                  <strong style={{ color: '#4a5c86', fontSize: 11 }}>Tip {i + 1}</strong>
                </div>
                <div className={lang === 'en' ? 'tip-en' : 'tip-bn'}>{lang === 'en' ? tip.en : tip.bn}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
