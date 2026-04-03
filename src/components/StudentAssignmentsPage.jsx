import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import SubmitModal from './SubmitModal';
import GroupModal from './GroupModal';
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

export default function StudentAssignmentsPage({ user, course, courses, assignments, groups, users, onBack, onLogout, onUpdateAssignments, onUpdateGroups }) {
  const [submitTarget, setSubmitTarget] = useState(null);
  const [showGroup, setShowGroup]       = useState(false);
  const [filter, setFilter]             = useState('all');
  const [search, setSearch]             = useState('');
  const [toasts, setToasts]             = useState([]);

  const addToast = useCallback((msg, type='success') => {
    const id = ++tid;
    setToasts(t => [...t, { id, message: msg, type }]);
  }, []);
  const removeToast = useCallback(id => setToasts(t => t.filter(x => x.id !== id)), []);

  const myGroup = groups.find(g => g.courseId === course.id && g.members.includes(user.id));

  const isSubmitted = (a) => !!a.submissions?.[user.id];

  const getStatusInfo = (a) => {
    const sub = isSubmitted(a);
    const over = isOverdue(a.dueDate) && !sub;
    if (sub) return { key: 'submitted', label: 'Submitted', cls: 'submitted' };
    if (over) return { key: 'overdue',   label: 'Overdue',   cls: 'overdue' };
    return { key: 'pending', label: 'Pending', cls: 'pending' };
  };

  // Filter + search
  const filtered = assignments.filter(a => {
    const st = getStatusInfo(a).key;
    if (filter !== 'all' && st !== filter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const submitted = assignments.filter(a => isSubmitted(a)).length;
  const pending   = assignments.filter(a => !isSubmitted(a)).length;
  const pct = assignments.length > 0 ? Math.round((submitted / assignments.length) * 100) : 0;

  const handleSubmit = (a) => {
    if (a.submissionType === 'group') {
      if (!myGroup) { addToast('Join or create a group first!', 'error'); return; }
      if (myGroup.leaderId !== user.id) { addToast('Only the group leader can submit.', 'error'); return; }
    }
    setSubmitTarget(a);
  };

  const handleConfirmSubmit = () => {
    if (!submitTarget) return;
    const ts = new Date().toISOString();
    const updated = assignments.map(a => {
      if (a.id !== submitTarget.id) return a;
      // For group: mark all members
      if (a.submissionType === 'group' && myGroup) {
        const subs = { ...a.submissions };
        myGroup.members.forEach(mid => { subs[mid] = ts; });
        return { ...a, submissions: subs };
      }
      return { ...a, submissions: { ...a.submissions, [user.id]: ts } };
    });
    // We need to update ALL assignments not just this course's
    onUpdateAssignments(updated);
    addToast(`"${submitTarget.title}" submitted! 🎉`, 'success');
    setSubmitTarget(null);
  };

  // We pass ALL assignments to update (parent merges them)
  // But our `assignments` prop is only for this course
  // Fix: we need to call parent with all assignments, so we store courseId-filtered ones
  // Actually onUpdateAssignments is called with just this course's updated assignments?
  // No - parent passes `assignments.filter(a => a.courseId === course.id)` but onUpdateAssignments saves ALL.
  // We need ALL assignments. Let's reconstruct:
  // Actually the parent passes `onUpdateAssignments={saveAssign}` which expects ALL assignments.
  // But `assignments` prop here is only for this course. We need a way to update only these.
  // Solution: wrap onUpdateAssignments to handle the merge - but that requires passing allAssignments.
  // Simplest fix: store all in parent, pass down a function that receives course-only array and parent merges.
  // Since we already have this problem, let me make onUpdateAssignments smarter in the parent.
  // For now: the parent's saveAssign saves ALL assignments. But we only have THIS course's assignments.
  // We need to re-check App.jsx... 
  // App passes: assignments={assignments.filter(a => a.courseId === activeCourse.id)}
  // and onUpdateAssignments={saveAssign} which expects ALL assignments.
  // Fix: we need to pass ALL assignments in, or change the update function.
  // I'll work around it: the student page calls onUpdateAssignments with the FULL set.
  // We need allAssignments here. Let me add it or use a different approach.
  // 
  // Actually looking at App.jsx, I can fix this by passing a merge function.
  // For now, the handleConfirmSubmit above constructs `updated` from the course-assignments only.
  // This is wrong. Let me refactor: we accept a prop `allAssignments` or we use a callback.
  // Actually in App.jsx I can pass onUpdateAssignments as a merge function.

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
            <p>{assignments.length} assignment{assignments.length !== 1 ? 's' : ''} · {submitted} submitted · {pending} pending</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <circle cx="34" cy="34" r="26" fill="none" stroke="var(--bg-card)" strokeWidth="5" />
              <circle cx="34" cy="34" r="26" fill="none"
                stroke={course.color} strokeWidth="5" opacity="0.85"
                strokeDasharray={`${2*Math.PI*26}`}
                strokeDashoffset={`${2*Math.PI*26*(1-pct/100)}`}
                strokeLinecap="round" transform="rotate(-90 34 34)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <text x="34" y="39" textAnchor="middle" fill="var(--text-1)"
                style={{ fontFamily:'Syne,sans-serif', fontSize:'12px', fontWeight:800 }}>{pct}%</text>
            </svg>
            <span style={{ fontSize:'0.72rem', color:'var(--text-3)' }}>Course</span>
          </div>
        </div>

        {/* Group status bar */}
        {assignments.some(a => a.submissionType === 'group') && (
          <div style={{ marginBottom: '20px' }}>
            {myGroup ? (
              <div className="group-status-card">
                <div className="group-status-info">
                  <div className="group-status-name">
                    {myGroup.name}
                    {myGroup.leaderId === user.id && <span className="group-leader-tag">You're Leader</span>}
                  </div>
                  <div className="group-member-pills">
                    {myGroup.members.map(mid => (
                      <span key={mid} className="group-member-pill">
                        {users.find(u => u.id === mid)?.name?.split(' ')[0] || mid}
                        {mid === myGroup.leaderId ? ' 👑' : ''}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowGroup(true)}>Manage Group</button>
              </div>
            ) : (
              <div className="group-prompt">
                <span className="group-prompt-icon">⚠️</span>
                <div className="group-prompt-text">
                  <strong>You're not in a group yet</strong>
                  <p>This course has group assignments. You must be in a group for the group leader to submit on your behalf.</p>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowGroup(true)}>👥 Form or Join a Group</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filter row */}
        <div className="asgn-filter-row">
          <input className="asgn-search" placeholder="🔍 Search assignments…" value={search} onChange={e => setSearch(e.target.value)} />
          {['all','pending','submitted','overdue'].map(f => (
            <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Section */}
        <div className="section-header">
          <h2>Assignments</h2>
          <span className="section-count">{filtered.length} shown</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">{filter === 'submitted' ? '🎉' : '📭'}</div>
            <h3>{search ? 'No matches' : filter === 'submitted' ? 'Nothing submitted yet' : 'All done!'}</h3>
            <p>{search ? 'Try a different search.' : 'No assignments in this filter.'}</p>
          </div>
        ) : (
          <div className="assignments-grid">
            {filtered.map(a => (
              <AssignmentCard key={a.id} assignment={a} user={user} myGroup={myGroup}
                status={getStatusInfo(a)} onSubmit={() => handleSubmit(a)} />
            ))}
          </div>
        )}
      </div>

      {submitTarget && (
        <SubmitModal
          assignment={submitTarget}
          myGroup={myGroup}
          currentUser={user}
          onConfirm={handleConfirmSubmit}
          onClose={() => setSubmitTarget(null)}
        />
      )}
      {showGroup && (
        <GroupModal
          courseId={course.id}
          groups={groups}
          users={users}
          currentUser={user}
          onClose={() => setShowGroup(false)}
          onUpdateGroups={onUpdateGroups}
        />
      )}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

function AssignmentCard({ assignment, user, myGroup, status, onSubmit }) {
  const [expanded, setExpanded] = useState(false);
  const isGroup = assignment.submissionType === 'group';
  const isSub   = status.key === 'submitted';
  const ts      = assignment.submissions?.[user.id];
  const over    = isOverdue(assignment.dueDate) && !isSub;

  // Group submit logic for button label
  let submitLabel = 'Submit';
  let canSubmit   = !isSub;
  let leaderOnly  = false;
  if (isGroup) {
    if (!myGroup) { canSubmit = false; }
    else if (myGroup.leaderId !== user.id) { canSubmit = false; leaderOnly = true; }
  }

  return (
    <div className="asgn-card">
      <div className="asgn-card-top">
        <div className="asgn-card-meta">
          <span className={`type-badge ${isGroup ? 'group' : 'individual'}`}>
            {isGroup ? '👥 Group' : '👤 Individual'}
          </span>
          <span className={`status-badge ${status.cls}`}>
            <span className="status-dot" />{status.label}
          </span>
        </div>
        <h3>{assignment.title}</h3>
        <p className={`asgn-desc ${expanded ? 'expanded' : ''}`} style={{ WebkitLineClamp: expanded ? 'unset' : 3 }}>
          {assignment.description}
        </p>
        {assignment.description.length > 120 && (
          <button onClick={() => setExpanded(e => !e)} style={{ background:'none', border:'none', color:'var(--accent)', fontSize:'0.78rem', cursor:'pointer', fontFamily:'Jost,sans-serif', padding:'4px 0', fontWeight:600 }}>
            {expanded ? 'Show less ▲' : 'Read more ▼'}
          </button>
        )}
        <div className={`asgn-due ${over ? 'overdue' : ''}`} style={{ marginTop:'12px' }}>
          🕐 Due: <span>{fmtDeadline(assignment.dueDate)}</span>
          {over && <span style={{ color:'var(--warning)', marginLeft:'8px' }}>— Overdue</span>}
        </div>
        {isSub && ts && (
          <span className="submission-ts">✓ Acknowledged {fmtTS(ts)}</span>
        )}
        {leaderOnly && !isSub && (
          <div className="leader-only-notice" style={{ marginTop:'10px' }}>
            ⏳ Waiting for group leader <strong style={{marginLeft:'4px'}}>
              ({[myGroup?.leaderId].map(id => user.id === id ? 'you' : 'leader')})</strong> to submit.
          </div>
        )}
      </div>
      <div className="asgn-card-bottom">
        {isSub ? (
          <button className="btn btn-secondary btn-sm" disabled>✓ Acknowledged</button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={onSubmit} disabled={!canSubmit && !isGroup || (!canSubmit && isGroup && !myGroup)}>
            {submitLabel}
          </button>
        )}
        {assignment.driveLink && (
          <a href={assignment.driveLink} target="_blank" rel="noopener noreferrer" className="drive-link" style={{ marginLeft: 'auto' }}>
            🔗 Drive
          </a>
        )}
      </div>
    </div>
  );
}

