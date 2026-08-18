import React from 'react';
import Icon from '../Icon';

export function StatCard({ icon, label, value, detail, accent = 'blue', trend }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${accent}`}><Icon name={icon} size={19} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value-row">
        <strong>{value}</strong>
        {trend && <span className="trend"><Icon name="arrowUp" size={13} /> {trend}</span>}
      </div>
      <div className="stat-detail">{detail}</div>
    </article>
  );
}

export function QuickAction({ icon, title, description, tone = 'blue', onClick }) {
  return (
    <button className="quick-action" onClick={onClick} type="button">
      <span className={`quick-action-icon ${tone}`}><Icon name={icon} size={20} /></span>
      <span className="quick-action-copy"><strong>{title}</strong><small>{description}</small></span>
      <span className="quick-action-arrow"><Icon name="arrowRight" size={17} /></span>
    </button>
  );
}

// Small hourly bar chart reused for the occupancy heatmap.
export function HourBars({ data, peakHour }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="bars" aria-label="Occupancy by hour">
      {data.map((d) => (
        <div className={`bar-column ${d.hour === peakHour ? 'selected' : ''}`} key={d.hour} title={`${d.hour}: ${d.value} students`}>
          <span className="bar-track"><span className="bar-fill" style={{ height: `${Math.round((d.value / max) * 100)}%` }} /></span>
          <span className="bar-label">{d.hour}</span>
        </div>
      ))}
    </div>
  );
}
