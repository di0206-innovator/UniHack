'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  category: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  category,
  title,
  subtitle,
  icon: Icon,
  actions
}) => {
  return (
    <div className="neo-card flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
      <div>
        <div className="flex items-center gap-2 text-cyan-400 light:text-cyan-600 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
          <div className="p-1.5 bg-cyan-600/10 light:bg-cyan-50 border border-cyan-500/30 light:border-cyan-200 rounded-md text-cyan-400 light:text-cyan-600">
            <Icon className="h-4 w-4" />
          </div>
          <span>{category}</span>
        </div>
        <h1 className="text-2xl font-bold font-sans tracking-tight text-slate-100 light:text-slate-900">{title}</h1>
        <p className="text-xs font-sans font-normal text-slate-300 light:text-slate-600 mt-1 max-w-2xl leading-relaxed">{subtitle}</p>
      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
