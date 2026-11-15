import React, { useState } from 'react';
import Icon from '../Icon';
import { useApi } from '../hooks/useApi';
import api from '../api';
import { dietTips } from '../data';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const tabs = ['Announcements', 'Nutrition'];
const typeTone = { Maintenance: 'orange', Event: 'violet', Notice: 'blue' };

export default function Community() {
  const [tab, setTab] = useState('Announcements');
  const [lang, setLang] = useState('en');
  const { user } = useAuth();
  const showToast = useToast();
  const { data: announcements, setData: setAnnouncements } = useApi(() => api.getAnnouncements(), []);
  const [nutritionForm, setNutritionForm] = useState({ title: '', body: '' });
  const nutritionPosts = (announcements || []).filter((item) => item.type === 'Nutrition');
  const canPublishNutrition = ['trainer', 'admin'].includes(user?.role);

  const publishNutrition = async (event) => {
    event.preventDefault();
    if (!nutritionForm.title.trim() || !nutritionForm.body.trim()) return showToast('Add a title and nutrition guidance first.');
    try {
      const created = await api.addAnnouncement({ ...nutritionForm, type: 'Nutrition' });
      setAnnouncements((items) => [created, ...(items || [])]);
      setNutritionForm({ title: '', body: '' });
      showToast('Nutrition update shared with students and trainers.');
    } catch (error) { showToast(error.message); }
  };

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
          <div className="community-announcements-heading nutrition-heading"><p className="eyebrow">WELLNESS &amp; FUEL</p><h2>Nutrition guidance</h2><p>Helpful food and hydration advice for training and campus life.</p></div>
          {canPublishNutrition && <form className="panel nutrition-publish-form" onSubmit={publishNutrition}><h3>Share nutrition guidance</h3><p>Published updates appear for students and trainers.</p><div className="field"><label htmlFor="nutrition-title">Headline</label><input id="nutrition-title" className="text-input" maxLength={120} value={nutritionForm.title} onChange={(e) => setNutritionForm({ ...nutritionForm, title: e.target.value })} placeholder="A clear, helpful headline" /></div><div className="field"><label htmlFor="nutrition-body">Guidance</label><textarea id="nutrition-body" className="text-input" maxLength={1500} value={nutritionForm.body} onChange={(e) => setNutritionForm({ ...nutritionForm, body: e.target.value })} placeholder="Share practical nutrition advice…" /></div><button className="btn" type="submit"><Icon name="megaphone" size={14} /> Publish update</button></form>}
          {nutritionPosts.length > 0 && <section className="panel community-announcements nutrition-posts"><h3 className="panel-title">Latest nutrition updates</h3>{nutritionPosts.map((post) => <article className="announce" key={post.id}><div className="an-head"><span className="tag green">Nutrition</span><span className="an-date">{post.date}</span></div><h3 className="community-announcement-title">{post.title}</h3><p>{post.body}</p></article>)}</section>}
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
