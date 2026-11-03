import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Portal.css';

export default function JoinTrainer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', specialty: '', experience: '', motivation: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    try { await api.submitTrainerApplication(form); setSent(true); }
    catch (err) { setError(err.message || 'Could not submit your application.'); }
  };
  if (sent) return <main className="portal-auth-page"><section className="portal-auth-card portal-success"><div className="portal-auth-mark">✓</div><p className="auth-kicker">APPLICATION RECEIVED</p><h1>You’re on the list.</h1><p>The FitHub operations team will review your trainer application and contact you after approval.</p><button className="auth-submit" onClick={() => navigate('/login')} type="button">Back to login →</button></section></main>;
  return <main className="portal-auth-page"><section className="portal-join-card">
    <div className="portal-auth-mark">CF</div><p className="auth-kicker">JOIN THE COACHING TEAM</p><h1>Apply as a trainer</h1><p>Like Niramoy’s professional onboarding, your profile will be reviewed before you can coach CUET members.</p>
    <form className="auth-form" onSubmit={submit}>
      <label className="auth-label">Full name<input className="auth-input" name="name" value={form.name} onChange={update} placeholder="Your full name" required /></label>
      <label className="auth-label">Email address<input className="auth-input" type="email" name="email" value={form.email} onChange={update} placeholder="name@example.com" required /></label>
      <label className="auth-label">Specialty<input className="auth-input" name="specialty" value={form.specialty} onChange={update} placeholder="Strength, yoga, cardio…" required /></label>
      <label className="auth-label">Experience<input className="auth-input" name="experience" value={form.experience} onChange={update} placeholder="e.g. 3 years coaching" required /></label>
      <label className="auth-label">Why do you want to join?<textarea className="auth-input portal-textarea" name="motivation" value={form.motivation} onChange={update} placeholder="Tell the team about your coaching approach" required /></label>
      {error && <p className="auth-error">{error}</p>}<button className="auth-submit" type="submit">Submit application →</button>
    </form><button className="back-home" type="button" onClick={() => navigate('/login')}>← Back to login</button>
  </section></main>;
}
