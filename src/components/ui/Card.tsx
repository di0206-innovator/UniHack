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
    ? 'bg-[#060911] border-2 border-slate-800 shadow-[inset_3px_3px_6px_#000000]' 
    : 'bg-[#0e1424] border-2 border-slate-800 shadow-[4px_4px_0px_0px_#000000]';

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} p-5 transition-all ${
        hoverable ? 'hover:border-cyan-500 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000000] cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
