import React, { useState } from 'react';
import { weeklyActivity } from '../data';

export default function Workoutchart() {
  const [selectedDay, setSelectedDay] = useState('Thu');

  return (
    <div className="panel">
      <div className="panel-header">
        <div><h2 className="panel-title">Weekly Activity</h2><p className="panel-subtitle">Minutes active per day</p></div>
        <div className="chart-legend"><span className="legend-dot" /> This week</div>
      </div>
      <div className="bars" aria-label="Weekly activity chart">
        {weeklyActivity.map((item) => (
          <button
            className={`bar-column ${selectedDay === item.day ? 'selected' : ''}`}
            key={item.day}
            onClick={() => setSelectedDay(item.day)}
            type="button"
            aria-label={`${item.day}: ${item.value} minutes`}
          >
            <span className="bar-track"><span className="bar-fill" style={{ height: `${item.value}%` }} /></span>
            <span className="bar-label">{item.day}</span>
          </button>
        ))}
      </div>
      <p style={{ marginTop: 15, color: '#778196', fontSize: 12 }}>Selected day: <strong>{selectedDay}</strong></p>
    </div>
  );
}
