'use client';

import React from 'react';
import { useProductContext } from '@/context/ProductContext';
import { useAuthContext } from '@/context/AuthContext';
import { 
  Cpu, 
  UploadCloud, 
  ShieldCheck, 
  Workflow, 
  Network, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Lock, 
  UserCheck,
  Check,
  Bot,
  Zap,
  Layers,
  Sparkles,
  FileCode,
  Search,
  ExternalLink
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView } = useProductContext();
  const { signInWithGoogle, openAuthModal, isAuthenticated } = useAuthContext();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070a12] bg-grid-pattern text-slate-100 font-sans pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0e1424]/90 backdrop-blur-md border-b-2 border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-cyan-500 border-2 border-cyan-300 flex items-center justify-center text-slate-950 font-black shadow-[3px_3px_0px_0px_#000000]">
              <Cpu className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-slate-100 tracking-wider text-lg uppercase font-mono flex items-center gap-2">
                Forge AI
                <span className="text-[10px] font-mono font-black bg-cyan-500 text-slate-950 px-2 py-0.5 border border-cyan-300 shadow-[2px_2px_0px_0px_#000000]">
                  ENTERPRISE v2.4
                </span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            <a href="#capabilities" className="hover:text-cyan-400 transition-colors">Capabilities</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">8-Agent System</a>
            <a href="#demo" className="hover:text-cyan-400 transition-colors">Spec Ingestion</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Enterprise Pricing</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="neo-brutal-btn-google px-4 py-2 text-xs flex items-center gap-2"
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
              className="neo-brutal-btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <span>{isAuthenticated ? 'Go to Workspace' : 'Launch Platform'}</span>
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-16">
        {/* Hero Banner Section */}
        <section className="p-8 md:p-12 bg-[#0e1424] border-2 border-slate-700 shadow-[8px_8px_0px_0px_#000000] relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-950 border-2 border-cyan-500/60 px-3 py-1 text-xs font-mono font-bold text-cyan-400 shadow-[3px_3px_0px_0px_#000000]">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>INDUSTRIAL CATALOG INTELLIGENCE ENGINE</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight uppercase leading-tight font-mono">
                AI-Powered Product Spec Extraction & Validation Platform
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-sans font-medium">
                Transform unstructured technical datasheets, supplier PDFs, and distributor catalogs into 
                <strong className="text-cyan-300 font-bold"> structured, validated, and commerce-ready product twins</strong> using an 
                8-agent AI orchestration pipeline backed by Gemini models and real-time evidence tracing.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="neo-brutal-btn-google px-6 py-3.5 text-sm flex items-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                  className="neo-brutal-btn-primary px-6 py-3.5 text-sm flex items-center gap-2"
                >
                  <span>Demo Operations Workspace</span>
                  <ArrowRight className="h-5 w-5 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Side Status Widget */}
            <div className="md:col-span-4 bg-[#070a12] border-2 border-slate-800 p-5 shadow-[4px_4px_0px_0px_#000000] space-y-4">
              <div className="text-xs font-mono font-black text-slate-400 uppercase tracking-wider flex items-center justify-between border-b-2 border-slate-800 pb-2">
                <span>SYSTEM ARCHITECTURE</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span> ONLINE
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center bg-[#0e1424] p-2 border border-slate-800">
                  <span className="text-slate-400">AI LLM ENGINE</span>
                  <span className="text-cyan-400 font-bold">Google Gemini Multi-Modal</span>
                </div>
                <div className="flex justify-between items-center bg-[#0e1424] p-2 border border-slate-800">
                  <span className="text-slate-400">AUTHENTICATION</span>
                  <span className="text-emerald-400 font-bold">Google OAuth + Supabase</span>
                </div>
                <div className="flex justify-between items-center bg-[#0e1424] p-2 border border-slate-800">
                  <span className="text-slate-400">SPEC ACCURACY RATE</span>
                  <span className="text-amber-400 font-bold">99.4% Verifiable</span>
                </div>
                <div className="flex justify-between items-center bg-[#0e1424] p-2 border border-slate-800">
                  <span className="text-slate-400">ACTIVE AGENTS</span>
                  <span className="text-purple-400 font-bold">8 Autonomous Agents</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8-Agent Orchestration Architecture Section */}
        <section id="architecture" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                AUTONOMOUS AGENT ORCHESTRATION
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-mono text-slate-100">
                8-Agent Catalog Intelligence Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md font-medium">
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
                color: 'border-cyan-500 text-cyan-400'
              },
              {
                id: 'agent-2',
                name: 'Schema Normalizer',
                role: 'Taxonomy Standardization',
                desc: 'Maps raw spec key names into standard ETIM and UNSPSC industrial taxonomy categories.',
                color: 'border-purple-500 text-purple-400'
              },
              {
                id: 'agent-3',
                name: 'Validation Agent',
                role: 'Physics & Unit Auditor',
                desc: 'Evaluates unit conversions, operating range limits, and flag conflicting technical claims.',
                color: 'border-emerald-500 text-emerald-400'
              },
              {
                id: 'agent-4',
                name: 'Cross-Source Matcher',
                role: 'Entity Resolution',
                desc: 'De-duplicates product records across distributor feeds and manufacturer master specs.',
                color: 'border-amber-500 text-amber-400'
              },
              {
                id: 'agent-5',
                name: 'Image & CAD OCR Agent',
                role: 'Diagram Parsing',
                desc: 'Reads technical engineering drawings, dimension callouts, and electrical schematics.',
                color: 'border-rose-500 text-rose-400'
              },
              {
                id: 'agent-6',
                name: 'Commerce Readiness Agent',
                role: 'Completeness Scoring',
                desc: 'Scores products for e-commerce publishing readiness against 12 quality benchmarks.',
                color: 'border-cyan-400 text-cyan-300'
              },
              {
                id: 'agent-7',
                name: 'Knowledge Graph Agent',
                role: 'Compatibility Graph',
                desc: 'Builds relational edges between PLCs, I/O modules, power supplies, and accessories.',
                color: 'border-blue-500 text-blue-400'
              },
              {
                id: 'agent-8',
                name: 'Human Review Agent',
                role: 'Exception Routing',
                desc: 'Routes ambiguous low-confidence specs into human review queue with side-by-side evidence quotes.',
                color: 'border-amber-400 text-amber-300'
              }
            ].map((agent) => (
              <div 
                key={agent.id} 
                className={`bg-[#0e1424] border-2 ${agent.color.split(' ')[0]} p-5 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform`}
              >
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2 mb-3">
                  <span className={`text-[10px] font-mono font-bold uppercase ${agent.color.split(' ')[1]}`}>
                    {agent.role}
                  </span>
                  <Bot className={`h-4 w-4 ${agent.color.split(' ')[1]}`} />
                </div>
                <h3 className="font-mono font-bold text-sm text-slate-100 uppercase mb-2">
                  {agent.name}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {agent.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Live Feature Ingestion Demo Section */}
        <section id="demo" className="bg-[#0e1424] border-2 border-slate-700 p-8 shadow-[8px_8px_0px_0px_#000000] space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                LIVE DEMO EXPERIENCE
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase font-mono text-slate-100">
                Instant Multi-Modal Datasheet Ingestion
              </h2>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="neo-brutal-btn-primary px-5 py-2.5 text-xs flex items-center gap-2"
            >
              <UploadCloud className="h-4 w-4" />
              <span>Try Ingestion in Workspace</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#070a12] border-2 border-slate-800 p-5 shadow-[4px_4px_0px_0px_#000000] space-y-3">
              <div className="h-8 w-8 bg-cyan-600 border border-cyan-300 text-slate-950 font-black flex items-center justify-center font-mono text-sm">
                01
              </div>
              <h3 className="font-mono font-bold text-sm text-slate-100 uppercase">Upload PDF / Technical Spreadsheet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drop manufacturer spec sheets, Siemens/Rockwell datasheets, or distributor inventory feeds into the Ingestion Center.
              </p>
            </div>

            <div className="bg-[#070a12] border-2 border-slate-800 p-5 shadow-[4px_4px_0px_0px_#000000] space-y-3">
              <div className="h-8 w-8 bg-purple-600 border border-purple-300 text-slate-950 font-black flex items-center justify-center font-mono text-sm">
                02
              </div>
              <h3 className="font-mono font-bold text-sm text-slate-100 uppercase">Gemini Multi-Modal Extraction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gemini processes text, tables, and wiring diagrams simultaneously, outputting standardized key-value JSON pairs with confidence scores.
              </p>
            </div>

            <div className="bg-[#070a12] border-2 border-slate-800 p-5 shadow-[4px_4px_0px_0px_#000000] space-y-3">
              <div className="h-8 w-8 bg-emerald-600 border border-emerald-300 text-slate-950 font-black flex items-center justify-center font-mono text-sm">
                03
              </div>
              <h3 className="font-mono font-bold text-sm text-slate-100 uppercase">Verifiable Evidence Traceability</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click any extracted specification in the workspace to highlight the exact source page, bounding box, and text snippet quote.
              </p>
            </div>
          </div>
        </section>

        {/* Enterprise Pricing Section */}
        <section id="pricing" className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              ENTERPRISE PLATFORM TIERS
            </span>
            <h2 className="text-3xl font-black uppercase font-mono text-slate-100">
              Built for Scale & Security
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0e1424] border-2 border-slate-800 p-6 shadow-[5px_5px_0px_0px_#000000] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="font-mono font-black text-sm uppercase text-slate-300">STARTER DISTRIBUTOR</div>
                <div className="text-3xl font-black font-mono text-cyan-400">$499 <span className="text-xs text-slate-500">/ mo</span></div>
                <p className="text-xs text-slate-400">Ideal for regional distributors managing up to 10,000 active SKUs.</p>
                <ul className="space-y-2 text-xs font-medium text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 10,000 PDF Page Extractions / mo</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Standard 8-Agent Pipeline</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Google OAuth & Gmail SSO</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> CSV & JSON Catalog Export</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-brutal-btn mt-6 py-2.5 text-xs">Sign In with Gmail</button>
            </div>

            <div className="bg-[#0b192e] border-2 border-cyan-400 p-6 shadow-[6px_6px_0px_0px_#000000] flex flex-col justify-between relative">
              <div className="absolute -top-3 right-4 bg-cyan-400 text-slate-950 font-mono font-black text-[10px] uppercase px-2 py-0.5 border border-black">
                MOST POPULAR
              </div>
              <div className="space-y-4">
                <div className="font-mono font-black text-sm uppercase text-cyan-300">ENTERPRISE INDUSTRIAL</div>
                <div className="text-3xl font-black font-mono text-cyan-400">$1,999 <span className="text-xs text-slate-400">/ mo</span></div>
                <p className="text-xs text-slate-300">For global OEMs and enterprise suppliers managing 100,000+ SKUs.</p>
                <ul className="space-y-2 text-xs font-bold text-slate-200 pt-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Unlimited PDF & Datasheet Extractions</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Custom ETIM Taxonomy Rules</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Real-time Supabase Database Sync</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Dedicated Gemini API Key Provisioning</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Human Review Queue & Audit Log</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-brutal-btn-primary mt-6 py-3 text-xs">Get Started Now</button>
            </div>

            <div className="bg-[#0e1424] border-2 border-slate-800 p-6 shadow-[5px_5px_0px_0px_#000000] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="font-mono font-black text-sm uppercase text-purple-400">GLOBAL OEM CUSTOM</div>
                <div className="text-3xl font-black font-mono text-purple-400">CUSTOM</div>
                <p className="text-xs text-slate-400">Custom deployment for Fortune 500 industrial automation brands.</p>
                <ul className="space-y-2 text-xs font-medium text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> On-Premises & Private Cloud Deployment</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Custom Fine-Tuned AI Extraction Models</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> SAP, Oracle & Siemens Teamcenter Integration</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> 24/7 SLA & Dedicated Solutions Engineer</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full neo-brutal-btn mt-6 py-2.5 text-xs">Contact Sales</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t-2 border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <div>
          © 2026 FORGE AI PLATFORM INC. INDUSTRIAL PRODUCT INTELLIGENCE ENGINE.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400">Terms of Service</a>
          <a href="#" className="hover:text-cyan-400">Documentation</a>
        </div>
      </footer>
    </div>
  );
};
