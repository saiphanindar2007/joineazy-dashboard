import React, { useState } from 'react';

export default function SubmitModal({ assignment, onConfirm, onClose }) {
  const [step, setStep] = useState(1); // 1 = first confirm, 2 = final confirm

  const handleFirstConfirm = () => setStep(2);

  const handleFinalConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="modal-head">
              <div>
                <div className="modal-head-icon info">📤</div>
                <h2>Confirm Your Submission</h2>
                <p>Please verify before marking this as submitted.</p>
              </div>
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>

            <div className="modal-body">
              {/* Steps indicator */}
              <div className="modal-steps">
                <div className="step-dot active" />
                <div className="step-dot" />
              </div>

              <div className="modal-info-box">
                <h4>{assignment.title}</h4>
                <p style={{ marginBottom: '10px' }}>{assignment.description}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '8px' }}>
                  📅 Due: {formatDate(assignment.dueDate)} &nbsp;·&nbsp; 📚 {assignment.subject}
                </p>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', marginBottom: '16px', lineHeight: '1.7' }}>
                Have you already uploaded your work to Google Drive using the provided submission link?
              </p>

              {assignment.driveLink && (
                <a
                  href={assignment.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-teal"
                  style={{ marginBottom: '16px', display: 'inline-flex' }}
                >
                  🔗 Open Drive Link
                </a>
              )}
            </div>

            <div className="modal-foot">
              <button className="btn btn-secondary" onClick={onClose}>Not yet</button>
              <button className="btn btn-primary" onClick={handleFirstConfirm}>
                ✓ Yes, I have submitted
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div className="modal-head">
              <div>
                <div className="modal-head-icon warn">⚠️</div>
                <h2>Final Confirmation</h2>
                <p>This action cannot be undone. Please make sure.</p>
              </div>
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>

            <div className="modal-body">
              {/* Steps indicator */}
              <div className="modal-steps">
                <div className="step-dot done" />
                <div className="step-dot active" />
              </div>

              <div className="modal-warn-text">
                <span>⚠</span>
                <span>
                  Once confirmed, your submission status will be marked as <strong>Submitted</strong> and
                  will be visible to your professor. You cannot undo this.
                </span>
              </div>

              <div className="modal-info-box">
                <h4>You are submitting:</h4>
                <p style={{ marginTop: '4px', fontWeight: 600, color: 'var(--text-1)' }}>{assignment.title}</p>
              </div>
            </div>

            <div className="modal-foot">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>← Go back</button>
              <button className="btn btn-primary" onClick={handleFinalConfirm}>
                ✓ Confirm Submission
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
