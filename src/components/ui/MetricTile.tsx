'use client';

import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface MetricTileProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  accentColor?: 'amber' | 'emerald' | 'crimson';
  onClick?: () => void;
  actionText?: string;
}

export const MetricTile: React.FC<MetricTileProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  accentColor = 'amber',
  onClick,
  actionText
}) => {
  const colorMap = {
    amber: 'text-amber-400 border-amber-500 bg-amber-950/60 light:bg-amber-100',
    emerald: 'text-emerald-400 border-emerald-500 bg-emerald-950/60 light:bg-emerald-100',
    crimson: 'text-rose-400 border-rose-500 bg-rose-950/60 light:bg-rose-100'
  };

  const textColor = colorMap[accentColor].split(' ')[0];

  return (
    <Card onClick={onClick} hoverable={!!onClick} className="space-y-3 group neo-brutal-card">
      <div className="flex items-center justify-between text-[11px] font-mono font-black uppercase tracking-wider text-zinc-400 light:text-zinc-700">
        <span>{label}</span>
        <div className={`p-1 border ${colorMap[accentColor]}`}>
          <Icon className={`h-4 w-4 ${textColor} group-hover:scale-110 transition-transform`} />
        </div>
      </div>

      <div className="flex items-baseline gap-2 pt-1">
        <span className={`text-3xl font-bold font-mono tracking-tight ${textColor}`}>{value}</span>
        {subValue && (
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border ${colorMap[accentColor]}`}>
            {subValue}
          </span>
        )}
      </div>

      {actionText && (
        <div className={`text-[11px] font-mono font-bold uppercase flex items-center justify-between pt-2 border-t border-zinc-800 light:border-black ${textColor}`}>
          <span>{actionText}</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </Card>
  );
};
