import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './AboutGym.css';
import { useApi } from '../hooks/useApi';

function GymPage({ title, children }) {
  return <main className="gym-info">
    <Link to="/">← CUET FitHub</Link>
    <h1>{title}</h1>
    {children}
  </main>;
}

const equipmentPhotos = [
  ['treadmill', 'Treadmill', 'Treadmill beside the red and blue exercise mats'],
  ['exercise-bike', 'Indoor cycling bike', 'Stationary bike with an adjustable saddle and handlebars'],
  ['vault', 'Vaulting table', 'Padded vaulting table in the gymnastics area'],
  ['training-floor', 'Training floor', 'Open mat space surrounded by training stations'],
  ['pulldown', 'Cable pulldown', 'Cable station with a wide overhead bar'],
  ['stability-ball', 'Floor equipment', 'Stability ball and dumbbells on the gym floor'],
  ['strength-machine', 'Strength station', 'Seated resistance machine by the brick wall'],
  ['gymnastics-bars', 'Gymnastics bars', 'Horizontal bars mounted on a red frame'],
];

export function AboutGym() {
  return <main className="gym-tour">
    <nav aria-label="About page navigation"><Link to="/">← CUET FitHub</Link></nav>
    <header className="gym-tour-hero">
      <img src="/gym/gymnasium.jpg" alt="The illuminated glass and brick entrance of CUET Gymnasium at night" />
      <div><h1>CUET Gymnasium</h1><p>Central Field Road · CUET campus</p></div>
    </header>
    <section className="gym-tour-visit">
      <div>
        <h2>Plan your visit</h2>
        <p>Find the gymnasium on Central Field Road, near the CUET Central Field in Pahartali, Chattogram 4349. It’s part of the university’s sports facilities, alongside the central playground, cricket and football fields, and basketball courts.</p>
        <p>The gym is free for verified CUET students. Sign in to check occupancy against the 50-student capacity, book a class, request a trainer session, or report an equipment issue.</p>
        <Link to="/announcements">Read gym announcements →</Link>
      </div>
      <figure><img src="/gym/central-field.jpg" alt="View of the gymnasium across the grass at dusk" /><figcaption>The gymnasium at dusk</figcaption></figure>
    </section>
    <section className="gym-tour-equipment">
      <h2>Inside the gym</h2>
      <div className="gym-tour-gallery">{equipmentPhotos.map(([file, label, alt]) =>
        <figure key={file}><img src={`/gym/${file}.jpg`} alt={alt} loading="lazy" /><figcaption>{label}</figcaption></figure>
      )}</div>
    </section>
  </main>;
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
