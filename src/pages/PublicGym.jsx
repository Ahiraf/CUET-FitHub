import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useApi } from '../hooks/useApi';

function GymPage({ title, children }) {
  return <main className="gym-info">
    <Link to="/">← CUET FitHub</Link>
    <h1>{title}</h1>
    {children}
  </main>;
}

export function AboutGym() {
  return <GymPage title="About the CUET gym">
    <p>The campus gym is free for verified CUET students. The gym front desk is on the ground floor of the TSC building.</p>
    <h2>Plan your visit</h2>
    <p>Check occupancy against the gym’s 50-student capacity in FitHub. Once signed in, you can join classes, request a trainer session, or report an equipment issue.</p>
    <Link to="/announcements">Read gym announcements</Link>
  </GymPage>;
}

export function CommunityNotices() {
  const { data, loading, error, reload } = useApi(api.getAnnouncements, []);
  return <GymPage title="CUET Community announcements">
    {loading && <p role="status">Loading announcements…</p>}
    {error && <p role="alert">Announcements could not be loaded. <button onClick={reload}>Try again</button></p>}
    {data?.length === 0 && <p>There are no announcements yet.</p>}
    {data?.map(notice => <article key={notice.id}>
      <small>{notice.type} · {notice.date}</small>
      <h2>{notice.title}</h2><p>{notice.body}</p>
    </article>)}
  </GymPage>;
}
