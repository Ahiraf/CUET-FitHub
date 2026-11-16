import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';

import TreadmillRunner from './components/TreadmillRunner';

const endings = ['stronger', 'healthier', 'fitter', 'faster'];

function Headline() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    function sync() {
      clearInterval(timer);
      if (preference.matches) setIndex(0);
      else timer = setInterval(() => setIndex(i => (i + 1) % endings.length), 3000);
    }
    sync();
    preference.addEventListener('change', sync);
    return () => {
      clearInterval(timer);
      preference.removeEventListener('change', sync);
    };
  }, []);
  return <h1 aria-label="Make your campus stronger.">
    Make your<br /><em>campus</em>{' '}
    <span className="headline-words" aria-hidden="true"><span key={index}>{endings[index]}.</span></span>
  </h1>;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const openLogin = () => navigate('/login');
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return <div className="landing-page">
    <div className="landing-noise" />
    <section className="landing-hero-shell" id="top">
      <nav className="landing-nav">
        <button className="landing-brand" onClick={() => jump('top')} type="button"><span className="landing-brand-mark"><img src="/favicon.png" alt="" /></span><span><strong>CUET FitHub</strong><small>Move well. Live well.</small></span></button>
        <div className="landing-links"><Link to="/announcements">CUET Community</Link><Link to="/about">About</Link></div>
        <div className="landing-nav-actions"><button className="landing-login" onClick={openLogin} type="button">Sign in</button><button className="landing-nav-cta" onClick={() => navigate('/register')} type="button">Get started <Icon name="arrow" size={14} /></button></div>
      </nav>

      <div className="landing-hero">
        <div className="landing-hero-copy"><div className="landing-live-pill"><span /><span>CUET gym · live now</span><strong>38 / 50</strong></div>
          <Headline />
          <p>One calm place to plan your workout, find your people, and see the gym before you step inside.</p><div className="landing-hero-actions"><button className="landing-main-cta" onClick={openLogin} type="button">Enter FitHub <Icon name="arrow" size={16} /></button><button className="landing-secondary-cta" onClick={openLogin} type="button"><span className="landing-play"><Icon name="play" size={11} /></span> Start a workout</button></div><div className="landing-hero-proof"><span><Icon name="check" size={13} /> Free for CUET students</span><span><Icon name="shield" size={13} /> Built for campus life</span></div></div>
        <TreadmillRunner />
      </div>
    </section>
    <div className="landing-mini-footer"><span>© 2026 CUET FitHub</span><span>Move well. Live well.</span></div>
  </div>;
}
