'use client';

import React, { useState } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { RAGAgent, RAGAnswerResponse } from '@/lib/agents/rag-agent';
import { PDFExportService } from '@/lib/commerce/pdf-service';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { 
  Bot, 
  Search, 
  FileText, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Zap, 
  HelpCircle,
  RefreshCw
} from 'lucide-react';

export const RAGAssistantView: React.FC = () => {
  const { products, setSelectedProduct, setActiveView } = useProductContext();
  const [queryInput, setQueryInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [ragResult, setRagResult] = useState<RAGAnswerResponse | null>(null);

  const sampleQueries = [
    "List all 24V DC Programmable Logic Controllers with IP67 enclosure rating",
    "What are the certified operating temperature ranges for Siemens S7-1500?",
    "Compare technical specs between PLC-SIEM-001 and PLC-AB-500",
    "Which products meet CE and RoHS compliance standards?"
  ];

  const handleExecuteRAG = async (queryText: string) => {
    if (!queryText.trim()) return;
    setQueryInput(queryText);
    setIsSearching(true);

    try {
      const response = await RAGAgent.queryCatalog(queryText, products);
      setRagResult(response);
    } catch (error) {
      console.error('RAG Query Error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleExportPDF = () => {
    if (!ragResult) return;
    PDFExportService.downloadRAGAnswerPDF({
      query: ragResult.query,
      synthesizedAnswer: ragResult.synthesizedAnswer,
      matchedProductsCount: ragResult.matchedProducts.length,
      evidenceQuotes: ragResult.evidenceQuotes,
      generatedAt: new Date().toLocaleString()
    });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <PageHeader
        category="ENTERPRISE RAG KNOWLEDGE SYSTEM"
        title="AI Specification Retrieval & RAG Query Assistant"
        subtitle="Ask natural language questions across raw technical datasheets, uploaded PDFs, and supplier feeds. Synthesizes verifiable technical answers with 1-Click PDF export."
        icon={Bot}
        actions={
          ragResult ? (
            <button
              onClick={handleExportPDF}
              className="neo-brutal-btn-primary px-4 py-2 text-xs flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Answer as PDF</span>
            </button>
          ) : undefined
        }
      />

      {/* Query Search Bar */}
      <Card className="p-6 space-y-4">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleExecuteRAG(queryInput);
          }}
          className="space-y-3"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-amber-500" />
              <input
                type="text"
                placeholder="Ask technical question (e.g. 'Show all 24V DC PLCs with 99.4% spec accuracy')..."
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="w-full neo-brutal-input pl-10 pr-4 py-2.5 text-xs font-semibold"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="neo-brutal-btn-primary px-6 py-2.5 text-xs flex items-center justify-center gap-2 min-w-[140px]"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-black" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-black fill-black" />
                  <span>Run RAG Query</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sample Prompt Chips */}
        <div className="space-y-2 pt-2 border-t border-zinc-800 light:border-zinc-200">
          <div className="text-[10px] font-mono font-bold uppercase text-amber-500 tracking-wider flex items-center gap-1.5">
            <HelpCircle className="h-3 w-3 text-amber-500" />
            <span>RECOMMENDED TECHNICAL PROMPTS:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleExecuteRAG(q)}
                className="text-xs font-medium bg-zinc-900 light:bg-zinc-100 hover:bg-zinc-800 light:hover:bg-zinc-200 text-zinc-300 light:text-zinc-800 border border-zinc-700 light:border-zinc-300 px-3 py-1.5 rounded-none shadow-[2px_2px_0px_0px_#000000] transition-all hover:border-amber-500 text-left"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* RAG Synthesis Answer Output */}
      {ragResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Synthesized Card */}
          <Card className="p-6 neo-brutal-card-amber space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/40 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-500 text-black font-black text-xs font-mono uppercase">
                  RAG RESPONSE
                </div>
                <span className="text-xs font-bold text-amber-400 light:text-amber-700 uppercase font-mono">
                  Synthesized via Gemini Multi-Modal Engine
                </span>
              </div>
              
              <button
                onClick={handleExportPDF}
                className="neo-brutal-btn-primary px-3 py-1.5 text-xs flex items-center gap-2"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF Report</span>
              </button>
            </div>

            {/* Answer Content */}
            <div className="text-sm font-sans text-zinc-100 light:text-zinc-900 leading-relaxed whitespace-pre-wrap font-medium">
              {ragResult.synthesizedAnswer}
            </div>

            {/* Suggested Followups */}
            {ragResult.suggestedFollowups.length > 0 && (
              <div className="pt-3 border-t border-amber-500/30 space-y-2">
                <div className="text-[10px] font-mono font-bold text-amber-500 uppercase">
                  SUGGESTED FOLLOWUP QUESTIONS:
                </div>
                <div className="flex flex-wrap gap-2">
                  {ragResult.suggestedFollowups.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => handleExecuteRAG(f)}
                      className="text-xs text-amber-300 light:text-amber-800 bg-amber-950/60 light:bg-amber-100 border border-amber-500/40 px-2.5 py-1 rounded-none hover:bg-amber-900/60 font-mono flex items-center gap-1.5"
                    >
                      <span>{f}</span>
                      <ArrowRight className="h-3 w-3 text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Matched Products Grid */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 light:text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>MATCHED PRODUCT TWINS ({ragResult.matchedProducts.length})</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {ragResult.matchedProducts.map((prod) => (
                <Card 
                  key={prod.id}
                  hoverable
                  onClick={() => {
                    setSelectedProduct(prod);
                    setActiveView('workspace');
                  }}
                  className="p-4 space-y-3 neo-brutal-card"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 light:border-zinc-200 pb-2">
                    <span className="font-mono text-xs font-bold text-amber-400 light:text-amber-700">{prod.sku}</span>
                    <span className="text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5">
                      {prod.scores.commerceReadiness}% READY
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-zinc-100 light:text-zinc-900 truncate">{prod.name}</h4>
                    <p className="text-xs text-zinc-400 light:text-zinc-600 font-mono truncate">{prod.manufacturer} • {prod.category}</p>
                  </div>

                  <div className="text-[11px] text-zinc-300 light:text-zinc-700 space-y-1 bg-zinc-900/80 light:bg-zinc-100 p-2 border border-zinc-800 light:border-zinc-200">
                    <div className="font-mono text-[9px] text-zinc-500 font-bold uppercase">VERIFIED SPECS:</div>
                    {prod.specifications.slice(0, 3).map((s, idx) => (
                      <div key={idx} className="flex justify-between font-mono">
                        <span className="text-zinc-400">{s.key}:</span>
                        <span className="font-bold text-amber-400">{s.value} {s.unit || ''}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Verifiable Evidence Quotes Drawer */}
          {ragResult.evidenceQuotes.length > 0 && (
            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 light:border-zinc-200 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold uppercase text-zinc-200 light:text-zinc-800">
                    VERIFIABLE EVIDENCE QUOTES ({ragResult.evidenceQuotes.length})
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 font-mono text-xs">
                {ragResult.evidenceQuotes.map((ev, i) => (
                  <div key={i} className="p-3 bg-zinc-900 light:bg-zinc-100 border border-zinc-800 light:border-zinc-300 space-y-1">
                    <div className="flex justify-between text-[10px] text-amber-400 font-bold">
                      <span>{ev.sku} • {ev.productName}</span>
                      <span className="text-emerald-400">{(ev.confidence * 100).toFixed(0)}% CONFIDENCE</span>
                    </div>
                    <p className="text-zinc-300 light:text-zinc-800 italic font-sans">"{ev.quote}"</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
