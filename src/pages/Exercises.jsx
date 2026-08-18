import React, { useMemo, useState } from 'react';
import Icon from '../Icon';
import { exerciseLibrary, muscleGroups } from '../data';
import { loadJSON, saveJSON, userKey } from '../store';

export default function Exercises({ user, showToast }) {
  const planKey = userKey(user, 'plan');
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const [plan, setPlan] = useState(() => loadJSON(planKey, []));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exerciseLibrary.filter((ex) => {
      const matchesGroup = group === 'All' || ex.muscle === group;
      const matchesQuery = !q || ex.name.toLowerCase().includes(q) || ex.muscle.toLowerCase().includes(q);
      return matchesGroup && matchesQuery;
    });
  }, [query, group]);

  const inPlan = (name) => plan.includes(name);

  const togglePlan = (name) => {
    const next = inPlan(name) ? plan.filter((n) => n !== name) : [...plan, name];
    setPlan(next);
    saveJSON(planKey, next);
    showToast?.(inPlan(name) ? `Removed ${name} from your plan.` : `Added ${name} to your next workout.`);
  };

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Fitness library</p>
        <h1>Exercises</h1>
        <p className="page-sub">Browse the CUET gym exercise library and build the plan for your next session. Your plan is saved automatically.</p>
      </header>

      <section className="content-grid" style={{ gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, .65fr)' }}>
        <article className="panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Exercise catalog</h2>
              <p className="panel-subtitle">{filtered.length} exercises</p>
            </div>
          </div>

          <div className="form-grid" style={{ gridTemplateColumns: '1.4fr 1fr', marginTop: 16 }}>
            <div className="field">
              <label htmlFor="ex-search">Search</label>
              <input id="ex-search" className="text-input" placeholder="Search by name or muscle" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="ex-group">Muscle group</label>
              <select id="ex-group" className="select" value={group} onChange={(e) => setGroup(e.target.value)}>
                {muscleGroups.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="list">
            {filtered.map((ex) => (
              <div className="list-row" key={ex.name}>
                <span className="row-icon"><Icon name="dumbbell" size={18} /></span>
                <div className="row-main">
                  <strong>{ex.name}</strong>
                  <span>{ex.muscle} · {ex.equipment}</span>
                </div>
                <span className={`tag ${ex.difficulty === 'Advanced' ? 'red' : ex.difficulty === 'Intermediate' ? 'orange' : 'green'}`}>{ex.difficulty}</span>
                <button className={`btn sm ${inPlan(ex.name) ? 'ghost' : ''}`} onClick={() => togglePlan(ex.name)} type="button">
                  {inPlan(ex.name) ? 'Added' : <><Icon name="plus" size={13} /> Plan</>}
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="empty-state"><Icon name="search" size={26} /> No exercises match your search.</div>
            )}
          </div>
        </article>

        <article className="panel" style={{ alignSelf: 'flex-start' }}>
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Next workout plan</h2>
              <p className="panel-subtitle">{plan.length} exercise{plan.length === 1 ? '' : 's'} queued</p>
            </div>
            {plan.length > 0 && (
              <button className="panel-link" onClick={() => { setPlan([]); saveJSON(planKey, []); showToast?.('Plan cleared.'); }} type="button">Clear</button>
            )}
          </div>

          {plan.length === 0 ? (
            <div className="empty-state" style={{ padding: '30px 12px' }}>
              <Icon name="clipboard" size={26} />
              Add exercises from the catalog to plan your next session.
            </div>
          ) : (
            <div className="list" style={{ marginTop: 16 }}>
              {plan.map((name, i) => (
                <div className="exercise-item" key={name}>
                  <span className="row-icon" style={{ background: '#eef2ff' }}>{i + 1}</span>
                  <div className="ex-main"><strong>{name}</strong><span>Planned</span></div>
                  <button className="ex-check" onClick={() => togglePlan(name)} title="Remove" type="button"><Icon name="check" size={16} /></button>
                </div>
              ))}
              <button className="btn full" style={{ marginTop: 6 }} onClick={() => showToast?.('Plan sent to My Workout for your next session.')} type="button">
                <Icon name="bolt" size={14} /> Start this plan
              </button>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
