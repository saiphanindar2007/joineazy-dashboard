import React, { useEffect, useState } from 'react';

export default function LoginPage({ allUsers, onLogin }) {
  const students = allUsers.filter(u => u.role === 'student');
  const admins   = allUsers.filter(u => u.role === 'admin');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="login-page">
      {/* Animated background */}
      <div className="login-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="login-content" style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        {/* Hero */}
        <div className="login-hero">
          <div className="login-brand">
            <div className="brand-hex">⬡</div>
            <span className="brand-name">Joineazy</span>
          </div>

          <div className="login-tagline">
            <span>✦</span> Assignment & Review Dashboard
          </div>

          <h1>
            Your Academic<br />
            Command <span className="highlight">Centre</span>
          </h1>

          <p>
            A streamlined platform for managing assignments, tracking submissions,
            and staying ahead — built for students and professors.
          </p>
        </div>

        {/* Role Panels */}
        <div className="login-roles">
          {/* Student Panel */}
          <div className="role-panel" style={{ animationDelay: '0s' }}>
            <div className="role-panel-header">
              <div className="role-icon student">🎓</div>
              <div>
                <h2>I'm a Student</h2>
                <p>View assignments & track progress</p>
              </div>
            </div>
            <div className="user-list">
              {students.map(u => (
                <button
                  key={u.id}
                  className="user-btn"
                  onClick={() => onLogin(u)}
                >
                  <div className="user-avatar student-av">{u.avatar}</div>
                  <div className="user-info">
                    <strong>{u.name}</strong>
                    <span>{u.email}</span>
                  </div>
                  <span className="user-btn-arrow">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Admin Panel */}
          <div className="role-panel" style={{ animationDelay: '0.1s' }}>
            <div className="role-panel-header">
              <div className="role-icon admin">🏛</div>
              <div>
                <h2>I'm a Professor</h2>
                <p>Create assignments & review progress</p>
              </div>
            </div>
            <div className="user-list">
              {admins.map(u => (
                <button
                  key={u.id}
                  className="user-btn"
                  onClick={() => onLogin(u)}
                >
                  <div className="user-avatar admin-av">{u.avatar}</div>
                  <div className="user-info">
                    <strong>{u.name}</strong>
                    <span>{u.email}</span>
                  </div>
                  <span className="user-btn-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="login-footer">
        © 2026 Joineazy — Joineazy Pvt. Ltd. &nbsp;·&nbsp;
      </div>
    </div>
  );
}
