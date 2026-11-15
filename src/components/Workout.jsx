import React from 'react';
import { useState } from 'react';
import Icon from '../Icon';
import { StatCard } from './ui';
import { useToast } from '../context/ToastContext';
import { useApi } from '../hooks/useApi';
import api from '../api';
import { recordWorkoutExercise, startWorkoutPlan } from '../store';
import { useAuth } from '../context/AuthContext';
import { completeActiveWorkoutItem, finishActiveWorkout, getActiveWorkout, getWorkoutSessions } from '../store';

const recent = [
  { title: 'Upper Body Strength', meta: 'Yesterday', mins: 45 },
  { title: 'Lower Body + Core', meta: 'Mon', mins: 55 },
  { title: 'Functional Fitness', meta: 'Sat', mins: 40 },
];

export default function Workout({ embedded = false } = {}) {
  const showToast = useToast();
  const { user } = useAuth();
  const [activeWorkout, setActiveWorkout] = useState(() => getActiveWorkout(user));
  const [sessions, setSessions] = useState(() => getWorkoutSessions(user));
  const { data: routine, setData: setRoutine } = useApi(() => api.getMyRoutine(), []);
  const { data: plannedExercises } = useApi(() => api.getPlan(), []);

  const items = routine?.items || [];
  const done = items.filter((i) => i.done).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  const toggle = async (item) => {
    const completed = !item.done;
    setRoutine({ ...routine, items: items.map((i) => (i.id === item.id ? { ...i, done: completed } : i)) });
    recordWorkoutExercise(user, item.id, completed);
    try {
      await api.toggleRoutineItem(item.id);
      if (completed) showToast(`Nice — ${item.name} done!`);
    } catch (e) {
      recordWorkoutExercise(user, item.id, item.done);
      setRoutine({ ...routine, items });
      showToast(e.message);
    }
  };

  return (
    <div className="dashboard-container">
      {!embedded && <header className="page-head">
        <p className="eyebrow">Fitness dashboard</p>
        <h1>My Workout</h1>
        <p className="page-sub">Follow your assigned routine, check off exercises, and track how your training is trending.</p>
      </header>}

      <section className="grid-4" style={{ marginTop: 22 }}>
        <StatCard accent="blue" detail="+2 from last week" icon="activity" label="Workouts completed" trend="12%" value="08" />
        <StatCard accent="orange" detail="Keep going!" icon="fire" label="Current streak" value="12 days" />
        <StatCard accent="violet" detail="+8% this week" icon="clock" label="Active time" value="06h 40m" />
        <StatCard accent="green" detail="New record" icon="target" label="Personal best" value="92 kg" />
      </section>

      {sessions.length > 0 && <section className="panel page-section"><div className="panel-header"><div><h2 className="panel-title">Workout history</h2><p className="panel-subtitle">Your saved sessions and exercise status</p></div></div><div className="list">{sessions.map((session) => <article className="workout-session-row" key={session.id}><div className="workout-session-head"><strong>{new Date(session.startedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</strong><span className={`tag ${session.status === 'completed' ? 'green' : session.status === 'ended' ? 'grey' : 'blue'}`}>{session.status === 'completed' ? 'Completed' : session.status === 'ended' ? 'Ended early' : 'In progress'}</span></div><p>{session.items.filter((item) => item.done).length} of {session.items.length} exercises complete</p><div className="workout-session-exercises">{session.items.map((item) => <span className={item.done ? 'is-complete' : ''} key={item.id}>{item.done ? '✓' : '○'} {item.name}</span>)}</div></article>)}</div></section>}

      <section className="content-grid split-wide" style={{ marginTop: 15 }}>
        <article className="panel">
          <div className="panel-header">
            <div><h2 className="panel-title">Today's routine</h2><p className="panel-subtitle">{activeWorkout ? `Started ${new Date(activeWorkout.startedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}` : plannedExercises?.length ? 'Your saved plan · ready when you are' : routine ? `Assigned by ${routine.coach}` : 'Loading…'}</p></div>
            {(activeWorkout || plannedExercises?.length > 0) && <div className="panel-header-actions"><span className="tag blue">{activeWorkout ? `${activeWorkout.items.filter((item) => item.done).length}/${activeWorkout.items.length} done` : `${plannedExercises.length} planned`}</span>{activeWorkout && <button className="btn sm" type="button" onClick={() => { const finished = finishActiveWorkout(user); setActiveWorkout(null); setSessions((previous) => [finished, ...previous.filter((session) => session.id !== finished.id)]); showToast('Workout saved to your history.'); }}>Finish workout</button>}</div>}
          </div>
          {activeWorkout ? (
            <><div className="progress-track" style={{ marginTop: 16 }}><div className="progress-fill blue" style={{ width: `${Math.round(activeWorkout.items.filter((item) => item.done).length / activeWorkout.items.length * 100)}%` }} /></div><div className="list" style={{ marginTop: 16 }}>{activeWorkout.items.map((item) => <div className={`exercise-item ${item.done ? 'done' : ''}`} key={item.id}><button className="ex-check" type="button" aria-label={`${item.done ? 'Mark' : 'Complete'} ${item.name}`} onClick={() => { const updated = completeActiveWorkoutItem(user, item.id, !item.done); setActiveWorkout(updated); if (!item.done) showToast(`${item.name} completed — nice work!`); }}><Icon name="check" size={16} /></button><div className="ex-main"><strong>{item.name}</strong><span>{item.done ? 'Completed' : 'In progress'}</span></div></div>)}</div></>
          ) : plannedExercises?.length ? (
            <><div className="list" style={{ marginTop: 16 }}>{plannedExercises.map((name, index) => <div className="exercise-item" key={`${name}-${index}`}><span className="row-icon">{index + 1}</span><div className="ex-main"><strong>{name}</strong><span>Planned</span></div></div>)}</div><button className="btn" style={{ marginTop: 14 }} type="button" onClick={() => { const session = startWorkoutPlan(user, plannedExercises); setActiveWorkout(session); showToast('Workout started. Your progress will update as you complete exercises.'); }}><Icon name="bolt" size={14} /> Start today’s plan</button></>
          ) : routine ? (
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

    </div>
  );
}
