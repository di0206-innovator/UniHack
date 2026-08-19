'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'flat' | 'sunken';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = false,
  variant = 'flat'
}) => {
  const baseStyle = variant === 'sunken' 
    ? 'bg-[#090d16] light:bg-slate-100 border border-slate-800 light:border-slate-200 rounded-xl' 
    : 'neo-card';

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} p-5 transition-all ${
        hoverable ? 'hover:border-cyan-500 hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
