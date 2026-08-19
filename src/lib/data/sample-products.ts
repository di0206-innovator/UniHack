import { Product } from '@/types/product';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    sku: '6ES7515-2AM02-0AB0',
    name: 'SIMATIC S7-1500 CPU 1515-2 PN Central Processing Unit',
    manufacturer: 'Siemens Industrial Automation',
    category: 'Programmable Logic Controllers (PLCs)',
    subCategory: 'Central Processing Units',
    description: 'SIMATIC S7-1500 CPU 1515-2 PN central processing unit with work memory 500 KB for program and 3 MB for data, 1st interface: PROFINET IRT with 2-port switch, 2nd interface: PROFINET RT, 10 ns bit performance, SIMATIC Memory Card required.',
    shortDescription: 'S7-1500 CPU with 500KB program / 3MB data work memory and dual PROFINET interfaces.',
    specifications: [
      {
        id: 'spec-1',
        key: 'Work Memory (Program)',
        value: '500 KB',
        unit: 'KB',
        category: 'general',
        confidence: { level: 'high', score: 0.98, reasoning: 'Explicitly stated in technical datasheet page 1', sourceDocId: 'doc-s7-1500', pageNumber: 1, evidenceQuote: 'work memory 500 KB for program and 3 MB for data' },
        status: 'valid'
      },
      {
        id: 'spec-2',
        key: 'Work Memory (Data)',
        value: '3 MB',
        unit: 'MB',
        category: 'general',
        confidence: { level: 'high', score: 0.97, reasoning: 'Verified against Siemens Product Catalog 2025', sourceDocId: 'doc-s7-1500', pageNumber: 1, evidenceQuote: '3 MB for data' },
        status: 'valid'
      },
      {
        id: 'spec-3',
        key: 'Processing Time for Bit Operations',
        value: '10 ns',
        unit: 'ns',
        category: 'electrical',
        confidence: { level: 'high', score: 0.95, reasoning: 'Matched manufacturer specs', sourceDocId: 'doc-s7-1500', pageNumber: 2, evidenceQuote: 'Processing time for bit operations: 10 ns' },
        status: 'valid'
      },
      {
        id: 'spec-4',
        key: 'Supply Voltage (DC)',
        value: '24 V',
        unit: 'V DC',
        category: 'electrical',
        confidence: { level: 'high', score: 0.99, reasoning: 'Standard Industrial 24V DC input', sourceDocId: 'doc-s7-1500', pageNumber: 3, evidenceQuote: 'Rated value (DC): 24 V' },
        status: 'valid'
      },
      {
        id: 'spec-5',
        key: 'Operating Temperature (Horizontal)',
        value: '-25 to +60 °C',
        unit: '°C',
        category: 'environmental',
        confidence: { level: 'high', score: 0.94, reasoning: 'Extracted from environmental rating section', sourceDocId: 'doc-s7-1500', pageNumber: 4, evidenceQuote: 'Horizontal installation: -25 °C to 60 °C' },
        status: 'valid'
      },
      {
        id: 'spec-6',
        key: 'Certifications',
        value: 'CE, cULus, RCM, KC, FM Class I Div 2, ATEX Zone 2',
        category: 'certifications',
        confidence: { level: 'high', score: 0.96, reasoning: 'Listed on regulatory compliance appendix', sourceDocId: 'doc-s7-1500', pageNumber: 6, evidenceQuote: 'Approvals: CE, cULus, FM, ATEX' },
        status: 'valid'
      },
      {
        id: 'spec-7',
        key: 'Dimensions (W x H x D)',
        value: '70 x 147 x 129 mm',
        unit: 'mm',
        category: 'physical',
        confidence: { level: 'high', score: 0.95, reasoning: 'Mechanical drawing dimensions confirmed', sourceDocId: 'doc-s7-1500', pageNumber: 5, evidenceQuote: 'Width: 70mm, Height: 147mm, Depth: 129mm' },
        status: 'valid'
      }
    ],
    sourceDocuments: [
      {
        id: 'doc-s7-1500',
        fileName: 'Siemens_S71500_CPU1515_Datasheet.pdf',
        fileType: 'pdf',
        fileSize: 1420000,
        uploadedAt: '2026-08-17T10:15:00Z',
        extractedFieldCount: 14,
        pageCount: 6,
        contentSnippet: 'SIMATIC S7-1500 CPU 1515-2 PN central processing unit with work memory 500 KB for program and 3 MB for data...'
      }
    ],
    validationIssues: [],
    scores: {
      completeness: 96,
      confidence: 96,
      validationQuality: 98,
      commerceReadiness: 95
    },
    reviewStatus: 'READY',
    pipelineSteps: [
      { stepId: 'ingestion', label: 'Source Ingestion & Parsing', status: 'completed', durationMs: 240 },
      { stepId: 'extraction', label: 'Attribute & Spec Extraction', status: 'completed', durationMs: 680 },
      { stepId: 'validation', label: 'Cross-Source & Rule Validation', status: 'completed', durationMs: 190 },
      { stepId: 'enrichment', label: 'Taxonomy & Property Enrichment', status: 'completed', durationMs: 310 },
      { stepId: 'review', label: 'Readiness & Quality Audit', status: 'completed', durationMs: 90 }
    ],
    tags: ['PLC', 'Automation', 'PROFINET', 'Siemens', 'S7-1500'],
    createdAt: '2026-08-17T10:15:00Z',
    updatedAt: '2026-08-17T10:16:00Z',
    lastProcessedByModel: 'Gemini 1.5 Pro / Deterministic Extractor'
  },
  {
    id: 'prod-002',
    sku: 'CR15-3-A-F-A-E-HQQE',
    name: 'Grundfos CR 15-3 Vertical Multistage Centrifugal Pump',
    manufacturer: 'Grundfos Pumps',
    category: 'Industrial Pumps & Fluid Handling',
    subCategory: 'Centrifugal Pumps',
    description: 'Vertical, multistage centrifugal pump with suction and discharge ports on the same level (inline). Pump materials in contact with liquid are high-grade stainless steel AISI 304.',
    shortDescription: 'Vertical multistage inline pump, stainless steel 304, nominal flow rate 15 m³/h.',
    specifications: [
      {
        id: 'spec-21',
        key: 'Nominal Flow Rate',
        value: '15 m³/h',
        unit: 'm³/h',
        category: 'general',
        confidence: { level: 'high', score: 0.96, reasoning: 'Direct match from model designation CR 15', sourceDocId: 'doc-grundfos-cr', pageNumber: 1, evidenceQuote: 'Nominal flow rate: 15 m3/h' },
        status: 'valid'
      },
      {
        id: 'spec-22',
        key: 'Head at Nominal Flow',
        value: '35.4 m',
        unit: 'm',
        category: 'mechanical',
        confidence: { level: 'high', score: 0.92, reasoning: 'Pump curve performance table at 50Hz', sourceDocId: 'doc-grundfos-cr', pageNumber: 2, evidenceQuote: 'Head: 35.4 m' },
        status: 'valid'
      },
      {
        id: 'spec-23',
        key: 'Motor Efficiency Class',
        value: 'UNSPECIFIED',
        category: 'electrical',
        confidence: { level: 'low', score: 0.30, reasoning: 'Missing in scanned catalog snippet; IE3 inferred from motor power 3.0 kW', sourceDocId: 'doc-grundfos-cr' },
        status: 'missing'
      },
      {
        id: 'spec-24',
        key: 'Impeller Material',
        value: 'Stainless Steel AISI 304 (EN 1.4301)',
        category: 'physical',
        confidence: { level: 'high', score: 0.94, reasoning: 'Material code A in Grundfos type key', sourceDocId: 'doc-grundfos-cr', pageNumber: 1, evidenceQuote: 'Impeller: Stainless steel EN 1.4301' },
        status: 'valid'
      },
      {
        id: 'spec-25',
        key: 'Maximum Operating Pressure',
        value: '16 bar',
        unit: 'bar',
        category: 'mechanical',
        confidence: { level: 'medium', score: 0.78, reasoning: 'Stated as 16 bar at 120°C, but 25 bar for lower temperatures', sourceDocId: 'doc-grundfos-cr', pageNumber: 3, evidenceQuote: 'Max pressure: 16 bar / 120 °C' },
        status: 'valid'
      }
    ],
    sourceDocuments: [
      {
        id: 'doc-grundfos-cr',
        fileName: 'Grundfos_CR_Series_Industrial_DataSheet.pdf',
        fileType: 'pdf',
        fileSize: 2850000,
        uploadedAt: '2026-08-17T11:00:00Z',
        extractedFieldCount: 8,
        pageCount: 12,
        contentSnippet: 'Grundfos CR 15-3 Vertical Multistage Centrifugal Pump. Nominal flow 15 m3/h...'
      }
    ],
    validationIssues: [
      {
        id: 'val-21',
        fieldKey: 'Motor Efficiency Class',
        severity: 'warning',
        type: 'missing_required',
        title: 'Missing Required E-Commerce Spec',
        description: 'Industrial pump catalog requires explicit Motor Efficiency Class (IE2/IE3/IE4) for energy compliance tagging.',
        suggestedFix: 'Set value to "IE3 Premium Efficiency" based on 3.0 kW motor rating.',
        isResolved: false
      }
    ],
    scores: {
      completeness: 78,
      confidence: 82,
      validationQuality: 80,
      commerceReadiness: 72
    },
    reviewStatus: 'REVIEW_REQUIRED',
    pipelineSteps: [
      { stepId: 'ingestion', label: 'Source Ingestion & Parsing', status: 'completed', durationMs: 310 },
      { stepId: 'extraction', label: 'Attribute & Spec Extraction', status: 'completed', durationMs: 740 },
      { stepId: 'validation', label: 'Cross-Source & Rule Validation', status: 'completed', durationMs: 250 },
      { stepId: 'enrichment', label: 'Taxonomy & Property Enrichment', status: 'completed', durationMs: 420 },
      { stepId: 'review', label: 'Readiness & Quality Audit', status: 'completed', durationMs: 110 }
    ],
    tags: ['Pump', 'Fluid Dynamics', 'Centrifugal', 'Grundfos', 'Stainless Steel'],
    createdAt: '2026-08-17T11:00:00Z',
    updatedAt: '2026-08-17T11:05:00Z',
    lastProcessedByModel: 'MockAI Provider'
  },
  {
    id: 'prod-003',
    sku: 'LV429630',
    name: 'Schneider Electric Compact NSX100N Circuit Breaker 3P 100A',
    manufacturer: 'Schneider Electric',
    category: 'Circuit Breakers & Electrical Protection',
    subCategory: 'Molded Case Circuit Breakers (MCCB)',
    description: 'Compact NSX100N is a complete 3P 3d fixed circuit breaker designed to optimize space and breaking capacity. It is an optimal choice for all standard and specific applications.',
    shortDescription: 'MCCB 3P 100A MicroLogic 2.2 trip unit, breaking capacity 36kA @ 415V AC.',
    specifications: [
      {
        id: 'spec-31',
        key: 'Rated Current (In)',
        value: '100 A',
        unit: 'A',
        category: 'electrical',
        confidence: { level: 'high', score: 0.99, reasoning: 'Explicit SKU designation NSX100N', sourceDocId: 'doc-schneider-nsx', pageNumber: 1, evidenceQuote: 'Rated current: 100 A at 40 °C' },
        status: 'valid'
      },
      {
        id: 'spec-32',
        key: 'Ultimate Breaking Capacity (Icu)',
        value: '36 kA @ 415V AC (PDF) vs 50 kA (Supplier CSV)',
        unit: 'kA',
        category: 'electrical',
        confidence: { level: 'low', score: 0.45, reasoning: 'Conflicting values between Technical Spec PDF (36 kA) and Distributor Inventory CSV (50 kA)', sourceDocId: 'doc-schneider-nsx', pageNumber: 2, evidenceQuote: 'PDF: Icu = 36 kA 380/415V AC | CSV: breaking_cap = 50kA' },
        status: 'conflict'
      },
      {
        id: 'spec-33',
        key: 'Number of Poles',
        value: '3P',
        category: 'general',
        confidence: { level: 'high', score: 0.97, reasoning: 'Extracted 3P 3d specification', sourceDocId: 'doc-schneider-nsx', pageNumber: 1, evidenceQuote: 'Poles description: 3P' },
        status: 'valid'
      },
      {
        id: 'spec-34',
        key: 'Trip Unit Name',
        value: 'MicroLogic 2.2',
        category: 'electrical',
        confidence: { level: 'high', score: 0.93, reasoning: 'Electronic trip unit specification', sourceDocId: 'doc-schneider-nsx', pageNumber: 2, evidenceQuote: 'Trip unit name: MicroLogic 2.2' },
        status: 'valid'
      }
    ],
    sourceDocuments: [
      {
        id: 'doc-schneider-nsx',
        fileName: 'Schneider_NSX100N_Datasheet.pdf',
        fileType: 'pdf',
        fileSize: 940000,
        uploadedAt: '2026-08-17T09:30:00Z',
        extractedFieldCount: 10,
        pageCount: 4,
        contentSnippet: 'Compact NSX100N 3P 100A circuit breaker with MicroLogic 2.2 trip unit. Icu 36kA 415V...'
      },
      {
        id: 'doc-distributor-csv',
        fileName: 'Distributor_Feed_August_2026.csv',
        fileType: 'csv',
        fileSize: 450000,
        uploadedAt: '2026-08-17T09:35:00Z',
        extractedFieldCount: 4,
        contentSnippet: 'SKU: LV429630, Name: Compact NSX100N, Breaking_Cap: 50kA'
      }
    ],
    validationIssues: [
      {
        id: 'val-31',
        fieldKey: 'Ultimate Breaking Capacity (Icu)',
        severity: 'error',
        type: 'conflicting_values',
        title: 'Breaking Capacity Conflict Detected',
        description: 'PDF Datasheet specifies 36 kA @ 415V AC while Distributor CSV specifies 50 kA. Potential safety rating discrepancy.',
        suggestedFix: 'Accept PDF Datasheet value (36 kA) as official manufacturer rating.',
        conflictingSources: [
          { sourceId: 'doc-schneider-nsx', sourceName: 'Schneider_NSX100N_Datasheet.pdf', value: '36 kA @ 415V' },
          { sourceId: 'doc-distributor-csv', sourceName: 'Distributor_Feed_August_2026.csv', value: '50 kA' }
        ],
        isResolved: false
      }
    ],
    scores: {
      completeness: 90,
      confidence: 68,
      validationQuality: 55,
      commerceReadiness: 48
    },
    reviewStatus: 'CONFLICT',
    pipelineSteps: [
      { stepId: 'ingestion', label: 'Source Ingestion & Parsing', status: 'completed', durationMs: 180 },
      { stepId: 'extraction', label: 'Attribute & Spec Extraction', status: 'completed', durationMs: 510 },
      { stepId: 'validation', label: 'Cross-Source & Rule Validation', status: 'completed', durationMs: 380 },
      { stepId: 'enrichment', label: 'Taxonomy & Property Enrichment', status: 'completed', durationMs: 290 },
      { stepId: 'review', label: 'Readiness & Quality Audit', status: 'completed', durationMs: 120 }
    ],
    tags: ['Circuit Breaker', 'MCCB', 'Electrical Safety', 'Schneider', '3P'],
    createdAt: '2026-08-17T09:30:00Z',
    updatedAt: '2026-08-17T09:40:00Z',
    lastProcessedByModel: 'Consensus Engine + Mock Extractor'
  },
  {
    id: 'prod-004',
    sku: '3051S1CD2A21A11A',
    name: 'Emerson Rosemount 3051S Coplanar Pressure Transmitter',
    manufacturer: 'Emerson Automation Solutions',
    category: 'Instrumentation & Sensors',
    subCategory: 'Pressure Transmitters',
    description: 'The Rosemount 3051S Coplanar Pressure Transmitter is the industry standard for differential, gage, and absolute pressure measurement with patented Coplanar technology.',
    shortDescription: 'Coplanar pressure transmitter, 4-20 mA HART, scalable architecture, accuracy 0.025% span.',
    specifications: [
      {
        id: 'spec-41',
        key: 'Reference Accuracy',
        value: '±0.025% of span',
        unit: '% span',
        category: 'general',
        confidence: { level: 'high', score: 0.97, reasoning: 'Extracted from accuracy performance table', sourceDocId: 'doc-rosemount', pageNumber: 2, evidenceQuote: 'Digital performance reference accuracy: ±0.025% of span' },
        status: 'valid'
      },
      {
        id: 'spec-42',
        key: 'Process Connection Thread',
        value: '1/2-14 NPT Female (?)',
        unit: 'inch',
        category: 'physical',
        confidence: { level: 'low', score: 0.42, reasoning: 'Option code 11A unclear in scan; could be 1/4-18 NPT or 1/2-14 NPT', sourceDocId: 'doc-rosemount', pageNumber: 5, evidenceQuote: 'Process connection: Code 11A / Thread size degraded in OCR' },
        status: 'suspicious'
      },
      {
        id: 'spec-43',
        key: 'Output Protocol',
        value: '4-20 mA with Digital Signal based on HART Protocol',
        category: 'electrical',
        confidence: { level: 'high', score: 0.98, reasoning: 'Confirmed output code A', sourceDocId: 'doc-rosemount', pageNumber: 1, evidenceQuote: 'Transmitter output: 4-20 mA HART' },
        status: 'valid'
      }
    ],
    sourceDocuments: [
      {
        id: 'doc-rosemount',
        fileName: 'Emerson_Rosemount_3051S_Manual_Scan.pdf',
        fileType: 'pdf',
        fileSize: 3120000,
        uploadedAt: '2026-08-17T08:00:00Z',
        extractedFieldCount: 6,
        pageCount: 16,
        contentSnippet: 'Rosemount 3051S Coplanar Pressure Transmitter. Accuracy +-0.025% of span. Output 4-20 mA HART...'
      }
    ],
    validationIssues: [
      {
        id: 'val-41',
        fieldKey: 'Process Connection Thread',
        severity: 'warning',
        type: 'suspicious_range',
        title: 'OCR Low Confidence on Process Connection',
        description: 'OCR scan page 5 degraded. Option 11A process connection thread size requires human verification.',
        suggestedFix: 'Inspect physical datasheet page 5 or re-upload clear scan.',
        isResolved: false
      }
    ],
    scores: {
      completeness: 65,
      confidence: 62,
      validationQuality: 70,
      commerceReadiness: 58
    },
    reviewStatus: 'REVIEW_REQUIRED',
    pipelineSteps: [
      { stepId: 'ingestion', label: 'Source Ingestion & Parsing', status: 'completed', durationMs: 410 },
      { stepId: 'extraction', label: 'Attribute & Spec Extraction', status: 'completed', durationMs: 820 },
      { stepId: 'validation', label: 'Cross-Source & Rule Validation', status: 'completed', durationMs: 290 },
      { stepId: 'enrichment', label: 'Taxonomy & Property Enrichment', status: 'completed', durationMs: 350 },
      { stepId: 'review', label: 'Readiness & Quality Audit', status: 'completed', durationMs: 140 }
    ],
    tags: ['Transmitter', 'Pressure', 'HART', 'Emerson', 'Instrumentation'],
    createdAt: '2026-08-17T08:00:00Z',
    updatedAt: '2026-08-17T08:10:00Z',
    lastProcessedByModel: 'Gemini 1.5 Flash'
  }
];
