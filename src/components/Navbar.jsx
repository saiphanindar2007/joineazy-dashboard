import React from 'react';

export default function Navbar({ user, onLogout, activeTab, onTabChange, tabs }) {
  const isAdmin = user.role === 'admin';

  return (
    <nav className="dashboard-nav">
      {/* Brand */}
      <div className="nav-brand">
        <div className="nav-hex">⬡</div>
        <span className="nav-title">Joineazy</span>
      </div>

      {/* Center tabs */}
      {tabs && tabs.length > 0 && (
        <div className="nav-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Right */}
      <div className="nav-right">
        <div className="nav-user">
          <div className={`nav-user-av ${isAdmin ? 'a' : 's'}`}>{user.avatar}</div>
          <span className="nav-user-name">{user.name.split(' ')[0]}</span>
          <span className={`nav-role-badge ${user.role}`}>{isAdmin ? 'Prof' : 'Student'}</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
}
