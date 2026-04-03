import React, { useState } from 'react';

const EMPTY = { title: '', description: '', subject: '', dueDate: '', driveLink: '', submissionType: 'individual' };

export default function CreateAssignmentModal({ user, courseId, editData, onSave, onClose }) {
  const isEdit = !!editData;
  const [form, setForm] = useState(isEdit ? {
    title: editData.title || '',
    description: editData.description || '',
    subject: editData.subject || '',
    dueDate: editData.dueDate || '',
    driveLink: editData.driveLink || '',
    submissionType: editData.submissionType || 'individual',
  } : EMPTY);
  const [errors, setErrors] = useState({});

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); setErrors(e => ({ ...e, [f]: '' })); };

  const validate = () => {
    const err = {};
    if (!form.title.trim())       err.title = 'Title is required';
    if (!form.dueDate)            err.dueDate = 'Deadline is required';
    if (!form.description.trim()) err.description = 'Description is required';
    return err;
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length) { setErrors(err); return; }
    if (isEdit) {
      onSave({ ...editData, ...form });
    } else {
      onSave({
        id: 'asgn_' + Date.now(),
        courseId,
        ...form,
        createdBy: user.id,
        createdAt: new Date().toISOString().split('T')[0],
        submissions: {},
      });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal modal-lg">
        <div className="modal-head">
          <div>
            <div className="modal-head-icon create">{isEdit ? '✏️' : '➕'}</div>
            <h2>{isEdit ? 'Edit Assignment' : 'Create New Assignment'}</h2>
            <p>Fill in the details. Students see this immediately.</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            {/* Title */}
            <div className="form-group full">
              <label className="form-label">Assignment Title <span>*</span></label>
              <input className="form-input" placeholder="e.g. Binary Trees Implementation" value={form.title} onChange={e => set('title', e.target.value)} />
              {errors.title && <span style={{ fontSize:'0.78rem', color:'var(--danger)' }}>{errors.title}</span>}
            </div>

            {/* Due Date + Time */}
            <div className="form-group">
              <label className="form-label">Deadline (Date & Time) <span>*</span></label>
              <input className="form-input" type="datetime-local" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
              {errors.dueDate && <span style={{ fontSize:'0.78rem', color:'var(--danger)' }}>{errors.dueDate}</span>}
            </div>

            {/* Submission Type */}
            <div className="form-group">
              <label className="form-label">Submission Type <span>*</span></label>
              <div style={{ display:'flex', gap:'8px' }}>
                {['individual','group'].map(t => (
                  <button key={t} onClick={() => set('submissionType', t)}
                    className="btn"
                    style={{
                      flex:1, justifyContent:'center',
                      background: form.submissionType === t ? (t === 'individual' ? 'var(--accent-dim)' : 'var(--gold-dim)') : 'transparent',
                      border: `1px solid ${form.submissionType === t ? (t === 'individual' ? 'var(--accent)' : 'var(--gold)') : 'var(--border)'}`,
                      color: form.submissionType === t ? (t === 'individual' ? 'var(--accent)' : 'var(--gold)') : 'var(--text-2)',
                      fontSize: '0.83rem',
                    }}>
                    {t === 'individual' ? '👤 Individual' : '👥 Group'}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="form-group full">
              <label className="form-label">Description <span>*</span></label>
              <textarea className="form-textarea" placeholder="Describe what students need to do…" value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
              {errors.description && <span style={{ fontSize:'0.78rem', color:'var(--danger)' }}>{errors.description}</span>}
            </div>

            {/* OneDrive / Drive Link */}
            <div className="form-group full">
              <label className="form-label">OneDrive / Google Drive Submission Link</label>
              <input className="form-input" placeholder="https://drive.google.com/drive/folders/…" value={form.driveLink} onChange={e => set('driveLink', e.target.value)} />
              <span style={{ fontSize:'0.78rem', color:'var(--text-3)' }}>Shared folder where students upload their work</span>
            </div>
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? '✓ Save Changes' : '✓ Create Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
}
