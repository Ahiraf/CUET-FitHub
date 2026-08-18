import React from 'react';
import { progressSeries } from '../data';

export default function Progresschart() {
  const values = progressSeries.map((p) => p.strength);
  const max = Math.max(...values);

  return (
    <div className="panel">
      <div className="panel-header">
        <div><h2 className="panel-title">Fitness Progress</h2><p className="panel-subtitle">Strength over the last 6 months</p></div>
        <span className="tag green">+67%</span>
      </div>
      <div className="bars" aria-label="Fitness progress chart">
        {progressSeries.map((item) => (
          <div className="bar-column" key={item.month} title={`${item.month}: ${item.strength}`}>
            <span className="bar-track"><span className="bar-fill" style={{ height: `${Math.round((item.strength / max) * 100)}%` }} /></span>
            <span className="bar-label">{item.month}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, color: '#778196', fontSize: 11 }}>
        <span>Starting: 55</span><span>Current: 92</span>
      </div>
    </div>
  );
}
