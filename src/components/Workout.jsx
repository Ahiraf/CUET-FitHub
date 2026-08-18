import React from 'react';
import Workoutchart from './Workoutchart';
import Progresschart from './Progresschart';

export default function Workout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f6f8fc',
        padding: '30px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '25px' }}>
          <p
            style={{
              color: '#7c89a0',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Fitness Dashboard
          </p>

          <h1
            style={{
              color: '#182338',
              fontSize: '30px',
              margin: '8px 0',
            }}
          >
            My Workout
          </h1>

          <p
            style={{
              color: '#8994a6',
              fontSize: '13px',
              margin: 0,
            }}
          >
            Track your workouts and monitor your fitness progress.
          </p>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '15px',
            marginBottom: '15px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e8edf5',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <p style={{ color: '#7c879a', fontSize: '11px' }}>
              Workouts Completed
            </p>

            <h2 style={{ color: '#202c43', margin: 0 }}>
              08
            </h2>

            <small style={{ color: '#3aa77b' }}>
              +2 from last week
            </small>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e8edf5',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <p style={{ color: '#7c879a', fontSize: '11px' }}>
              Current Streak
            </p>

            <h2 style={{ color: '#202c43', margin: 0 }}>
              12 days
            </h2>

            <small style={{ color: '#3aa77b' }}>
              Keep going!
            </small>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e8edf5',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <p style={{ color: '#7c879a', fontSize: '11px' }}>
              Active Time
            </p>

            <h2 style={{ color: '#202c43', margin: 0 }}>
              06h 40m
            </h2>

            <small style={{ color: '#3aa77b' }}>
              +8% this week
            </small>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e8edf5',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <p style={{ color: '#7c879a', fontSize: '11px' }}>
              Personal Best
            </p>

            <h2 style={{ color: '#202c43', margin: 0 }}>
              92 kg
            </h2>

            <small style={{ color: '#3aa77b' }}>
              New record
            </small>
          </div>
        </div>

        {/* Charts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
          }}
        >
          <Workoutchart />
          <Progresschart />
        </div>

        {/* Workout List */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e8edf5',
            borderRadius: '12px',
            padding: '22px',
            marginTop: '15px',
          }}
        >
          <h2
            style={{
              color: '#253149',
              fontSize: '18px',
              marginTop: 0,
            }}
          >
            Recent Workouts
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px',
                background: '#f6f8fc',
                borderRadius: '8px',
              }}
            >
              <span>
                <strong>Upper Body Strength</strong>
              </span>

              <span style={{ color: '#778196' }}>
                45 min
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px',
                background: '#f6f8fc',
                borderRadius: '8px',
              }}
            >
              <span>
                <strong>Lower Body + Core</strong>
              </span>

              <span style={{ color: '#778196' }}>
                55 min
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px',
                background: '#f6f8fc',
                borderRadius: '8px',
              }}
            >
              <span>
                <strong>Functional Fitness</strong>
              </span>

              <span style={{ color: '#778196' }}>
                40 min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}