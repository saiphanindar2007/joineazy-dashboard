import React from 'react';
import Navbar from './Navbar';

function fmt(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function StudentCourseDashboard({ user, courses, assignments, onLogout, onSelectCourse }) {
  // Overall stats
  const totalAsgn = assignments.filter(a => courses.some(c => c.id === a.courseId)).length;
  const submitted = assignments.filter(a => courses.some(c => c.id === a.courseId) && a.submissions?.[user.id]).length;
  const overallPct = totalAsgn > 0 ? Math.round((submitted / totalAsgn) * 100) : 0;

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout}
        breadcrumb={[{ label: 'My Courses' }]}
      />
      <div className="dashboard-body">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-left">
            <div className="page-header-eyebrow">Student Dashboard</div>
            <h1>Welcome back, {user.name.split(' ')[0]} 👋</h1>
            <p>You're enrolled in {courses.length} course{courses.length !== 1 ? 's' : ''} this semester.</p>
          </div>
          {/* Mini progress ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <svg width="76" height="76" viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="30" fill="none" stroke="var(--bg-card)" strokeWidth="5" />
              <circle cx="38" cy="38" r="30" fill="none"
                stroke="url(#sprog)" strokeWidth="5"
                strokeDasharray={`${2*Math.PI*30}`}
                strokeDashoffset={`${2*Math.PI*30*(1-overallPct/100)}`}
                strokeLinecap="round" transform="rotate(-90 38 38)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <defs>
                <linearGradient id="sprog" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--accent2)" />
                </linearGradient>
              </defs>
              <text x="38" y="43" textAnchor="middle" fill="var(--text-1)"
                style={{ fontFamily: 'Syne,sans-serif', fontSize: '13px', fontWeight: 800 }}>
                {overallPct}%
              </text>
            </svg>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontWeight: 500 }}>Overall</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card"><div className="stat-icon blue">📚</div><div className="stat-info"><div className="stat-label">Courses</div><div className="stat-value">{courses.length}</div></div></div>
          <div className="stat-card"><div className="stat-icon teal">📋</div><div className="stat-info"><div className="stat-label">Assignments</div><div className="stat-value">{totalAsgn}</div></div></div>
          <div className="stat-card"><div className="stat-icon green">✅</div><div className="stat-info"><div className="stat-label">Submitted</div><div className="stat-value" style={{ color: 'var(--success)' }}>{submitted}</div></div></div>
          <div className="stat-card"><div className="stat-icon red">⏳</div><div className="stat-info"><div className="stat-label">Pending</div><div className="stat-value" style={{ color: 'var(--danger)' }}>{totalAsgn - submitted}</div></div></div>
        </div>

        {/* Courses grid */}
        <div className="section-header">
          <h2>My Courses</h2>
          <span className="section-count">{courses.length} enrolled</span>
        </div>

        {courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No courses yet</h3>
            <p>You're not enrolled in any courses this semester.</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map(course => {
              const courseAsgn = assignments.filter(a => a.courseId === course.id);
              const courseSub  = courseAsgn.filter(a => a.submissions?.[user.id]).length;
              const pct = courseAsgn.length > 0 ? Math.round((courseSub / courseAsgn.length) * 100) : 0;
              return (
                <div key={course.id} className="course-card" onClick={() => onSelectCourse(course.id)}>
                  <div className="course-card-stripe" style={{ background: course.color }} />
                  <div className="course-card-body">
                    <div className="course-code-row">
                      <span className="course-code" style={{ color: course.color, borderColor: course.color + '44', background: course.color + '18' }}>
                        {course.code}
                      </span>
                      <span className="course-semester">{course.semester}</span>
                    </div>
                    <div className="course-name">{course.name}</div>
                    <div className="course-meta-row">
                      <span className="course-meta-item">📋 {courseAsgn.length} assignment{courseAsgn.length !== 1 ? 's' : ''}</span>
                      <span className="course-meta-item">✅ {courseSub} submitted</span>
                    </div>
                  </div>
                  <div className="course-card-footer">
                    <div className="course-progress-mini">
                      <span className="course-progress-label">{pct}% complete</span>
                      <div className="course-progress-bar-wrap">
                        <div className="course-progress-bar-fill" style={{ width: `${pct}%`, background: course.color }} />
                      </div>
                    </div>
                    <span className="course-open-btn">Open →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
