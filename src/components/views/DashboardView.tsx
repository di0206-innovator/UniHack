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
  ShieldCheck, 
  ArrowRight, 
  Bot, 
  Zap, 
  UserCheck,
  Activity
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { products, auditLogs, setActiveView } = useProductContext();
  const metrics = DashboardMetricsService.computeMetrics(products, auditLogs);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <PageHeader
        category="Executive Operations Control Center"
        title="Product Intelligence Dashboard"
        subtitle="Real-time operational KPIs, catalog quality distribution, validation issue bottlenecks, and 8-agent execution signals."
        icon={BarChart3}
        actions={
          <button
            onClick={() => setActiveView('upload')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
          >
            <Zap className="h-4 w-4" /> Ingest Data
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
          accentColor="cyan"
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
          accentColor="rose"
          onClick={() => setActiveView('review-queue')}
          actionText="Resolve Conflicts"
        />
      </div>

      {/* Secondary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="space-y-1 p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Avg Field Confidence</span>
          <div className="text-xl font-bold font-mono text-cyan-300">{metrics.avgConfidence}%</div>
        </Card>

        <Card className="space-y-1 p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Avg Catalog Completeness</span>
          <div className="text-xl font-bold font-mono text-emerald-400">{metrics.avgCompleteness}%</div>
        </Card>

        <Card className="space-y-1 p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Avg Processing Latency</span>
          <div className="text-xl font-bold font-mono text-purple-400">1.44s</div>
        </Card>

        <Card className="space-y-1 p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Ingested Documents</span>
          <div className="text-xl font-bold font-mono text-blue-400">{metrics.totalDocumentsProcessed} Files</div>
        </Card>
      </div>

      {/* Operational Views Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VIEW 1: Catalogue Health Distribution */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span>Catalogue Health Distribution</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">{metrics.totalProducts} Total Items</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Commerce Ready ({metrics.commerceReadyCount})</span>
                <span className="text-emerald-400 font-bold">{metrics.healthDistribution.readyPercentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${metrics.healthDistribution.readyPercentage}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Review Required ({metrics.reviewRequiredCount})</span>
                <span className="text-amber-400 font-bold">{metrics.healthDistribution.reviewPercentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${metrics.healthDistribution.reviewPercentage}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Multi-Source Conflicts ({metrics.conflictCount})</span>
                <span className="text-rose-400 font-bold">{metrics.healthDistribution.conflictPercentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-rose-500 h-full rounded-full transition-all" style={{ width: `${metrics.healthDistribution.conflictPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* VIEW 2: Validation Overview */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Validation & Quality Overview</span>
            </h3>
            <button
              onClick={() => setActiveView('review-queue')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <span>Resolve Issues</span> <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-rose-400 uppercase font-semibold block">Active Conflicts</span>
              <span className="text-xl font-bold font-mono text-rose-400">{metrics.validationSummary.activeConflicts}</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-amber-400 uppercase font-semibold block">Missing Specs</span>
              <span className="text-xl font-bold font-mono text-amber-400">{metrics.validationSummary.missingFieldsCount}</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-emerald-400 uppercase font-semibold block">Human Resolved</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{metrics.validationSummary.resolvedCount}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* VIEW 3: 8-Agent Operational Signals */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Bot className="h-4 w-4 text-purple-400" />
            <span>8-Agent Operational Telemetry Signals</span>
          </h3>
          <button
            onClick={() => setActiveView('agent-monitor')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            <span>Agent Telemetry Logs</span> <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.agentPerformance.map((ag) => (
            <div key={ag.agentId} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
              <div className="font-semibold text-slate-200 truncate">{ag.agentName}</div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Latency:</span>
                <span className="text-purple-400">{ag.avgLatencyMs}ms</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Pass Rate:</span>
                <span className="text-emerald-400">{ag.passRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
