import React, { useState } from 'react';

const EMPTY = { title: '', description: '', subject: '', dueDate: '', driveLink: '' };

export default function CreateAssignmentModal({ user, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim())       err.title = 'Title is required';
    if (!form.subject.trim())     err.subject = 'Subject is required';
    if (!form.dueDate)            err.dueDate = 'Due date is required';
    if (!form.description.trim()) err.description = 'Description is required';
    return err;
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length > 0) { setErrors(err); return; }

    const newAssignment = {
      id: 'asgn_' + Date.now(),
      ...form,
      createdBy: user.id,
      createdAt: new Date().toISOString().split('T')[0],
      submissions: [],
    };
    onSave(newAssignment);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal modal-lg">
        <div className="modal-head">
          <div>
            <div className="modal-head-icon create">✏️</div>
            <h2>Create New Assignment</h2>
            <p>Fill in the details. Students will see this immediately.</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            {/* Title */}
            <div className="form-group full">
              <label className="form-label">Assignment Title <span>*</span></label>
              <input
                className="form-input"
                placeholder="e.g. Data Structures: Binary Trees"
                value={form.title}
                onChange={e => set('title', e.target.value)}
              />
              {errors.title && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.title}</span>}
            </div>

            {/* Subject */}
            <div className="form-group">
              <label className="form-label">Subject <span>*</span></label>
              <input
                className="form-input"
                placeholder="e.g. Computer Science"
                value={form.subject}
                onChange={e => set('subject', e.target.value)}
              />
              {errors.subject && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.subject}</span>}
            </div>

            {/* Due Date */}
            <div className="form-group">
              <label className="form-label">Due Date <span>*</span></label>
              <input
                className="form-input"
                type="date"
                value={form.dueDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => set('dueDate', e.target.value)}
              />
              {errors.dueDate && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.dueDate}</span>}
            </div>

            {/* Description */}
            <div className="form-group full">
              <label className="form-label">Description <span>*</span></label>
              <textarea
                className="form-textarea"
                placeholder="Describe what students need to do..."
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={3}
              />
              {errors.description && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.description}</span>}
            </div>

            {/* Drive Link */}
            <div className="form-group full">
              <label className="form-label">Google Drive Submission Link</label>
              <input
                className="form-input"
                placeholder="https://drive.google.com/drive/folders/..."
                value={form.driveLink}
                onChange={e => set('driveLink', e.target.value)}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                Paste the shared Drive folder link where students upload work
              </span>
            </div>
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            ✓ Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
