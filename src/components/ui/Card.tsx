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
    ? 'bg-[#09090b] light:bg-zinc-100 border-2 border-zinc-800 light:border-black' 
    : 'neo-brutal-card';

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} p-5 transition-all ${
        hoverable ? 'hover:border-amber-500 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
