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
  Search
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView } = useProductContext();
  const { signInWithGoogle, openAuthModal, isAuthenticated } = useAuthContext();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090d16] light:bg-[#f8fafc] bg-grid-pattern text-slate-100 light:text-slate-900 font-sans pb-24 transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/90 light:bg-white/90 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Subtle Badge */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <Cpu className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 light:text-slate-900 tracking-tight text-lg font-sans">
                Forge AI
              </span>
              <span className="text-[10px] font-sans font-medium text-indigo-400 light:text-indigo-600 bg-indigo-500/10 light:bg-indigo-50 border border-indigo-500/30 light:border-indigo-200 px-2 py-0.5 rounded-full">
                Enterprise
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300 light:text-slate-600">
            <a href="#capabilities" className="hover:text-cyan-400 transition-colors">Capabilities</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">8-Agent System</a>
            <a href="#demo" className="hover:text-cyan-400 transition-colors">Spec Ingestion</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
          </div>

          {/* Action Controls Header Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="neo-btn-google px-3.5 text-xs font-semibold flex items-center gap-2"
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
                  setActiveView('dashboard');
                } else {
                  openAuthModal('login');
                }
              }}
              className="neo-btn-primary px-4 text-xs font-semibold flex items-center gap-1.5"
            >
              <span>{isAuthenticated ? 'Go to Workspace' : 'Launch Platform'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* Top-Right Profile & Settings Dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-16">
        {/* Hero Section */}
        <section className="neo-card p-8 md:p-12 relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 light:bg-indigo-50 border border-indigo-500/30 light:border-indigo-200 px-3 py-1 rounded-full text-xs font-medium text-indigo-400 light:text-indigo-700">
                <Zap className="h-3.5 w-3.5 text-indigo-400 light:text-indigo-600" />
                <span>Industrial Catalog Intelligence Engine</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-slate-100 light:text-slate-900 leading-tight">
                AI-Powered Product Spec Extraction & Validation Platform
              </h1>

              <p className="text-slate-300 light:text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
                Transform unstructured technical datasheets, supplier PDFs, and distributor catalogs into 
                <strong className="text-cyan-400 light:text-cyan-600 font-semibold"> structured, validated, and commerce-ready product twins</strong> using an 
                8-agent AI orchestration pipeline backed by Gemini models and real-time evidence tracing.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleGoogleSignIn}
                  className="neo-btn-google px-5 text-sm font-semibold flex items-center gap-2.5 shadow-md"
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
                  className="neo-btn-primary px-5 text-sm font-semibold flex items-center gap-2 shadow-md"
                >
                  <span>Demo Operations Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Side Architecture Status Box */}
            <div className="md:col-span-4 bg-[#090d16] light:bg-slate-100 p-5 rounded-xl border border-slate-800 light:border-slate-300 space-y-4">
              <div className="text-xs font-mono font-semibold text-slate-400 light:text-slate-600 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 light:border-slate-300 pb-2">
                <span>SYSTEM ARCHITECTURE</span>
                <span className="text-emerald-400 light:text-emerald-600 font-bold flex items-center gap-1.5 text-[11px]">
                  <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span> ONLINE
                </span>
              </div>

              <div className="space-y-2 text-xs font-sans font-medium">
                <div className="flex justify-between items-center bg-[#0f172a] light:bg-white p-2.5 rounded-lg border border-slate-800 light:border-slate-200">
                  <span className="text-slate-400 light:text-slate-600">AI LLM ENGINE</span>
                  <span className="text-cyan-400 light:text-cyan-600 font-semibold font-mono text-[11px]">Gemini Multi-Modal</span>
                </div>
                <div className="flex justify-between items-center bg-[#0f172a] light:bg-white p-2.5 rounded-lg border border-slate-800 light:border-slate-200">
                  <span className="text-slate-400 light:text-slate-600">AUTHENTICATION</span>
                  <span className="text-emerald-400 light:text-emerald-600 font-semibold font-mono text-[11px]">Google OAuth + Supabase</span>
                </div>
                <div className="flex justify-between items-center bg-[#0f172a] light:bg-white p-2.5 rounded-lg border border-slate-800 light:border-slate-200">
                  <span className="text-slate-400 light:text-slate-600">SPEC ACCURACY RATE</span>
                  <span className="text-amber-400 light:text-amber-600 font-semibold font-mono text-[11px]">99.4% Verifiable</span>
                </div>
                <div className="flex justify-between items-center bg-[#0f172a] light:bg-white p-2.5 rounded-lg border border-slate-800 light:border-slate-200">
                  <span className="text-slate-400 light:text-slate-600">ACTIVE AGENTS</span>
                  <span className="text-purple-400 light:text-purple-600 font-semibold font-mono text-[11px]">8 Autonomous Agents</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8-Agent Orchestration Architecture Section */}
        <section id="architecture" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 light:border-slate-200 pb-4">
            <div>
              <div className="text-xs font-mono font-semibold text-cyan-400 light:text-cyan-600 uppercase tracking-wider">
                AUTONOMOUS AGENT ORCHESTRATION
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-100 light:text-slate-900">
                8-Agent Catalog Intelligence Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-400 light:text-slate-600 max-w-md font-medium">
              Every product record moves through a multi-agent consensus pipeline with deterministic rule evaluation and audit-proof evidence links.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                id: 'agent-1',
                name: 'Spec Extraction Agent',
                role: 'PDF & Datasheet OCR',
                desc: 'Extracts key-value technical parameters, voltage, dimensions, and tolerances from multi-page PDFs.',
                badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              },
              {
                id: 'agent-2',
                name: 'Schema Normalizer',
                role: 'Taxonomy Standardization',
                desc: 'Maps raw spec key names into standard ETIM and UNSPSC industrial taxonomy categories.',
                badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              },
              {
                id: 'agent-3',
                name: 'Validation Agent',
                role: 'Physics & Unit Auditor',
                desc: 'Evaluates unit conversions, operating range limits, and flags conflicting technical claims.',
                badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              },
              {
                id: 'agent-4',
                name: 'Cross-Source Matcher',
                role: 'Entity Resolution',
                desc: 'De-duplicates product records across distributor feeds and manufacturer master specs.',
                badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              },
              {
                id: 'agent-5',
                name: 'Image & CAD OCR Agent',
                role: 'Diagram Parsing',
                desc: 'Reads technical engineering drawings, dimension callouts, and electrical schematics.',
                badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              },
              {
                id: 'agent-6',
                name: 'Commerce Readiness Agent',
                role: 'Completeness Scoring',
                desc: 'Scores products for e-commerce publishing readiness against 12 quality benchmarks.',
                badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
              },
              {
                id: 'agent-7',
                name: 'Knowledge Graph Agent',
                role: 'Compatibility Graph',
                desc: 'Builds relational edges between PLCs, I/O modules, power supplies, and accessories.',
                badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
              },
              {
                id: 'agent-8',
                name: 'Human Review Agent',
                role: 'Exception Routing',
                desc: 'Routes ambiguous low-confidence specs into human review queue with side-by-side evidence quotes.',
                badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }
            ].map((agent) => (
              <div 
                key={agent.id} 
                className="neo-card p-5 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-2">
                  <span className={`text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded-full border ${agent.badge}`}>
                    {agent.role}
                  </span>
                  <Bot className="h-4 w-4 text-slate-400" />
                </div>
                <h3 className="font-semibold text-sm text-slate-100 light:text-slate-900 font-sans">
                  {agent.name}
                </h3>
                <p className="text-xs text-slate-300 light:text-slate-600 font-sans leading-relaxed">
                  {agent.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Live Feature Ingestion Demo Section */}
        <section id="demo" className="neo-card p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 light:border-slate-200 pb-6">
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-400 light:text-emerald-600 uppercase tracking-wider">
                LIVE DEMO EXPERIENCE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-100 light:text-slate-900">
                Instant Multi-Modal Datasheet Ingestion
              </h2>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="neo-btn-primary px-4 text-xs font-semibold flex items-center gap-2"
            >
              <UploadCloud className="h-4 w-4" />
              <span>Try Ingestion in Workspace</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#090d16] light:bg-slate-100 p-5 rounded-xl border border-slate-800 light:border-slate-200 space-y-3">
              <div className="h-7 w-7 bg-cyan-600 text-white rounded-lg font-mono text-xs font-bold flex items-center justify-center">
                01
              </div>
              <h3 className="font-semibold text-sm text-slate-100 light:text-slate-900 font-sans">Upload PDF / Technical Spreadsheet</h3>
              <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed font-sans">
                Drop manufacturer spec sheets, Siemens/Rockwell datasheets, or distributor inventory feeds into the Ingestion Center.
              </p>
            </div>

            <div className="bg-[#090d16] light:bg-slate-100 p-5 rounded-xl border border-slate-800 light:border-slate-200 space-y-3">
              <div className="h-7 w-7 bg-purple-600 text-white rounded-lg font-mono text-xs font-bold flex items-center justify-center">
                02
              </div>
              <h3 className="font-semibold text-sm text-slate-100 light:text-slate-900 font-sans">Gemini Multi-Modal Extraction</h3>
              <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed font-sans">
                Gemini processes text, tables, and wiring diagrams simultaneously, outputting standardized key-value JSON pairs with confidence scores.
              </p>
            </div>

            <div className="bg-[#090d16] light:bg-slate-100 p-5 rounded-xl border border-slate-800 light:border-slate-200 space-y-3">
              <div className="h-7 w-7 bg-emerald-600 text-white rounded-lg font-mono text-xs font-bold flex items-center justify-center">
                03
              </div>
              <h3 className="font-semibold text-sm text-slate-100 light:text-slate-900 font-sans">Verifiable Evidence Traceability</h3>
              <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed font-sans">
                Click any extracted specification in the workspace to highlight the exact source page, bounding box, and text snippet quote.
              </p>
            </div>
          </div>
        </section>

        {/* Enterprise Pricing Section */}
        <section id="pricing" className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-semibold text-cyan-400 light:text-cyan-600 uppercase tracking-wider">
              ENTERPRISE PLATFORM TIERS
            </span>
            <h2 className="text-3xl font-bold font-sans text-slate-100 light:text-slate-900">
              Built for Scale & Security
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="neo-card p-6 flex flex-col justify-between">
              <div className="space-y-4 font-sans">
                <div className="font-bold text-sm uppercase text-slate-300 light:text-slate-700">STARTER DISTRIBUTOR</div>
                <div className="text-3xl font-bold font-mono text-cyan-400 light:text-cyan-600">$499 <span className="text-xs font-sans text-slate-500">/ mo</span></div>
                <p className="text-xs text-slate-400 light:text-slate-600">Ideal for regional distributors managing up to 10,000 active SKUs.</p>
                <ul className="space-y-2 text-xs font-medium text-slate-300 light:text-slate-700 pt-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 10,000 PDF Page Extractions / mo</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Standard 8-Agent Pipeline</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Google OAuth & Gmail SSO</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> CSV & JSON Catalog Export</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-btn-secondary mt-6 text-xs">Sign In via Gmail</button>
            </div>

            <div className="neo-card p-6 flex flex-col justify-between border-2 border-indigo-500 light:border-indigo-600 relative">
              <div className="absolute -top-3 right-4 bg-indigo-600 text-white font-sans font-semibold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                MOST POPULAR
              </div>
              <div className="space-y-4 font-sans">
                <div className="font-bold text-sm uppercase text-indigo-400 light:text-indigo-600">ENTERPRISE INDUSTRIAL</div>
                <div className="text-3xl font-bold font-mono text-cyan-400 light:text-cyan-600">$1,999 <span className="text-xs font-sans text-slate-500">/ mo</span></div>
                <p className="text-xs text-slate-300 light:text-slate-600">For global OEMs and enterprise suppliers managing 100,000+ SKUs.</p>
                <ul className="space-y-2 text-xs font-medium text-slate-200 light:text-slate-800 pt-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Unlimited PDF & Datasheet Extractions</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Custom ETIM Taxonomy Rules</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Real-time Supabase Database Sync</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Dedicated Gemini API Key Provisioning</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Human Review Queue & Audit Log</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-btn-primary mt-6 text-xs">Get Started Now</button>
            </div>

            <div className="neo-card p-6 flex flex-col justify-between">
              <div className="space-y-4 font-sans">
                <div className="font-bold text-sm uppercase text-purple-400 light:text-purple-600">GLOBAL OEM CUSTOM</div>
                <div className="text-3xl font-bold font-mono text-purple-400 light:text-purple-600">CUSTOM</div>
                <p className="text-xs text-slate-400 light:text-slate-600">Custom deployment for Fortune 500 industrial automation brands.</p>
                <ul className="space-y-2 text-xs font-medium text-slate-300 light:text-slate-700 pt-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> On-Premises & Private Cloud Deployment</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Custom Fine-Tuned AI Extraction Models</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> SAP, Oracle & Siemens Teamcenter Integration</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> 24/7 SLA & Dedicated Solutions Engineer</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-btn-secondary mt-6 text-xs">Contact Sales</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800 light:border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs font-sans text-slate-500 light:text-slate-600 gap-4">
        <div>
          © 2026 FORGE AI PLATFORM INC. INDUSTRIAL PRODUCT INTELLIGENCE ENGINE.
        </div>
        <div className="flex items-center gap-6 font-medium">
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
        </div>
      </footer>
    </div>
  );
};
