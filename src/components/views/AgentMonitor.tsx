'use client';

import React, { useState } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { ConfidenceBadge } from '@/components/ui/Badge';
import { 
  Bot, 
  Cpu, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { AgentResult } from '@/types/agent';

export const AgentMonitor: React.FC = () => {
  const { products, selectedProduct } = useProductContext();

  const targetProduct = selectedProduct || (products.length > 0 ? products[0] : null);
  
  const rawResults = targetProduct?.agentResults || {};
  const agentResults: AgentResult[] = Array.isArray(rawResults) 
    ? rawResults 
    : Object.values(rawResults);

  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(
    agentResults.length > 0 ? agentResults[0].agentId : null
  );

  const activeAgentResult = agentResults.find(a => a.agentId === selectedAgentId) || (agentResults.length > 0 ? agentResults[0] : null);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <PageHeader
        category="Multi-Agent System Telemetry"
        title="Agentic Product Intelligence Orchestrator"
        subtitle="Real-time execution telemetry, agent decision logs, pass rates, and evidence payloads across all 8 specialized pipeline agents."
        icon={Bot}
        actions={
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs text-cyan-400">
            <Cpu className="h-4 w-4" />
            <span>8 Active Specialized Agents</span>
          </div>
        }
      />

      {!targetProduct ? (
        <Card className="p-10 text-center space-y-2">
          <Bot className="h-10 w-10 text-slate-600 mx-auto" />
          <h4 className="font-semibold text-slate-300">No Product Telemetry Available</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Ingest a product datasheet to view live agent trajectory execution logs.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: 8-Agent Execution List */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between px-1">
              <span>8 Pipeline Agents ({agentResults.length})</span>
              <span className="font-mono text-[11px] text-cyan-400">{targetProduct.sku}</span>
            </h3>

            <div className="space-y-2">
              {agentResults.map((res) => {
                const isSelected = res.agentId === activeAgentResult?.agentId;

                return (
                  <div
                    key={res.agentId}
                    onClick={() => setSelectedAgentId(res.agentId)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500/50 shadow-lg'
                        : 'bg-[#0b1120] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 text-sm flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        {res.agentName}
                      </span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-400">{res.executionTimeMs}ms</span>
                      <ConfidenceBadge score={Math.round(res.confidence * 100)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Agent Deep Trajectory Inspector */}
          <div className="lg:col-span-2">
            {activeAgentResult ? (
              <Card className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                        {activeAgentResult.agentId.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400">Execution Trajectory</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100">{activeAgentResult.agentName}</h3>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <span className="text-purple-400 block font-semibold">{activeAgentResult.executionTimeMs} ms</span>
                    <span className="text-emerald-400 text-[10px] uppercase font-bold">{activeAgentResult.status}</span>
                  </div>
                </div>

                {/* Structured Output Preview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Agent Output Summary</h4>
                  <pre className="text-xs text-cyan-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {typeof activeAgentResult.output === 'string'
                      ? activeAgentResult.output
                      : JSON.stringify(activeAgentResult.output, null, 2)}
                  </pre>
                </div>

                {/* Evidence & Decision Signals */}
                {activeAgentResult.evidence && activeAgentResult.evidence.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Grounded Decision Evidence</h4>
                    <div className="space-y-2">
                      {activeAgentResult.evidence.map((ev, evIdx) => (
                        <div key={evIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                          <span className="text-cyan-400 font-semibold">{ev.sourceDocName || 'Source Chunk'}</span>
                          <p className="text-slate-400 italic text-[11px]">"{ev.snippet}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-10 text-center text-slate-500">
                Select an agent from the left column to inspect execution trajectory logs.
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
