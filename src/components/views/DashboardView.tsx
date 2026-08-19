'use client';

import React from 'react';
import { useProductContext } from '@/context/ProductContext';
import { DashboardMetricsService } from '@/lib/dashboard/metrics-service';
import { PageHeader } from '@/components/ui/PageHeader';
import { MetricTile } from '@/components/ui/MetricTile';
import { Card } from '@/components/ui/Card';
import { 
  BarChart3, 
  Box, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  UploadCloud, 
  Layers, 
  Bot, 
  Network, 
  Workflow, 
  ArrowRight,
  Sparkles,
  FileCode,
  Download
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { products, auditLogs, setActiveView } = useProductContext();
  const metrics = DashboardMetricsService.computeMetrics(products, auditLogs || []);

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <PageHeader
        category="EXECUTIVE INTELLIGENCE DASHBOARD"
        title="Catalog Extraction & Quality Overview"
        subtitle="Real-time multi-agent processing metrics, e-commerce readiness scores, human review queues, and catalog health statistics."
        icon={BarChart3}
        actions={
          <button
            onClick={() => setActiveView('rag-assistant')}
            className="neo-brutal-btn-primary px-4 py-2 text-xs flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-black fill-black" />
            <span>Launch RAG Assistant</span>
          </button>
        }
      />

      {/* Top 4 Primary KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricTile
          label="Total Catalog Products"
          value={metrics.totalProducts}
          subValue="Active Records"
          icon={Box}
          accentColor="amber"
          onClick={() => setActiveView('catalog')}
          actionText="View Catalog Grid"
        />

        <MetricTile
          label="Commerce Ready"
          value={metrics.commerceReadyCount}
          subValue={`${metrics.healthDistribution.readyPercentage}%`}
          icon={CheckCircle2}
          accentColor="emerald"
          onClick={() => setActiveView('catalog')}
          actionText="Approved Catalog Feed"
        />

        <MetricTile
          label="Review Required"
          value={metrics.reviewRequiredCount}
          subValue={`${metrics.healthDistribution.reviewPercentage}%`}
          icon={UserCheck}
          accentColor="amber"
          onClick={() => setActiveView('review-queue')}
          actionText="Open Review Queue"
        />

        <MetricTile
          label="Multi-Source Conflicts"
          value={metrics.conflictCount}
          subValue={`${metrics.healthDistribution.conflictPercentage}%`}
          icon={AlertTriangle}
          accentColor="crimson"
          onClick={() => setActiveView('review-queue')}
          actionText="Resolve Conflicts"
        />
      </div>

      {/* Secondary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="space-y-1 p-4 neo-brutal-card">
          <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Avg Field Confidence</span>
          <div className="text-xl font-bold font-mono text-amber-400">{metrics.avgConfidence}%</div>
        </Card>

        <Card className="space-y-1 p-4 neo-brutal-card">
          <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Avg Catalog Completeness</span>
          <div className="text-xl font-bold font-mono text-emerald-400">{metrics.avgCompleteness}%</div>
        </Card>

        <Card className="space-y-1 p-4 neo-brutal-card">
          <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Avg Processing Latency</span>
          <div className="text-xl font-bold font-mono text-amber-400">1.44s</div>
        </Card>

        <Card className="space-y-1 p-4 neo-brutal-card">
          <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Ingested Documents</span>
          <div className="text-xl font-bold font-mono text-emerald-400">{metrics.totalDocumentsProcessed} Files</div>
        </Card>
      </div>

      {/* Operational Modules Navigation Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card 
          hoverable 
          onClick={() => setActiveView('rag-assistant')}
          className="p-6 space-y-3 neo-brutal-card-amber"
        >
          <div className="flex items-center justify-between border-b border-amber-500/40 pb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-black bg-amber-500 px-2 py-0.5">
              FEATURED RAG MODULE
            </span>
            <Sparkles className="h-5 w-5 text-amber-400 fill-amber-400" />
          </div>
          <h3 className="font-bold font-mono text-base text-zinc-100 light:text-zinc-900 uppercase">
            RAG AI Assistant & PDF Export
          </h3>
          <p className="text-xs text-zinc-300 light:text-zinc-700 font-sans leading-relaxed font-medium">
            Natural language technical spec queries across company raw files with 1-click PDF dossier downloads.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 pt-2">
            <span>Launch RAG Assistant</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Card>

        <Card 
          hoverable 
          onClick={() => setActiveView('upload')}
          className="p-6 space-y-3 neo-brutal-card"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 light:border-black pb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-300 bg-emerald-950 px-2 py-0.5 border border-emerald-500">
              DOCUMENT INGESTION
            </span>
            <UploadCloud className="h-5 w-5 text-emerald-400" />
          </div>
          <h3 className="font-bold font-mono text-base text-zinc-100 light:text-zinc-900 uppercase">
            Datasheet & PDF Ingestion Center
          </h3>
          <p className="text-xs text-zinc-300 light:text-zinc-700 font-sans leading-relaxed font-medium">
            Drop manufacturer PDFs, spreadsheets, or catalog feeds into the 8-agent extraction pipeline.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 pt-2">
            <span>Open Ingestion Center</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Card>

        <Card 
          hoverable 
          onClick={() => setActiveView('review-queue')}
          className="p-6 space-y-3 neo-brutal-card"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 light:border-black pb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-rose-300 bg-rose-950 px-2 py-0.5 border border-rose-500">
              HUMAN IN THE LOOP
            </span>
            <UserCheck className="h-5 w-5 text-rose-400" />
          </div>
          <h3 className="font-bold font-mono text-base text-zinc-100 light:text-zinc-900 uppercase">
            Human Verification Queue
          </h3>
          <p className="text-xs text-zinc-300 light:text-zinc-700 font-sans leading-relaxed font-medium">
            Review low-confidence specs and multi-source supplier conflicts with side-by-side evidence quotes.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 pt-2">
            <span>Review Pending Records</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Card>
      </div>
    </div>
  );
};
