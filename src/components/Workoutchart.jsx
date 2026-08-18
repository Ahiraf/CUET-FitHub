import React, { useState } from 'react';

const weeklyActivity = [
  { day: 'Mon', value: 58 },
  { day: 'Tue', value: 76 },
  { day: 'Wed', value: 46 },
  { day: 'Thu', value: 88 },
  { day: 'Fri', value: 63 },
  { day: 'Sat', value: 35 },
  { day: 'Sun', value: 12 },
];

export default function Workoutchart() {
  const [selectedDay, setSelectedDay] = useState('Thu');

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e8edf5',
        borderRadius: '12px',
        padding: '22px',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <h2
            style={{
              color: '#253149',
              fontSize: '18px',
              margin: 0,
            }}
          >
            Weekly Activity
          </h2>

          <p
            style={{
              color: '#9ca5b4',
              fontSize: '12px',
              margin: '5px 0 0',
            }}
          >
            Minutes active per day
          </p>
        </div>

        <div
          style={{
            color: '#94a0b1',
            fontSize: '11px',
          }}
        >
          ● This week
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px',
          height: '180px',
          marginTop: '25px',
        }}
      >
        {weeklyActivity.map((item) => (
          <button
            key={item.day}
            onClick={() => setSelectedDay(item.day)}
            type="button"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '140px',
                background: '#f1f3f8',
                borderRadius: '6px 6px 3px 3px',
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${item.value}%`,
                  minHeight: '7px',
                  background:
                    selectedDay === item.day
                      ? 'linear-gradient(180deg, #304fc7, #6c85ee)'
                      : 'linear-gradient(180deg, #758bf2, #536fe5)',
                  borderRadius: '6px 6px 3px 3px',
                }}
              />
            </div>

            <span
              style={{
                color: selectedDay === item.day ? '#5069d9' : '#9da6b6',
                fontSize: '10px',
                fontWeight: selectedDay === item.day ? '800' : '400',
                marginTop: '9px',
              }}
            >
              {item.day}
            </span>
          </button>
        ))}
      </div>

      <p
        style={{
          marginTop: '15px',
          color: '#778196',
          fontSize: '12px',
        }}
      >
        Selected day: <strong>{selectedDay}</strong>
      </p>
    </div>
  );
}