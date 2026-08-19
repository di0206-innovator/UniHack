'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function resolveTheme(theme: Theme): 'dark' | 'light' {
  if (theme === 'system') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  }
  return theme;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [effectiveTheme, setEffectiveTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('forge_ai_theme') as Theme | null;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'system')) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const resolved = resolveTheme(theme);
    setEffectiveTheme(resolved);

    root.classList.remove('dark', 'light');
    root.classList.add(resolved);

    // Update body background based on theme
    if (resolved === 'dark') {
      document.body.style.backgroundColor = '#09090b';
      document.body.style.color = '#fafafa';
    } else {
      document.body.style.backgroundColor = '#fafafa';
      document.body.style.color = '#09090b';
    }
  }, [theme, mounted]);

  // Listen for system theme changes when 'system' is selected
  useEffect(() => {
    if (theme !== 'system' || !mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? 'dark' : 'light';
      setEffectiveTheme(resolved);
      const root = document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add(resolved);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('forge_ai_theme', newTheme);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', effectiveTheme: 'dark', setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
