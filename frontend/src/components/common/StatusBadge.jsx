import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    ACTIVE: 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse',
    RESOLVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    CANCELLED: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
  };

  const icons = {
    ACTIVE: '🔴',
    RESOLVED: '🟢',
    CANCELLED: '⚪',
  };

  const normalizedStatus = (status || 'ACTIVE').toUpperCase();
  const currentStyle = styles[normalizedStatus] || styles.CANCELLED;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentStyle}`}
    >
      <span>{icons[normalizedStatus]}</span>
      <span>{normalizedStatus}</span>
    </span>
  );
};

export default StatusBadge;
