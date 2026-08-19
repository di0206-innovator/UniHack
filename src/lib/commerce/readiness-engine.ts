import { Product } from '@/types/product';
import { ReadinessBreakdown, ReadinessDeduction } from '@/types/commerce';

export class CommerceReadinessEngine {
  /**
   * Derive non-superficial readiness score backed by explicit, human-readable deduction reasons
   */
  public static evaluateReadiness(product: Product): ReadinessBreakdown {
    const deductions: ReadinessDeduction[] = [];
    const missingMandatoryFields: string[] = [];
    const conflictingFields: string[] = [];
    const lowConfidenceFields: string[] = [];

    let currentScore = 100;

    // 1. Evaluate missing required category attributes
    const missingSpecs = product.specifications.filter(s => s.status === 'missing' || s.value === 'UNSPECIFIED');
    missingSpecs.forEach(ms => {
      missingMandatoryFields.push(ms.key);
      const points = 12;
      currentScore -= points;
      deductions.push({
        type: 'missing_mandatory',
        fieldKey: ms.key,
        pointsDeducted: points,
        description: `Missing mandatory taxonomy field: "${ms.key}"`
      });
    });

    // 2. Evaluate active conflicts
    const conflictSpecs = product.specifications.filter(s => s.status === 'conflict');
    conflictSpecs.forEach(cs => {
      conflictingFields.push(cs.key);
      const points = 25;
      currentScore -= points;
      deductions.push({
        type: 'active_conflict',
        fieldKey: cs.key,
        pointsDeducted: points,
        description: `Unresolved multi-source conflict on: "${cs.key}"`
      });
    });

    // 3. Evaluate low confidence fields
    const lowConfSpecs = product.specifications.filter(s => s.confidence?.level === 'low' && s.status !== 'conflict' && s.status !== 'missing');
    lowConfSpecs.forEach(lcs => {
      lowConfidenceFields.push(lcs.key);
      const points = 8;
      currentScore -= points;
      deductions.push({
        type: 'low_confidence',
        fieldKey: lcs.key,
        pointsDeducted: points,
        description: `Low OCR/evidence confidence rating on: "${lcs.key}"`
      });
    });

    // 4. Human Steward Approval Bonus/Penalty
    if (product.reviewStatus !== 'READY') {
      const points = 15;
      currentScore -= points;
      deductions.push({
        type: 'unapproved_steward',
        pointsDeducted: points,
        description: 'Pending data steward manual review & approval'
      });
    }

    const finalScore = Math.max(0, Math.min(100, currentScore));
    const isCommerceReady = finalScore >= 85 && product.reviewStatus === 'READY' && conflictingFields.length === 0;

    let summaryText = 'Commerce Ready for Catalog Export';
    if (deductions.length > 0) {
      const reasons: string[] = [];
      if (missingMandatoryFields.length > 0) reasons.push(`Missing: ${missingMandatoryFields.join(', ')}`);
      if (conflictingFields.length > 0) reasons.push(`Conflict: ${conflictingFields.join(', ')}`);
      if (lowConfidenceFields.length > 0) reasons.push(`Low Confidence: ${lowConfidenceFields.join(', ')}`);
      summaryText = reasons.join(' | ');
    }

    return {
      score: finalScore,
      isCommerceReady,
      deductions,
      missingMandatoryFields,
      conflictingFields,
      lowConfidenceFields,
      summaryText
    };
  }
}
