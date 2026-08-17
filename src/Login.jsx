import { useState } from 'react';
import './Auth.css';

export default function Login({ onLogin, onOpenRegister, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setError('');
    onLogin();
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-showcase">
          <div className="brand">
            <div className="brand-mark">CF</div>
            <div className="brand-copy">
              <strong>CUET FitHub</strong>
              <span>Train. Track. Thrive.</span>
            </div>
          </div>

          <div className="showcase-copy">
            <span className="showcase-tag">STUDENT FITNESS PLATFORM</span>
            <h1>Make every workout <span>count.</span></h1>
            <p>Track your progress, book classes, and stay connected with the CUET fitness community.</p>
          </div>

          <div className="showcase-stats">
            <div><strong>500+</strong><span>Active students</span></div>
            <div><strong>24/7</strong><span>Progress tracking</span></div>
            <div><strong>1 goal</strong><span>A stronger you</span></div>
          </div>
        </aside>

        <section className="auth-panel">
          <div className="auth-form-wrap">
            <p className="auth-kicker">WELCOME BACK</p>
            <h2 className="auth-title">Log in to FitHub</h2>
            <p className="auth-subtitle">Continue building your strongest routine.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-label">
                CUET email address
                <input
                  className="auth-input"
                  type="email"
                  placeholder="name@cuet.ac.bd"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className="auth-label">
                Password
                <div className="auth-input-wrap">
                  <input
                    className="auth-input auth-password-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>

              {error && <p className="auth-error">{error}</p>}

              <button className="auth-submit" type="submit">Log in to dashboard →</button>
            </form>

            <p className="auth-switch">
              New to FitHub?{' '}
              <button className="text-button" type="button" onClick={onOpenRegister}>
                Create an account
              </button>
            </p>

            <button className="back-home" type="button" onClick={onBack}>← Back to home</button>
          </div>
        </section>
      </section>
    </main>
  );
}