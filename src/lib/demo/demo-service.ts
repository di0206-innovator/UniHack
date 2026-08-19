import { DemoStepInfo, DemoStepId } from '@/types/demo';

export class JudgeDemoService {
  public static DEMO_STEPS: DemoStepInfo[] = [
    {
      stepId: 1,
      title: 'Step 1: Ingest Unstructured Industrial Sources',
      category: 'Messy Data Ingestion',
      judgeValueProp: 'Ingests messy PDFs, distributor CSV feeds, URLs, and OCR scans simultaneously.',
      targetView: 'upload'
    },
    {
      stepId: 2,
      title: 'Step 2: Ingestion Agent Parsing & Chunking',
      category: 'Normalized Source Pipeline',
      judgeValueProp: 'Normalizes unstructured source content into line & page-bounded chunk blocks with exact provenance.',
      targetView: 'pipeline'
    },
    {
      stepId: 3,
      title: 'Step 3: Structured Schema Extraction',
      category: 'AI Extraction Engine',
      judgeValueProp: 'Transforms raw spec text into typed JSON attributes bound to verbatim source quotes.',
      targetView: 'workspace',
      targetTab: 'specs',
      productId: 'prod-003'
    },
    {
      stepId: 4,
      title: 'Step 4: Automated Conflict Detection',
      category: 'Multi-Source Integrity',
      judgeValueProp: 'Detects multi-source discrepancies (e.g. 36kA PDF datasheet rating vs. 50kA distributor feed).',
      targetView: 'review-queue',
      productId: 'prod-003'
    },
    {
      stepId: 5,
      title: 'Step 5: Verbatim Evidence Comparison',
      category: 'Explainability & Grounding',
      judgeValueProp: 'Compares verbatim quotes side-by-side in the Evidence Drawer with exact line and page numbers.',
      targetView: 'workspace',
      targetTab: 'evidence',
      productId: 'prod-003'
    },
    {
      stepId: 6,
      title: 'Step 6: AI Rule Validation Engine',
      category: 'Domain Taxonomy Validation',
      judgeValueProp: 'Evaluates industrial domain rules, physical range constraints, and missing mandatory spec fields.',
      targetView: 'workspace',
      targetTab: 'validation',
      productId: 'prod-003'
    },
    {
      stepId: 7,
      title: 'Step 7: Automated Spec Enrichment & Units',
      category: 'Knowledge Enrichment',
      judgeValueProp: 'Infers missing attributes, standardizes SI units, and maps UNSPSC taxonomy codes.',
      targetView: 'workspace',
      targetTab: 'specs',
      productId: 'prod-003'
    },
    {
      stepId: 8,
      title: 'Step 8: Knowledge Topology Graph',
      category: 'Domain Graph Layer',
      judgeValueProp: 'Visualizes cross-catalog entity relationships: manufacturer, compatible accessories, and alternatives.',
      targetView: 'knowledge-graph',
      productId: 'prod-003'
    },
    {
      stepId: 9,
      title: 'Step 9: Meaningful Commerce Readiness Score',
      category: 'Trust & Confidence',
      judgeValueProp: 'Derives a 0-100% readiness score backed by explicit deduction breakdown reasons (missing specs, conflicts).',
      targetView: 'workspace',
      targetTab: 'specs',
      productId: 'prod-003'
    },
    {
      stepId: 10,
      title: 'Step 10: Human Steward Approval & Audit Log',
      category: 'Human-in-the-Loop Governance',
      judgeValueProp: 'Data steward resolves conflict with one click, generating an immutable audit trail event.',
      targetView: 'review-queue',
      productId: 'prod-003'
    },
    {
      stepId: 11,
      title: 'Step 11: Export Commerce Catalog Payload',
      category: 'Commerce Readiness',
      judgeValueProp: 'Exports validated, ground-truth catalog feeds in standard JSON or CSV for PIM, ERP & E-Commerce APIs.',
      targetView: 'catalog',
      productId: 'prod-003'
    }
  ];

  public static getStep(stepId: DemoStepId): DemoStepInfo {
    return this.DEMO_STEPS.find(s => s.stepId === stepId) || this.DEMO_STEPS[0];
  }
}
