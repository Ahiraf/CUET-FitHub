import React from 'react';
import Icon from '../Icon';

const faqs = [
  { q: 'Who can use CUET FitHub?', a: 'Only verified CUET students. The campus gym is free of cost, so there are no payments or membership plans — just sign in with your CUET email and student ID.' },
  { q: 'How do I know if the gym is full?', a: 'The Overview dashboard shows live occupancy against the 50-student daily capacity. When attendance crosses 50, the gym is flagged as full so you can avoid a wasted trip.' },
  { q: 'How do I log a workout?', a: 'Open "My workout" to see your session, or build your next session under "Exercises" by adding movements to your plan. Your plan is saved automatically.' },
  { q: 'How do class sign-ups work?', a: 'Under "Classes" you can join instructor-led yoga, cardio, strength and self-defense sessions. Spots are limited, so classes can fill up.' },
  { q: 'How do I book a personal trainer?', a: 'Go to "Trainers", pick a coach that matches your goal, and send a session request. The trainer confirms your slot from their dashboard.' },
  { q: 'How is my progress tracked?', a: 'The "Progress" page charts your strength, body weight and BMI over time, and shows badges and your department leaderboard rank.' },
];

export default function HelpCenter({ showToast }) {
  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Support</p>
        <h1>Help center</h1>
        <p className="page-sub">Answers to common questions about using CUET FitHub. Still stuck? Reach out and we'll help.</p>
      </header>

      <section className="content-grid" style={{ gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, .6fr)' }}>
        <article className="panel">
          <h2 className="panel-title">Frequently asked questions</h2>
          <p className="panel-subtitle">Tap a question to expand.</p>
          <div style={{ marginTop: 12 }}>
            {faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </article>

        <article className="panel" style={{ alignSelf: 'flex-start' }}>
          <h2 className="panel-title">Contact us</h2>
          <p className="panel-subtitle">CUET gym operations desk</p>
          <div className="list" style={{ marginTop: 16 }}>
            <div className="list-row"><span className="row-icon"><Icon name="user" size={18} /></span><div className="row-main"><strong>Gym front desk</strong><span>Ground floor, TSC building</span></div></div>
            <div className="list-row"><span className="row-icon"><Icon name="clock" size={18} /></span><div className="row-main"><strong>Open hours</strong><span>Daily · 6:00 AM – 10:00 PM</span></div></div>
          </div>
          <button className="btn full" style={{ marginTop: 16 }} onClick={() => showToast?.('Support request sent. We\'ll get back to you.')} type="button">
            <Icon name="info" size={14} /> Report an issue
          </button>
        </article>
      </section>
    </div>
  );
}
