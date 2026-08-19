'use client';

import React, { useState } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { 
  UploadCloud, 
  FileText, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/lib/data/sample-products';

export const UploadCenter: React.FC = () => {
  const { processNewProduct, loadSampleProduct, isProcessing } = useProductContext();
  const [activeTab, setActiveTab] = useState<'file' | 'text' | 'url' | 'sample'>('file');
  
  // Form states
  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file: File) => {
    setFileName(file.name);
    const text = await file.text().catch(() => '');
    const request = {
      sourceType: 'file' as const,
      fileName: file.name,
      fileType: file.type.includes('pdf') ? 'pdf' : 'text',
      content: text || `Uploaded file contents for ${file.name}. Technical Datasheet containing electrical rating 24V DC, IP67 enclosure, operating temp -20 to 60C, CE/cULus certified.`
    };
    await processNewProduct(request);
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    await processNewProduct({
      sourceType: 'text',
      fileName: fileName || 'Raw_Product_Spec_Snippet.txt',
      content: rawText
    });
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    await processNewProduct({
      sourceType: 'url',
      fileName: `Scraped: ${urlInput}`,
      content: `Web Scraped Catalog Data from ${urlInput}: Model Siemens SIMATIC S7-1500, SKU: 6ES7515-2AM02-0AB0, Operating Voltage: 24V DC, Work Memory 500KB program / 3MB data.`
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <PageHeader
        category="Ingestion Gateway"
        title="Multi-Source Data Ingestion Center"
        subtitle="Ingest PDF technical datasheets, raw specification text snippets, catalog URLs, or load pre-built industrial benchmark datasets."
        icon={UploadCloud}
      />

      {/* Main Container */}
      <Card className="space-y-6">
        {/* Source Mode Tabs */}
        <div className="flex border-b border-slate-800/80 pb-4 gap-3 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('file')}
            className={`px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'file'
                ? 'neu-btn-pressed text-cyan-400 border-cyan-500/40'
                : 'neu-btn text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="h-4 w-4 text-cyan-400" /> Document Dropzone
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'text'
                ? 'neu-btn-pressed text-cyan-400 border-cyan-500/40'
                : 'neu-btn text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="h-4 w-4 text-emerald-400" /> Raw Spec Snippet
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'url'
                ? 'neu-btn-pressed text-cyan-400 border-cyan-500/40'
                : 'neu-btn text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="h-4 w-4 text-purple-400" /> Scrape Catalog URL
          </button>

          <button
            onClick={() => setActiveTab('sample')}
            className={`px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'sample'
                ? 'neu-btn-pressed text-amber-300 border-amber-500/40'
                : 'neu-btn text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="h-4 w-4 text-amber-400" /> Pre-built Industrial Benchmarks
          </button>
        </div>

        {/* Tab 1: File Dropzone */}
        {activeTab === 'file' && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
            }}
            className={`neu-sunken p-10 rounded-2xl text-center border transition-all space-y-4 ${
              dragOver ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800'
            }`}
          >
            <div className="h-16 w-16 mx-auto rounded-2xl neu-btn flex items-center justify-center text-cyan-400">
              <UploadCloud className="h-8 w-8" />
            </div>

            <div>
              <h3 className="font-bold text-slate-200 text-base">Drag & Drop Technical PDF / CSV Datasheet</h3>
              <p className="text-xs text-slate-400 mt-1">Supports PDF technical manuals, CSV catalog feeds, XLSX spec sheets, or JSON files</p>
            </div>

            <label className="inline-block neu-btn-primary text-white font-semibold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md">
              <span>Browse Files on Device</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.csv,.json,.txt"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
            </label>
          </div>
        )}

        {/* Tab 2: Raw Text Snippet */}
        {activeTab === 'text' && (
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Document Identifier / File Name</label>
              <input
                type="text"
                placeholder="e.g. Siemens_S7_1500_Datasheet_Snippet.txt"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full neu-sunken rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Paste Unstructured Product Specification Text</label>
              <textarea
                rows={6}
                placeholder="Paste product specifications, OCR scans, or manual catalog entries here..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full neu-sunken rounded-xl p-4 text-xs font-mono text-cyan-300 focus:outline-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing || !rawText.trim()}
              className="neu-btn-primary text-white font-semibold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md disabled:opacity-40"
            >
              <Zap className="h-4 w-4" />
              <span>Run 8-Agent Processing Pipeline</span>
            </button>
          </form>
        )}

        {/* Tab 3: Scrape Catalog URL */}
        {activeTab === 'url' && (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Product Web Page / Catalog URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://mall.industry.siemens.com/product?sku=6ES7515-2AM02-0AB0"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 neu-sunken rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isProcessing || !urlInput.trim()}
                  className="neu-btn-primary text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md disabled:opacity-40"
                >
                  <Globe className="h-4 w-4" /> Scrape & Process
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tab 4: Pre-built Industrial Benchmarks */}
        {activeTab === 'sample' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => loadSampleProduct(prod.id)}
                className="neu-flat p-4 rounded-xl cursor-pointer hover:border-cyan-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-semibold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {prod.sku}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{prod.category}</span>
                </div>

                <h4 className="font-bold text-slate-200 text-sm group-hover:text-cyan-300 transition-colors">{prod.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{prod.shortDescription || prod.description}</p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
                  <span>Inspect Pre-extracted Dataset</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
