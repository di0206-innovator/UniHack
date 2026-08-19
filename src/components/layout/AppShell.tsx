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
  ChevronRight,
  Sparkles
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
      <div className="min-h-screen w-full bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 transition-colors">
        <AuthModal />
        <SettingsModal />
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 antialiased font-sans transition-colors">
      {/* Modals */}
      <AuthModal />
      <SettingsModal />

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-[#18181b] border-r-2 border-black dark:border-zinc-800 flex flex-col justify-between z-20 shadow-[4px_0px_0px_0px_#000000]">
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setActiveView('landing')}
                className="h-9 w-9 bg-amber-500 text-black border-2 border-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#000000] font-black"
              >
                <Cpu className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <div 
                  onClick={() => setActiveView('landing')}
                  className="font-black text-zinc-900 dark:text-zinc-100 tracking-wider text-base uppercase flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  Forge AI
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[9px] font-mono font-black text-black bg-amber-500 border border-black px-1.5 py-0.2">
                    NEO-RAG V2.5
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 font-sans text-xs">
            <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold text-amber-500 tracking-wider">
              WORKSPACE NAVIGATION
            </div>

            {/* RAG Knowledge Assistant Button */}
            <button
              onClick={() => setActiveView('rag-assistant')}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all font-bold ${
                activeView === 'rag-assistant'
                  ? 'bg-amber-500 text-black border-black shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800 hover:border-amber-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className={`h-4 w-4 ${activeView === 'rag-assistant' ? 'text-black fill-black' : 'text-amber-500'}`} />
                <span className="font-mono text-xs">RAG AI Assistant</span>
              </div>
              <span className="text-[9px] font-mono font-black uppercase px-1 bg-black text-amber-400">
                PDF
              </span>
            </button>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all font-bold ${
                activeView === 'dashboard'
                  ? 'bg-amber-500 text-black border-black shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800 hover:border-amber-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="h-4 w-4" />
                <span>Executive Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => setActiveView('catalog')}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all font-bold ${
                activeView === 'catalog'
                  ? 'bg-amber-500 text-black border-black shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800 hover:border-amber-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Box className="h-4 w-4" />
                <span>Product Catalog</span>
              </div>
              <span className="text-[10px] font-mono font-black px-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveView('upload')}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all font-bold ${
                activeView === 'upload'
                  ? 'bg-emerald-500 text-black border-black shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800 hover:border-emerald-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UploadCloud className="h-4 w-4 text-emerald-500" />
                <span>Upload Center</span>
              </div>
              <span className="text-[9px] uppercase font-mono font-black px-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-500">
                INGEST
              </span>
            </button>

            <button
              onClick={() => setActiveView('review-queue')}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all font-bold ${
                activeView === 'review-queue'
                  ? 'bg-rose-500 text-white border-black shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800 hover:border-rose-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="h-4 w-4 text-rose-500" />
                <span>Human Review Queue</span>
              </div>
              {queueCount > 0 && (
                <span className="text-[10px] font-mono font-black px-1.5 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-500">
                  {queueCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('pipeline')}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all font-bold ${
                activeView === 'pipeline'
                  ? 'bg-amber-500 text-black border-black shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800 hover:border-amber-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Workflow className="h-4 w-4 text-amber-500" />
                <span>Processing Pipeline</span>
              </div>
            </button>

            <button
              onClick={() => setActiveView('workspace')}
              disabled={!selectedProduct}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all font-bold ${
                !selectedProduct ? 'opacity-40 cursor-not-allowed text-zinc-500' :
                activeView === 'workspace'
                  ? 'bg-amber-500 text-black border-black shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800 hover:border-amber-500'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Layers className="h-4 w-4 text-emerald-500" />
                <span className="truncate">Product Workspace</span>
              </div>
            </button>

            <button
              onClick={() => setActiveView('agent-monitor')}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all font-bold ${
                activeView === 'agent-monitor'
                  ? 'bg-amber-500 text-black border-black shadow-[3px_3px_0px_0px_#000000]'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800 hover:border-amber-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bot className="h-4 w-4 text-zinc-500" />
                <span>Agent Monitor</span>
              </div>
            </button>

            <div className="pt-2">
              <button
                onClick={() => setActiveView('landing')}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-500 hover:text-amber-500 transition-all border border-transparent hover:border-amber-500"
              >
                <Globe className="h-4 w-4 text-amber-500" />
                <span>View Public Landing</span>
              </button>
            </div>
          </nav>

          {/* Catalog Health Widget */}
          <div className="px-3 mt-2">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 shadow-[2px_2px_0px_0px_#000000] space-y-2">
              <div className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center justify-between">
                <span>CATALOG HEALTH</span>
                <Activity className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="space-y-1 text-xs font-mono font-bold">
                <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Ready
                  </span>
                  <span className="text-emerald-500">{readyCount}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3 w-3 text-amber-500" /> Review
                  </span>
                  <span className="text-amber-500">{reviewReqCount}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3 w-3 text-rose-500" /> Conflict
                  </span>
                  <span className="text-rose-500">{conflictCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Account Status */}
        <div className="p-3 border-t-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181b]">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 truncate">
                <div className="h-8 w-8 bg-amber-500 text-black border border-black font-black font-mono text-xs flex items-center justify-center shadow-[1px_1px_0px_0px_#000000]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="truncate text-xs font-sans">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block truncate">{user.name}</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 block truncate font-mono">{user.email || user.organization}</span>
                </div>
              </div>
              <button 
                onClick={logout} 
                title="Sign Out" 
                className="p-1.5 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 border border-rose-500 hover:bg-rose-600 hover:text-white transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="w-full neo-brutal-btn-primary py-2 text-xs flex items-center justify-center gap-2"
            >
              <UserIcon className="h-4 w-4 text-black" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181b] flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-amber-500" />
              <input
                type="text"
                placeholder="Search catalog by SKU, name, spec, or manufacturer..."
                className="w-full neo-brutal-input pl-9 pr-4 py-1.5 text-xs placeholder-zinc-400 font-semibold"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedProduct && (
              <div className="hidden lg:flex text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-900 text-amber-600 dark:text-amber-400 border-2 border-zinc-300 dark:border-zinc-700 px-3 py-1 items-center gap-2 shadow-[2px_2px_0px_0px_#000000]">
                <FileText className="h-3.5 w-3.5 text-amber-500" />
                <span className="font-bold">{selectedProduct.sku}</span>
                <span className="text-zinc-400">|</span>
                <span className="text-zinc-800 dark:text-zinc-200 truncate max-w-[140px] font-sans">{selectedProduct.name}</span>
              </div>
            )}

            {/* Top-Right Profile & Settings Dropdown */}
            <ProfileDropdown />
          </div>
        </header>

        {/* Page View Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-50 dark:bg-[#09090b] bg-grid-pattern transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
};
