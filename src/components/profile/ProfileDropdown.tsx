'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  User, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Laptop, 
  ChevronDown, 
  Building2,
  LogIn
} from 'lucide-react';

export const ProfileDropdown: React.FC = () => {
  const { user, logout, openSettingsModal, openAuthModal, signInWithGoogle } = useAuthContext();
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

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'G';

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Profile Trigger Button (h-9 / 36px) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 bg-white dark:bg-[#18181b] border-2 border-black dark:border-zinc-700 rounded-none shadow-[2px_2px_0px_0px_#000000] hover:border-amber-500 transition-all flex items-center gap-2"
      >
        {user?.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="h-6 w-6 rounded-none border border-black object-cover" 
          />
        ) : (
          <div className="h-6 w-6 bg-amber-500 text-black font-black font-mono text-[11px] border border-black flex items-center justify-center">
            {initial}
          </div>
        )}
        <div className="text-left hidden sm:block">
          <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 block max-w-[110px] truncate leading-none">
            {user ? user.name : 'Guest'}
          </span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#18181b] border-2 border-black dark:border-zinc-700 shadow-[6px_6px_0px_0px_#000000] z-50 p-3 space-y-3 font-sans animate-fade-in">
          {/* User Details / Guest Header */}
          <div className="p-2.5 bg-zinc-100 dark:bg-[#09090b] border border-black dark:border-zinc-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100 text-xs truncate max-w-[170px]">
                {user ? user.name : 'Guest Visitor'}
              </span>
              <span className="text-[10px] font-mono font-black uppercase bg-amber-500 text-black border border-black px-1.5 py-0.2">
                {user ? user.role : 'GUEST'}
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 truncate">
              {user ? user.email : 'Not signed in'}
            </div>
            {user?.organization && (
              <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1 pt-1 border-t border-zinc-300 dark:border-zinc-800">
                <Building2 className="h-3 w-3" />
                <span className="truncate">{user.organization}</span>
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase text-zinc-700 dark:text-zinc-400 tracking-wider px-1">
              INTERFACE THEME
            </div>
            <div className="grid grid-cols-3 gap-1 bg-zinc-100 dark:bg-[#09090b] p-1 border border-black dark:border-zinc-800 font-mono text-xs">
              <button
                onClick={() => setTheme('dark')}
                className={`py-1.5 px-2 font-bold uppercase flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'dark' ? 'bg-amber-500 text-black border border-black shadow-[1px_1px_0px_0px_#000000]' : 'text-zinc-700 dark:text-zinc-400 hover:text-amber-500'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`py-1.5 px-2 font-bold uppercase flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'light' ? 'bg-amber-500 text-black border border-black shadow-[1px_1px_0px_0px_#000000]' : 'text-zinc-700 dark:text-zinc-400 hover:text-amber-500'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`py-1.5 px-2 font-bold uppercase flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'system' ? 'bg-amber-500 text-black border border-black shadow-[1px_1px_0px_0px_#000000]' : 'text-zinc-700 dark:text-zinc-400 hover:text-amber-500'
                }`}
              >
                <Laptop className="h-3.5 w-3.5" />
                <span>Auto</span>
              </button>
            </div>
          </div>

          {/* Action Controls */}
          <div className="space-y-1 pt-1 border-t border-black dark:border-zinc-800 font-mono">
            {user ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openSettingsModal();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-200 hover:bg-amber-500 hover:text-black flex items-center gap-2 transition-colors border border-transparent hover:border-black"
                >
                  <Settings className="h-4 w-4 text-amber-500" />
                  <span>Profile & Settings</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white flex items-center gap-2 transition-colors border border-transparent hover:border-black"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={async () => {
                    setIsOpen(false);
                    await signInWithGoogle();
                  }}
                  className="w-full neo-brutal-btn-google py-2 px-3 text-xs flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign In via Gmail</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full neo-brutal-btn-primary py-2 px-3 text-xs flex items-center justify-center gap-2"
                >
                  <LogIn className="h-3.5 w-3.5 text-black" />
                  <span>Sign In / Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
