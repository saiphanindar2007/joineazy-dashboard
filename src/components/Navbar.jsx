import React from 'react';

export default function Navbar({ user, onLogout, onBack, breadcrumb, rightContent }) {
  const isAdmin = user.role === 'admin';

  return (
    <nav className="dashboard-nav">
      {/* Left: brand + optional breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div className="nav-hex">⬡</div>
          <span className="nav-title">Joineazy</span>
        </div>
        {breadcrumb && (
          <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '6px' }}>
            <span className="breadcrumb-sep">›</span>
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="breadcrumb-sep">›</span>}
                {crumb.onClick ? (
                  <button className="breadcrumb-link" onClick={crumb.onClick}>{crumb.label}</button>
                ) : (
                  <span className="breadcrumb-current">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Center: extra content (tabs etc) */}
      {rightContent && <div className="nav-center">{rightContent}</div>}

      {/* Right: user + logout */}
      <div className="nav-right">
        {onBack && (
          <button className="btn-back" onClick={onBack}>← Courses</button>
        )}
        <div className="nav-user">
          <div className={`nav-user-av ${isAdmin ? 'a' : 's'}`}>{user.avatar}</div>
          <span className="nav-user-name">{user.name.split(' ')[0]}</span>
          <span className={`nav-role-badge ${user.role}`}>{isAdmin ? 'Prof' : 'Student'}</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>Sign out</button>
      </div>
    </nav>
  );
}
