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
    <div className="neo-brutal-card flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
      <div>
        <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-black uppercase tracking-wider mb-1.5">
          <div className="p-1 bg-amber-500 text-black border border-black font-black">
            <Icon className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span>{category}</span>
        </div>
        <h1 className="text-2xl font-black font-mono uppercase tracking-tight text-zinc-100 light:text-zinc-900">{title}</h1>
        <p className="text-xs font-sans font-medium text-zinc-300 light:text-zinc-700 mt-1 max-w-2xl leading-relaxed">{subtitle}</p>
      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
