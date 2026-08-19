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
    cyan: 'text-cyan-400 border-cyan-400 bg-cyan-950/60',
    emerald: 'text-emerald-400 border-emerald-400 bg-emerald-950/60',
    amber: 'text-amber-400 border-amber-400 bg-amber-950/60',
    rose: 'text-rose-400 border-rose-400 bg-rose-950/60',
    purple: 'text-purple-400 border-purple-400 bg-purple-950/60'
  };

  const textColor = colorMap[accentColor].split(' ')[0];

  return (
    <Card onClick={onClick} hoverable={!!onClick} className="space-y-3 group">
      <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
        <span>{label}</span>
        <div className={`p-1.5 border-2 shadow-[2px_2px_0px_0px_#000000] ${colorMap[accentColor]}`}>
          <Icon className={`h-4 w-4 ${textColor} group-hover:scale-110 transition-transform stroke-[2.5]`} />
        </div>
      </div>

      <div className="flex items-baseline gap-2 pt-1">
        <span className={`text-3xl font-black font-mono tracking-tight ${textColor}`}>{value}</span>
        {subValue && (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border-2 shadow-[2px_2px_0px_0px_#000000] ${colorMap[accentColor]}`}>
            {subValue}
          </span>
        )}
      </div>

      {actionText && (
        <div className={`text-[11px] font-mono font-bold flex items-center justify-between pt-2 border-t-2 border-slate-800 ${textColor}`}>
          <span>{actionText}</span>
          <ArrowRight className="h-3.5 w-3.5 stroke-[3] group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </Card>
  );
};
