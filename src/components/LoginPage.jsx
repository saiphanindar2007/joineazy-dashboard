import React, { useState } from 'react';

function genId(role) {
  return (role === 'student' ? 's' : 'a') + Date.now();
}
function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export default function LoginPage({ users, onLogin, onRegister }) {
  const [mode, setMode]       = useState('login'); // 'login' | 'register'
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loginForm, setLogin] = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [visible, setVisible] = useState(true);

  const students = users.filter(u => u.role === 'student');
  const admins   = users.filter(u => u.role === 'admin');

  /* ─── Login (quick-select) ─── */
  const handleQuickLogin = (user) => onLogin(user);

  /* ─── Login form ─── */
  const handleLoginSubmit = () => {
    const user = users.find(u => u.email === loginForm.email && u.password === loginForm.password);
    if (!user) { setErrors({ login: 'Invalid email or password.' }); return; }
    onLogin(user);
  };

  /* ─── Register form ─── */
  const handleRegisterSubmit = () => {
    const err = {};
    if (!regForm.name.trim())     err.name = 'Name is required';
    if (!regForm.email.trim())    err.email = 'Email is required';
    if (!regForm.email.includes('@')) err.email = 'Enter a valid email';
    if (users.find(u => u.email === regForm.email)) err.email = 'Email already registered';
    if (regForm.password.length < 6) err.password = 'Minimum 6 characters';
    if (Object.keys(err).length) { setErrors(err); return; }

    const newUser = {
      id: genId(regForm.role),
      name: regForm.name.trim(),
      email: regForm.email.trim(),
      password: regForm.password,
      role: regForm.role,
      avatar: initials(regForm.name),
    };
    onRegister(newUser);
  };

  const setR = (f, v) => { setRegForm(p => ({ ...p, [f]: v })); setErrors(e => ({ ...e, [f]: '' })); };
  const setL = (f, v) => { setLogin(p => ({ ...p, [f]: v })); setErrors({}); };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
      </div>

      <div className="login-content" style={{ opacity: 1 }}>
        {/* Hero */}
        <div className="login-hero">
          <div className="login-brand">
            <div className="brand-hex">⬡</div>
            <span className="brand-name">Joineazy</span>
          </div>
          <div className="login-tagline"><span>✦</span> Assignment & Review Dashboard</div>
          <h1>Your Academic<br />Command <span className="highlight">Centre</span></h1>
          <p>A unified platform for students and professors — assignments, groups, submissions, and progress tracking in one place.</p>
        </div>

        {/* Auth panels */}
        <div className="login-roles">
          {/* ── Quick Login ── */}
          <div className="role-panel">
            <div className="role-panel-header">
              <div className="role-icon student">🎓</div>
              <div><h2>Students</h2><p>Quick-select to preview</p></div>
            </div>
            <div className="user-list">
              {students.slice(0, 4).map(u => (
                <button key={u.id} className="user-btn" onClick={() => handleQuickLogin(u)}>
                  <div className="user-avatar student-av">{u.avatar}</div>
                  <div className="user-info"><strong>{u.name}</strong><span>{u.email}</span></div>
                  <span className="user-btn-arrow">→</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <div className="user-list">
                {admins.slice(0, 2).map(u => (
                  <button key={u.id} className="user-btn" onClick={() => handleQuickLogin(u)}>
                    <div className="user-avatar admin-av">{u.avatar}</div>
                    <div className="user-info"><strong>{u.name}</strong><span>{u.email}</span></div>
                    <span className="user-btn-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Auth form ── */}
          <div className="role-panel">
            {/* Tab switcher */}
            <div className="register-tabs">
              <button className={`register-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setErrors({}); }}>Sign In</button>
              <button className={`register-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => { setMode('register'); setErrors({}); }}>Register</button>
            </div>

            {mode === 'login' ? (
              <div>
                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label className="form-label">Email</label>
                  <input className="form-input" placeholder="your@email.edu" value={loginForm.email} onChange={e => setL('email', e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label">Password</label>
                  <input className="form-input" type="password" placeholder="••••••••" value={loginForm.password} onChange={e => setL('password', e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLoginSubmit()} />
                </div>
                {errors.login && <p style={{ color: 'var(--danger)', fontSize: '0.83rem', marginBottom: '14px' }}>{errors.login}</p>}
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleLoginSubmit}>Sign In →</button>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '12px', textAlign: 'center' }}>
                  Demo: student123 / prof123
                </p>
              </div>
            ) : (
              <div>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label">Full Name <span style={{color:'var(--danger)'}}>*</span></label>
                  <input className="form-input" placeholder="e.g. Priya Sharma" value={regForm.name} onChange={e => setR('name', e.target.value)} />
                  {errors.name && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.name}</span>}
                </div>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label">Email <span style={{color:'var(--danger)'}}>*</span></label>
                  <input className="form-input" placeholder="you@university.edu" value={regForm.email} onChange={e => setR('email', e.target.value)} />
                  {errors.email && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.email}</span>}
                </div>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label">Password <span style={{color:'var(--danger)'}}>*</span></label>
                  <input className="form-input" type="password" placeholder="Min 6 characters" value={regForm.password} onChange={e => setR('password', e.target.value)} />
                  {errors.password && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.password}</span>}
                </div>
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label">I am a</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['student','admin'].map(r => (
                      <button key={r} onClick={() => setR('role', r)}
                        className="btn"
                        style={{
                          flex: 1, justifyContent: 'center',
                          background: regForm.role === r ? 'var(--accent-dim)' : 'transparent',
                          border: `1px solid ${regForm.role === r ? 'var(--accent)' : 'var(--border)'}`,
                          color: regForm.role === r ? 'var(--accent)' : 'var(--text-2)',
                        }}>
                        {r === 'student' ? '🎓 Student' : '🏛 Professor'}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleRegisterSubmit}>Create Account →</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="login-footer">© 2026 Joineazy &nbsp;·&nbsp; Built with ❤ for Joineazy Internship Round 2</div>
    </div>
  );
}
