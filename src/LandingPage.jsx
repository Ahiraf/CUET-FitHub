import React from 'react';

const iconPaths = {
  activity: 'M3 12h4l2-7 4 14 2-7h6',
  arrow: 'M5 12h13m-5-5 5 5-5 5',
  calendar: 'M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  chart: 'M5 20V10m7 10V4m7 16v-7',
  check: 'm5 12 4 4L19 6',
  chevron: 'm6 9 6 6 6-6',
  dumbbell: 'M6 8v8m12-8v8M3 10v4m18-4v4M6 12h12',
  menu: 'M4 6h16M4 12h16M4 18h16',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-3a4 4 0 0 1 0 7.7M22 21v-2a4 4 0 0 0-3-3.9',
};

function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d={iconPaths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
  );
}
const features = [
  { icon: 'activity', title: 'Know before you go', text: 'See live occupancy and equipment availability before you head to the gym.', tone: 'blue' },
  { icon: 'chart', title: 'Progress that motivates', text: 'Log workouts, follow routines, and see your strength and consistency grow.', tone: 'violet' },
  { icon: 'users', title: 'Train together', text: 'Discover classes, book trainers, and stay connected with the CUET fitness community.', tone: 'orange' },
];

export default function LandingPage({ onOpenDashboard }) {
  const scrollToFeatures = () => document.getElementById('landing-features')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="landing-page">
      <style>{`
        .landing-page { --landing-ink: #17233e; --landing-muted: #70809d; --landing-blue: #546fe5; --landing-gold: #e4a53a; background: #f8faff; color: var(--landing-ink); min-height: 100vh; overflow: hidden; }
        .landing-page * { box-sizing: border-box; }
        .landing-page button { font: inherit; }
        .landing-nav { align-items: center; display: flex; justify-content: space-between; margin: 0 auto; max-width: 1240px; padding: 23px 34px; position: relative; z-index: 2; }
        .landing-brand { align-items: center; color: var(--landing-ink); display: flex; gap: 11px; text-decoration: none; }
        .landing-brand-mark { align-items: center; background: linear-gradient(145deg, #6e89f5, #435dd6); border-radius: 11px; box-shadow: 0 8px 17px rgba(69,91,201,.2); color: white; display: inline-flex; font-size: 11px; font-weight: 900; height: 38px; justify-content: center; letter-spacing: -.5px; width: 38px; }
        .landing-brand-copy { display: flex; flex-direction: column; gap: 3px; }
        .landing-brand-copy strong { font-size: 15px; letter-spacing: -.25px; }
        .landing-brand-copy span { color: #8d99b0; font-size: 10px; }
        .landing-nav-links { align-items: center; display: flex; gap: 30px; margin-left: 80px; }
        .landing-nav-links a { color: #73819b; font-size: 11px; font-weight: 600; text-decoration: none; transition: color .2s ease; }
        .landing-nav-links a:hover { color: var(--landing-blue); }
        .landing-nav-actions { align-items: center; display: flex; gap: 21px; }
        .landing-sign-in { background: transparent; border: 0; color: #64728e; cursor: pointer; font-size: 11px; font-weight: 700; }
        .landing-nav-cta, .landing-primary-button { align-items: center; background: var(--landing-ink); border: 0; border-radius: 8px; box-shadow: 0 9px 20px rgba(23,35,62,.12); color: #fff; cursor: pointer; display: inline-flex; font-size: 11px; font-weight: 800; gap: 8px; justify-content: center; padding: 12px 16px; transition: .2s ease; }
        .landing-nav-cta:hover, .landing-primary-button:hover { background: #293c69; box-shadow: 0 12px 24px rgba(23,35,62,.18); transform: translateY(-1px); }
        .landing-menu { background: transparent; border: 0; color: var(--landing-ink); cursor: pointer; display: none; }
        .landing-hero-wrap { background: radial-gradient(circle at 82% 13%, rgba(224,232,255,.82), transparent 31%), linear-gradient(180deg, #f8faff 0%, #f5f8ff 100%); border-bottom: 1px solid #edf1f8; min-height: 590px; position: relative; }
        .landing-hero-wrap:after { background: #eef2ff; border-radius: 50%; content: ''; height: 480px; opacity: .65; position: absolute; right: -185px; top: 15px; width: 480px; }
        .landing-hero { align-items: center; display: grid; gap: 70px; grid-template-columns: minmax(0, .92fr) minmax(420px, .78fr); margin: 0 auto; max-width: 1240px; min-height: 500px; padding: 42px 34px 75px; position: relative; z-index: 1; }
        .landing-eyebrow { align-items: center; color: #6d7fd7; display: flex; font-size: 10px; font-weight: 900; gap: 8px; letter-spacing: .12em; margin: 0 0 18px; text-transform: uppercase; }
        .landing-eyebrow:before { background: #7d91f6; border-radius: 50%; content: ''; height: 6px; width: 6px; }
        .landing-hero h1 { color: var(--landing-ink); font-size: clamp(39px, 5.3vw, 66px); letter-spacing: -2.6px; line-height: 1.03; margin: 0; max-width: 650px; }
        .landing-hero h1 em { color: var(--landing-blue); font-style: normal; }
        .landing-hero-description { color: #7887a2; font-size: 14px; line-height: 1.75; margin: 23px 0 27px; max-width: 500px; }
        .landing-hero-actions { align-items: center; display: flex; gap: 18px; }
        .landing-primary-button { background: var(--landing-blue); padding: 14px 20px; }
        .landing-primary-button:hover { background: #405acd; }
        .landing-text-button { align-items: center; background: transparent; border: 0; color: #65738e; cursor: pointer; display: inline-flex; font-size: 11px; font-weight: 800; gap: 8px; padding: 12px 0; }
        .landing-text-button svg { color: #788cf0; }
        .landing-hero-note { align-items: center; color: #9aa5b7; display: flex; font-size: 10px; gap: 7px; margin-top: 25px; }
        .landing-hero-note svg { color: #51b68d; }
        .landing-dashboard-preview { background: #fff; border: 1px solid #e4eafa; border-radius: 18px; box-shadow: 0 24px 55px rgba(70,91,151,.14); max-width: 495px; padding: 14px; position: relative; transform: rotate(1.5deg); }
        .landing-dashboard-preview:before { background: #e6b14c; border-radius: 50%; content: ''; height: 9px; left: -15px; position: absolute; top: 45px; width: 9px; }
        .preview-topbar { align-items: center; border-bottom: 1px solid #eff2f8; display: flex; justify-content: space-between; padding: 3px 4px 13px; }
        .preview-brand { align-items: center; display: flex; gap: 6px; }
        .preview-brand-mark { align-items: center; background: #566fe0; border-radius: 5px; color: #fff; display: inline-flex; font-size: 6px; font-weight: 900; height: 18px; justify-content: center; width: 18px; }
        .preview-brand span:last-child { color: #24324e; font-size: 8px; font-weight: 800; }
        .preview-profile { align-items: center; display: flex; gap: 6px; }
        .preview-profile-avatar { background: #dce5ff; border-radius: 50%; color: #536bd1; font-size: 6px; font-weight: 800; height: 20px; padding-top: 6px; text-align: center; width: 20px; }
        .preview-profile-line { background: #e9edf6; border-radius: 2px; height: 4px; width: 38px; }
        .preview-content { display: grid; gap: 10px; grid-template-columns: 38px 1fr; padding: 17px 5px 4px; }
        .preview-sidebar { background: #192743; border-radius: 7px; min-height: 210px; padding: 13px 7px; }
        .preview-sidebar-line { background: #7187ed; border-radius: 2px; height: 5px; margin-bottom: 13px; opacity: .8; width: 22px; }
        .preview-sidebar-line:nth-child(n+3) { background: #64738f; opacity: .55; width: 18px; }
        .preview-main { min-width: 0; }
        .preview-heading { background: #edf1ff; border-radius: 3px; height: 7px; margin-bottom: 6px; width: 115px; }
        .preview-subheading { background: #f0f2f7; border-radius: 3px; height: 4px; margin-bottom: 14px; width: 158px; }
        .preview-stat-grid { display: grid; gap: 6px; grid-template-columns: repeat(3, 1fr); }
        .preview-stat { border: 1px solid #eef1f6; border-radius: 5px; height: 40px; padding: 7px; }
        .preview-stat-dot { background: #e0e7ff; border-radius: 3px; height: 8px; margin-bottom: 5px; width: 8px; }
        .preview-stat-line { background: #e6ebf4; border-radius: 2px; height: 3px; margin-bottom: 3px; width: 35px; }.preview-stat-line.short { width: 22px; }
        .preview-panels { display: grid; gap: 6px; grid-template-columns: 1.2fr 1fr; margin-top: 7px; }
        .preview-panel { border: 1px solid #eef1f6; border-radius: 5px; min-height: 100px; padding: 8px; }
        .preview-panel-title { background: #e4e9f2; border-radius: 2px; height: 4px; margin-bottom: 10px; width: 57px; }
        .preview-ring-row { align-items: center; display: flex; gap: 9px; }
        .preview-ring { align-items: center; background: conic-gradient(#6079e8 274deg, #edf0f7 0); border-radius: 50%; display: flex; height: 56px; justify-content: center; position: relative; width: 56px; }
        .preview-ring:after { background: #fff; border-radius: 50%; content: ''; height: 43px; position: absolute; width: 43px; }
        .preview-ring span { color: #344469; font-size: 10px; font-weight: 900; position: relative; z-index: 1; }
        .preview-copy-line { background: #e8ecf5; border-radius: 2px; height: 4px; margin-bottom: 6px; width: 45px; }.preview-copy-line.short { width: 32px; }
        .preview-bars { align-items: flex-end; display: flex; gap: 4px; height: 57px; padding-top: 5px; }
        .preview-bar { background: #d9e0ff; border-radius: 2px 2px 0 0; flex: 1; }.preview-bar:nth-child(1) { height: 35%; }.preview-bar:nth-child(2) { height: 72%; background: #6982ed; }.preview-bar:nth-child(3) { height: 50%; }.preview-bar:nth-child(4) { height: 86%; background: #6982ed; }.preview-bar:nth-child(5) { height: 45%; }
        .preview-floating-card { align-items: center; background: #fff; border: 1px solid #e8ebf4; border-radius: 8px; bottom: 22px; box-shadow: 0 11px 25px rgba(60,83,144,.13); display: flex; gap: 8px; padding: 9px 11px; position: absolute; right: -21px; }
        .preview-floating-icon { align-items: center; background: #e1f7ee; border-radius: 5px; color: #41a981; display: flex; height: 24px; justify-content: center; width: 24px; }
        .preview-floating-copy { display: flex; flex-direction: column; gap: 3px; }.preview-floating-copy strong { color: #2c3a56; font-size: 8px; }.preview-floating-copy span { color: #9aa5b6; font-size: 7px; }
        .landing-stat-strip { background: #fff; border-bottom: 1px solid #eef1f7; border-top: 1px solid #eef1f7; display: grid; grid-template-columns: repeat(3, 1fr); margin: 0 auto; max-width: 1170px; }
        .landing-stat { align-items: center; display: flex; gap: 13px; justify-content: center; min-height: 95px; }
        .landing-stat + .landing-stat { border-left: 1px solid #edf0f6; }
        .landing-stat-number { color: var(--landing-ink); font-size: 22px; font-weight: 900; letter-spacing: -.7px; }.landing-stat-number em { color: var(--landing-blue); font-style: normal; }
        .landing-stat-copy { color: #98a2b3; font-size: 10px; line-height: 1.45; }.landing-stat-copy strong { color: #51607b; display: block; font-size: 11px; }
        .landing-features { margin: 0 auto; max-width: 1170px; padding: 88px 34px 100px; }
        .landing-section-heading { margin: 0 auto 38px; max-width: 530px; text-align: center; }.landing-section-heading .landing-eyebrow { justify-content: center; margin-bottom: 12px; }.landing-section-heading h2 { color: var(--landing-ink); font-size: 32px; letter-spacing: -1.2px; line-height: 1.15; margin: 0; }.landing-section-heading p { color: #8996ac; font-size: 12px; line-height: 1.7; margin: 13px auto 0; max-width: 440px; }
        .landing-feature-grid { display: grid; gap: 15px; grid-template-columns: repeat(3, 1fr); }
        .landing-feature-card { background: #fff; border: 1px solid #e9edf5; border-radius: 12px; padding: 24px; transition: .2s ease; }.landing-feature-card:hover { border-color: #d4dcfb; box-shadow: 0 13px 28px rgba(58,78,136,.07); transform: translateY(-2px); }.landing-feature-icon { align-items: center; border-radius: 9px; display: flex; height: 36px; justify-content: center; margin-bottom: 18px; width: 36px; }.landing-feature-icon.blue { background: #e9edff; color: #536fe5; }.landing-feature-icon.violet { background: #f0ebff; color: #886dd4; }.landing-feature-icon.orange { background: #fff0e2; color: #e5923e; }.landing-feature-card h3 { color: #2d3a55; font-size: 13px; margin: 0 0 8px; }.landing-feature-card p { color: #8e9aae; font-size: 11px; line-height: 1.65; margin: 0; }
        .landing-bottom-cta { background: linear-gradient(120deg, #1a2948, #304b86); border-radius: 16px; color: #fff; margin: 0 auto 80px; max-width: 1102px; overflow: hidden; padding: 37px 44px; position: relative; }.landing-bottom-cta:after { border: 1px solid rgba(255,255,255,.09); border-radius: 50%; content: ''; height: 250px; position: absolute; right: -30px; top: -100px; width: 250px; }.landing-bottom-cta h2 { font-size: 23px; letter-spacing: -.6px; margin: 0 0 8px; position: relative; z-index: 1; }.landing-bottom-cta p { color: #b8c5e6; font-size: 11px; margin: 0; position: relative; z-index: 1; }.landing-bottom-cta .landing-primary-button { background: #fff; color: #293d70; position: absolute; right: 44px; top: 42px; z-index: 1; }.landing-bottom-cta .landing-primary-button:hover { background: #eaf0ff; }
        .landing-footer { align-items: center; border-top: 1px solid #ebeff7; color: #9aa5b6; display: flex; font-size: 10px; justify-content: space-between; margin: 0 auto; max-width: 1170px; padding: 20px 34px 27px; }.landing-footer strong { color: #5a6a88; }.landing-footer span { color: #b1bac9; }
        @media (max-width: 900px) { .landing-nav-links { gap: 17px; margin-left: 20px; }.landing-hero { gap: 35px; grid-template-columns: 1fr 1fr; }.landing-dashboard-preview { transform: none; }.landing-hero h1 { font-size: 44px; }.landing-bottom-cta { margin-left: 34px; margin-right: 34px; } }
        @media (max-width: 700px) { .landing-nav { padding: 18px 20px; }.landing-nav-links, .landing-nav-actions .landing-sign-in { display: none; }.landing-nav-actions { gap: 10px; }.landing-menu { display: inline-flex; }.landing-nav-cta { padding: 10px 12px; }.landing-hero { display: flex; flex-direction: column; gap: 45px; padding: 47px 24px 66px; }.landing-hero h1 { font-size: clamp(39px, 12vw, 53px); }.landing-hero-description { font-size: 13px; }.landing-dashboard-preview { align-self: center; max-width: 500px; transform: scale(.94); width: 100%; }.landing-stat-strip { grid-template-columns: 1fr; margin: 0 24px; }.landing-stat { justify-content: flex-start; min-height: 75px; padding-left: 28px; }.landing-stat + .landing-stat { border-left: 0; border-top: 1px solid #edf0f6; }.landing-features { padding: 68px 24px 76px; }.landing-section-heading h2 { font-size: 27px; }.landing-feature-grid { grid-template-columns: 1fr; }.landing-bottom-cta { margin: 0 24px 58px; padding: 28px 24px 93px; }.landing-bottom-cta .landing-primary-button { bottom: 25px; left: 24px; right: auto; top: auto; }.landing-footer { align-items: flex-start; flex-direction: column; gap: 8px; padding: 18px 24px 25px; } }
        @media (max-width: 390px) { .landing-hero-actions { align-items: flex-start; flex-direction: column; gap: 8px; }.landing-dashboard-preview { transform: scale(.86); transform-origin: top center; margin-bottom: -35px; }.landing-nav-cta { display: none; } }
      `}</style>

      <section className="landing-hero-wrap">
        <nav className="landing-nav">
          <a className="landing-brand" href="#top">
            <span className="landing-brand-mark">CF</span>
            <span className="landing-brand-copy"><strong>CUET FitHub</strong><span>Student wellness platform</span></span>
          </a>
          <div className="landing-nav-links">
            <a href="#landing-features">Why FitHub</a>
            <a href="#landing-features">Features</a>
            <a href="#landing-community">Community</a>
          </div>
          <div className="landing-nav-actions">
            <button className="landing-sign-in" onClick={onOpenDashboard} type="button">Sign in</button>
            <button className="landing-nav-cta" onClick={onOpenDashboard} type="button">Open dashboard <Icon name="arrow" size={14} /></button>
            <button aria-label="Open menu" className="landing-menu" onClick={scrollToFeatures} type="button"><Icon name="menu" /></button>
          </div>
        </nav>

        <div className="landing-hero" id="top">
          <div className="landing-hero-copy">
            <p className="landing-eyebrow">Built for the CUET community</p>
            <h1>Train smarter.<br /><em>Feel stronger.</em><br />Together.</h1>
            <p className="landing-hero-description">Your campus gym, made simpler. Check the crowd, plan your workout, and keep your progress moving - all in one place.</p>
            <div className="landing-hero-actions">
              <button className="landing-primary-button" onClick={onOpenDashboard} type="button">Explore student dashboard <Icon name="arrow" size={15} /></button>
              <button className="landing-text-button" onClick={scrollToFeatures} type="button">See how it works <Icon name="chevron" size={15} /></button>
            </div>
            <div className="landing-hero-note"><Icon name="check" size={14} /> Free for verified CUET students</div>
          </div>

          <div aria-label="Preview of the CUET FitHub student dashboard" className="landing-dashboard-preview">
            <div className="preview-topbar"><div className="preview-brand"><span className="preview-brand-mark">CF</span><span>CUET FitHub</span></div><div className="preview-profile"><span className="preview-profile-line" /><span className="preview-profile-avatar">AS</span></div></div>
            <div className="preview-content">
              <div className="preview-sidebar"><div className="preview-sidebar-line" /><div className="preview-sidebar-line" /><div className="preview-sidebar-line" /><div className="preview-sidebar-line" /><div className="preview-sidebar-line" /></div>
              <div className="preview-main"><div className="preview-heading" /><div className="preview-subheading" /><div className="preview-stat-grid">{[1, 2, 3].map((item) => <div className="preview-stat" key={item}><div className="preview-stat-dot" /><div className="preview-stat-line" /><div className="preview-stat-line short" /></div>)}</div><div className="preview-panels"><div className="preview-panel"><div className="preview-panel-title" /><div className="preview-ring-row"><div className="preview-ring"><span>38</span></div><div><div className="preview-copy-line" /><div className="preview-copy-line short" /></div></div></div><div className="preview-panel"><div className="preview-panel-title" /><div className="preview-bars">{[1, 2, 3, 4, 5].map((item) => <span className="preview-bar" key={item} />)}</div></div></div></div>
            </div>
            <div className="preview-floating-card"><span className="preview-floating-icon"><Icon name="check" size={13} /></span><span className="preview-floating-copy"><strong>Gym is open now</strong><span>38 of 50 students</span></span></div>
          </div>
        </div>
      </section>

      <section aria-label="CUET FitHub highlights" className="landing-stat-strip">
        <div className="landing-stat"><strong className="landing-stat-number">50</strong><span className="landing-stat-copy"><strong>Student capacity</strong>Live gym visibility</span></div>
        <div className="landing-stat"><strong className="landing-stat-number">100<em>%</em></strong><span className="landing-stat-copy"><strong>Free access</strong>Made for CUET students</span></div>
        <div className="landing-stat"><strong className="landing-stat-number">24<em>/7</em></strong><span className="landing-stat-copy"><strong>Always connected</strong>Plan from anywhere</span></div>
      </section>

      <section className="landing-features" id="landing-features">
        <div className="landing-section-heading"><p className="landing-eyebrow">Everything in one place</p><h2>Your better gym routine starts here.</h2><p>Less guessing, more doing. FitHub brings the tools you need for a more organized and motivating campus fitness experience.</p></div>
        <div className="landing-feature-grid">{features.map((feature) => <article className="landing-feature-card" key={feature.title}><span className={`landing-feature-icon ${feature.tone}`}><Icon name={feature.icon} size={19} /></span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
      </section>

      <section className="landing-bottom-cta" id="landing-community"><h2>Make your next session count.</h2><p>See what is happening at the gym and start building your routine today.</p><button className="landing-primary-button" onClick={onOpenDashboard} type="button">Go to dashboard <Icon name="arrow" size={15} /></button></section>

      <footer className="landing-footer"><span><strong>CUET FitHub</strong> · A smarter gym experience for CUET students</span><span>Chittagong University of Engineering & Technology</span></footer>
    </div>
  );
}
