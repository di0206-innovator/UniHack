export type ExportFormat = 'json' | 'csv' | 'pim' | 'erp';

export interface ReadinessDeduction {
  type: 'missing_mandatory' | 'active_conflict' | 'low_confidence' | 'unapproved_steward';
  fieldKey?: string;
  pointsDeducted: number;
  description: string;
}

export interface ReadinessBreakdown {
  score: number; // 0 to 100
  isCommerceReady: boolean;
  deductions: ReadinessDeduction[];
  missingMandatoryFields: string[];
  conflictingFields: string[];
  lowConfidenceFields: string[];
  summaryText: string;
}

export interface CommerceCatalogItem {
  sku: string;
  name: string;
  manufacturer: string;
  category: string;
  description: string;
  attributes: Record<string, string>;
  certifications: string;
  readinessScore: number;
  reviewStatus: string;
  lastUpdated: string;
}

export interface CommerceCatalogPayload {
  catalogName: string;
  generatedAt: string;
  itemCount: number;
  items: CommerceCatalogItem[];
}
