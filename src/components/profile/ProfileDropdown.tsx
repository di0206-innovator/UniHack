'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useTheme, Theme } from '@/context/ThemeContext';
import { 
  User, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Laptop, 
  ChevronDown, 
  ShieldCheck, 
  Building2,
  Check
} from 'lucide-react';

export const ProfileDropdown: React.FC = () => {
  const { user, logout, openSettingsModal } = useAuthContext();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Top Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1 bg-[#070a12] border-2 border-slate-700 shadow-[2px_2px_0px_0px_#000000] hover:border-cyan-400 transition-colors"
      >
        {user.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="h-7 w-7 rounded-none border border-cyan-400 object-cover" 
          />
        ) : (
          <div className="h-7 w-7 bg-cyan-500 border border-slate-900 font-black text-slate-950 font-mono text-xs flex items-center justify-center">
            {initial}
          </div>
        )}
        <div className="text-left hidden sm:block">
          <span className="text-xs font-bold text-slate-100 block max-w-[120px] truncate leading-none">
            {user.name}
          </span>
          <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase block leading-tight">
            {user.role}
          </span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#0e1424] border-2 border-slate-700 shadow-[8px_8px_0px_0px_#000000] z-50 p-3 space-y-3 animate-fade-in font-sans">
          {/* User Details Header */}
          <div className="p-2.5 bg-[#070a12] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 text-xs truncate max-w-[170px]">{user.name}</span>
              <span className="text-[9px] font-mono font-bold uppercase bg-cyan-500 text-slate-950 px-1.5 py-0.2 border border-cyan-300">
                {user.role}
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate">{user.email}</div>
            {user.organization && (
              <div className="text-[10px] font-mono text-purple-400 flex items-center gap-1 pt-1 border-t border-slate-800/80">
                <Building2 className="h-3 w-3" />
                <span className="truncate">{user.organization}</span>
              </div>
            )}
          </div>

          {/* Theme Selector Submenu */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider px-1">
              INTERFACE THEME
            </div>
            <div className="grid grid-cols-3 gap-1 bg-[#070a12] p-1 border border-slate-800 font-mono text-[11px]">
              <button
                onClick={() => setTheme('dark')}
                className={`py-1.5 px-2 font-bold uppercase flex items-center justify-center gap-1 transition-all ${
                  theme === 'dark' ? 'bg-cyan-500 text-slate-950 border border-cyan-300 shadow-[2px_2px_0px_0px_#000000]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon className="h-3 w-3" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`py-1.5 px-2 font-bold uppercase flex items-center justify-center gap-1 transition-all ${
                  theme === 'light' ? 'bg-cyan-500 text-slate-950 border border-cyan-300 shadow-[2px_2px_0px_0px_#000000]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="h-3 w-3" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`py-1.5 px-2 font-bold uppercase flex items-center justify-center gap-1 transition-all ${
                  theme === 'system' ? 'bg-cyan-500 text-slate-950 border border-cyan-300 shadow-[2px_2px_0px_0px_#000000]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Laptop className="h-3 w-3" />
                <span>System</span>
              </button>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-1 pt-1 border-t-2 border-slate-800">
            <button
              onClick={() => {
                setIsOpen(false);
                openSettingsModal();
              }}
              className="w-full text-left px-3 py-2 text-xs font-mono font-bold text-slate-200 hover:bg-[#131b2e] hover:text-cyan-400 flex items-center gap-2 border border-transparent hover:border-slate-700 transition-colors"
            >
              <Settings className="h-4 w-4 text-purple-400 stroke-[2.5]" />
              <span>Profile & Settings</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full text-left px-3 py-2 text-xs font-mono font-bold text-rose-400 hover:bg-rose-950/80 hover:text-rose-300 flex items-center gap-2 border border-transparent hover:border-rose-800 transition-colors"
            >
              <LogOut className="h-4 w-4 text-rose-400 stroke-[2.5]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
