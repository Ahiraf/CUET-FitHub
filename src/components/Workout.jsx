import React from 'react';
import Workoutchart from './Workoutchart';
import Progresschart from './Progresschart';
import Icon from '../Icon';
import { StatCard } from './ui';
import { useToast } from '../context/ToastContext';
import { useApi } from '../hooks/useApi';
import api from '../api';

const recent = [
  { title: 'Upper Body Strength', meta: 'Yesterday', mins: 45 },
  { title: 'Lower Body + Core', meta: 'Mon', mins: 55 },
  { title: 'Functional Fitness', meta: 'Sat', mins: 40 },
];

export default function Workout() {
  const showToast = useToast();
  const { data: routine, setData: setRoutine } = useApi(() => api.getMyRoutine(), []);

  const items = routine?.items || [];
  const done = items.filter((i) => i.done).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  const toggle = async (item) => {
    setRoutine({ ...routine, items: items.map((i) => (i.id === item.id ? { ...i, done: !i.done } : i)) });
    try {
      await api.toggleRoutineItem(item.id);
      if (!item.done) showToast(`Nice — ${item.name} done!`);
    } catch (e) { showToast(e.message); }
  };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Fitness dashboard</p>
        <h1>My Workout</h1>
        <p className="page-sub">Follow your assigned routine, check off exercises, and track how your training is trending.</p>
      </header>

      <section className="grid-4" style={{ marginTop: 22 }}>
        <StatCard accent="blue" detail="+2 from last week" icon="activity" label="Workouts completed" trend="12%" value="08" />
        <StatCard accent="orange" detail="Keep going!" icon="fire" label="Current streak" value="12 days" />
        <StatCard accent="violet" detail="+8% this week" icon="clock" label="Active time" value="06h 40m" />
        <StatCard accent="green" detail="New record" icon="target" label="Personal best" value="92 kg" />
      </section>

      <section className="content-grid split-wide" style={{ marginTop: 15 }}>
        <article className="panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Today's routine</h2><p className="panel-subtitle">{routine ? `Assigned by ${routine.coach}` : 'Loading…'}</p></div>
            {routine && <span className="tag blue">{done}/{items.length} done</span>}
          </div>
          {routine ? (
            <>
              <div className="progress-track" style={{ marginTop: 16 }}><div className="progress-fill blue" style={{ width: `${pct}%` }} /></div>
              <div className="list" style={{ marginTop: 16 }}>
                {items.map((item) => (
                  <div className={`exercise-item ${item.done ? 'done' : ''}`} key={item.id}>
                    <button className="ex-check" onClick={() => toggle(item)} type="button" aria-label={`Toggle ${item.name}`}><Icon name="check" size={16} /></button>
                    <div className="ex-main"><strong>{item.name}</strong><span>{item.target}</span></div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state" style={{ padding: '30px 12px' }}><Icon name="clipboard" size={26} /> No routine assigned yet. Your trainer can assign one.</div>
          )}
        </article>

        <article className="panel" style={{ alignSelf: 'flex-start' }}>
          <h2 className="panel-title">Recent workouts</h2>
          <p className="panel-subtitle">Your last few sessions</p>
          <div className="list" style={{ marginTop: 16 }}>
            {recent.map((r) => (
              <div className="list-row" key={r.title}>
                <span className="row-icon"><Icon name="dumbbell" size={17} /></span>
                <div className="row-main"><strong>{r.title}</strong><span>{r.meta}</span></div>
                <div className="row-meta"><strong>{r.mins} min</strong></div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid-2 page-section">
        <Workoutchart />
        <Progresschart />
      </section>
    </div>
  );
}
