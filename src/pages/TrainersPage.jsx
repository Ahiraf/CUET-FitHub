import React, { useState } from 'react';
import Icon from '../Icon';
import { initials } from '../Navbar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getBookings, setBookings, addBookingRequest } from '../api';
import { trainers } from '../data';

export default function TrainersPage() {
  const { user } = useAuth();
  const showToast = useToast();
  const [booked, setBooked] = useState(() => getBookings(user));

  const isBooked = (id) => booked.includes(id);

  const toggle = (trainer) => {
    const wasIn = isBooked(trainer.id);
    const next = wasIn ? booked.filter((b) => b !== trainer.id) : [...booked, trainer.id];
    setBooked(next);
    setBookings(user, next);
    if (!wasIn) {
      addBookingRequest({ name: user?.name || 'A student', dept: user?.dept || 'CUET', goal: `Session with ${trainer.name}`, slot: 'To be confirmed' });
    }
    showToast(wasIn ? `Cancelled request with ${trainer.name}.` : `Session request sent to ${trainer.name}.`);
  };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Personal training</p>
        <h1>Trainers</h1>
        <p className="page-sub">Book one-on-one sessions with CUET's certified trainers. Send a request and the trainer confirms your slot.</p>
      </header>

      <div className="card-grid">
        {trainers.map((t) => (
          <article className="info-card" key={t.id}>
            <div className="ic-head">
              <span className="ic-avatar" style={{ background: t.color }}>{initials(t.name)}</span>
              <div><h4>{t.name}</h4><div className="ic-role">{t.specialty}</div></div>
            </div>
            <p className="ic-body">{t.bio}</p>
            <div style={{ color: '#93a0b6', fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="clock" size={13} /> {t.availability}</div>
            <div className="ic-foot">
              <span className="rating"><Icon name="star" size={13} /> {t.rating} <span style={{ color: '#a7b0c0', fontWeight: 500 }}>· {t.sessions} sessions</span></span>
              <button className={`btn sm ${isBooked(t.id) ? 'ghost' : ''}`} onClick={() => toggle(t)} type="button">{isBooked(t.id) ? 'Requested' : 'Book session'}</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
