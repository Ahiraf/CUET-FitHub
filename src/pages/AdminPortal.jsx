import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../dashboards/DashboardLayout';
import './Portal.css';

function AdminLogin() {
  const { signIn, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const user = await signIn({ email: email.trim(), password });
      if (user.role !== 'admin') { logout(); throw new Error('This portal is only for CUET FitHub administrators.'); }
      navigate('/admin/overview');
    } catch (err) { setError(err.message || 'Could not sign in.'); }
    finally { setBusy(false); }
  };

  return <main className="portal-auth-page"><section className="portal-auth-card">
    <div className="portal-auth-mark">CF</div>
    <p className="auth-kicker">CUET FITHUB OPERATIONS</p>
    <h1>Admin portal</h1>
    <p>Sign in to manage members, equipment reports, trainer applications, and campus announcements.</p>
    <form className="auth-form" onSubmit={submit}>
      <label className="auth-label">Admin email<input className="auth-input" type="email" placeholder="admin@cuet.ac.bd" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label className="auth-label">Password<input className="auth-input" type="password" placeholder="Enter admin password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
      {error && <p className="auth-error">{error}</p>}
      <button className="auth-submit" disabled={busy} type="submit">{busy ? 'Signing in…' : 'Enter admin portal →'}</button>
    </form>
    <button className="back-home" type="button" onClick={() => navigate('/')}>← Back to FitHub</button>
  </section></main>;
}

function AdminAccessDenied() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const switchAccount = () => {
    logout();
    navigate('/admin');
  };

  return <main className="portal-auth-page"><section className="portal-auth-card">
    <div className="portal-auth-mark">CF</div>
    <p className="auth-kicker">CUET FITHUB OPERATIONS</p>
    <h1>Admin access required</h1>
    <p>Your current account is not an administrator account. Sign out and use an approved admin account to continue.</p>
    <button className="auth-submit" type="button" onClick={switchAccount}>Sign in as admin →</button>
    <button className="back-home" type="button" onClick={() => navigate('/')}>← Back to FitHub</button>
  </section></main>;
}

export default function AdminPortal() {
  const { user } = useAuth();
  if (!user) return <AdminLogin />;
  if (user.role !== 'admin') return <AdminAccessDenied />;
  return <DashboardLayout portal="admin" />;
}
