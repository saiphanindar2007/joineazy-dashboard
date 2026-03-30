import React, { useEffect } from 'react';

export default function Toast({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icons = { success: '✓', error: '✕', info: 'ℹ' };

  return (
    <div className={`toast ${toast.type}`} onClick={() => onRemove(toast.id)} style={{ cursor: 'pointer' }}>
      <span>{icons[toast.type] || 'ℹ'}</span>
      <span>{toast.message}</span>
    </div>
  );
}
