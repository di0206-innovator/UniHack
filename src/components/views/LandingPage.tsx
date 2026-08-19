'use client';

import React from 'react';
import { useProductContext } from '@/context/ProductContext';
import { useAuthContext } from '@/context/AuthContext';
import { ProfileDropdown } from '@/components/profile/ProfileDropdown';
import { 
  Cpu, 
  UploadCloud, 
  ShieldCheck, 
  Workflow, 
  Network, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  UserCheck,
  Check,
  Bot,
  Zap,
  Layers,
  Sparkles,
  FileCode,
  Search,
  Download
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView } = useProductContext();
  const { signInWithGoogle, openAuthModal, isAuthenticated } = useAuthContext();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#09090b] light:bg-[#fafafa] bg-grid-pattern text-zinc-100 light:text-zinc-900 font-sans pb-24 transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#18181b] light:bg-white border-b-2 border-zinc-800 light:border-black px-6 py-3 shadow-[0px_4px_0px_0px_#000000]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Neo-Brutalist Badge */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-amber-500 text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] font-black">
              <Cpu className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-zinc-100 light:text-zinc-900 tracking-wider text-lg uppercase font-mono">
                Forge AI
              </span>
              <span className="text-[9px] font-mono font-black text-black bg-amber-500 border border-black px-1.5 py-0.2 uppercase">
                NEO-RAG V2.5
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono font-bold text-zinc-300 light:text-zinc-700 uppercase tracking-wider">
            <a href="#rag" className="hover:text-amber-400 transition-colors">RAG Assistant</a>
            <a href="#architecture" className="hover:text-amber-400 transition-colors">8-Agent System</a>
            <a href="#demo" className="hover:text-amber-400 transition-colors">PDF Export</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
          </div>

          {/* Action Controls Header Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="neo-brutal-btn-google px-3.5 py-1.5 text-xs flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in via Gmail</span>
            </button>
            
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setActiveView('rag-assistant');
                } else {
                  openAuthModal('login');
                }
              }}
              className="neo-brutal-btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5"
            >
              <span>{isAuthenticated ? 'Launch RAG Assistant' : 'Launch Platform'}</span>
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </button>

            {/* Top-Right Profile & Settings Dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-16">
        {/* Hero Section */}
        <section className="neo-brutal-card p-8 md:p-12 relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500 text-black border-2 border-black px-3 py-1 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_0px_#000000]">
                <Zap className="h-4 w-4 fill-black" />
                <span>Enterprise RAG & 8-Agent Industrial AI Engine</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black uppercase font-mono tracking-tight text-zinc-100 light:text-zinc-900 leading-tight">
                AI-Powered RAG Spec Extraction & Verifiable PDF Dossier Engine
              </h1>

              <p className="text-zinc-300 light:text-zinc-700 text-sm md:text-base leading-relaxed max-w-2xl font-sans font-medium">
                Transform unstructured technical datasheets, supplier PDFs, and raw company documents into 
                <strong className="text-amber-400 light:text-amber-700 font-bold"> structured product twins and instant RAG knowledge answers</strong> with 1-Click PDF exports.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleGoogleSignIn}
                  className="neo-brutal-btn-google px-5 py-2.5 text-xs font-bold uppercase flex items-center gap-2.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign In with Gmail / Google</span>
                </button>

                <button
                  onClick={() => {
                    handleGoogleSignIn();
                  }}
                  className="neo-brutal-btn-primary px-5 py-2.5 text-xs font-black uppercase flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-black fill-black" />
                  <span>Try RAG Query Assistant</span>
                </button>
              </div>
            </div>

            {/* Side Architecture Status Box */}
            <div className="md:col-span-4 bg-[#09090b] light:bg-zinc-100 p-5 border-2 border-zinc-800 light:border-black shadow-[4px_4px_0px_0px_#000000] space-y-4">
              <div className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center justify-between border-b-2 border-zinc-800 light:border-black pb-2">
                <span>SYSTEM ARCHITECTURE</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                  <span className="h-2.5 w-2.5 bg-emerald-400 rounded-none animate-pulse"></span> ONLINE
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono font-bold">
                <div className="flex justify-between items-center bg-[#18181b] light:bg-white p-2.5 border border-zinc-800 light:border-black">
                  <span className="text-zinc-400">RAG AI ENGINE</span>
                  <span className="text-amber-400">Gemini Multi-Modal</span>
                </div>
                <div className="flex justify-between items-center bg-[#18181b] light:bg-white p-2.5 border border-zinc-800 light:border-black">
                  <span className="text-zinc-400">PDF EXPORT ENGINE</span>
                  <span className="text-emerald-400">1-Click PDF Dossier</span>
                </div>
                <div className="flex justify-between items-center bg-[#18181b] light:bg-white p-2.5 border border-zinc-800 light:border-black">
                  <span className="text-zinc-400">SPEC ACCURACY</span>
                  <span className="text-amber-400">99.4% Verifiable</span>
                </div>
                <div className="flex justify-between items-center bg-[#18181b] light:bg-white p-2.5 border border-zinc-800 light:border-black">
                  <span className="text-zinc-400">AUTHENTICATION</span>
                  <span className="text-emerald-400">Google OAuth + Supabase</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RAG Knowledge System Overview */}
        <section id="rag" className="neo-brutal-card p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-zinc-800 light:border-black pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                RETRIEVAL-AUGMENTED GENERATION
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase font-mono text-zinc-100 light:text-zinc-900">
                Natural Language Spec Search & PDF Export
              </h2>
            </div>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setActiveView('rag-assistant');
                } else {
                  handleGoogleSignIn();
                }
              }}
              className="neo-brutal-btn-primary px-5 py-2.5 text-xs flex items-center gap-2"
            >
              <Download className="h-4 w-4 text-black" />
              <span>Test PDF RAG Assistant</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#09090b] light:bg-zinc-100 p-5 border-2 border-zinc-800 light:border-black shadow-[3px_3px_0px_0px_#000000] space-y-3">
              <div className="h-8 w-8 bg-amber-500 text-black border border-black font-mono text-xs font-black flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-sm font-mono text-zinc-100 light:text-zinc-900 uppercase">Raw Company Document Indexing</h3>
              <p className="text-xs text-zinc-300 light:text-zinc-700 leading-relaxed font-sans font-medium">
                Upload raw PDFs, supplier spreadsheets, or datasheets. The Ingestion Agent chunks and indexes all technical text into searchable knowledge nodes.
              </p>
            </div>

            <div className="bg-[#09090b] light:bg-zinc-100 p-5 border-2 border-zinc-800 light:border-black shadow-[3px_3px_0px_0px_#000000] space-y-3">
              <div className="h-8 w-8 bg-emerald-500 text-black border border-black font-mono text-xs font-black flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-sm font-mono text-zinc-100 light:text-zinc-900 uppercase">Natural Language Synthesis</h3>
              <p className="text-xs text-zinc-300 light:text-zinc-700 leading-relaxed font-sans font-medium">
                Ask questions like "Which PLCs support 24V DC with IP67 protection?". Gemini AI searches matching document chunks and synthesizes technical answers.
              </p>
            </div>

            <div className="bg-[#09090b] light:bg-zinc-100 p-5 border-2 border-zinc-800 light:border-black shadow-[3px_3px_0px_0px_#000000] space-y-3">
              <div className="h-8 w-8 bg-amber-500 text-black border border-black font-mono text-xs font-black flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-sm font-mono text-zinc-100 light:text-zinc-900 uppercase">1-Click PDF Report Export</h3>
              <p className="text-xs text-zinc-300 light:text-zinc-700 leading-relaxed font-sans font-medium">
                Never copy-paste answers manually. Click "Export Response as PDF" to generate a clean, formatted technical PDF dossier with verifiable evidence quotes.
              </p>
            </div>
          </div>
        </section>

        {/* Enterprise Pricing Section */}
        <section id="pricing" className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
              ENTERPRISE PLATFORM TIERS
            </span>
            <h2 className="text-3xl font-black uppercase font-mono text-zinc-100 light:text-zinc-900">
              Industrial RAG Scaling
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="neo-brutal-card p-6 flex flex-col justify-between">
              <div className="space-y-4 font-sans">
                <div className="font-bold text-sm font-mono uppercase text-zinc-300 light:text-zinc-800">STARTER DISTRIBUTOR</div>
                <div className="text-3xl font-bold font-mono text-amber-400">$499 <span className="text-xs font-sans text-zinc-500">/ mo</span></div>
                <p className="text-xs text-zinc-300 light:text-zinc-700 font-medium">Ideal for regional distributors managing up to 10,000 active SKUs.</p>
                <ul className="space-y-2 text-xs font-medium text-zinc-300 light:text-zinc-800 pt-2 font-mono">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 10,000 RAG Spec Extractions / mo</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 1-Click PDF Dossier Generator</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Google OAuth & Gmail SSO</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-brutal-btn py-2.5 mt-6 text-xs font-bold uppercase">Sign In via Gmail</button>
            </div>

            <div className="neo-brutal-card p-6 flex flex-col justify-between border-4 border-amber-500 relative">
              <div className="absolute -top-3 right-4 bg-amber-500 text-black border border-black font-mono font-black text-[10px] uppercase px-2 py-0.5">
                MOST POPULAR
              </div>
              <div className="space-y-4 font-sans">
                <div className="font-bold text-sm font-mono uppercase text-amber-400">ENTERPRISE INDUSTRIAL</div>
                <div className="text-3xl font-bold font-mono text-amber-400">$1,999 <span className="text-xs font-sans text-zinc-500">/ mo</span></div>
                <p className="text-xs text-zinc-300 light:text-zinc-700 font-medium">For global OEMs and enterprise suppliers managing 100,000+ SKUs.</p>
                <ul className="space-y-2 text-xs font-medium text-zinc-200 light:text-zinc-900 pt-2 font-mono">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" /> Unlimited RAG Queries & PDF Exports</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" /> Gemini Multi-Modal RAG Engine</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" /> Supabase Real-time Sync</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" /> Human Review Queue & Audit Trail</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-brutal-btn-primary py-2.5 mt-6 text-xs font-black uppercase">Get Started Now</button>
            </div>

            <div className="neo-brutal-card p-6 flex flex-col justify-between">
              <div className="space-y-4 font-sans">
                <div className="font-bold text-sm font-mono uppercase text-emerald-400">GLOBAL OEM CUSTOM</div>
                <div className="text-3xl font-bold font-mono text-emerald-400">CUSTOM</div>
                <p className="text-xs text-zinc-300 light:text-zinc-700 font-medium">Custom deployment for Fortune 500 industrial automation brands.</p>
                <ul className="space-y-2 text-xs font-medium text-zinc-300 light:text-zinc-800 pt-2 font-mono">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> On-Premises & Private Cloud RAG</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Custom Fine-Tuned AI Models</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> SAP, Oracle & Siemens Integration</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-brutal-btn py-2.5 mt-6 text-xs font-bold uppercase">Contact Sales</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t-2 border-zinc-800 light:border-black flex flex-col md:flex-row items-center justify-between text-xs font-mono font-bold text-zinc-400 light:text-zinc-700 gap-4">
        <div>
          © 2026 FORGE AI PLATFORM INC. NEO-BRUTALIST ENTERPRISE RAG ENGINE.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Documentation</a>
        </div>
      </footer>
    </div>
  );
};
