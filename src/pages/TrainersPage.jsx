import React, { useState } from 'react';
import Icon from '../Icon';
import { initials } from '../Navbar';
import { useToast } from '../context/ToastContext';
import { useApi } from '../hooks/useApi';
import api from '../api';

export default function TrainersPage() {
  const showToast = useToast();
  const { data: trainers } = useApi(() => api.getTrainers(), []);
  const { data: bookings } = useApi(() => api.getMyBookings(), []);
  const [requested, setRequested] = useState(() => new Set());

  const list = trainers || [];
  const bookedNames = new Set([...(bookings || []).map((b) => b.trainerName), ...requested]);

  const book = async (trainer) => {
    try {
      await api.createBooking({ trainerName: trainer.name, goal: `Session with ${trainer.name}`, slot: 'To be confirmed' });
      setRequested((prev) => new Set(prev).add(trainer.name));
      showToast(`Session request sent to ${trainer.name}.`);
    } catch (e) { showToast(e.message); }
  };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Personal training</p>
        <h1>Trainers</h1>
        <p className="page-sub">Book one-on-one sessions with CUET's certified trainers. Send a request and the trainer confirms your slot.</p>
      </header>

      <div className="card-grid">
        {list.map((t) => {
          const isRequested = bookedNames.has(t.name);
          return (
            <article className="info-card" key={t.id}>
              <div className="ic-head">
                <span className="ic-avatar" style={{ background: t.color }}>{initials(t.name)}</span>
                <div><h4>{t.name}</h4><div className="ic-role">{t.specialty}</div></div>
              </div>
              <p className="ic-body">{t.bio}</p>
              <div style={{ color: '#93a0b6', fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="clock" size={13} /> {t.availability}</div>
              <div className="ic-foot">
                <span className="rating"><Icon name="star" size={13} /> {t.rating} <span style={{ color: '#a7b0c0', fontWeight: 500 }}>· {t.sessions} sessions</span></span>
                <button className={`btn sm ${isRequested ? 'ghost' : ''}`} disabled={isRequested} onClick={() => book(t)} type="button">{isRequested ? 'Requested' : 'Book session'}</button>
              </div>
            </article>
          );
        })}
        {list.length === 0 && <div className="empty-state"><Icon name="users" size={26} /> Loading trainers…</div>}
      </div>
    </div>
  );
}
