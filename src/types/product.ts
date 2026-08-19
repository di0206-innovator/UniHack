import { AgentResult } from './agent';

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unknown';

export type ReviewStatus = 'READY' | 'REVIEW_REQUIRED' | 'CONFLICT' | 'FAILED';

export interface SourceChunk {
  id: string;
  sourceDocId: string;
  sourceDocName: string;
  pageNumber?: number;
  lineStart?: number;
  lineEnd?: number;
  snippet: string;
  confidenceScore: number;
}

export interface ConfidenceSignals {
  sourceAgreement: number; // 0 to 1.0
  quotePresent: boolean;
  sourceQuality: number;   // 0 to 1.0
  ocrQuality?: number;     // 0 to 1.0
  validationStatus: 'valid' | 'conflict' | 'warning';
}

export interface FieldConfidence {
  level: ConfidenceLevel;
  score: number; // 0 to 1.0
  reasoning?: string;
  sourceDocId?: string;
  sourceDocName?: string;
  evidenceQuote?: string;
  pageNumber?: number;
  signals?: ConfidenceSignals;
}

export interface SpecificationItem {
  id: string;
  key: string;
  value: string | number | boolean | string[];
  unit?: string;
  category: 'general' | 'electrical' | 'mechanical' | 'environmental' | 'physical' | 'certifications' | 'compatibility';
  confidence: FieldConfidence;
  isCustom?: boolean;
  status: 'valid' | 'conflict' | 'missing' | 'suspicious' | 'overridden';
  originalValue?: string;
  overrideValue?: string;
  chunkId?: string;
}

export interface SourceDocument {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'csv' | 'xlsx' | 'json' | 'text' | 'url' | 'image';
  fileSize?: number;
  uploadedAt: string;
  url?: string;
  contentSnippet?: string;
  rawText?: string;
  pageCount?: number;
  extractedFieldCount: number;
  chunks?: SourceChunk[];
}

export interface ConflictRecord {
  id: string;
  fieldKey: string;
  resolvedValue?: string;
  sources: {
    sourceId: string;
    sourceName: string;
    value: string;
    pageNumber?: number;
    quote?: string;
  }[];
}

export interface ValidationIssue {
  id: string;
  fieldKey: string;
  severity: 'error' | 'warning' | 'info';
  type: 'conflicting_values' | 'missing_required' | 'malformed_value' | 'suspicious_range' | 'stale_data';
  title: string;
  description: string;
  suggestedFix?: string;
  conflictingSources?: {
    sourceId: string;
    sourceName: string;
    value: string;
  }[];
  isResolved: boolean;
}

export interface ProductIntelligenceScores {
  completeness: number; // 0 to 100
  confidence: number;   // 0 to 100
  validationQuality: number; // 0 to 100
  commerceReadiness: number; // 0 to 100
}

export interface ProcessingStepState {
  stepId: 'ingestion' | 'extraction' | 'validation' | 'enrichment' | 'review';
  label: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
  details?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  manufacturer: string;
  category: string;
  subCategory?: string;
  description: string;
  shortDescription?: string;
  
  specifications: SpecificationItem[];
  sourceDocuments: SourceDocument[];
  validationIssues: ValidationIssue[];
  conflicts?: ConflictRecord[];
  
  scores: ProductIntelligenceScores;
  reviewStatus: ReviewStatus;
  
  pipelineSteps: ProcessingStepState[];
  agentResults?: Record<string, AgentResult>;
  
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastProcessedByModel?: string;
  reviewerNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ExtractionRequest {
  sourceType: 'file' | 'text' | 'url' | 'sample';
  content?: string;
  fileName?: string;
  fileType?: string;
  sampleId?: string;
  selectedModel?: string;
}

export interface ExtractionResult {
  product: Product;
  executionTimeMs: number;
  modelUsed: string;
  success: boolean;
  error?: string;
}
