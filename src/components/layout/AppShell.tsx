'use client';

import React from 'react';
import { useProductContext } from '@/context/ProductContext';
import { useAuthContext } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { SettingsModal } from '@/components/profile/SettingsModal';
import { ProfileDropdown } from '@/components/profile/ProfileDropdown';
import { 
  BarChart3,
  Box, 
  UploadCloud, 
  Workflow, 
  Layers, 
  Search, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Bot,
  Network,
  UserCheck,
  Globe,
  LogOut,
  User as UserIcon,
  Building2,
  Lock,
  ChevronRight
} from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    activeView, 
    setActiveView, 
    products, 
    selectedProduct, 
    isProcessing 
  } = useProductContext();

  const { user, isAuthenticated, logout, openAuthModal } = useAuthContext();

  const readyCount = products.filter(p => p.reviewStatus === 'READY').length;
  const reviewReqCount = products.filter(p => p.reviewStatus === 'REVIEW_REQUIRED').length;
  const conflictCount = products.filter(p => p.reviewStatus === 'CONFLICT').length;
  const queueCount = reviewReqCount + conflictCount;

  // Standalone pages (Landing / Auth / Unauthenticated) render without sidebar/header clutter
  const isStandalonePage = activeView === 'landing' || activeView === 'auth' || !isAuthenticated;

  if (isStandalonePage) {
    return (
      <div className="min-h-screen w-full bg-[#090d16] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <AuthModal />
        <SettingsModal />
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090d16] text-slate-100 antialiased font-sans">
      {/* Auth & Settings Modals */}
      <AuthModal />
      <SettingsModal />

      {/* Neo-Brutalist Sidebar */}
      <aside className="w-70 flex-shrink-0 bg-[#0a0e17] border-r-2 border-slate-800 flex flex-col justify-between z-20 shadow-[4px_0px_0px_0px_#000000]">
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b-2 border-slate-800 bg-[#0e1424] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setActiveView('landing')}
                className="h-10 w-10 bg-cyan-600 border-2 border-cyan-300 flex items-center justify-center text-slate-950 font-black cursor-pointer shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform"
              >
                <Cpu className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <div 
                  onClick={() => setActiveView('landing')}
                  className="font-black text-slate-100 tracking-wider text-base flex items-center gap-1.5 cursor-pointer uppercase font-mono"
                >
                  Forge AI
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[9px] font-mono font-bold uppercase bg-cyan-500 text-slate-950 px-1.5 py-0.2 border border-cyan-300">
                    ENTERPRISE v2.4
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
              Workspace Navigation
            </div>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border-2 ${
                activeView === 'dashboard'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-cyan-500/60 hover:text-white shadow-[2px_2px_0px_0px_#000000]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className={`h-4 w-4 ${activeView === 'dashboard' ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>Executive Dashboard</span>
              </div>
              {activeView === 'dashboard' && <ChevronRight className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setActiveView('catalog')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border-2 ${
                activeView === 'catalog'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-cyan-500/60 hover:text-white shadow-[2px_2px_0px_0px_#000000]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Box className={`h-4 w-4 ${activeView === 'catalog' ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>Product Catalog</span>
              </div>
              <span className={`text-[10px] font-mono font-black px-2 py-0.5 border ${
                activeView === 'catalog' ? 'bg-slate-950 text-cyan-400 border-cyan-400' : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveView('upload')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border-2 ${
                activeView === 'upload'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-emerald-500/60 hover:text-white shadow-[2px_2px_0px_0px_#000000]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UploadCloud className={`h-4 w-4 ${activeView === 'upload' ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span>Upload Center</span>
              </div>
              <span className={`text-[9px] uppercase font-mono font-black px-1.5 py-0.5 border ${
                activeView === 'upload' ? 'bg-slate-950 text-emerald-400 border-emerald-400' : 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50'
              }`}>
                INGEST
              </span>
            </button>

            <button
              onClick={() => setActiveView('review-queue')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border-2 ${
                activeView === 'review-queue'
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-amber-500/60 hover:text-white shadow-[2px_2px_0px_0px_#000000]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className={`h-4 w-4 ${activeView === 'review-queue' ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>Human Review Queue</span>
              </div>
              {queueCount > 0 && (
                <span className={`text-[10px] font-mono font-black px-2 py-0.5 border ${
                  activeView === 'review-queue' ? 'bg-slate-950 text-amber-400 border-amber-400' : 'bg-amber-950 text-amber-300 border-amber-500/50'
                }`}>
                  {queueCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('pipeline')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border-2 ${
                activeView === 'pipeline'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-cyan-500/60 hover:text-white shadow-[2px_2px_0px_0px_#000000]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Workflow className={`h-4 w-4 ${activeView === 'pipeline' ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>Processing Pipeline</span>
              </div>
              {isProcessing && (
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 bg-cyan-400 border border-black"></span>
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('workspace')}
              disabled={!selectedProduct}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border-2 ${
                !selectedProduct ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-600' :
                activeView === 'workspace'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-cyan-500/60 hover:text-white shadow-[2px_2px_0px_0px_#000000]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Layers className={`h-4 w-4 flex-shrink-0 ${activeView === 'workspace' ? 'text-slate-950' : 'text-purple-400'}`} />
                <span className="truncate">Product Workspace</span>
              </div>
            </button>

            <button
              onClick={() => setActiveView('knowledge-graph')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border-2 ${
                activeView === 'knowledge-graph'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-cyan-500/60 hover:text-white shadow-[2px_2px_0px_0px_#000000]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Network className={`h-4 w-4 ${activeView === 'knowledge-graph' ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>Knowledge Graph</span>
              </div>
            </button>

            <button
              onClick={() => setActiveView('agent-monitor')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border-2 ${
                activeView === 'agent-monitor'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-cyan-500/60 hover:text-white shadow-[2px_2px_0px_0px_#000000]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bot className={`h-4 w-4 ${activeView === 'agent-monitor' ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>Agent Monitor</span>
              </div>
            </button>

            <div className="pt-2">
              <button
                onClick={() => setActiveView('landing')}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-400 bg-slate-950 border-2 border-slate-800 hover:border-purple-500 hover:text-purple-300 transition-all"
              >
                <Globe className="h-4 w-4 text-purple-400" />
                <span>View Public Landing</span>
              </button>
            </div>
          </nav>

          {/* Quick Metrics Widget */}
          <div className="px-3 mt-2">
            <div className="p-3 bg-[#0d1424] border-2 border-slate-800 shadow-[3px_3px_0px_0px_#000000] space-y-2">
              <div className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-wider flex items-center justify-between">
                <span>CATALOG HEALTH</span>
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <div className="space-y-1 text-xs font-mono font-bold">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Ready
                  </span>
                  <span className="text-emerald-400">{readyCount}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3 w-3 text-amber-400" /> Review
                  </span>
                  <span className="text-amber-400">{reviewReqCount}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3 w-3 text-rose-400" /> Conflict
                  </span>
                  <span className="text-rose-400">{conflictCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Account Status */}
        <div className="p-3 border-t-2 border-slate-800 bg-[#0e1424]">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 truncate">
                <div className="h-8 w-8 bg-cyan-500 border-2 border-slate-900 font-black text-slate-950 font-mono text-xs flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="truncate text-xs">
                  <span className="font-bold text-slate-100 block truncate">{user.name}</span>
                  <span className="text-[10px] text-cyan-400 block truncate font-mono">{user.email || user.organization}</span>
                </div>
              </div>
              <button 
                onClick={logout} 
                title="Sign Out" 
                className="p-1.5 bg-rose-950/80 text-rose-400 border-2 border-rose-600 hover:bg-rose-600 hover:text-slate-950 transition-colors shadow-[2px_2px_0px_0px_#000000]"
              >
                <LogOut className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="w-full neo-brutal-btn-primary py-2 text-xs flex items-center justify-center gap-2"
            >
              <UserIcon className="h-4 w-4" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b-2 border-slate-800 bg-[#0e1424] flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search catalog by SKU, name, spec, or manufacturer..."
                className="w-full neo-brutal-input pl-10 pr-4 py-1.5 text-xs font-medium placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedProduct && (
              <div className="hidden lg:flex text-xs font-mono font-bold bg-slate-900 text-cyan-300 border-2 border-cyan-500/50 px-3 py-1 shadow-[2px_2px_0px_0px_#000000] items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-cyan-400">{selectedProduct.sku}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-200 truncate max-w-[140px]">{selectedProduct.name}</span>
              </div>
            )}

            {/* Top-Right Profile Dropdown (With Theme Switcher, Settings & Logout) */}
            <ProfileDropdown />
          </div>
        </header>

        {/* Page View Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#090d16] bg-grid-pattern">
          {children}
        </main>
      </div>
    </div>
  );
};
