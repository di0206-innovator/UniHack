'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';
import { supabase, signInWithGoogleOAuth, signOutSupabase } from '@/lib/supabase/client';

interface AuthContextType extends AuthState {
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, organization: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  showAuthModal: boolean;
  authModalTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  showSettingsModal: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
}

const DEFAULT_USER: User = {
  id: 'usr-001',
  name: 'Alex Vance',
  email: 'alex.vance@gmail.com',
  role: 'admin',
  organization: 'Acme Industrial Systems',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (!supabase) return;

    // Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const suUser = session.user;
        setUser({
          id: suUser.id,
          name: suUser.user_metadata?.full_name || suUser.user_metadata?.name || suUser.email?.split('@')[0] || 'Authenticated User',
          email: suUser.email || '',
          role: 'admin',
          organization: 'Supabase Catalog Team',
          avatarUrl: suUser.user_metadata?.avatar_url
        });
        setIsAuthenticated(true);
      }
    });

    // Listen to Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const suUser = session.user;
        setUser({
          id: suUser.id,
          name: suUser.user_metadata?.full_name || suUser.user_metadata?.name || suUser.email?.split('@')[0] || 'Authenticated User',
          email: suUser.email || '',
          role: 'admin',
          organization: 'Supabase Catalog Team',
          avatarUrl: suUser.user_metadata?.avatar_url
        });
        setIsAuthenticated(true);
      } else if (_event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const openSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...updatedData } : null);
  };

  const login = async (email: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role: 'steward',
      organization: 'Enterprise Catalog Division'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsLoading(false);
    setShowAuthModal(false);
  };

  const signup = async (name: string, email: string, organization: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'admin',
      organization: organization || 'Enterprise Catalog Systems'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsLoading(false);
    setShowAuthModal(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogleOAuth();
    if (error) {
      console.warn('Google OAuth Warning (Supabase env not configured, logging in with Google account):', error.message);
      // Fallback clean user login for development when env credentials are empty
      await login('alex.vance@gmail.com');
    }
    setIsLoading(false);
    setShowAuthModal(false);
  };

  const logout = async () => {
    await signOutSupabase();
    setUser(null);
    setIsAuthenticated(false);
    setShowSettingsModal(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      signup,
      signInWithGoogle,
      logout,
      updateProfile,
      showAuthModal,
      authModalTab,
      openAuthModal,
      closeAuthModal,
      showSettingsModal,
      openSettingsModal,
      closeSettingsModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
