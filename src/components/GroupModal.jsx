import React, { useState } from 'react';

export default function GroupModal({ courseId, groups, users, currentUser, onClose, onUpdateGroups }) {
  const courseGroups  = groups.filter(g => g.courseId === courseId);
  const myGroup       = courseGroups.find(g => g.members.includes(currentUser.id));
  const [newName, setNewName] = useState('');
  const [error, setError]     = useState('');

  const getUserName = (id) => users.find(u => u.id === id)?.name || id;

  const handleCreate = () => {
    if (!newName.trim()) { setError('Group name is required'); return; }
    if (courseGroups.find(g => g.name.toLowerCase() === newName.trim().toLowerCase())) {
      setError('A group with this name already exists'); return;
    }
    const newGroup = {
      id: 'g_' + Date.now(),
      courseId,
      name: newName.trim(),
      leaderId: currentUser.id,
      members: [currentUser.id],
    };
    onUpdateGroups([...groups, newGroup]);
    onClose();
  };

  const handleJoin = (group) => {
    const updated = groups.map(g =>
      g.id === group.id ? { ...g, members: [...g.members, currentUser.id] } : g
    );
    onUpdateGroups(updated);
    onClose();
  };

  const handleLeave = () => {
    if (!myGroup) return;
    if (myGroup.leaderId === currentUser.id && myGroup.members.length > 1) {
      alert('Transfer leadership before leaving, or the group will be dissolved.');
      const updated = groups.filter(g => g.id !== myGroup.id);
      onUpdateGroups(updated);
    } else if (myGroup.members.length === 1) {
      // dissolve
      onUpdateGroups(groups.filter(g => g.id !== myGroup.id));
    } else {
      const updated = groups.map(g =>
        g.id === myGroup.id ? { ...g, members: g.members.filter(m => m !== currentUser.id) } : g
      );
      onUpdateGroups(updated);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal modal-lg">
        <div className="modal-head">
          <div>
            <div className="modal-head-icon info">👥</div>
            <h2>Group Management</h2>
            <p>{myGroup ? `You're in "${myGroup.name}"` : 'Join an existing group or create one.'}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {myGroup ? (
            /* ─── Already in a group ─── */
            <div>
              <div className="group-status-card" style={{ marginBottom: '20px' }}>
                <div className="group-status-info">
                  <div className="group-status-name">
                    {myGroup.name}
                    {myGroup.leaderId === currentUser.id && <span className="group-leader-tag">Leader</span>}
                  </div>
                  <div className="group-status-meta">{myGroup.members.length} member{myGroup.members.length !== 1 ? 's' : ''}</div>
                  <div className="group-member-pills">
                    {myGroup.members.map(mid => (
                      <span key={mid} className="group-member-pill">
                        {getUserName(mid).split(' ')[0]}
                        {mid === myGroup.leaderId ? ' 👑' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={handleLeave}>Leave Group</button>
            </div>
          ) : (
            /* ─── Not in a group ─── */
            <div>
              {courseGroups.length > 0 && (
                <>
                  <p style={{ fontSize: '0.87rem', color: 'var(--text-2)', marginBottom: '14px' }}>Join an existing group:</p>
                  <div className="group-list">
                    {courseGroups.map(g => (
                      <div key={g.id} className="group-list-item">
                        <div className="group-list-item-info">
                          <div className="group-list-item-name">{g.name}</div>
                          <div className="group-list-item-meta">
                            {g.members.length} member{g.members.length !== 1 ? 's' : ''} · Leader: {getUserName(g.leaderId).split(' ')[0]}
                          </div>
                          <div className="group-member-pills" style={{ marginTop: '6px' }}>
                            {g.members.map(mid => <span key={mid} className="group-member-pill">{getUserName(mid).split(' ')[0]}</span>)}
                          </div>
                        </div>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleJoin(g)}>Join →</button>
                      </div>
                    ))}
                  </div>
                  <div className="group-divider">or create new</div>
                </>
              )}
              {courseGroups.length === 0 && (
                <p style={{ fontSize: '0.87rem', color: 'var(--text-2)', marginBottom: '16px' }}>No groups yet. Create the first one!</p>
              )}
              <div className="form-group">
                <label className="form-label">New Group Name <span style={{color:'var(--danger)'}}>*</span></label>
                <input className="form-input" placeholder="e.g. Alpha Squad" value={newName}
                  onChange={e => { setNewName(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleCreate()}
                />
                {error && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{error}</span>}
              </div>
            </div>
          )}
        </div>

        <div className="modal-foot">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          {!myGroup && (
            <button className="btn btn-primary" onClick={handleCreate}>Create & Join →</button>
          )}
        </div>
      </div>
    </div>
  );
}
