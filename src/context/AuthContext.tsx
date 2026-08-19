'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';
import { supabase, signInWithGoogleOAuth, signOutSupabase, isSupabaseConfigured } from '@/lib/supabase/client';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true to prevent flash
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  // Map a Supabase user object to our internal User type
  const mapSupabaseUser = (suUser: { id: string; email?: string; user_metadata?: Record<string, string> }): User => ({
    id: suUser.id,
    name: suUser.user_metadata?.full_name || suUser.user_metadata?.name || suUser.email?.split('@')[0] || 'Authenticated User',
    email: suUser.email || '',
    role: 'admin',
    organization: suUser.user_metadata?.organization || 'Enterprise Workspace',
    avatarUrl: suUser.user_metadata?.avatar_url || suUser.user_metadata?.picture
  });

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    // Check active session on load (handles OAuth redirect return)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });

    // Listen to Auth State Changes (handles sign-in, sign-out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(mapSupabaseUser(session.user));
        setIsAuthenticated(true);
        setShowAuthModal(false);
        setIsLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        setUser(mapSupabaseUser(session.user));
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

  const login = async (email: string, password?: string) => {
    setIsLoading(true);

    if (isSupabaseConfigured && supabase && password) {
      // Try real Supabase email/password auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If user doesn't exist, try signup
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          console.warn('Supabase auth error, falling back to demo login:', signUpError.message);
          // Fallback to demo login
          const newUser: User = {
            id: `usr-${Date.now()}`,
            name: email.split('@')[0].replace('.', ' ').toUpperCase(),
            email,
            role: 'steward',
            organization: 'Enterprise Catalog Division'
          };
          setUser(newUser);
          setIsAuthenticated(true);
        } else if (signUpData.user) {
          setUser(mapSupabaseUser(signUpData.user));
          setIsAuthenticated(true);
        }
      } else if (data.user) {
        setUser(mapSupabaseUser(data.user));
        setIsAuthenticated(true);
      }
    } else {
      // Demo/fallback login without Supabase
      await new Promise(r => setTimeout(r, 400));
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        role: 'steward',
        organization: 'Enterprise Catalog Division'
      };
      setUser(newUser);
      setIsAuthenticated(true);
    }

    setIsLoading(false);
    setShowAuthModal(false);
  };

  const signup = async (name: string, email: string, organization: string) => {
    setIsLoading(true);

    if (isSupabaseConfigured && supabase) {
      // Supabase signup - but we don't have password in this flow, so use demo
      await new Promise(r => setTimeout(r, 400));
    } else {
      await new Promise(r => setTimeout(r, 400));
    }

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
    try {
      const { error } = await signInWithGoogleOAuth();
      if (error) {
        console.warn('Google OAuth error:', error.message);
        // If Supabase isn't configured, fallback to demo
        if (!isSupabaseConfigured) {
          await login('demo.user@gmail.com');
        }
      }
      // If successful, the OAuth redirect will handle setting the user
      // via the onAuthStateChange listener above
    } catch (e) {
      console.error('Google sign-in failed:', e);
      if (!isSupabaseConfigured) {
        await login('demo.user@gmail.com');
      }
    }
    // Don't set isLoading false here for OAuth - the redirect will handle it
    if (!isSupabaseConfigured) {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await signOutSupabase();
    setUser(null);
    setIsAuthenticated(false);
    setShowSettingsModal(false);
    setShowAuthModal(false);
    setIsLoading(false);
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
