import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ variant = 'app' }) {
  const isLanding = variant === 'landing';

  return (
    <footer className={`site-footer ${isLanding ? 'site-footer--landing' : 'site-footer--app'}`}>
      <div className="site-footer__top">
        <div className="site-footer__brand-wrap">
          <div className="site-footer__brand">
            <img
              alt="CUET FitHub logo"
              className="site-footer__logo"
              src="/favicon.png"
            />
            <div>
              <strong>CUET FitHub</strong>
              <span>Smart gym experience</span>
            </div>
          </div>
          <p className="site-footer__tagline">
            Train smarter, stay consistent, and make every session count at CUET.
          </p>
        </div>

        <div className="site-footer__links">
          <div>
            <h4>Explore</h4>
            <nav className="site-footer__nav" aria-label="Footer navigation">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/dashboard/overview">Dashboard</Link>
              <Link to="/register">Register</Link>
            </nav>
          </div>

          <div>
            <h4>Support</h4>
            <nav className="site-footer__nav site-footer__nav--stacked" aria-label="Footer support links">
              <a href="mailto:hello@cuetfithub.com">hello@cuetfithub.com</a>
              <a href="tel:+8801700000000">+880 1700-000000</a>
              <span>CUET, Chattogram</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2026 CUET FitHub</span>
        <div className="site-footer__legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}
