'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ReviewStatus } from '@/types/product';

interface StatusBadgeProps {
  status: ReviewStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  switch (status) {
    case 'READY':
      return (
        <span className={`font-mono font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border-2 border-emerald-400 shadow-[2px_2px_0px_0px_#000000] inline-flex items-center gap-1.5 ${sizeClasses}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready
        </span>
      );
    case 'REVIEW_REQUIRED':
      return (
        <span className={`font-mono font-bold uppercase tracking-wider bg-amber-950 text-amber-400 border-2 border-amber-400 shadow-[2px_2px_0px_0px_#000000] inline-flex items-center gap-1.5 ${sizeClasses}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
          Review Required
        </span>
      );
    case 'CONFLICT':
      return (
        <span className={`font-mono font-bold uppercase tracking-wider bg-rose-950 text-rose-400 border-2 border-rose-400 shadow-[2px_2px_0px_0px_#000000] inline-flex items-center gap-1.5 ${sizeClasses}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping"></span>
          Conflict
        </span>
      );
    default:
      return (
        <span className={`font-mono font-bold uppercase tracking-wider bg-slate-900 text-slate-300 border-2 border-slate-700 shadow-[2px_2px_0px_0px_#000000] inline-flex items-center gap-1.5 ${sizeClasses}`}>
          {status}
        </span>
      );
  }
};

interface ConfidenceBadgeProps {
  score: number;
  level?: 'high' | 'medium' | 'low';
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score, level = 'high' }) => {
  const levelClass = 
    level === 'high' || score >= 85 ? 'text-emerald-400 border-emerald-400 bg-emerald-950/80' :
    level === 'medium' || score >= 60 ? 'text-amber-400 border-amber-400 bg-amber-950/80' :
    'text-rose-400 border-rose-400 bg-rose-950/80';

  return (
    <span className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 border-2 shadow-[2px_2px_0px_0px_#000000] inline-flex items-center gap-1.5 ${levelClass}`}>
      <ShieldCheck className="h-3 w-3 stroke-[2.5]" /> {score}% {level}
    </span>
  );
};
