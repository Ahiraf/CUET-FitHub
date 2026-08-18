import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { useAuth } from './context/AuthContext';
import { upsertAccount } from './api';

const roles = [
  { key: 'student', label: 'Student', hint: 'Train & track' },
  { key: 'trainer', label: 'Trainer', hint: 'Coach members' },
];

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', studentId: '', email: '', password: '', confirmPassword: '' });
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(form).some((value) => !value.trim())) { setError('Please complete all fields.'); return; }
    if (form.password.length < 6) { setError('Your password must contain at least 6 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setError('');

    const user = { name: form.name.trim(), studentId: form.studentId.trim(), email: form.email.trim(), role };
    upsertAccount({ ...user, password: form.password, verified: false });
    login(user);
    navigate('/dashboard/overview');
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-showcase">
          <div className="brand">
            <div className="brand-mark">CF</div>
            <div className="brand-copy"><strong>CUET FitHub</strong><span>Train. Track. Thrive.</span></div>
          </div>
          <div className="showcase-copy">
            <span className="showcase-tag">START YOUR JOURNEY</span>
            <h1>One account. <span>Every goal.</span></h1>
            <p>Join CUET FitHub to manage workouts, explore classes, and make your gym time matter.</p>
          </div>
          <div className="showcase-stats">
            <div><strong>8+</strong><span>Weekly classes</span></div>
            <div><strong>50</strong><span>Gym capacity</span></div>
            <div><strong>100%</strong><span>CUET community</span></div>
          </div>
        </aside>

        <section className="auth-panel">
          <div className="auth-form-wrap">
            <p className="auth-kicker">JOIN THE COMMUNITY</p>
            <h2 className="auth-title">Create your account</h2>
            <p className="auth-subtitle">Your fitness journey at CUET starts here.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-label">
                Full name
                <input className="auth-input" name="name" placeholder="Your full name" value={form.name} onChange={updateField} />
              </label>
              <label className="auth-label">
                CUET student ID
                <input className="auth-input" name="studentId" placeholder="e.g. 2204xxx" value={form.studentId} onChange={updateField} />
              </label>
              <label className="auth-label">
                CUET email address
                <input className="auth-input" type="email" name="email" placeholder="name@cuet.ac.bd" value={form.email} onChange={updateField} />
              </label>
              <label className="auth-label">
                Password
                <input className="auth-input" type="password" name="password" placeholder="At least 6 characters" value={form.password} onChange={updateField} />
              </label>
              <label className="auth-label">
                Confirm password
                <input className="auth-input" type="password" name="confirmPassword" placeholder="Repeat your password" value={form.confirmPassword} onChange={updateField} />
              </label>

              <div className="auth-label">
                Account type
                <div className="role-toggle">
                  {roles.map((r) => (
                    <button className={`role-option ${role === r.key ? 'active' : ''}`} key={r.key} onClick={() => setRole(r.key)} type="button">
                      <strong>{r.label}</strong><span>{r.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button className="auth-submit" type="submit">Create FitHub account →</button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <button className="text-button" type="button" onClick={() => navigate('/login')}>Log in</button>
            </p>
            <button className="back-home" type="button" onClick={() => navigate('/')}>← Back to home</button>
          </div>
        </section>
      </section>
    </main>
  );
}
