import React from 'react';

// Single shared icon set for the whole app. Add new glyphs here only.
export const iconPaths = {
  activity: 'M3 12h4l2-7 4 14 2-7h6',
  arrow: 'M5 12h13m-5-5 5 5-5 5',
  arrowRight: 'M5 12h13m-5-5 5 5-5 5',
  arrowUp: 'M5 15l5-5 3 3 6-7M15 6h4v4',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
  bolt: 'm13 2-9 12h7l-1 8 9-12h-7l1-8Z',
  calendar: 'M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  chart: 'M5 20V10m7 10V4m7 16v-7',
  check: 'm5 12 4 4L19 6',
  chevron: 'm6 9 6 6 6-6',
  clipboard: 'M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Zm-1 2H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2m-8 6h8m-8 4h5',
  clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  dumbbell: 'M6 8v8m12-8v8M3 10v4m18-4v4M6 12h12',
  fire: 'M12 22c4 0 7-2.8 7-6.8 0-2.7-1.4-5-3.8-7.2.1 2.2-1 3.3-2.1 4.1.2-4.4-1.7-7-5.2-10.1.1 4.5-3 6.7-3 10.1C3.9 17.1 7.1 22 12 22Z',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  heart: 'M12 20s-7-4.35-9.5-8.5C.9 8.8 2.3 5.5 5.5 5.5c1.9 0 3.2 1 4.5 2.5 1.3-1.5 2.6-2.5 4.5-2.5 3.2 0 4.6 3.3 3 6C19 15.65 12 20 12 20Z',
  help: 'M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4m.1 3h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
  info: 'M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  leaf: 'M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 8-4 13-9 13Zm-6 0c1.5-5 5-8 9-9',
  logout: 'M15 12H3m0 0 4-4m-4 4 4 4M9 4h9a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9',
  megaphone: 'M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1Zm14-3a4 4 0 0 1 0 8',
  menu: 'M4 6h16M4 12h16M4 18h16',
  play: 'm10 8 6 4-6 4V8Z',
  plus: 'M12 5v14M5 12h14',
  search: 'm21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.4-3.5 1.3-1-.9-2.1-1.6.2a7 7 0 0 0-1.2-1.2l.2-1.6-2.1-.9-1 1.3a7 7 0 0 0-1.7 0l-1-1.3-2.1.9.2 1.6A7 7 0 0 0 8.3 9l-1.6-.2-.9 2.1 1.3 1a7 7 0 0 0 0 1.7l-1.3 1 .9 2.1 1.6-.2a7 7 0 0 0 1.2 1.2l-.2 1.6 2.1.9 1-1.3a7 7 0 0 0 1.7 0l1 1.3 2.1-.9-.2-1.6a7 7 0 0 0 1.2-1.2l1.6.2.9-2.1-1.3-1a7 7 0 0 0 0-1.7Z',
  shield: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Zm-2.5 8.5 1.8 1.8 3.7-3.8',
  star: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.9 1-5.8L3.5 9.2l5.9-.9L12 3Z',
  target: 'M12 12h.01M19.1 4.9a10 10 0 1 1-14.2 0M16.3 7.7a6 6 0 1 1-8.6 0',
  ticket: 'M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Zm10-2v12',
  trophy: 'M8 4h8v3a4 4 0 0 1-8 0V4Zm-3 1H4a2 2 0 0 0 0 4h1m14-4h1a2 2 0 0 1 0 4h-1M10 14h4m-2 0v4m-3 2h6',
  user: 'M20 21a8 8 0 0 0-16 0m8-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-3a4 4 0 0 1 0 7.7M22 21v-2a4 4 0 0 0-3-3.9',
  wrench: 'M14.5 6.5a3.5 3.5 0 0 0-4.9 4.2l-6 6 2.7 2.7 6-6a3.5 3.5 0 0 0 4.2-4.9l-2.1 2.1-1.9-1.9 2-2.1Z',
  x: 'M6 6l12 12M18 6 6 18',
};

export default function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d={iconPaths[name] || iconPaths.info} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
  );
}
