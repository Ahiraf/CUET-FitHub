import React, { useEffect, useState } from 'react';
import { request, USE_HTTP } from '../api/client';
import { useAuth } from '../context/AuthContext';
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

function buildActivityData(history, range, today) {

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

export default function WorkoutActivity({ weeklyOnly = false }) {
  const { user } = useAuth();
  const [range, setRange] = useState('week');
  const [result, setResult] = useState(null);
  const today = USE_HTTP
    ? new Date(new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Dhaka' }) + 'T12:00:00')
    : new Date();
  const start = range === 'year' ? new Date(today.getFullYear(), today.getMonth() - 11, 1)
    : addDays(today, range === 'week' ? -6 : -29);
  const first = dateKey(start);
  const last = dateKey(today);
  const query = first + '/' + last + '/' + user?.email;
  const history = result?.query === query ? result.history : null;
  const error = result?.query === query && result.error;
  useEffect(() => {
    let active = true;
    let fetching = false;
    async function refresh() {
      if (fetching || !user) return;
      fetching = true;
      try {
        const history = USE_HTTP
          ? await request(`/api/workout-activity?start=${first}&end=${last}`)
          : getWorkoutActivity(user);
        if (active) setResult({ query, history });
      } catch (err) {
        if (active) setResult(previous => ({
          query, history: previous?.query === query ? previous.history : null, error: err.message,
        }));
      } finally {
        fetching = false;
      }
    }
    refresh();
    const timer = window.setInterval(refresh, 30000);
    window.addEventListener('focus', refresh);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
    };
  }, [query, first, last, user]);
  const spanLabel = { week: 'Last 7 days', month: 'Last 30 days', year: 'Last 12 calendar months' }[range];
  const formatDate = date => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const startLabel = formatDate(start);
  const endLabel = formatDate(today);
  const activity = buildActivityData(history || [], range, today);
  const totals = activity.reduce((total, item) => ({
    minutes: total.minutes + item.minutes,
    exercises: total.exercises + item.exercises,
    sessions: total.sessions + item.sessions,
  }), { minutes: 0, exercises: 0, sessions: 0 });
  const chartMax = Math.max(60, ...activity.map((item) => item.minutes));

  return (
        <article className="panel">
          <div className="panel-header">
            <div><h2 className="panel-title">{weeklyOnly ? 'Weekly activity' : 'Workout activity'}</h2><p className="panel-subtitle">{spanLabel} · {startLabel} – {endLabel}<br />Estimated minutes from completed exercises</p></div>
            {!weeklyOnly && <div className="tabs progress-range-tabs">
              {RANGE_OPTIONS.map((option) => <button className={`tab ${range === option.key ? 'active' : ''}`} key={option.key} onClick={() => setRange(option.key)} type="button">{option.label}</button>)}
            </div>}
          </div>

          {error && <p role="status">{error} Retrying automatically.</p>}
          {!history && !error && <p role="status">Loading workout activity…</p>}
          {history && <><div className="progress-chart" aria-label={`Workout activity for the selected ${range}`}>
            <div className="progress-chart-y-axis"><span>{chartMax}m</span><span>{Math.round(chartMax / 2)}m</span><span>0m</span></div>
            <div className="bars progress-activity-bars">
              {activity.map((item) => <div className="bar-column" key={item.title} title={`${item.title}: ${item.minutes} minutes, ${item.exercises} exercises`}>
                <span className="bar-track"><span className="bar-fill" style={{ height: `${item.minutes ? (item.minutes / chartMax) * 100 : 0}%` }} /></span>
                <span className="bar-label">{item.label}</span>
              </div>)}
            </div>
          </div>

          {!weeklyOnly && <div className="metric-row">
            <div className="metric"><div className="m-label">Training days</div><div className="m-value">{totals.sessions}</div><div className="m-delta">Days with completed exercises</div></div>
            <div className="metric"><div className="m-label">Active time</div><div className="m-value">{formatMinutes(totals.minutes)}</div><div className="m-delta">Estimated from your log</div></div>
            <div className="metric"><div className="m-label">Exercises done</div><div className="m-value">{totals.exercises}</div><div className="m-delta">Marked complete in My Workout</div></div>
          </div>
          }
          {totals.exercises === 0 && <p className="progress-empty">No completed exercises in this period yet. Check off exercises in My Workout to start tracking.</p>}
          </>}
        </article>
  );
}
