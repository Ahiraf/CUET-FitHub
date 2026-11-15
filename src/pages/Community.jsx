import React, { useState } from 'react';
import Icon from '../Icon';
import { useApi } from '../hooks/useApi';
import api from '../api';
import { dietTips } from '../data';

const tabs = ['Announcements', 'Nutrition'];
const typeTone = { Maintenance: 'orange', Event: 'violet', Notice: 'blue' };

export default function Community() {
  const [tab, setTab] = useState('Announcements');
  const [lang, setLang] = useState('en');
  const { data: announcements } = useApi(() => api.getAnnouncements(), []);

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Community</p>
        <h1>Community</h1>
        <p className="page-sub">Stay up to date with gym announcements and find practical nutrition tips for student life.</p>
      </header>

      <div className="tabs">
        {tabs.map((t) => <button className={`tab ${tab === t ? 'active' : ''}`} key={t} onClick={() => setTab(t)} type="button">{t}</button>)}
      </div>

      {tab === 'Announcements' && (
        <article className="panel page-section community-announcements">
          <div className="community-announcements-heading"><p className="eyebrow">CUET GYM UPDATES</p><h2>Announcements &amp; Events</h2><p>News, events, and important updates for our fitness community.</p></div>
          {(announcements || []).map((a) => (
            <div className="announce" key={a.id} style={{ borderLeftColor: a.type === 'Maintenance' ? '#f0c39a' : a.type === 'Event' ? '#cbb8ef' : '#b8c8f2' }}>
              <div className="an-head">
                <span className={`tag ${typeTone[a.type] || 'grey'}`}>{a.type}</span>
                <span className="an-date">{a.date}</span>
              </div>
              <h3 className="community-announcement-title">{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
          {!announcements && <div className="empty-state">Loading…</div>}
        </article>
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
