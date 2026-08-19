'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product, ReviewStatus, ExtractionRequest, ProcessingStepState } from '@/types/product';
import { AuditEvent, AuditAction } from '@/types/audit';
import { SAMPLE_PRODUCTS } from '@/lib/data/sample-products';
import { AuditTrailService } from '@/lib/audit/audit-service';

type ViewMode = 'landing' | 'auth' | 'dashboard' | 'catalog' | 'upload' | 'workspace' | 'pipeline' | 'agent-monitor' | 'knowledge-graph' | 'review-queue' | 'rag-assistant';

interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  activeView: ViewMode;
  isProcessing: boolean;
  activePipelineSteps: ProcessingStepState[];
  currentProcessingProduct: Product | null;
  auditLogs: AuditEvent[];
  
  setActiveView: (view: ViewMode) => void;
  selectProduct: (productId: string) => void;
  updateReviewStatus: (productId: string, status: ReviewStatus, notes?: string) => void;
  updateSpecificationValue: (productId: string, specId: string, newValue: string) => void;
  processNewProduct: (request: ExtractionRequest) => Promise<Product>;
  loadSampleProduct: (sampleId: string) => void;
  deleteProduct: (productId: string) => void;
  recordAuditEvent: (product: Product, action: AuditAction, fieldKey?: string, prevVal?: string, newVal?: string, reason?: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(SAMPLE_PRODUCTS[0]);
  const [activeView, setActiveView] = useState<ViewMode>('landing');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessingProduct, setCurrentProcessingProduct] = useState<Product | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(AuditTrailService.getAllLogs());

  const initialSteps: ProcessingStepState[] = [
    { stepId: 'ingestion', label: '1. Ingestion Agent (Parsing & Chunking)', status: 'pending' },
    { stepId: 'extraction', label: '2. Extraction Agent (Attribute Schema)', status: 'pending' },
    { stepId: 'validation', label: '3. Validation Agent (Rule Evaluation)', status: 'pending' },
    { stepId: 'enrichment', label: '4. Enrichment Agent (Inference & Units)', status: 'pending' },
    { stepId: 'review', label: '5. Commerce Agent (Readiness Audit)', status: 'pending' },
  ];

  const [activePipelineSteps, setActivePipelineSteps] = useState<ProcessingStepState[]>(initialSteps);

  const selectProduct = (productId: string) => {
    const found = products.find(p => p.id === productId);
    if (found) {
      setSelectedProduct(found);
      setActiveView('workspace');
    }
  };

  const recordAuditEvent = (
    product: Product,
    action: AuditAction,
    fieldKey?: string,
    prevVal?: string,
    newVal?: string,
    reason?: string
  ) => {
    const event = AuditTrailService.recordEvent(
      product,
      action,
      fieldKey,
      prevVal,
      newVal,
      reason || 'Data Steward Manual Governance Action'
    );
    setAuditLogs(prev => [event, ...prev]);
  };

  const updateReviewStatus = (productId: string, status: ReviewStatus, notes?: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updated = {
          ...p,
          reviewStatus: status,
          reviewerNotes: notes || p.reviewerNotes,
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'Lead Data Steward'
        };
        if (selectedProduct?.id === productId) {
          setSelectedProduct(updated);
        }
        return updated;
      }
      return p;
    }));
  };

  const updateSpecificationValue = (productId: string, specId: string, newValue: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        let prevVal = '';
        let targetKey = '';

        const updatedSpecs = p.specifications.map(s => {
          if (s.id === specId) {
            prevVal = String(s.value);
            targetKey = s.key;
            return {
              ...s,
              originalValue: s.originalValue || (s.value as string),
              overrideValue: newValue,
              value: newValue,
              status: 'overridden' as const
            };
          }
          return s;
        });

        const updated = {
          ...p,
          specifications: updatedSpecs,
          updatedAt: new Date().toISOString()
        };

        if (selectedProduct?.id === productId) {
          setSelectedProduct(updated);
        }

        // Record Audit Event
        recordAuditEvent(updated, 'edit_attribute', targetKey, prevVal, newValue, 'Steward inline specification override');

        return updated;
      }
      return p;
    }));
  };

  const processNewProduct = async (request: ExtractionRequest): Promise<Product> => {
    setIsProcessing(true);
    setActiveView('pipeline');

    setActivePipelineSteps(prev => prev.map(s => ({ ...s, status: 'pending', durationMs: undefined })));

    // Step 1: Ingestion
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'ingestion' ? { ...s, status: 'running', startedAt: new Date().toISOString() } : s));
    await new Promise(r => setTimeout(r, 400));
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'ingestion' ? { ...s, status: 'completed', durationMs: 140 } : s));

    // Step 2: Extraction
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'extraction' ? { ...s, status: 'running' } : s));
    
    let resultProduct: Product;
    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
      const data = await res.json();
      if (data.success && data.product) {
        resultProduct = data.product;
      } else {
        throw new Error('API extraction returned invalid result');
      }
    } catch (e) {
      console.warn('API fetch failed, fallback orchestrator pipeline:', e);
      const { WorkflowOrchestrator } = await import('@/lib/agents/orchestrator');
      const res = await WorkflowOrchestrator.runPipeline(request);
      resultProduct = res.product;
    }

    setCurrentProcessingProduct(resultProduct);
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'extraction' ? { ...s, status: 'completed', durationMs: 510 } : s));

    // Step 3: Validation
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'validation' ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 300));
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'validation' ? { ...s, status: 'completed', durationMs: 220 } : s));

    // Step 4: Enrichment
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'enrichment' ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 300));
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'enrichment' ? { ...s, status: 'completed', durationMs: 180 } : s));

    // Step 5: Commerce Audit
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'review' ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 200));
    setActivePipelineSteps(prev => prev.map(s => s.stepId === 'review' ? { ...s, status: 'completed', durationMs: 90 } : s));

    setProducts(prev => [resultProduct, ...prev]);
    setSelectedProduct(resultProduct);
    setIsProcessing(false);

    return resultProduct;
  };

  const loadSampleProduct = (sampleId: string) => {
    const sample = SAMPLE_PRODUCTS.find(p => p.id === sampleId);
    if (sample) {
      setSelectedProduct(sample);
      setActiveView('workspace');
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    if (selectedProduct?.id === productId) {
      const remaining = products.filter(p => p.id !== productId);
      setSelectedProduct(remaining.length > 0 ? remaining[0] : null);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      selectedProduct,
      activeView,
      isProcessing,
      activePipelineSteps,
      currentProcessingProduct,
      auditLogs,
      setActiveView,
      selectProduct,
      updateReviewStatus,
      updateSpecificationValue,
      processNewProduct,
      loadSampleProduct,
      deleteProduct,
      recordAuditEvent
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
