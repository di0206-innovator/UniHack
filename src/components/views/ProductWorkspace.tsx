'use client';

import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { CommerceReadinessEngine } from '@/lib/commerce/readiness-engine';
import { ExportModal } from '@/components/views/ExportModal';
import { 
  Box, 
  Layers, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Download,
  ExternalLink,
  Clock,
  Sparkles,
  Zap,
  Check,
  X,
  Network,
  Tag
} from 'lucide-react';
import { ReviewStatus, SpecificationItem } from '@/types/product';
import { EvidenceDrawer } from '@/components/views/EvidenceDrawer';

interface ProductWorkspaceProps {
  initialTab?: 'specs' | 'evidence' | 'validation' | 'review' | 'audit' | 'knowledge';
}

export const ProductWorkspace: React.FC<ProductWorkspaceProps> = ({ initialTab = 'specs' }) => {
  const { selectedProduct, updateReviewStatus, updateSpecificationValue, selectProduct, products, setActiveView } = useProductContext();
  const [activeTab, setActiveTab] = useState<'specs' | 'evidence' | 'validation' | 'review' | 'audit' | 'knowledge'>(initialTab);
  const [editingSpecId, setEditingSpecId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [activeSpecForDrawer, setActiveSpecForDrawer] = useState<SpecificationItem | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!selectedProduct) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-12">
        <Box className="h-12 w-12 text-slate-600 mb-3" />
        <h2 className="text-lg font-semibold text-slate-300">No Product Selected</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1">Select a product from the Catalog or upload a new datasheet to view product workspace intelligence.</p>
      </div>
    );
  }

  const handleSaveSpec = (specId: string) => {
    updateSpecificationValue(selectedProduct.id, specId, editValue);
    setEditingSpecId(null);
  };

  const getStatusBadge = (status: ReviewStatus) => {
    switch (status) {
      case 'READY':
        return (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" /> Commerce Ready
          </span>
        );
      case 'REVIEW_REQUIRED':
        return (
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <AlertTriangle className="h-3.5 w-3.5" /> Review Required
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <AlertTriangle className="h-3.5 w-3.5" /> Conflict Flagged
          </span>
        );
      default:
        return (
          <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  const readinessBreakdown = CommerceReadinessEngine.evaluateReadiness(selectedProduct);
  const activeConflict = selectedProduct.conflicts?.find(c => c.fieldKey === activeSpecForDrawer?.key);
  const relatedCatalogProducts = products.filter(p => p.id !== selectedProduct.id);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Product Hero Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                SKU: {selectedProduct.sku}
              </span>
              <span className="text-xs text-slate-400 font-medium">| {selectedProduct.manufacturer}</span>
              <span className="text-xs text-slate-500 font-mono">({selectedProduct.category})</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">{selectedProduct.name}</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">{selectedProduct.description}</p>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              {getStatusBadge(selectedProduct.reviewStatus)}
              <button
                onClick={() => setShowExportModal(true)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-3.5 py-1 rounded-full text-xs shadow-md flex items-center gap-1.5 transition-all"
              >
                <Download className="h-3.5 w-3.5" /> Export Catalog Payload
              </button>
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-1">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>Extracted via {selectedProduct.lastProcessedByModel || 'Forge Engine'}</span>
            </div>
          </div>
        </div>

        {/* Intelligence Scorecard Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Completeness</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold font-mono text-cyan-400">{selectedProduct.scores.completeness}%</span>
              <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${selectedProduct.scores.completeness}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Field Confidence</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold font-mono text-emerald-400">{selectedProduct.scores.confidence}%</span>
              <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedProduct.scores.confidence}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Validation Quality</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold font-mono text-blue-400">{selectedProduct.scores.validationQuality}%</span>
              <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${selectedProduct.scores.validationQuality}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Commerce Readiness</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold font-mono text-cyan-300">{readinessBreakdown.score}%</span>
              <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full" style={{ width: `${readinessBreakdown.score}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Meaningful Commerce Readiness Deduction Reasons */}
        {readinessBreakdown.deductions.length > 0 && (
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <span className="text-amber-400 font-semibold uppercase text-[10px]">Commerce Readiness Deductions Breakdown:</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {readinessBreakdown.deductions.map((d, dIdx) => (
                <span key={dIdx} className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded text-[11px]">
                  -{d.pointsDeducted}% {d.description}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="flex border-b border-slate-800 bg-slate-950/50 p-1.5 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'specs'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Specifications ({selectedProduct.specifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'evidence'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Source Documents ({selectedProduct.sourceDocuments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('validation')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'validation'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Validation & Alerts ({selectedProduct.validationIssues.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'knowledge'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Network className="h-4 w-4 text-cyan-400" />
            <span>Knowledge Topology</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'review'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Human Review</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'audit'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Audit Log</span>
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6">
          {/* TAB 1: STRUCTURED SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Extracted Technical Attributes & Derived Confidence Badges
                </h3>
                <span className="text-xs text-slate-500">Click any spec row to open the Interactive Evidence Inspector Drawer</span>
              </div>

              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/60">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Attribute Name</th>
                      <th className="p-3">Extracted Value</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Confidence & Evidence</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Evidence Inspector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {selectedProduct.specifications.map((spec) => (
                      <tr 
                        key={spec.id} 
                        className="hover:bg-slate-900/50 cursor-pointer transition-colors group"
                        onClick={() => setActiveSpecForDrawer(spec)}
                      >
                        <td className="p-3 font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {spec.key}
                        </td>
                        <td className="p-3 font-mono text-cyan-300">
                          {editingSpecId === spec.id ? (
                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="bg-slate-900 border border-cyan-500 rounded px-2 py-1 text-xs text-white focus:outline-none"
                              />
                              <button onClick={() => handleSaveSpec(spec.id)} className="p-1 text-emerald-400 hover:bg-emerald-500/10 rounded">
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <button onClick={() => setEditingSpecId(null)} className="p-1 text-slate-400 hover:bg-slate-800 rounded">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span>{String(spec.value)}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="bg-slate-900 text-slate-400 px-2 py-0.5 rounded text-[10px] uppercase font-mono border border-slate-800">
                            {spec.category}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                              spec.confidence.level === 'high' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              spec.confidence.level === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {Math.round((spec.confidence.score || 0.9) * 100)}% {spec.confidence.level}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                            spec.status === 'valid' ? 'text-emerald-400 bg-emerald-500/10' :
                            spec.status === 'conflict' ? 'text-rose-400 bg-rose-500/10' :
                            spec.status === 'missing' ? 'text-amber-400 bg-amber-500/10' :
                            'text-cyan-400 bg-cyan-500/10'
                          }`}>
                            {spec.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSpecForDrawer(spec);
                            }}
                            className="text-xs bg-slate-900 hover:bg-cyan-600 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 transition-all flex items-center gap-1.5 ml-auto"
                          >
                            <ExternalLink className="h-3.5 w-3.5 text-cyan-400 group-hover:text-white" /> Inspect Quote
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SOURCE EVIDENCE */}
          {activeTab === 'evidence' && (
            <div className="space-y-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Ingested Source Documents & Grounding Evidence
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {selectedProduct.sourceDocuments.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-xl border bg-slate-950 border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-200 text-sm">{doc.fileName}</h4>
                            <p className="text-xs text-slate-400">{doc.fileType.toUpperCase()} • {doc.extractedFieldCount} Extracted Fields</p>
                          </div>
                        </div>
                      </div>

                      {doc.contentSnippet && (
                        <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                          "{doc.contentSnippet}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span>Attribute Evidence Trace</span>
                  </h4>

                  <div className="space-y-3">
                    {selectedProduct.specifications.slice(0, 4).map((s) => (
                      <div 
                        key={s.id} 
                        onClick={() => setActiveSpecForDrawer(s)}
                        className="p-3 bg-slate-900/60 hover:bg-slate-900 rounded-lg border border-slate-800 cursor-pointer text-xs space-y-1 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200">{s.key}</span>
                          <span className="text-cyan-400 font-mono">{String(s.value)}</span>
                        </div>
                        {s.confidence.evidenceQuote && (
                          <div className="text-[11px] text-slate-400 font-mono italic bg-slate-950 p-2 rounded border border-slate-800">
                            Quote: "{s.confidence.evidenceQuote}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VALIDATION & ALERTS */}
          {activeTab === 'validation' && (
            <div className="space-y-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Automated Data Quality & Validation Engine
              </h3>

              {selectedProduct.validationIssues.length === 0 ? (
                <div className="p-8 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                  <h4 className="font-semibold text-emerald-300 text-sm">No Conflicts or Validation Errors Detected</h4>
                  <p className="text-xs text-slate-400">All specs satisfy industrial taxonomy schema constraints and evidence consistency rules.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedProduct.validationIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`p-4 rounded-xl border space-y-3 ${
                        issue.severity === 'error'
                          ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                          : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`h-5 w-5 ${issue.severity === 'error' ? 'text-rose-400' : 'text-amber-400'}`} />
                          <h4 className="font-semibold text-sm">{issue.title}</h4>
                        </div>
                        <span className="text-[10px] font-mono uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          Field: {issue.fieldKey}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{issue.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: KNOWLEDGE & RELATIONSHIPS */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Knowledge Graph Topology & Related Catalog Assets
                </h3>
                <button
                  onClick={() => setActiveView('knowledge-graph')}
                  className="text-xs bg-slate-900 hover:bg-cyan-600 text-cyan-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 transition-all flex items-center gap-1.5"
                >
                  <Network className="h-3.5 w-3.5" /> Full Interactive Knowledge Canvas
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Tag className="h-4 w-4 text-purple-400" />
                    <span>Direct Entity Links</span>
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-purple-400 font-mono uppercase block">manufactured_by</span>
                      <span className="font-semibold text-slate-200">{selectedProduct.manufacturer}</span>
                    </div>

                    <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-emerald-400 font-mono uppercase block">belongs_to_category</span>
                      <span className="font-semibold text-slate-200">{selectedProduct.category}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-400" />
                    <span>Compatible Accessories & Hardware</span>
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-cyan-400 font-mono uppercase block">works_with</span>
                      <span className="font-semibold text-slate-200">DIN Rail Mounting Kit 35mm (SKU: ACC-DIN-35)</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Box className="h-4 w-4 text-emerald-400" />
                    <span>Related Hardware Series</span>
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    {relatedCatalogProducts.slice(0, 2).map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => selectProduct(rel.id)}
                        className="p-2.5 bg-slate-900/80 hover:bg-slate-900 rounded-lg border border-slate-800 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-mono text-[10px] text-cyan-400">{rel.sku}</span>
                          <h5 className="font-semibold text-slate-200 truncate max-w-[150px]">{rel.name}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HUMAN REVIEW */}
          {activeTab === 'review' && (
            <div className="space-y-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Data Steward Human-in-the-Loop Review
              </h3>

              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Product Readiness Classification</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Override automated AI classification status if necessary.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateReviewStatus(selectedProduct.id, 'READY')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedProduct.reviewStatus === 'READY'
                          ? 'bg-emerald-500 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-emerald-500/50'
                      }`}
                    >
                      Approve (Ready)
                    </button>
                    <button
                      onClick={() => updateReviewStatus(selectedProduct.id, 'REVIEW_REQUIRED')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedProduct.reviewStatus === 'REVIEW_REQUIRED'
                          ? 'bg-amber-500 text-white border-amber-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-amber-500/50'
                      }`}
                    >
                      Require Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Full Agentic Execution & Processing Trajectory Log
              </h3>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                {selectedProduct.pipelineSteps.map((step, idx) => (
                  <div key={step.stepId} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-500">0{idx + 1}.</span>
                      <span className="font-semibold text-slate-300">{step.label}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-slate-400">
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {step.durationMs ? `${step.durationMs}ms` : 'Completed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide-over Evidence Drawer */}
      <EvidenceDrawer
        spec={activeSpecForDrawer}
        documents={selectedProduct.sourceDocuments}
        conflict={activeConflict}
        onClose={() => setActiveSpecForDrawer(null)}
        onSaveOverride={(specId, val) => {
          updateSpecificationValue(selectedProduct.id, specId, val);
          setActiveSpecForDrawer(null);
        }}
      />

      {/* Export Payload Modal */}
      {showExportModal && (
        <ExportModal
          products={[selectedProduct]}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};
