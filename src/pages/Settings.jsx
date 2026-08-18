import React, { useState } from 'react';
import Icon from '../Icon';
import { initials } from '../Navbar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { upsertAccount } from '../api';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const showToast = useToast();
  const [form, setForm] = useState({
    name: user?.name || '',
    studentId: user?.studentId || '',
    email: user?.email || '',
    dept: user?.dept || '',
    goal: user?.goal || 'Build strength',
  });
  const [prefs, setPrefs] = useState({ occupancyAlerts: true, classReminders: true, weeklyDigest: false });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    const next = { ...user, ...form };
    updateUser(next);
    upsertAccount(next);
    showToast('Profile updated.');
  };

  const roleLabel = user?.role === 'trainer' ? 'Trainer' : user?.role === 'admin' ? 'Admin' : 'Student';

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Account</p>
        <h1>Settings</h1>
        <p className="page-sub">Manage your FitHub profile and notification preferences.</p>
      </header>

      <section className="content-grid split-wide">
        <article className="panel">
          <h2 className="panel-title">Profile</h2>
          <p className="panel-subtitle">This information appears across your dashboard.</p>
          <form onSubmit={save}>
            <div className="form-grid">
              <div className="field"><label htmlFor="s-name">Full name</label><input id="s-name" className="text-input" name="name" value={form.name} onChange={update} /></div>
              <div className="field"><label htmlFor="s-id">Student ID</label><input id="s-id" className="text-input" name="studentId" value={form.studentId} onChange={update} placeholder="e.g. 2204xxx" /></div>
              <div className="field"><label htmlFor="s-email">CUET email</label><input id="s-email" className="text-input" name="email" type="email" value={form.email} onChange={update} /></div>
              <div className="field"><label htmlFor="s-dept">Department</label><input id="s-dept" className="text-input" name="dept" value={form.dept} onChange={update} placeholder="e.g. CSE 22" /></div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="s-goal">Primary goal</label>
                <select id="s-goal" className="select" name="goal" value={form.goal} onChange={update}>
                  <option>Build strength</option><option>Lose weight</option><option>Improve endurance</option><option>Stay consistent</option><option>General fitness</option>
                </select>
              </div>
            </div>
            <button className="btn" style={{ marginTop: 18 }} type="submit"><Icon name="check" size={14} /> Save changes</button>
          </form>
        </article>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <article className="panel" style={{ textAlign: 'center' }}>
            <div className="avatar" style={{ height: 64, width: 64, fontSize: 20, margin: '4px auto 12px' }}>{initials(form.name)}</div>
            <h2 className="panel-title" style={{ textAlign: 'center' }}>{form.name || 'Your name'}</h2>
            <p className="panel-subtitle" style={{ textAlign: 'center' }}>{form.dept || 'CUET'} · {roleLabel}</p>
          </article>

          <article className="panel">
            <h2 className="panel-title">Notifications</h2>
            <p className="panel-subtitle">Choose what FitHub tells you about.</p>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                ['occupancyAlerts', 'Gym full alerts', 'When the gym nears 50 students'],
                ['classReminders', 'Class reminders', 'Before sessions you signed up for'],
                ['weeklyDigest', 'Weekly digest', 'A summary of your progress'],
              ].map(([k, title, desc]) => (
                <label key={k} style={{ alignItems: 'center', cursor: 'pointer', display: 'flex', gap: 12, padding: '10px 2px' }}>
                  <input checked={prefs[k]} onChange={() => { setPrefs({ ...prefs, [k]: !prefs[k] }); showToast('Preference updated.'); }} type="checkbox" style={{ accentColor: '#4968e8', height: 16, width: 16 }} />
                  <span style={{ flex: 1 }}>
                    <strong style={{ color: '#2c3852', display: 'block', fontSize: 12 }}>{title}</strong>
                    <span style={{ color: '#93a0b6', fontSize: 10 }}>{desc}</span>
                  </span>
                </label>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
