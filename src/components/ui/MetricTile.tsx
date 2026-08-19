'use client';

import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface MetricTileProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  accentColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple';
  onClick?: () => void;
  actionText?: string;
}

export const MetricTile: React.FC<MetricTileProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  accentColor = 'cyan',
  onClick,
  actionText
}) => {
  const colorMap = {
    cyan: 'text-cyan-400 light:text-cyan-600 border-cyan-500/30 light:border-cyan-200 bg-cyan-500/10 light:bg-cyan-50',
    emerald: 'text-emerald-400 light:text-emerald-600 border-emerald-500/30 light:border-emerald-200 bg-emerald-500/10 light:bg-emerald-50',
    amber: 'text-amber-400 light:text-amber-600 border-amber-500/30 light:border-amber-200 bg-amber-500/10 light:bg-amber-50',
    rose: 'text-rose-400 light:text-rose-600 border-rose-500/30 light:border-rose-200 bg-rose-500/10 light:bg-rose-50',
    purple: 'text-purple-400 light:text-purple-600 border-purple-500/30 light:border-purple-200 bg-purple-500/10 light:bg-purple-50'
  };

  const textColor = colorMap[accentColor].split(' ')[0];

  return (
    <Card onClick={onClick} hoverable={!!onClick} className="space-y-3 group">
      <div className="flex items-center justify-between text-[11px] font-sans font-semibold uppercase tracking-wider text-slate-400 light:text-slate-500">
        <span>{label}</span>
        <div className={`p-1.5 rounded-lg border ${colorMap[accentColor]}`}>
          <Icon className={`h-4 w-4 ${textColor} group-hover:scale-110 transition-transform`} />
        </div>
      </div>

      <div className="flex items-baseline gap-2 pt-1">
        <span className={`text-3xl font-bold font-mono tracking-tight ${textColor}`}>{value}</span>
        {subValue && (
          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${colorMap[accentColor]}`}>
            {subValue}
          </span>
        )}
      </div>

      {actionText && (
        <div className={`text-[11px] font-sans font-medium flex items-center justify-between pt-2 border-t border-slate-800 light:border-slate-200 ${textColor}`}>
          <span>{actionText}</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </Card>
  );
};
