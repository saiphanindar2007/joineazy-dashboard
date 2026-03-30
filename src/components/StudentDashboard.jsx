import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import SubmitModal from './SubmitModal';
import Toast from './Toast';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isOverdue(dateStr) {
  return new Date(dateStr) < new Date();
}

let toastId = 0;

export default function StudentDashboard({ user, assignments, onLogout, onUpdateAssignments }) {
  const [submitTarget, setSubmitTarget] = useState(null);
  const [filter, setFilter] = useState('all');
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts(t => [...t, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  const myAssignments = assignments; // all assignments visible to student
  const submitted = myAssignments.filter(a => a.submissions.includes(user.id));
  const pending   = myAssignments.filter(a => !a.submissions.includes(user.id));

  const filtered = filter === 'all'
    ? myAssignments
    : filter === 'submitted'
    ? submitted
    : pending;

  const handleConfirmSubmit = () => {
    if (!submitTarget) return;
    const updated = assignments.map(a =>
      a.id === submitTarget.id
        ? { ...a, submissions: [...a.submissions, user.id] }
        : a
    );
    onUpdateAssignments(updated);
    addToast(`"${submitTarget.title}" marked as submitted! 🎉`, 'success');
    setSubmitTarget(null);
  };

  const progressPct = myAssignments.length > 0
    ? Math.round((submitted.length / myAssignments.length) * 100)
    : 0;

  return (
    <div className="dashboard">
      <Navbar
        user={user}
        onLogout={onLogout}
        tabs={[
          { id: 'all', label: 'All' },
          { id: 'pending', label: 'Pending' },
          { id: 'submitted', label: 'Submitted' },
        ]}
        activeTab={filter}
        onTabChange={setFilter}
      />

      <div className="dashboard-body">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-left">
            <div className="page-header-eyebrow">Student Dashboard</div>
            <h1>Hello, {user.name.split(' ')[0]} 👋</h1>
            <p>Track your assignments and submissions below.</p>
          </div>

          {/* Circular progress */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--bg-card)" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="32"
                fill="none"
                stroke="url(#prog)"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - progressPct / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <defs>
                <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--accent2)" />
                </linearGradient>
              </defs>
              <text x="40" y="44" textAnchor="middle" fill="var(--text-1)"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 800 }}>
                {progressPct}%
              </text>
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 500 }}>Overall</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon blue">📋</div>
            <div className="stat-info">
              <div className="stat-label">Total Assignments</div>
              <div className="stat-value">{myAssignments.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <div className="stat-info">
              <div className="stat-label">Submitted</div>
              <div className="stat-value" style={{ color: 'var(--success)' }}>{submitted.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">⏳</div>
            <div className="stat-info">
              <div className="stat-label">Pending</div>
              <div className="stat-value" style={{ color: 'var(--danger)' }}>{pending.length}</div>
            </div>
          </div>
        </div>

        {/* Filter bar (mobile) */}
        <div className="filter-bar" style={{ display: 'none' }}>
          {/* Hidden on desktop since nav tabs handle it */}
        </div>

        {/* Section header */}
        <div className="section-header">
          <h2>
            {filter === 'all' ? 'All Assignments' : filter === 'submitted' ? 'Submitted' : 'Pending'}
          </h2>
          <span className="section-count">{filtered.length} assignment{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Assignment grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              {filter === 'submitted' ? '🎉' : '📭'}
            </div>
            <h3>{filter === 'submitted' ? 'Nothing submitted yet' : 'All caught up!'}</h3>
            <p>
              {filter === 'submitted'
                ? 'Complete and submit assignments to see them here.'
                : 'You have no pending assignments. Great work!'}
            </p>
          </div>
        ) : (
          <div className="assignments-grid">
            {filtered.map(a => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                userId={user.id}
                onSubmit={() => setSubmitTarget(a)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit Modal */}
      {submitTarget && (
        <SubmitModal
          assignment={submitTarget}
          onConfirm={handleConfirmSubmit}
          onClose={() => setSubmitTarget(null)}
        />
      )}

      {/* Toasts */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

/* ── Assignment Card ── */
function AssignmentCard({ assignment, userId, onSubmit }) {
  const isSubmitted = assignment.submissions.includes(userId);
  const overdue = isOverdue(assignment.dueDate) && !isSubmitted;

  const getStatus = () => {
    if (isSubmitted) return 'submitted';
    if (overdue) return 'overdue';
    return 'pending';
  };
  const status = getStatus();

  const statusMeta = {
    submitted: { label: 'Submitted',  cls: 'submitted', icon: '✓' },
    pending:   { label: 'Pending',    cls: 'pending',   icon: '○' },
    overdue:   { label: 'Overdue',    cls: 'overdue',   icon: '!' },
  };

  return (
    <div className="asgn-card">
      <div className="asgn-card-top">
        <div className="asgn-card-meta">
          <span className="subject-badge">{assignment.subject}</span>
          <span className={`status-badge ${statusMeta[status].cls}`}>
            <span className="status-dot" />
            {statusMeta[status].label}
          </span>
        </div>

        <h3>{assignment.title}</h3>
        <p className="asgn-desc">{assignment.description}</p>

        <div className={`asgn-due ${overdue ? 'overdue' : ''}`}>
          📅 Due: <span>{formatDate(assignment.dueDate)}</span>
          {overdue && <span style={{ color: 'var(--warning)', marginLeft: '8px' }}>— Overdue</span>}
        </div>
      </div>

      <div className="asgn-card-bottom">
        {isSubmitted ? (
          <button className="btn btn-secondary btn-sm" disabled>
            ✓ Submitted
          </button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={onSubmit}>
            Submit
          </button>
        )}

        {assignment.driveLink && (
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="drive-link"
            style={{ marginLeft: isSubmitted ? '0' : 'auto' }}
          >
            🔗 Drive
          </a>
        )}
      </div>
    </div>
  );
}
