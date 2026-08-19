'use client';

import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Cpu
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { showAuthModal, closeAuthModal, authModalTab, login, signup, signInWithGoogle, isLoading } = useAuthContext();
  const [tab, setTab] = useState<'login' | 'signup'>(authModalTab);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');

  if (!showAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      if (!email.trim()) return;
      await login(email, password);
    } else {
      if (!name.trim() || !email.trim()) return;
      await signup(name, email, organization);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e1424] border-2 border-slate-700 w-full max-w-md shadow-[10px_10px_0px_0px_#000000] p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-cyan-500 border-2 border-cyan-300 flex items-center justify-center text-slate-950 font-black shadow-[2px_2px_0px_0px_#000000]">
              <Cpu className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-slate-100 uppercase font-mono text-base tracking-wider">Forge AI</h3>
              <p className="text-[10px] font-mono text-cyan-400">ENTERPRISE GATEWAY</p>
            </div>
          </div>
          <button 
            onClick={closeAuthModal} 
            className="p-1.5 bg-[#070a12] border-2 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 shadow-[2px_2px_0px_0px_#000000]"
          >
            <X className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Primary Google OAuth Button */}
        <button
          onClick={signInWithGoogle}
          disabled={isLoading}
          className="w-full neo-brutal-btn-google py-3 text-xs flex items-center justify-center gap-3"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Sign in with Google / Gmail</span>
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t-2 border-slate-800 w-full"></div>
          <span className="bg-[#0e1424] px-2 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">OR EMAIL</span>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-2 border-slate-800 p-1 bg-[#070a12] font-mono text-xs">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-1.5 font-bold uppercase transition-all ${
              tab === 'login' ? 'bg-cyan-500 text-slate-950 border border-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-1.5 font-bold uppercase transition-all ${
              tab === 'signup' ? 'bg-cyan-500 text-slate-950 border border-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
          {tab === 'signup' && (
            <>
              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[10px]">
                  <User className="h-3.5 w-3.5 text-cyan-400" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full neo-brutal-input px-3 py-2 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[10px]">
                  <Building2 className="h-3.5 w-3.5 text-purple-400" /> Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Industrial Automation"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full neo-brutal-input px-3 py-2 text-slate-200"
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[10px]">
              <Mail className="h-3.5 w-3.5 text-cyan-400" /> Work Email
            </label>
            <input
              type="email"
              required
              placeholder="alex.vance@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full neo-brutal-input px-3 py-2 text-slate-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[10px]">
              <Lock className="h-3.5 w-3.5 text-emerald-400" /> Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full neo-brutal-input px-3 py-2 text-slate-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full neo-brutal-btn-primary py-2.5 text-xs flex items-center justify-center gap-2 mt-2"
          >
            <span>{isLoading ? 'Authenticating...' : (tab === 'login' ? 'Sign In to Workspace' : 'Create Enterprise Account')}</span>
            <ArrowRight className="h-4 w-4 stroke-[3]" />
          </button>
        </form>

        {/* Enterprise SAML Info */}
        <div className="pt-2 border-t-2 border-slate-800 text-center">
          <button
            onClick={() => login('steward@okta-saml.com')}
            className="w-full neo-brutal-btn py-2 px-3 text-[11px] flex items-center justify-center gap-2"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Okta / Enterprise SAML 2.0
          </button>
        </div>
      </div>
    </div>
  );
};
