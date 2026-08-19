'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { CommerceExportService } from '@/lib/commerce/export-service';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FileSpreadsheet, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { ExportFormat } from '@/types/commerce';

interface ExportModalProps {
  products: Product[];
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ products, onClose }) => {
  const [format, setFormat] = useState<ExportFormat>('json');
  const [copied, setCopied] = useState(false);

  const exportContent = format === 'json' 
    ? CommerceExportService.generateJSON(products) 
    : CommerceExportService.generateCSV(products);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportContent], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge_ai_commerce_catalog.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Export Commerce Catalog Payload</h3>
              <p className="text-xs text-slate-400">Exporting {products.length} validated product record(s) for PIM, ERP & Commerce APIs</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormat('json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
                format === 'json'
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <FileCode className="h-4 w-4" /> Standard Catalog JSON
            </button>

            <button
              onClick={() => setFormat('csv')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
                format === 'csv'
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <FileSpreadsheet className="h-4 w-4" /> PIM / ERP Feed CSV
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy Payload'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-md transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
          <pre className="font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
            {exportContent}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Validated & Grounded Commerce Schema</span>
          </div>
          <button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg font-medium">
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
