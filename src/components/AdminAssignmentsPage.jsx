import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import CreateAssignmentModal from './CreateAssignmentModal';
import Toast from './Toast';

let tid = 0;

function fmtDeadline(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }); }
  catch { return d; }
}
function fmtTS(ts) {
  if (!ts) return '';
  try { return new Date(ts).toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }); }
  catch { return ts; }
}
function isOverdue(d) { return d && new Date(d) < new Date(); }

export default function AdminAssignmentsPage({ user, course, assignments, allStudents, groups, onBack, onLogout, onUpdateAssignments }) {
  const [showCreate, setShowCreate]   = useState(false);
  const [editTarget, setEditTarget]   = useState(null);
  const [filter, setFilter]           = useState('all');
  const [search, setSearch]           = useState('');
  const [toasts, setToasts]           = useState([]);

  const addToast = useCallback((msg, type='success') => {
    const id = ++tid;
    setToasts(t => [...t, { id, message: msg, type }]);
  }, []);
  const removeToast = useCallback(id => setToasts(t => t.filter(x => x.id !== id)), []);

  const enrolled = course.enrolledStudents || allStudents.map(s => s.id);
  const enrolledStudents = allStudents.filter(s => enrolled.includes(s.id));
  const courseGroups = groups.filter(g => g.courseId === course.id);

  // Filter
  const getSubmissionPct = (a) => {
    if (a.submissionType === 'group') {
      const submitted = courseGroups.filter(g => g.members.some(m => a.submissions?.[m])).length;
      return courseGroups.length > 0 ? Math.round((submitted / courseGroups.length) * 100) : 0;
    }
    const submitted = enrolledStudents.filter(s => a.submissions?.[s.id]).length;
    return enrolledStudents.length > 0 ? Math.round((submitted / enrolledStudents.length) * 100) : 0;
  };

  const filtered = assignments.filter(a => {
    if (filter === 'individual' && a.submissionType !== 'individual') return false;
    if (filter === 'group'      && a.submissionType !== 'group')      return false;
    if (filter === 'complete'   && getSubmissionPct(a) < 100)         return false;
    if (filter === 'incomplete' && getSubmissionPct(a) === 100)       return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleCreate = (newA) => {
    onUpdateAssignments([...assignments, newA]);
    addToast(`"${newA.title}" created!`, 'success');
    setShowCreate(false);
  };
  const handleEdit = (updatedA) => {
    onUpdateAssignments(assignments.map(a => a.id === updatedA.id ? updatedA : a));
    addToast('Assignment updated.', 'info');
    setEditTarget(null);
  };
  const handleDelete = (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    onUpdateAssignments(assignments.filter(a => a.id !== id));
    addToast('Assignment deleted.', 'info');
  };

  // Overall stats for this course
  const totalSubs = assignments.reduce((s, a) => s + Object.keys(a.submissions || {}).length, 0);
  const possible  = assignments.reduce((s, a) => {
    if (a.submissionType === 'group') return s + courseGroups.length;
    return s + enrolledStudents.length;
  }, 0);
  const overallPct = possible > 0 ? Math.round((totalSubs / possible) * 100) : 0;

  return (
    <div className="dashboard">
      <Navbar
        user={user}
        onLogout={onLogout}
        onBack={onBack}
        breadcrumb={[
          { label: 'Courses', onClick: onBack },
          { label: `${course.code} – ${course.name}` },
        ]}
      />
      <div className="dashboard-body">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-left">
            <div className="page-header-eyebrow" style={{ color: course.color }}>{course.code}</div>
            <h1>{course.name}</h1>
            <p>{enrolledStudents.length} students enrolled · {assignments.length} assignments</p>
          </div>
          <div className="admin-actions">
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>+ New Assignment</button>
          </div>
        </div>

        {/* Analytics strip */}
        <div className="analytics-strip" style={{ marginBottom:'28px' }}>
          <div className="analytics-item">
            <div className="analytics-item-val">{assignments.length}</div>
            <div className="analytics-item-label">Assignments</div>
          </div>
          <div className="analytics-item">
            <div className="analytics-item-val" style={{ color:'var(--success)' }}>{totalSubs}</div>
            <div className="analytics-item-label">Acknowledgements</div>
          </div>
          <div className="analytics-item">
            <div className="analytics-item-val" style={{ color:'var(--gold)' }}>{courseGroups.length}</div>
            <div className="analytics-item-label">Groups Formed</div>
          </div>
          <div className="analytics-item">
            <div className="analytics-item-val" style={{ color: overallPct >= 75 ? 'var(--success)' : overallPct >= 40 ? 'var(--accent)' : 'var(--danger)' }}>
              {overallPct}%
            </div>
            <div className="analytics-item-label">Completion Rate</div>
          </div>
        </div>

        {/* Filter row */}
        <div className="asgn-filter-row">
          <input className="asgn-search" placeholder="🔍 Search…" value={search} onChange={e => setSearch(e.target.value)} />
          {[
            { id:'all', label:'All' },
            { id:'individual', label:'👤 Individual' },
            { id:'group', label:'👥 Group' },
            { id:'complete', label:'✅ Complete' },
            { id:'incomplete', label:'⏳ Incomplete' },
          ].map(f => (
            <button key={f.id} className={`filter-chip ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="section-header">
          <h2>Assignments</h2>
          <span className="section-count">{filtered.length} shown</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>{search ? 'No matches' : 'No assignments yet'}</h3>
            <p>{search ? 'Try different search terms.' : 'Create the first assignment for this course.'}</p>
          </div>
        ) : (
          <div className="admin-cards-list">
            {filtered.map(a => (
              <AdminAssignmentCard
                key={a.id}
                assignment={a}
                enrolledStudents={enrolledStudents}
                courseGroups={courseGroups}
                isOwner={a.createdBy === user.id}
                pct={getSubmissionPct(a)}
                onEdit={() => setEditTarget(a)}
                onDelete={() => handleDelete(a.id, a.title)}
              />
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateAssignmentModal user={user} courseId={course.id} onSave={handleCreate} onClose={() => setShowCreate(false)} />
      )}
      {editTarget && (
        <CreateAssignmentModal user={user} courseId={course.id} editData={editTarget} onSave={handleEdit} onClose={() => setEditTarget(null)} />
      )}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

/* ── Admin Assignment Card ── */
function AdminAssignmentCard({ assignment, enrolledStudents, courseGroups, isOwner, pct, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const isGroup = assignment.submissionType === 'group';

  const barColor = pct >= 100
    ? 'linear-gradient(90deg,var(--success),#0fba7a)'
    : pct >= 50
    ? 'linear-gradient(90deg,var(--accent),var(--accent2))'
    : 'linear-gradient(90deg,var(--danger),var(--warning))';

  // For individual: per-student status
  // For group: per-group status
  const groupsSubmitted = isGroup
    ? courseGroups.filter(g => g.members.some(m => assignment.submissions?.[m]))
    : [];
  const submittedCount = isGroup ? groupsSubmitted.length : enrolledStudents.filter(s => assignment.submissions?.[s.id]).length;
  const totalCount     = isGroup ? courseGroups.length : enrolledStudents.length;

  return (
    <div className="admin-asgn-card">
      <div className="admin-card-head">
        <div className="admin-card-body">
          <div className="admin-card-title-row">
            <h3 className="admin-card-title">{assignment.title}</h3>
            <div className="admin-card-actions">
              {isOwner && (
                <>
                  <button className="btn-icon-only" title="Edit" onClick={onEdit} style={{ fontSize:'0.85rem' }}>✏️</button>
                  <button className="btn-icon-only" title="Delete" onClick={onDelete} style={{ color:'var(--danger)', borderColor:'rgba(255,77,109,0.25)', fontSize:'0.85rem' }}>🗑</button>
                </>
              )}
            </div>
          </div>
          <p className="admin-card-desc">{assignment.description}</p>
          <div className="admin-card-chips">
            <span className={`type-badge ${isGroup ? 'group' : 'individual'}`}>{isGroup ? '👥 Group' : '👤 Individual'}</span>
            <span className="chip chip-due">🕐 {fmtDeadline(assignment.dueDate)}</span>
            {assignment.driveLink && (
              <a href={assignment.driveLink} target="_blank" rel="noopener noreferrer" className="chip chip-drive">🔗 Drive Link</a>
            )}
            {isOverdue(assignment.dueDate) && (
              <span className="chip" style={{ background:'rgba(245,158,11,0.12)', color:'var(--warning)', border:'1px solid rgba(245,158,11,0.25)', fontSize:'0.72rem' }}>Deadline passed</span>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="admin-progress-section">
        <div className="progress-header">
          <span className="progress-label">{isGroup ? 'Groups Submitted' : 'Students Submitted'}</span>
          <span className="progress-fraction">
            {submittedCount} / {totalCount}
            <span style={{ color: pct >= 100 ? 'var(--success)' : pct >= 50 ? 'var(--accent)' : 'var(--danger)', fontWeight:800, marginLeft:'6px' }}>({pct}%)</span>
          </span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width:`${pct}%`, background: barColor }} />
        </div>

        <button className="toggle-students-btn" onClick={() => setOpen(o => !o)}>
          <span className={`toggle-chevron ${open ? 'open' : ''}`}>▾</span>
          {open ? 'Hide' : 'View'} {isGroup ? 'group' : 'student'} details
        </button>

        <div className={`students-list ${open ? 'visible' : ''}`}>
          {isGroup ? (
            courseGroups.length === 0 ? (
              <div style={{ fontSize:'0.83rem', color:'var(--text-3)', padding:'8px 0' }}>No groups formed yet.</div>
            ) : courseGroups.map(g => {
              const did = g.members.some(m => assignment.submissions?.[m]);
              const ts  = did ? assignment.submissions[g.members.find(m => assignment.submissions?.[m])] : null;
              return (
                <div key={g.id} className="student-row">
                  <div className="student-row-av" style={{ background:'var(--gold-dim)', color:'var(--gold)', border:'1px solid rgba(245,200,66,0.2)', fontSize:'0.75rem' }}>👥</div>
                  <div style={{ flex:1 }}>
                    <div className="student-row-name">{g.name} <span style={{ fontSize:'0.72rem', color:'var(--text-3)' }}>({g.members.length} members)</span></div>
                    {did && ts && <span className="submission-ts">Submitted {fmtTS(ts)}</span>}
                  </div>
                  <span className={`student-status-pill ${did ? 'yes' : 'no'}`}>{did ? '✓ Submitted' : '✕ Pending'}</span>
                </div>
              );
            })
          ) : (
            enrolledStudents.map(s => {
              const did = !!assignment.submissions?.[s.id];
              const ts  = assignment.submissions?.[s.id];
              return (
                <div key={s.id} className="student-row">
                  <div className="student-row-av">{s.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div className="student-row-name">{s.name}</div>
                    {did && ts && <span className="submission-ts">Acknowledged {fmtTS(ts)}</span>}
                  </div>
                  <span className={`student-status-pill ${did ? 'yes' : 'no'}`}>{did ? '✓ Submitted' : '✕ Pending'}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
