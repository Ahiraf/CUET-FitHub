import React from 'react';
import Icon from '../Icon';
import { progressSeries, badges, leaderboard } from '../data';

// Build an SVG polyline from a numeric series scaled into the viewbox.
function linePoints(values, w, h, pad = 8) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = (w - pad * 2) / (values.length - 1);
  return values.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / span) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

export default function ProgressPage({ user }) {
  const W = 560;
  const H = 200;
  const strength = progressSeries.map((p) => p.strength);
  const weight = progressSeries.map((p) => p.weight);
  const bmi = 22.4;

  return (
    <div className="dashboard-container">
      <header className="page-head">
        <p className="eyebrow">Your analytics</p>
        <h1>Progress</h1>
        <p className="page-sub">Track your strength, body weight and consistency over time, and see how you stack up on the CUET leaderboard.</p>
      </header>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Strength & weight trend</h2>
              <p className="panel-subtitle">Last 6 months</p>
            </div>
            <div className="chart-legend"><span className="legend-dot" /> Strength <span className="legend-dot" style={{ background: '#e0a63c', marginLeft: 8 }} /> Weight</div>
          </div>

          <div className="line-chart">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Strength and weight trend chart">
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#eef1f7" strokeWidth="1" />
              ))}
              <polyline fill="none" stroke="#546fe5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={linePoints(strength, W, H)} />
              <polyline fill="none" stroke="#e0a63c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" points={linePoints(weight, W, H)} />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, color: '#9da6b6', fontSize: 10 }}>
              {progressSeries.map((p) => <span key={p.month}>{p.month}</span>)}
            </div>
          </div>

          <div className="metric-row">
            <div className="metric"><div className="m-label">Strength score</div><div className="m-value">92</div><div className="m-delta">+67% since Jan</div></div>
            <div className="metric"><div className="m-label">Body weight</div><div className="m-value">92<span style={{ fontSize: 12 }}> kg</span></div><div className="m-delta">+2.1 kg this month</div></div>
            <div className="metric"><div className="m-label">BMI</div><div className="m-value">{bmi}</div><div className="m-delta">Healthy range</div></div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Department leaderboard</h2>
              <p className="panel-subtitle">This month · points</p>
            </div>
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
              <span className="badge-emoji">{b.emoji}</span>
              <strong>{b.name}</strong>
              <span>{b.detail}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
