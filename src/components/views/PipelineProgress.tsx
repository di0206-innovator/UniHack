'use client';

import React from 'react';
import { useProductContext } from '@/context/ProductContext';
import { 
  Workflow, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  FileSearch,
  Database,
  Layers,
  Sparkles,
  Bot
} from 'lucide-react';

export const PipelineProgress: React.FC = () => {
  const { 
    activePipelineSteps, 
    isProcessing, 
    currentProcessingProduct,
    setActiveView 
  } = useProductContext();

  const getIcon = (stepId: string) => {
    switch (stepId) {
      case 'ingestion': return FileSearch;
      case 'extraction': return Bot;
      case 'validation': return ShieldCheck;
      case 'enrichment': return Sparkles;
      case 'review': return Layers;
      default: return Workflow;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Pipeline Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Workflow className="h-4 w-4" />
              <span>Multi-Agent Workflow Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Active Processing Pipeline</h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time multi-agent product intelligence pipeline executing ingestion, extraction, validation, enrichment, and quality audit.
            </p>
          </div>

          <div className="text-right">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase font-mono ${
              isProcessing 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                  <span>Pipeline Executing</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Pipeline Idle / Ready</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Step Tracker */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-8 shadow-xl space-y-6">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan-400" />
          <span>Execution Trajectory</span>
        </h3>

        <div className="space-y-4">
          {activePipelineSteps.map((step, index) => {
            const Icon = getIcon(step.stepId);
            const isLast = index === activePipelineSteps.length - 1;

            return (
              <div key={step.stepId} className="relative">
                <div className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                  step.status === 'completed'
                    ? 'bg-slate-950 border-emerald-500/30 text-slate-200'
                    : step.status === 'running'
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${
                      step.status === 'completed'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : step.status === 'running'
                        ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}>
                      {step.status === 'running' ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : step.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        <span>Phase {index + 1}: {step.label}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {step.status === 'completed' ? 'Successfully evaluated and structured' :
                         step.status === 'running' ? 'Agent actively reasoning and parsing context...' :
                         'Waiting for preceding agent phase...'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    {step.status === 'completed' && (
                      <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        {step.durationMs}ms
                      </span>
                    )}
                    {step.status === 'running' && (
                      <span className="text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 animate-pulse">
                        Active...
                      </span>
                    )}
                    {step.status === 'pending' && (
                      <span className="text-slate-600">Pending</span>
                    )}
                  </div>
                </div>

                {!isLast && (
                  <div className="ml-9 h-3 w-0.5 bg-slate-800 my-0.5"></div>
                )}
              </div>
            );
          })}
        </div>

        {currentProcessingProduct && !isProcessing && (
          <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Processing Completed for:</p>
              <h4 className="font-semibold text-slate-200 text-sm mt-0.5">{currentProcessingProduct.name}</h4>
            </div>

            <button
              onClick={() => setActiveView('workspace')}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <span>Open in Product Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
