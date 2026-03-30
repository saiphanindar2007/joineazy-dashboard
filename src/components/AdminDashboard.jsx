import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import CreateAssignmentModal from './CreateAssignmentModal';
import Toast from './Toast';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

let toastId = 0;

export default function AdminDashboard({ user, assignments, students, onLogout, onUpdateAssignments }) {
  const [showCreate, setShowCreate] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [activeTab, setActiveTab] = useState('mine');

  const addToast = useCallback((message, type = 'info') => {
    const id = ++toastId;
    setToasts(t => [...t, { id, message, type }]);
  }, []);
  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  const myAssignments = assignments.filter(a => a.createdBy === user.id);
  const allAssignments = assignments;
  const displayed = activeTab === 'mine' ? myAssignments : allAssignments;

  const totalSubmissions = myAssignments.reduce((sum, a) => sum + a.submissions.length, 0);
  const totalPossible   = myAssignments.length * students.length;
  const overallPct      = totalPossible > 0 ? Math.round((totalSubmissions / totalPossible) * 100) : 0;

  const handleCreate = (newAssignment) => {
    const updated = [...assignments, newAssignment];
    onUpdateAssignments(updated);
    addToast(`Assignment "${newAssignment.title}" created!`, 'success');
  };

  const handleDelete = (id) => {
    const asgn = assignments.find(a => a.id === id);
    if (!window.confirm(`Delete "${asgn?.title}"? This cannot be undone.`)) return;
    const updated = assignments.filter(a => a.id !== id);
    onUpdateAssignments(updated);
    addToast('Assignment deleted.', 'info');
  };

  return (
    <div className="dashboard">
      <Navbar
        user={user}
        onLogout={onLogout}
        tabs={[
          { id: 'mine', label: 'My Assignments' },
          { id: 'all', label: 'All Assignments' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="dashboard-body">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-left">
            <div className="page-header-eyebrow">Professor Dashboard</div>
            <h1>Welcome, {user.name} 🏛</h1>
            <p>Manage assignments and review student submissions.</p>
          </div>
          <div className="admin-actions">
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
              + New Assignment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon blue">📝</div>
            <div className="stat-info">
              <div className="stat-label">Created by Me</div>
              <div className="stat-value">{myAssignments.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon teal">👥</div>
            <div className="stat-info">
              <div className="stat-label">Total Students</div>
              <div className="stat-value">{students.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <div className="stat-info">
              <div className="stat-label">Submissions Received</div>
              <div className="stat-value" style={{ color: 'var(--success)' }}>{totalSubmissions}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon gold">📊</div>
            <div className="stat-info">
              <div className="stat-label">Completion Rate</div>
              <div className="stat-value" style={{ color: 'var(--gold)' }}>{overallPct}%</div>
            </div>
          </div>
        </div>

        {/* Section header */}
        <div className="section-header">
          <h2>{activeTab === 'mine' ? 'My Assignments' : 'All Assignments'}</h2>
          <span className="section-count">{displayed.length} total</span>
        </div>

        {/* Assignment list */}
        {displayed.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No assignments yet</h3>
            <p>Create your first assignment to get started.</p>
          </div>
        ) : (
          <div className="admin-cards-list">
            {displayed.map(a => (
              <AdminAssignmentCard
                key={a.id}
                assignment={a}
                students={students}
                isOwner={a.createdBy === user.id}
                onDelete={() => handleDelete(a.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateAssignmentModal
          user={user}
          onSave={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

/* ── Admin Assignment Card ── */
function AdminAssignmentCard({ assignment, students, isOwner, onDelete }) {
  const [open, setOpen] = useState(false);

  const submitted = students.filter(s => assignment.submissions.includes(s.id));
  const pct = students.length > 0
    ? Math.round((submitted.length / students.length) * 100)
    : 0;

  const barColor = pct === 100
    ? 'linear-gradient(90deg, var(--success), #0fba7a)'
    : pct >= 50
    ? 'linear-gradient(90deg, var(--accent), var(--accent2))'
    : 'linear-gradient(90deg, var(--danger), var(--warning))';

  return (
    <div className="admin-asgn-card">
      <div className="admin-card-head">
        <div className="admin-card-body">
          <div className="admin-card-title-row">
            <h3 className="admin-card-title">{assignment.title}</h3>
            <div className="admin-card-actions">
              {isOwner && (
                <button className="btn-icon-only" title="Delete" onClick={onDelete}
                  style={{ color: 'var(--danger)', borderColor: 'rgba(255,77,109,0.25)' }}>
                  🗑
                </button>
              )}
            </div>
          </div>

          <p className="admin-card-desc">{assignment.description}</p>

          <div className="admin-card-chips">
            <span className="chip chip-subject">📚 {assignment.subject}</span>
            <span className="chip chip-due">📅 Due {formatDate(assignment.dueDate)}</span>
            {assignment.driveLink && (
              <a href={assignment.driveLink} target="_blank" rel="noopener noreferrer"
                className="chip chip-drive">
                🔗 Drive Link
              </a>
            )}
            {!isOwner && (
              <span className="chip" style={{ background: 'var(--bg-2)', color: 'var(--text-3)', border: '1px solid var(--border)', fontSize: '0.75rem' }}>
                By another professor
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progress section */}
      <div className="admin-progress-section">
        <div className="progress-header">
          <span className="progress-label">Class Submissions</span>
          <span className="progress-fraction">
            {submitted.length} / {students.length} &nbsp;
            <span style={{ color: pct === 100 ? 'var(--success)' : pct >= 50 ? 'var(--accent)' : 'var(--danger)', fontWeight: 800 }}>
              ({pct}%)
            </span>
          </span>
        </div>

        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${pct}%`, background: barColor }}
          />
        </div>

        {/* Toggle student list */}
        <button className="toggle-students-btn" onClick={() => setOpen(o => !o)}>
          <span className={`toggle-chevron ${open ? 'open' : ''}`}>▾</span>
          {open ? 'Hide' : 'View'} student details
        </button>

        <div className={`students-list ${open ? 'visible' : ''}`}>
          {students.map(s => {
            const did = assignment.submissions.includes(s.id);
            return (
              <div key={s.id} className="student-row">
                <div className="student-row-av">{s.avatar}</div>
                <span className="student-row-name">{s.name}</span>
                <span className={`student-status-pill ${did ? 'yes' : 'no'}`}>
                  {did ? '✓ Submitted' : '✕ Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
