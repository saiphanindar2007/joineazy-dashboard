import React, { useState } from 'react';

function fmtTS(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function SubmitModal({ assignment, myGroup, currentUser, onConfirm, onClose }) {
  const [step, setStep] = useState(1);
  const isGroup = assignment.submissionType === 'group';
  const memberCount = myGroup?.members?.length || 0;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        {step === 1 && (
          <>
            <div className="modal-head">
              <div>
                <div className="modal-head-icon info">📤</div>
                <h2>Confirm Submission</h2>
                <p>Review before marking as submitted.</p>
              </div>
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-steps">
                <div className="step-dot active" /><div className="step-dot" />
              </div>
              <div className="modal-info-box">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <h4 style={{ flex: 1, margin: 0 }}>{assignment.title}</h4>
                  <span className={`type-badge ${isGroup ? 'group' : 'individual'}`}>
                    {isGroup ? '👥 Group' : '👤 Individual'}
                  </span>
                </div>
                <p style={{ marginBottom: '8px' }}>{assignment.description}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '8px' }}>
                  📅 Due: {fmtDeadline(assignment.dueDate)}
                </p>
              </div>
              {isGroup && myGroup && (
                <div style={{ marginBottom: '14px', background: 'var(--gold-dim)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', fontSize: '0.85rem', color: 'var(--gold)' }}>
                  👑 Submitting as <strong>{myGroup.name}</strong> leader — this will mark all {memberCount} member{memberCount !== 1 ? 's' : ''} as submitted.
                </div>
              )}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', marginBottom: '14px', lineHeight: 1.7 }}>
                Have you already uploaded your work using the Drive link below?
              </p>
              {assignment.driveLink && (
                <a href={assignment.driveLink} target="_blank" rel="noopener noreferrer" className="btn btn-teal" style={{ display: 'inline-flex', marginBottom: '4px' }}>
                  🔗 Open Drive Link
                </a>
              )}
            </div>
            <div className="modal-foot">
              <button className="btn btn-secondary" onClick={onClose}>Not yet</button>
              <button className="btn btn-primary" onClick={() => setStep(2)}>✓ Yes, I have submitted</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="modal-head">
              <div>
                <div className="modal-head-icon warn">⚠️</div>
                <h2>Final Confirmation</h2>
                <p>This will be timestamped and cannot be undone.</p>
              </div>
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-steps">
                <div className="step-dot done" /><div className="step-dot active" />
              </div>
              <div className="modal-warn-text">
                <span>⚠</span>
                <span>
                  Confirming will timestamp your acknowledgment at <strong>right now</strong>.
                  {isGroup && myGroup && ` All ${memberCount} members of "${myGroup.name}" will be marked submitted.`}
                </span>
              </div>
              <div className="modal-info-box">
                <h4>Submitting:</h4>
                <p style={{ fontWeight: 600, color: 'var(--text-1)', marginTop: '4px' }}>{assignment.title}</p>
                {isGroup && myGroup && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginTop: '4px' }}>Group: {myGroup.name} ({memberCount} members)</p>
                )}
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>← Go back</button>
              <button className="btn btn-primary" onClick={() => { onConfirm(); onClose(); }}>✓ Confirm Submission</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function fmtDeadline(d) {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return d; }
}
