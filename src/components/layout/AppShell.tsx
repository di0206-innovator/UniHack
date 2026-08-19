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
      <div className="min-h-screen w-full bg-[#090d16] light:bg-[#f8fafc] text-slate-100 light:text-slate-900 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors">
        <AuthModal />
        <SettingsModal />
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090d16] light:bg-[#f8fafc] text-slate-100 light:text-slate-900 antialiased font-sans transition-colors">
      {/* Modals */}
      <AuthModal />
      <SettingsModal />

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#0f172a] light:bg-white border-r border-slate-800/80 light:border-slate-200 flex flex-col justify-between z-20 shadow-lg">
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-800/80 light:border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setActiveView('landing')}
                className="h-9 w-9 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-lg flex items-center justify-center text-white cursor-pointer shadow-sm hover:scale-105 transition-transform"
              >
                <Cpu className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div>
                <div 
                  onClick={() => setActiveView('landing')}
                  className="font-bold text-slate-100 light:text-slate-900 tracking-tight text-base flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  Forge AI
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] font-sans font-medium text-indigo-400 light:text-indigo-600 bg-indigo-500/10 light:bg-indigo-50 border border-indigo-500/30 light:border-indigo-200 px-2 py-0.5 rounded-full">
                    Enterprise
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 font-sans text-xs">
            <div className="px-2 py-1 text-[10px] font-mono uppercase font-semibold text-slate-400 light:text-slate-500 tracking-wider">
              Workspace Navigation
            </div>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                activeView === 'dashboard'
                  ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className={`h-4 w-4 ${activeView === 'dashboard' ? 'text-white' : 'text-cyan-400'}`} />
                <span>Executive Dashboard</span>
              </div>
              {activeView === 'dashboard' && <ChevronRight className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={() => setActiveView('catalog')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                activeView === 'catalog'
                  ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Box className={`h-4 w-4 ${activeView === 'catalog' ? 'text-white' : 'text-slate-400'}`} />
                <span>Product Catalog</span>
              </div>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                activeView === 'catalog' ? 'bg-slate-900 text-cyan-300' : 'bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveView('upload')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                activeView === 'upload'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UploadCloud className={`h-4 w-4 ${activeView === 'upload' ? 'text-white' : 'text-emerald-400'}`} />
                <span>Upload Center</span>
              </div>
              <span className={`text-[9px] uppercase font-mono font-semibold px-1.5 py-0.5 rounded ${
                activeView === 'upload' ? 'bg-slate-900 text-emerald-300' : 'bg-emerald-950/60 light:bg-emerald-100 text-emerald-400 light:text-emerald-700 border border-emerald-500/30'
              }`}>
                INGEST
              </span>
            </button>

            <button
              onClick={() => setActiveView('review-queue')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                activeView === 'review-queue'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className={`h-4 w-4 ${activeView === 'review-queue' ? 'text-white' : 'text-amber-400'}`} />
                <span>Human Review Queue</span>
              </div>
              {queueCount > 0 && (
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                  activeView === 'review-queue' ? 'bg-slate-900 text-amber-300' : 'bg-amber-950/60 light:bg-amber-100 text-amber-400 light:text-amber-700 border border-amber-500/30'
                }`}>
                  {queueCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('pipeline')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                activeView === 'pipeline'
                  ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Workflow className={`h-4 w-4 ${activeView === 'pipeline' ? 'text-white' : 'text-cyan-400'}`} />
                <span>Processing Pipeline</span>
              </div>
              {isProcessing && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('workspace')}
              disabled={!selectedProduct}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                !selectedProduct ? 'opacity-40 cursor-not-allowed text-slate-500' :
                activeView === 'workspace'
                  ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Layers className={`h-4 w-4 flex-shrink-0 ${activeView === 'workspace' ? 'text-white' : 'text-purple-400'}`} />
                <span className="truncate">Product Workspace</span>
              </div>
            </button>

            <button
              onClick={() => setActiveView('knowledge-graph')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                activeView === 'knowledge-graph'
                  ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Network className={`h-4 w-4 ${activeView === 'knowledge-graph' ? 'text-white' : 'text-cyan-400'}`} />
                <span>Knowledge Graph</span>
              </div>
            </button>

            <button
              onClick={() => setActiveView('agent-monitor')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                activeView === 'agent-monitor'
                  ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bot className={`h-4 w-4 ${activeView === 'agent-monitor' ? 'text-white' : 'text-slate-400'}`} />
                <span>Agent Monitor</span>
              </div>
            </button>

            <div className="pt-2">
              <button
                onClick={() => setActiveView('landing')}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 light:text-slate-600 hover:text-purple-400 hover:bg-slate-800/40 rounded-lg transition-all"
              >
                <Globe className="h-4 w-4 text-purple-400" />
                <span>View Public Landing</span>
              </button>
            </div>
          </nav>

          {/* Catalog Health Widget */}
          <div className="px-3 mt-2">
            <div className="p-3 bg-[#090d16] light:bg-slate-100 rounded-xl border border-slate-800 light:border-slate-200 space-y-2">
              <div className="text-[10px] font-mono font-semibold text-cyan-400 light:text-cyan-600 uppercase tracking-wider flex items-center justify-between">
                <span>CATALOG HEALTH</span>
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <div className="space-y-1 text-xs font-mono font-semibold">
                <div className="flex justify-between items-center text-slate-300 light:text-slate-700">
                  <span className="flex items-center gap-1.5 font-sans font-normal text-[11px]">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Ready
                  </span>
                  <span className="text-emerald-400">{readyCount}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 light:text-slate-700">
                  <span className="flex items-center gap-1.5 font-sans font-normal text-[11px]">
                    <AlertTriangle className="h-3 w-3 text-amber-400" /> Review
                  </span>
                  <span className="text-amber-400">{reviewReqCount}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 light:text-slate-700">
                  <span className="flex items-center gap-1.5 font-sans font-normal text-[11px]">
                    <AlertTriangle className="h-3 w-3 text-rose-400" /> Conflict
                  </span>
                  <span className="text-rose-400">{conflictCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Account Status */}
        <div className="p-3 border-t border-slate-800/80 light:border-slate-200 bg-[#0f172a] light:bg-white">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 truncate">
                <div className="h-8 w-8 bg-cyan-600 text-white rounded-full font-bold font-mono text-xs flex items-center justify-center shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="truncate text-xs font-sans">
                  <span className="font-semibold text-slate-100 light:text-slate-900 block truncate">{user.name}</span>
                  <span className="text-[10px] text-cyan-400 light:text-cyan-600 block truncate font-mono">{user.email || user.organization}</span>
                </div>
              </div>
              <button 
                onClick={logout} 
                title="Sign Out" 
                className="p-1.5 bg-rose-950/40 light:bg-rose-50 text-rose-400 light:text-rose-600 border border-rose-500/30 rounded-lg hover:bg-rose-600 hover:text-white transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="w-full neo-btn-primary py-2 text-xs flex items-center justify-center gap-2"
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
        <header className="h-14 border-b border-slate-800/80 light:border-slate-200 bg-[#0f172a]/90 light:bg-white/90 backdrop-blur-md flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search catalog by SKU, name, spec, or manufacturer..."
                className="w-full neo-input pl-9 pr-4 py-1.5 text-xs placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedProduct && (
              <div className="hidden lg:flex text-xs font-mono font-medium bg-slate-900 light:bg-slate-100 text-cyan-400 light:text-cyan-600 border border-cyan-500/30 light:border-cyan-200 px-3 py-1 rounded-lg items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span className="font-semibold">{selectedProduct.sku}</span>
                <span className="text-slate-600 light:text-slate-300">|</span>
                <span className="text-slate-200 light:text-slate-800 truncate max-w-[140px] font-sans">{selectedProduct.name}</span>
              </div>
            )}

            {/* Top-Right Profile & Settings Dropdown */}
            <ProfileDropdown />
          </div>
        </header>

        {/* Page View Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#090d16] light:bg-[#f8fafc] bg-grid-pattern transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
};
