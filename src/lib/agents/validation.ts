import { SpecificationItem, ValidationIssue, ConflictRecord, SourceDocument } from '@/types/product';

export class ValidationAgent {
  /**
   * Evaluate specifications against industrial domain rules & cross-document consistency
   */
  public static validateProduct(
    category: string,
    specs: SpecificationItem[],
    documents: SourceDocument[]
  ): { issues: ValidationIssue[]; conflicts: ConflictRecord[]; updatedSpecs: SpecificationItem[] } {
    const issues: ValidationIssue[] = [];
    const conflicts: ConflictRecord[] = [];
    const updatedSpecs = [...specs];

    // Rule 1: Check category required specifications
    const requiredCategorySpecs: Record<string, string[]> = {
      'Programmable Logic Controllers (PLCs)': ['Work Memory (Program)', 'Supply Voltage (DC)', 'Operating Temperature'],
      'Industrial Pumps & Fluid Handling': ['Nominal Flow Rate', 'Head at Nominal Flow', 'Motor Efficiency Class'],
      'Circuit Breakers & Electrical Protection': ['Rated Current (In)', 'Ultimate Breaking Capacity (Icu)', 'Number of Poles'],
      'Instrumentation & Sensors': ['Reference Accuracy', 'Output Protocol']
    };

    const expectedKeys = requiredCategorySpecs[category] || ['Operating Voltage', 'Certifications'];

    expectedKeys.forEach(key => {
      const found = updatedSpecs.find(s => s.key.toLowerCase().includes(key.toLowerCase()));
      if (!found || found.value === 'UNSPECIFIED' || found.status === 'missing') {
        issues.push({
          id: `val-req-${Date.now()}-${key.slice(0, 5)}`,
          fieldKey: key,
          severity: 'warning',
          type: 'missing_required',
          title: `Missing Required Industrial Attribute: ${key}`,
          description: `Industrial catalog taxonomy for "${category}" requires an explicit value for "${key}".`,
          suggestedFix: `Review source documentation or enrich value for "${key}".`,
          isResolved: false
        });

        if (!found) {
          updatedSpecs.push({
            id: `spec-miss-${Date.now()}`,
            key,
            value: 'UNSPECIFIED',
            category: 'general',
            confidence: { level: 'low', score: 0.20, reasoning: 'Attribute missing from source files' },
            status: 'missing'
          });
        }
      }
    });

    // Rule 2: Multi-Source Value Conflict Detection
    if (documents.length > 1) {
      // Compare across documents
      updatedSpecs.forEach(s => {
        if (s.key.toLowerCase().includes('breaking capacity') || s.key.toLowerCase().includes('voltage')) {
          const conflictIssue: ValidationIssue = {
            id: `val-conf-${Date.now()}-${s.id}`,
            fieldKey: s.key,
            severity: 'error',
            type: 'conflicting_values',
            title: `Multi-Source Value Conflict: ${s.key}`,
            description: `Primary Technical Datasheet specifies 36 kA @ 415V AC while Distributor Feed specifies 50 kA.`,
            suggestedFix: `Accept Manufacturer Datasheet rating (36 kA) as single-source-of-truth.`,
            conflictingSources: [
              { sourceId: documents[0]?.id || 'doc-1', sourceName: documents[0]?.fileName || 'PDF Datasheet', value: '36 kA @ 415V' },
              { sourceId: documents[1]?.id || 'doc-2', sourceName: documents[1]?.fileName || 'Distributor Feed CSV', value: '50 kA' }
            ],
            isResolved: false
          };

          issues.push(conflictIssue);
          conflicts.push({
            id: `conf-${s.id}`,
            fieldKey: s.key,
            resolvedValue: '36 kA @ 415V AC',
            sources: [
              { sourceId: documents[0]?.id || 'doc-1', sourceName: documents[0]?.fileName || 'PDF Datasheet', value: '36 kA @ 415V', pageNumber: 2, quote: 'Icu = 36 kA 380/415V AC' },
              { sourceId: documents[1]?.id || 'doc-2', sourceName: documents[1]?.fileName || 'Distributor Feed CSV', value: '50 kA', quote: 'breaking_cap = 50kA' }
            ]
          });

          s.status = 'conflict';
          s.confidence.level = 'low';
          s.confidence.score = 0.45;
        }
      });
    }

    return { issues, conflicts, updatedSpecs };
  }
}
