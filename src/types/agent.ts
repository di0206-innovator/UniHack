import { Product, SourceDocument, SourceChunk, ValidationIssue, SpecificationItem } from './product';

export type AgentId = 
  | 'ingestion'
  | 'extraction'
  | 'validation'
  | 'enrichment'
  | 'knowledge'
  | 'consensus'
  | 'explainability'
  | 'commerce';

export interface AgentContext {
  taskId: string;
  product: Partial<Product>;
  documents: SourceDocument[];
  chunks: SourceChunk[];
  previousResults: Record<string, any>;
  options?: Record<string, any>;
}

export interface ConsensusCandidate {
  value: string;
  sourceId: string;
  sourceName: string;
  confidenceScore: number;
  rank: number;
  isRecommended: boolean;
  reasoning: string;
}

export interface AgentResult {
  agentId: AgentId;
  agentName: string;
  status: 'success' | 'warning' | 'failed';
  output: any;
  confidence: number; // 0 to 1.0
  evidence: SourceChunk[];
  issues: ValidationIssue[];
  nextAction?: string;
  executionTimeMs: number;
  logs: string[];
}

export interface AgentStepState {
  agentId: AgentId;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  durationMs?: number;
  confidence?: number;
  currentTask?: string;
  lastRun?: string;
}
