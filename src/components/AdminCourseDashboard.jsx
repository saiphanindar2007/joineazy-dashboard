import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import Toast from './Toast';

let tid = 0;

export default function AdminCourseDashboard({ user, courses, allStudents, assignments, onLogout, onSelectCourse, onUpdateCourses }) {
  const [showCreate, setShowCreate] = useState(false);
  const [newCourse, setNewCourse]   = useState({ name: '', code: '', color: '#5b8fff' });
  const [toasts, setToasts]         = useState([]);

  const addToast = useCallback((msg, type='info') => {
    const id = ++tid;
    setToasts(t => [...t, { id, message: msg, type }]);
  }, []);
  const removeToast = useCallback(id => setToasts(t => t.filter(x => x.id !== id)), []);

  const COLORS = ['#5b8fff','#00ddb3','#f5c842','#ff6b9d','#a78bfa','#fb923c'];

  const handleCreateCourse = () => {
    if (!newCourse.name.trim() || !newCourse.code.trim()) { addToast('Name and code required', 'error'); return; }
    const created = {
      id: 'c_' + Date.now(),
      name: newCourse.name.trim(),
      code: newCourse.code.trim().toUpperCase(),
      color: newCourse.color,
      professorId: user.id,
      semester: 'Sem 4 · 2026',
      enrolledStudents: allStudents.map(s => s.id), // enroll all students for demo
    };
    onUpdateCourses([...courses, created]);
    setShowCreate(false);
    setNewCourse({ name:'', code:'', color:'#5b8fff' });
    addToast(`Course "${created.name}" created!`, 'success');
  };

  const totalSubmissions = assignments.filter(a => courses.some(c => c.id === a.courseId))
    .reduce((s, a) => s + Object.keys(a.submissions || {}).length, 0);
  const totalAssignments = assignments.filter(a => courses.some(c => c.id === a.courseId)).length;

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} breadcrumb={[{ label: 'My Courses' }]} />
      <div className="dashboard-body">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-left">
            <div className="page-header-eyebrow">Professor Dashboard</div>
            <h1>Welcome, {user.name} 🏛</h1>
            <p>Manage your courses, assignments, and track student progress.</p>
          </div>
          <div className="admin-actions">
            <button className="btn btn-gold btn-sm" onClick={() => setShowCreate(true)}>+ New Course</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card"><div className="stat-icon blue">📚</div><div className="stat-info"><div className="stat-label">Courses Teaching</div><div className="stat-value">{courses.length}</div></div></div>
          <div className="stat-card"><div className="stat-icon teal">👥</div><div className="stat-info"><div className="stat-label">Total Students</div><div className="stat-value">{allStudents.length}</div></div></div>
          <div className="stat-card"><div className="stat-icon gold">📋</div><div className="stat-info"><div className="stat-label">Assignments Created</div><div className="stat-value">{totalAssignments}</div></div></div>
          <div className="stat-card"><div className="stat-icon green">✅</div><div className="stat-info"><div className="stat-label">Submissions Received</div><div className="stat-value" style={{color:'var(--success)'}}>{totalSubmissions}</div></div></div>
        </div>

        {/* Courses */}
        <div className="section-header">
          <h2>My Courses</h2>
          <span className="section-count">{courses.length} total</span>
        </div>

        {courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No courses yet</h3>
            <p>Create your first course to start adding assignments.</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map(course => {
              const cAsgn = assignments.filter(a => a.courseId === course.id);
              const enrolled = course.enrolledStudents?.length || 0;
              const totalSubs = cAsgn.reduce((s, a) => s + Object.keys(a.submissions || {}).length, 0);
              const possible  = cAsgn.length * enrolled;
              const pct = possible > 0 ? Math.round((totalSubs / possible) * 100) : 0;
              return (
                <div key={course.id} className="course-card" onClick={() => onSelectCourse(course.id)}>
                  <div className="course-card-stripe" style={{ background: course.color }} />
                  <div className="course-card-body">
                    <div className="course-code-row">
                      <span className="course-code" style={{ color: course.color, borderColor: course.color+'44', background: course.color+'18' }}>
                        {course.code}
                      </span>
                      <span className="course-semester">{course.semester}</span>
                    </div>
                    <div className="course-name">{course.name}</div>
                    <div className="course-meta-row">
                      <span className="course-meta-item">👥 {enrolled} students</span>
                      <span className="course-meta-item">📋 {cAsgn.length} assignments</span>
                    </div>
                  </div>
                  <div className="course-card-footer">
                    <div className="course-progress-mini">
                      <span className="course-progress-label">Class completion: {pct}%</span>
                      <div className="course-progress-bar-wrap">
                        <div className="course-progress-bar-fill" style={{ width:`${pct}%`, background: course.color }} />
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

      {/* Create Course Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowCreate(false); }}>
          <div className="modal">
            <div className="modal-head">
              <div>
                <div className="modal-head-icon create">🎓</div>
                <h2>Create New Course</h2>
                <p>Add a course to your teaching list.</p>
              </div>
              <button className="modal-close" onClick={() => setShowCreate(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{ marginBottom:'14px' }}>
                <label className="form-label">Course Name <span style={{color:'var(--danger)'}}>*</span></label>
                <input className="form-input" placeholder="e.g. Data Structures" value={newCourse.name} onChange={e => setNewCourse(p => ({...p, name: e.target.value}))} />
              </div>
              <div className="form-group" style={{ marginBottom:'14px' }}>
                <label className="form-label">Course Code <span style={{color:'var(--danger)'}}>*</span></label>
                <input className="form-input" placeholder="e.g. CS301" value={newCourse.code} onChange={e => setNewCourse(p => ({...p, code: e.target.value}))} />
              </div>
              <div className="form-group">
                <label className="form-label">Accent Colour</label>
                <div style={{ display:'flex', gap:'8px', marginTop:'4px' }}>
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setNewCourse(p => ({...p, color: c}))}
                      style={{ width:28, height:28, borderRadius:'50%', background:c, border: newCourse.color===c ? '3px solid white' : '2px solid transparent', cursor:'pointer', transition:'border 0.15s' }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateCourse}>✓ Create Course</button>
            </div>
          </div>
        </div>
      )}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
