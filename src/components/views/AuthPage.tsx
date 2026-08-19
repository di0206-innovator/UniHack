'use client';

import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useProductContext } from '@/context/ProductContext';
import { 
  Cpu, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Zap
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, signup, signInWithGoogle, isLoading } = useAuthContext();
  const { setActiveView } = useProductContext();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      if (!email.trim()) return;
      await login(email, password);
    } else {
      if (!name.trim() || !email.trim()) return;
      await signup(name, email, organization);
    }
    setActiveView('dashboard');
  };

  const handleGoogleClick = async () => {
    await signInWithGoogle();
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#070a12] bg-grid-pattern">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-slate-700 shadow-[10px_10px_0px_0px_#000000] bg-[#0e1424]">
        {/* Left Branding & System Info */}
        <div className="p-8 space-y-6 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-slate-800 bg-[#0a0e17]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-cyan-500 border-2 border-cyan-300 flex items-center justify-center text-slate-950 font-black shadow-[3px_3px_0px_0px_#000000]">
                <Cpu className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase font-mono tracking-wider text-slate-100">Forge AI</h2>
                <span className="text-[9px] font-mono font-bold uppercase bg-cyan-500 text-slate-950 px-1.5 py-0.5 border border-cyan-300">
                  ENTERPRISE GATEWAY
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-black uppercase font-mono tracking-tight text-slate-100 pt-2">
              Enterprise Single Sign-On Access
            </h3>

            <p className="text-xs text-slate-300 font-sans font-medium leading-relaxed">
              Log in via your Google / Gmail account or enterprise SSO provider to gain access to 8-agent catalog execution telemetry, multi-modal PDF ingestion, and Supabase catalog storage.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t-2 border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Google OAuth + Supabase Integrated</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              <span>Multi-Modal Gemini AI spec processing</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-purple-400" />
              <span>Verifiable audit trail & evidence links</span>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="p-8 space-y-6 flex flex-col justify-between bg-[#0e1424]">
          <div className="space-y-4">
            {/* Primary Google Auth CTA */}
            <button
              onClick={handleGoogleClick}
              disabled={isLoading}
              className="w-full neo-brutal-btn-google py-3.5 text-xs flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in with Google / Gmail</span>
            </button>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t-2 border-slate-800 w-full"></div>
              <span className="bg-[#0e1424] px-2 font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">OR EMAIL SIGN IN</span>
            </div>

            {/* Tab Switcher */}
            <div className="flex border-2 border-slate-800 p-1 bg-[#070a12] font-mono text-xs">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2 font-bold uppercase transition-all ${
                  tab === 'login' ? 'bg-cyan-500 text-slate-950 border border-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('signup')}
                className={`flex-1 py-2 font-bold uppercase transition-all ${
                  tab === 'signup' ? 'bg-cyan-500 text-slate-950 border border-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Register
              </button>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
              {tab === 'signup' && (
                <>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
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
                    <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
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
                <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
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
                <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
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
                className="w-full neo-brutal-btn-primary py-3 text-xs flex items-center justify-center gap-2 mt-2"
              >
                <span>{isLoading ? 'Authenticating...' : (tab === 'login' ? 'Sign In to Workspace' : 'Create Enterprise Account')}</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
