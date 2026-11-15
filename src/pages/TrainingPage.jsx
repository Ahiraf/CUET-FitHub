import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Exercises from './Exercises';
import Workout from '../components/Workout';
import ProgressPage from './ProgressPage';

const sections = [
  { id: 'plan', label: 'Build a plan' },
  { id: 'workout', label: 'My workout' },
  { id: 'progress', label: 'Progress' },
];

export default function TrainingPage() {
  const [searchParams] = useSearchParams();
  const [section, setSection] = useState(() => sections.some((item) => item.id === searchParams.get('tab')) ? searchParams.get('tab') : 'plan');

  return <div className="dashboard-container training-page">
    <header className="page-head">
      <p className="eyebrow">Your fitness, together</p>
      <h1>Training</h1>
      <p className="page-sub">Build a plan, complete your workout, and follow your progress in one place.</p>
    </header>
    <nav className="tabs training-tabs" aria-label="Training sections" role="tablist">
      {sections.map((item) => <button
        key={item.id}
        id={`training-tab-${item.id}`}
        className={`tab ${section === item.id ? 'active' : ''}`}
        type="button"
        role="tab"
        aria-selected={section === item.id}
        aria-controls="training-tab-panel"
        onClick={() => setSection(item.id)}
      >{item.label}</button>)}
    </nav>
    <section id="training-tab-panel" className="training-tab-panel" role="tabpanel" aria-labelledby={`training-tab-${section}`}>
      {section === 'plan' && <Exercises embedded onStarted={() => setSection('workout')} />}
      {section === 'workout' && <Workout embedded />}
      {section === 'progress' && <ProgressPage embedded />}
    </section>
  </div>;
}
