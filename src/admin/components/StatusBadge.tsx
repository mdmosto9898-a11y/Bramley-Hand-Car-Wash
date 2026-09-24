import React from 'react';
import { BookingStatus, ServiceStatus, PricingStatus, ReviewStatus, MessageStatus, ServiceAreaStatus } from '../types/admin';

interface StatusBadgeProps {
  status:
    | BookingStatus
    | ServiceStatus
    | PricingStatus
    | ReviewStatus
    | MessageStatus
    | ServiceAreaStatus
    | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const norm = String(status).toLowerCase();

  let styles = 'bg-neutral-800 text-neutral-300 border-neutral-700';

  if (norm === 'pending') {
    styles = 'bg-amber-950/60 text-amber-300 border-amber-800/80';
  } else if (norm === 'confirmed') {
    styles = 'bg-sky-950/60 text-sky-300 border-sky-800/80';
  } else if (norm === 'completed' || norm === 'published' || norm === 'active') {
    styles = 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80';
  } else if (norm === 'cancelled' || norm === 'disabled' || norm === 'hidden') {
    styles = 'bg-neutral-900 text-neutral-400 border-neutral-800 line-through decoration-neutral-600';
  } else if (norm === 'new') {
    styles = 'bg-red-950/60 text-red-300 border-red-800/80 font-bold';
  } else if (norm === 'read') {
    styles = 'bg-neutral-800 text-neutral-300 border-neutral-700';
  } else if (norm === 'replied') {
    styles = 'bg-teal-950/60 text-teal-300 border-teal-800/80';
  } else if (norm === 'archived') {
    styles = 'bg-neutral-900 text-neutral-500 border-neutral-800';
  }

  const label = norm.charAt(0).toUpperCase() + norm.slice(1);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${styles} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{label}</span>
    </span>
  );
};
