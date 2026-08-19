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
    <div className="bg-[#0e1424] border-2 border-slate-700 shadow-[6px_6px_0px_0px_#000000] flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
      <div>
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-1.5">
          <div className="p-1.5 bg-cyan-600 border border-cyan-300 text-slate-950 shadow-[2px_2px_0px_0px_#000000]">
            <Icon className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span>{category}</span>
        </div>
        <h1 className="text-2xl font-black uppercase font-mono tracking-tight text-slate-100">{title}</h1>
        <p className="text-xs font-sans font-medium text-slate-300 mt-1 max-w-2xl leading-relaxed">{subtitle}</p>
      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
