'use client';

import React, { useState } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { JudgeDemoService } from '@/lib/demo/demo-service';
import { DemoStepId } from '@/types/demo';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Award
} from 'lucide-react';
import { UploadCenter } from '@/components/views/UploadCenter';
import { PipelineProgress } from '@/components/views/PipelineProgress';
import { ProductWorkspace } from '@/components/views/ProductWorkspace';
import { HumanReviewQueue } from '@/components/views/HumanReviewQueue';
import { KnowledgeGraphView } from '@/components/views/KnowledgeGraphView';
import { CatalogExplorer } from '@/components/views/CatalogExplorer';

export const JudgeDemoView: React.FC = () => {
  const { selectProduct } = useProductContext();
  const [currentStepId, setCurrentStepId] = useState<DemoStepId>(1);

  const stepInfo = JudgeDemoService.getStep(currentStepId);

  const handleNextStep = () => {
    if (currentStepId < 11) {
      const nextId = (currentStepId + 1) as DemoStepId;
      setCurrentStepId(nextId);
      const nextStep = JudgeDemoService.getStep(nextId);
      if (nextStep.productId) {
        selectProduct(nextStep.productId);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepId > 1) {
      const prevId = (currentStepId - 1) as DemoStepId;
      setCurrentStepId(prevId);
      const prevStep = JudgeDemoService.getStep(prevId);
      if (prevStep.productId) {
        selectProduct(prevStep.productId);
      }
    }
  };

  const jumpToStep = (id: DemoStepId) => {
    setCurrentStepId(id);
    const target = JudgeDemoService.getStep(id);
    if (target.productId) {
      selectProduct(target.productId);
    }
  };

  // Render child view based on current step
  const renderStepView = () => {
    switch (stepInfo.targetView) {
      case 'upload':
        return <UploadCenter />;
      case 'pipeline':
        return <PipelineProgress />;
      case 'review-queue':
        return <HumanReviewQueue />;
      case 'knowledge-graph':
        return <KnowledgeGraphView />;
      case 'catalog':
        return <CatalogExplorer />;
      case 'workspace':
      default:
        return <ProductWorkspace initialTab={stepInfo.targetTab} />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Judge Demo Guided Banner */}
      <div className="neu-flat p-6 rounded-2xl space-y-4 border border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl neu-btn flex items-center justify-center text-amber-400">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-500/30 neu-pill">
                  UniHack 2026 Judge Tour • Step {currentStepId} of 11
                </span>
                <span className="text-xs text-slate-400 font-medium">({stepInfo.category})</span>
              </div>
              <h2 className="text-xl font-bold text-slate-100 mt-1">{stepInfo.title}</h2>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              disabled={currentStepId === 1}
              className={`neu-btn px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentStepId === 1
                  ? 'opacity-30 cursor-not-allowed text-slate-600'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepId === 11}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentStepId === 11
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'neu-btn-primary text-white shadow-md'
              }`}
            >
              <span>{currentStepId === 11 ? 'Demo Complete' : 'Next Step'}</span>
              {currentStepId < 11 && <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Business Value Callout Box for Judges */}
        <div className="neu-sunken p-3.5 rounded-xl text-xs font-sans flex items-start gap-2.5 text-slate-300">
          <Sparkles className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Judge Value Proposition: </strong>
            <span>{stepInfo.judgeValueProp}</span>
          </div>
        </div>

        {/* 11-Step Progress Dots */}
        <div className="flex items-center justify-between gap-1.5 pt-1 font-mono text-[10px]">
          {JudgeDemoService.DEMO_STEPS.map((step) => {
            const isActive = step.stepId === currentStepId;
            const isPassed = step.stepId < currentStepId;

            return (
              <button
                key={step.stepId}
                onClick={() => jumpToStep(step.stepId)}
                className={`flex-1 py-2 rounded-xl text-center transition-all border ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-lg neu-pill'
                    : isPassed
                    ? 'neu-btn text-cyan-400 border-slate-800'
                    : 'neu-sunken text-slate-600 border-slate-900 hover:text-slate-400'
                }`}
              >
                {step.stepId}
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded View Step Container */}
      <div className="min-h-[600px]">
        {renderStepView()}
      </div>
    </div>
  );
};
