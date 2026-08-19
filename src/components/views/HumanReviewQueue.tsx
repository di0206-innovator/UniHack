'use client';

import React, { useState } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { AuditTrailService } from '@/lib/audit/audit-service';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Check, 
  UserCheck,
  Filter
} from 'lucide-react';
import { Product } from '@/types/product';

export const HumanReviewQueue: React.FC = () => {
  const { products, updateReviewStatus, updateSpecificationValue, selectProduct, auditLogs, recordAuditEvent } = useProductContext();
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [selectedProductForTimeline, setSelectedProductForTimeline] = useState<Product | null>(null);
  const [reasonInput, setReasonInput] = useState('');

  // Products needing attention (REVIEW_REQUIRED or CONFLICT)
  const queueProducts = products.filter(p => p.reviewStatus !== 'READY');

  const filteredQueue = queueProducts.filter(p => {
    if (filterSeverity === 'CONFLICT') return p.reviewStatus === 'CONFLICT';
    if (filterSeverity === 'REVIEW_REQUIRED') return p.reviewStatus === 'REVIEW_REQUIRED';
    return true;
  });

  const handleResolveConflict = (prod: Product, fieldKey: string, chosenValue: string) => {
    const spec = prod.specifications.find(s => s.key === fieldKey);
    if (spec) {
      const prevVal = String(spec.value);
      updateSpecificationValue(prod.id, spec.id, chosenValue);
      updateReviewStatus(prod.id, 'READY', `Steward selected candidate alternative "${chosenValue}"`);
      
      recordAuditEvent(
        prod,
        'select_alternative',
        fieldKey,
        prevVal,
        chosenValue,
        reasonInput || 'Accepted authoritative PDF Datasheet value over distributor feed'
      );
      setReasonInput('');
    }
  };

  const handleApproveProduct = (prod: Product) => {
    updateReviewStatus(prod.id, 'READY', reasonInput || 'Steward approved catalog readiness');
    recordAuditEvent(
      prod,
      'approve',
      undefined,
      prod.reviewStatus,
      'READY',
      reasonInput || 'Manually verified specifications and approved for catalog export'
    );
    setReasonInput('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <PageHeader
        category="Human-in-the-Loop Operations"
        title="Data Steward Review Queue"
        subtitle="Prioritized operations queue. Review conflicts, missing attributes, and low-confidence specs before catalog publication."
        icon={UserCheck}
        actions={
          <div className="bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-mono text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>{queueProducts.length} Products Need Attention</span>
          </div>
        }
      />

      {/* Main Queue & Audit Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: What Needs Your Attention */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-[#0b1120] p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>What Needs Your Attention? ({filteredQueue.length})</span>
            </h3>

            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
              >
                <option value="ALL">All Action Needed</option>
                <option value="CONFLICT">Conflicts Only</option>
                <option value="REVIEW_REQUIRED">Review Required Only</option>
              </select>
            </div>
          </div>

          {filteredQueue.length === 0 ? (
            <Card className="p-10 text-center space-y-2">
              <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
              <h4 className="font-semibold text-slate-200">Review Queue Empty</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">All product records are commerce-ready and approved.</p>
            </Card>
          ) : (
            filteredQueue.map((prod) => {
              const issues = prod.validationIssues || [];
              const conflicts = prod.conflicts || [];

              return (
                <Card key={prod.id} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                          {prod.sku}
                        </span>
                        <span className="text-xs text-slate-400">{prod.manufacturer}</span>
                      </div>
                      <h4 className="font-bold text-slate-100 text-base">{prod.name}</h4>
                    </div>

                    <StatusBadge status={prod.reviewStatus} size="sm" />
                  </div>

                  {/* Conflicting Candidate Alternatives View */}
                  {conflicts.map((conf) => (
                    <div key={conf.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4" /> Multi-Source Conflict on: {conf.fieldKey}
                        </span>
                        <span className="text-slate-500 text-[10px] uppercase font-mono">Select Candidate Alternative</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {conf.sources.map((src, sIdx) => (
                          <div
                            key={sIdx}
                            onClick={() => handleResolveConflict(prod, conf.fieldKey, src.value)}
                            className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl cursor-pointer transition-all space-y-1 group"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-300 group-hover:text-cyan-300">{src.sourceName}</span>
                              <span className="text-cyan-400 font-mono font-bold text-xs">{src.value}</span>
                            </div>
                            {src.quote && (
                              <p className="text-[11px] text-slate-400 italic">"{src.quote}"</p>
                            )}
                            <div className="pt-2 text-right">
                              <span className="text-[10px] bg-cyan-600/20 text-cyan-400 px-2 py-0.5 rounded font-mono group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                Select Value
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Issues List */}
                  {issues.map((iss) => (
                    <div key={iss.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="font-semibold">{iss.title}</span>
                        <span className="text-amber-400 font-mono text-[10px] uppercase">{iss.severity}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{iss.description}</p>
                    </div>
                  ))}

                  {/* Steward Action Bar */}
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => selectProduct(prod.id)}
                        className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors flex items-center gap-1.5"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-cyan-400" /> Deep Inspect
                      </button>
                      <button
                        onClick={() => setSelectedProductForTimeline(prod)}
                        className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors flex items-center gap-1.5"
                      >
                        <Clock className="h-3.5 w-3.5 text-purple-400" /> Lifecycle Timeline
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveProduct(prod)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-all"
                      >
                        <Check className="h-4 w-4" /> Approve for Export
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Right Col: Audit Log Drawer & Timeline */}
        <div className="space-y-6">
          {/* Chronological Product Lifecycle Timeline */}
          {selectedProductForTimeline && (
            <Card className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span>Product Lifecycle Timeline</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{selectedProductForTimeline.sku}</p>
                </div>
                <button
                  onClick={() => setSelectedProductForTimeline(null)}
                  className="text-xs text-slate-500 hover:text-slate-300"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {AuditTrailService.getProductLifecycleTimeline(selectedProductForTimeline).map((step) => (
                  <div key={step.stepId} className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <div>
                        <span className="font-semibold text-slate-200 block">{step.title}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{step.details}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                      step.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                      step.status === 'flagged' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Immutable Audit Trail Log */}
          <Card className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-cyan-400" />
              <span>Immutable Human Audit Trail ({auditLogs.length})</span>
            </h4>

            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-cyan-300">{log.stewardName}</span>
                    <span className="font-mono text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>

                  <div className="font-mono text-slate-200 font-medium">
                    {log.action.toUpperCase()}: <span className="text-slate-400">{log.fieldKey || log.productSku}</span>
                  </div>

                  {log.previousValue && (
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded border border-slate-800/80">
                      <span className="text-rose-400">- {log.previousValue}</span>
                      <br />
                      <span className="text-emerald-400">+ {log.newValue}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 italic">"{log.reason}"</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
