import React, { useMemo, useState } from 'react';
import Icon from '../Icon';
import { useAuth } from '../context/AuthContext';
import { badges, leaderboard } from '../data';
import { getWorkoutActivity } from '../store';

const RANGE_OPTIONS = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
];

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function sumRange(history, start, end) {
  const first = dateKey(start);
  const last = dateKey(end);
  return history.reduce((total, item) => (
    item.date >= first && item.date <= last
      ? {
        minutes: total.minutes + item.minutes,
        exercises: total.exercises + item.exercises,
        sessions: total.sessions + item.sessions,
      }
      : total
  ), { minutes: 0, exercises: 0, sessions: 0 });
}

function buildActivityData(history, range) {
  const today = new Date();

  if (range === 'week') {
    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(today, index - 6);
      const day = history.find((item) => item.date === dateKey(date));
      return {
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        title: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        ...(day || { minutes: 0, exercises: 0, sessions: 0 }),
      };
    });
  }

  if (range === 'month') {
    return Array.from({ length: 5 }, (_, index) => {
      const start = addDays(today, -29 + index * 7);
      const end = index === 4 ? today : addDays(start, 6);
      return {
        label: `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()}`,
        title: `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        ...sumRange(history, start, end),
      };
    });
  }

  return Array.from({ length: 12 }, (_, index) => {
    const start = new Date(today.getFullYear(), today.getMonth() - 11 + index, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    return {
      label: start.toLocaleDateString('en-US', { month: 'short' }),
      title: start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      ...sumRange(history, start, end),
    };
  });
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
}

export default function ProgressPage() {
  const { user } = useAuth();
  const [range, setRange] = useState('week');
  const history = getWorkoutActivity(user);
  const activity = useMemo(() => buildActivityData(history, range), [history, range]);
  const totals = activity.reduce((total, item) => ({
    minutes: total.minutes + item.minutes,
    exercises: total.exercises + item.exercises,
    sessions: total.sessions + item.sessions,
  }), { minutes: 0, exercises: 0, sessions: 0 });
  const chartMax = Math.max(60, ...activity.map((item) => item.minutes));

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Your analytics</p>
        <h1>Progress</h1>
        <p className="page-sub">See how many training days, exercises and active minutes you have completed.</p>
      </header>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Workout activity</h2><p className="panel-subtitle">Minutes estimated from completed exercises</p></div>
            <div className="tabs progress-range-tabs">
              {RANGE_OPTIONS.map((option) => <button className={`tab ${range === option.key ? 'active' : ''}`} key={option.key} onClick={() => setRange(option.key)} type="button">{option.label}</button>)}
            </div>
          </div>

          <div className="progress-chart" aria-label={`Workout activity for the selected ${range}`}>
            <div className="progress-chart-y-axis"><span>{chartMax}m</span><span>{Math.round(chartMax / 2)}m</span><span>0m</span></div>
            <div className="bars progress-activity-bars">
              {activity.map((item) => <div className="bar-column" key={item.title} title={`${item.title}: ${item.minutes} minutes, ${item.exercises} exercises`}>
                <span className="bar-track"><span className="bar-fill" style={{ height: `${item.minutes ? Math.max(8, Math.round((item.minutes / chartMax) * 100)) : 0}%` }} /></span>
                <span className="bar-label">{item.label}</span>
              </div>)}
            </div>
          </div>

          <div className="metric-row">
            <div className="metric"><div className="m-label">Training days</div><div className="m-value">{totals.sessions}</div><div className="m-delta">Days with completed exercises</div></div>
            <div className="metric"><div className="m-label">Active time</div><div className="m-value">{formatMinutes(totals.minutes)}</div><div className="m-delta">Estimated from your log</div></div>
            <div className="metric"><div className="m-label">Exercises done</div><div className="m-value">{totals.exercises}</div><div className="m-delta">Marked complete in My Workout</div></div>
          </div>
          {totals.exercises === 0 && <p className="progress-empty">No completed exercises in this period yet. Check off exercises in My Workout to start tracking.</p>}
        </article>

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
