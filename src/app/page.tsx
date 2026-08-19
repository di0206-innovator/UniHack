'use client';

import React from 'react';
import { useProductContext } from '@/context/ProductContext';
import { LandingPage } from '@/components/views/LandingPage';
import { AuthPage } from '@/components/views/AuthPage';
import { DashboardView } from '@/components/views/DashboardView';
import { CatalogExplorer } from '@/components/views/CatalogExplorer';
import { UploadCenter } from '@/components/views/UploadCenter';
import { PipelineProgress } from '@/components/views/PipelineProgress';
import { ProductWorkspace } from '@/components/views/ProductWorkspace';
import { AgentMonitor } from '@/components/views/AgentMonitor';
import { KnowledgeGraphView } from '@/components/views/KnowledgeGraphView';
import { HumanReviewQueue } from '@/components/views/HumanReviewQueue';
import { RAGAssistantView } from '@/components/views/RAGAssistantView';

export default function Home() {
  const { activeView } = useProductContext();

  switch (activeView) {
    case 'landing':
      return <LandingPage />;
    case 'auth':
      return <AuthPage />;
    case 'dashboard':
      return <DashboardView />;
    case 'rag-assistant':
      return <RAGAssistantView />;
    case 'upload':
      return <UploadCenter />;
    case 'pipeline':
      return <PipelineProgress />;
    case 'workspace':
      return <ProductWorkspace />;
    case 'agent-monitor':
      return <AgentMonitor />;
    case 'knowledge-graph':
      return <KnowledgeGraphView />;
    case 'review-queue':
      return <HumanReviewQueue />;
    case 'catalog':
    default:
      return <CatalogExplorer />;
  }
}
