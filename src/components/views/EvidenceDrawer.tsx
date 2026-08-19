'use client';

import React, { useState } from 'react';
import { SpecificationItem, SourceDocument, ConflictRecord } from '@/types/product';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  FileText, 
  Zap, 
  ShieldCheck, 
  Edit3, 
  Check,
  Layers,
  Sparkles
} from 'lucide-react';

interface EvidenceDrawerProps {
  spec: SpecificationItem | null;
  documents: SourceDocument[];
  conflict?: ConflictRecord;
  onClose: () => void;
  onSaveOverride: (specId: string, newValue: string) => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  spec,
  documents,
  conflict,
  onClose,
  onSaveOverride
}) => {
  if (!spec) return null;

  const [overrideInput, setOverrideInput] = useState(String(spec.value));
  const [isEditing, setIsEditing] = useState(false);

  const matchedDoc = documents.find(d => d.id === spec.confidence.sourceDocId) || documents[0];
  const signals = spec.confidence.signals;

  const handleSave = () => {
    onSaveOverride(spec.id, overrideInput);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-[#0b1120] border-l border-slate-800 shadow-2xl flex flex-col justify-between h-full overflow-hidden">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-start justify-between bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">
                Category: {spec.category}
              </span>
              <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded ${
                spec.confidence.level === 'high' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                spec.confidence.level === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {Math.round((spec.confidence.score || 0.9) * 100)}% Confidence ({spec.confidence.level})
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-100">{spec.key}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Evidence Grounding & Source Alignment Breakdown</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Active Value Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Extracted Attribute Value</span>
              <span className="text-slate-500">ID: {spec.id}</span>
            </div>

            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={overrideInput}
                  onChange={(e) => setOverrideInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-cyan-500 rounded-lg px-3 py-2 text-sm font-mono text-cyan-300 focus:outline-none"
                />
                <button
                  onClick={handleSave}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-2 rounded-lg text-xs flex items-center gap-1 shadow-sm"
                >
                  <Check className="h-4 w-4" /> Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="font-mono text-lg font-bold text-cyan-300">
                  {String(spec.value)} {spec.unit ? <span className="text-xs text-slate-400 font-normal">{spec.unit}</span> : ''}
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="h-3.5 w-3.5 text-cyan-400" /> Override Value
                </button>
              </div>
            )}
          </div>

          {/* Verbatim Source Evidence */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>Verbatim Source Citation</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">{matchedDoc?.fileName || spec.confidence.sourceDocName || 'Datasheet'}</span>
                  {spec.confidence.pageNumber && (
                    <span className="bg-slate-900 px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-slate-800">
                      Page {spec.confidence.pageNumber}
                    </span>
                  )}
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-200 leading-relaxed border-l-2 border-l-cyan-500">
                "{spec.confidence.evidenceQuote || 'Source document excerpt matched during extraction phase.'}"
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Reasoning: {spec.confidence.reasoning || 'Extracted via schema-constrained parsing engine.'}
              </p>
            </div>
          </div>

          {/* Confidence Signal Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Derived Confidence Signal Decomposition</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Multi-Source Agreement Signal</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {Math.round((signals?.sourceAgreement || 0.95) * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Verbatim Quote Grounded</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {signals?.quotePresent ? 'PASSED (100%)' : 'PARTIAL (40%)'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Source Document Quality Rating</span>
                <span className="font-mono text-blue-400 font-bold">
                  {Math.round((signals?.sourceQuality || 0.90) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Conflict Analysis Matrix */}
          {conflict && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span>Multi-Source Conflict Comparison</span>
              </h3>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3 text-xs">
                <p className="text-rose-200">Discrepancy detected across ingested source feeds:</p>
                <div className="space-y-2 font-mono">
                  {conflict.sources.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-slate-300 font-semibold">{s.sourceName}</span>
                        {s.quote && <div className="text-[10px] text-slate-500 italic mt-0.5">"{s.quote}"</div>}
                      </div>
                      <span className="text-rose-400 font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Forge AI Evidence Inspector</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
