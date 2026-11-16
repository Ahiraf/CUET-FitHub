import React from 'react';
import WorkoutActivity from '../components/WorkoutActivity';
import Icon from '../Icon';
import { useAuth } from '../context/AuthContext';
import { badges, leaderboard } from '../data';
import { getActiveWorkout } from '../store';

export default function ProgressPage({ embedded = false } = {}) {
  const { user } = useAuth();
  const activeWorkout = getActiveWorkout(user);
  return (
    <div className="dashboard-container">
      {!embedded && <header className="page-head">
        <p className="eyebrow">Your analytics</p>
        <h1>Progress</h1>
        <p className="page-sub">See how many training days, exercises and active minutes you have completed.</p>
      </header>}

      <section className="content-grid">
        {activeWorkout && <article className="panel" style={{ gridColumn: '1 / -1' }}><div className="panel-header"><div><h2 className="panel-title">Workout in progress</h2><p className="panel-subtitle">Started {new Date(activeWorkout.startedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p></div><span className="tag blue">{activeWorkout.items.filter((item) => item.done).length} / {activeWorkout.items.length} done</span></div><div className="progress-track" style={{ marginTop: 14 }}><div className="progress-fill blue" style={{ width: `${Math.round(activeWorkout.items.filter((item) => item.done).length / activeWorkout.items.length * 100)}%` }} /></div><p className="panel-subtitle" style={{ marginTop: 10 }}>Your plan is saved. Complete exercises in My Workout to update your activity chart.</p></article>}
        <WorkoutActivity />
        <article className="panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Department leaderboard</h2><p className="panel-subtitle">This month · points</p></div>
            <Icon name="trophy" size={18} />
          </div>
          <div style={{ marginTop: 12 }}>
            {leaderboard.map((row, i) => (
              <div className="leader-row" key={row.name}>
                <span className={`leader-rank ${i === 0 ? 'top' : ''}`}>{i + 1}</span>
                <div className="lr-main"><strong>{row.name}</strong><span>{row.label}</span></div>
                <span className="lr-score">{row.score.toLocaleString()}</span>
              </div>
            ))}
            <div className="leader-row" style={{ background: '#f4f7ff', borderRadius: 9, marginTop: 8, padding: '12px 10px' }}>
              <span className="leader-rank">14</span>
              <div className="lr-main"><strong>{user?.name || 'You'}</strong><span>Your rank</span></div>
              <span className="lr-score">980</span>
            </div>
          </div>
        </article>
      </section>

      <section className="page-section">
        <h3 className="section-title">Badges & achievements</h3>
        <p className="section-sub">Earn badges for streaks, personal records and challenges.</p>
        <div className="badge-grid">
          {badges.map((b) => (
            <div className={`badge-card ${b.earned ? '' : 'locked'}`} key={b.name}>
              <span className="badge-emoji">{b.emoji}</span><strong>{b.name}</strong><span>{b.detail}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
