import React from 'react';

const progressData = [
  { month: 'Jan', value: 55 },
  { month: 'Feb', value: 62 },
  { month: 'Mar', value: 68 },
  { month: 'Apr', value: 72 },
  { month: 'May', value: 82 },
  { month: 'Jun', value: 92 },
];

export default function Progresschart() {
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
            Fitness Progress
          </h2>

          <p
            style={{
              color: '#9ca5b4',
              fontSize: '12px',
              margin: '5px 0 0',
            }}
          >
            Personal progress over the last 6 months
          </p>
        </div>

        <span
          style={{
            color: '#3aa77b',
            fontSize: '12px',
            fontWeight: '700',
          }}
        >
          +67%
        </span>
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
        {progressData.map((item) => (
          <div
            key={item.month}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
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
                  background: 'linear-gradient(180deg, #758bf2, #536fe5)',
                  borderRadius: '6px 6px 3px 3px',
                }}
              />
            </div>

            <span
              style={{
                color: '#9da6b6',
                fontSize: '10px',
                marginTop: '9px',
              }}
            >
              {item.month}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '15px',
          color: '#778196',
          fontSize: '11px',
        }}
      >
        <span>Starting: 55</span>
        <span>Current: 92</span>
      </div>
    </div>
  );
}