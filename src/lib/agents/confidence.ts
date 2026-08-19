import { SpecificationItem, ValidationIssue, ProductIntelligenceScores, ReviewStatus } from '@/types/product';

export class ConfidenceEngine {
  /**
   * Derive observable confidence signals for each specification field
   */
  public static calculateFieldConfidence(spec: SpecificationItem, hasConflict: boolean): SpecificationItem {
    const quotePresent = Boolean(spec.confidence.evidenceQuote && spec.confidence.evidenceQuote.length > 5);
    const sourceAgreement = hasConflict ? 0.3 : 0.95;
    const sourceQuality = spec.confidence.sourceDocName?.endsWith('.pdf') ? 0.95 : 0.85;

    // Derived score formula
    const score = Math.min(
      1.0,
      Math.max(
        0.1,
        0.4 * sourceAgreement + 0.3 * (quotePresent ? 1.0 : 0.4) + 0.2 * sourceQuality + 0.1 * (spec.confidence.score || 0.8)
      )
    );

    const level = score >= 0.85 ? 'high' : (score >= 0.65 ? 'medium' : 'low');

    return {
      ...spec,
      confidence: {
        ...spec.confidence,
        score: Math.round(score * 100) / 100,
        level,
        signals: {
          sourceAgreement,
          quotePresent,
          sourceQuality,
          validationStatus: hasConflict ? 'conflict' : (spec.status === 'missing' ? 'warning' : 'valid')
        }
      }
    };
  }

  /**
   * Derive global product intelligence scores & automated review readiness
   */
  public static deriveScores(
    specs: SpecificationItem[],
    issues: ValidationIssue[]
  ): { scores: ProductIntelligenceScores; derivedStatus: ReviewStatus } {
    const validSpecs = specs.filter(s => s.status !== 'missing');
    const totalExpected = Math.max(specs.length, 6);

    // 1. Completeness Score (0-100)
    const completeness = Math.round((validSpecs.length / totalExpected) * 100);

    // 2. Confidence Score (0-100)
    const totalConfidenceSum = validSpecs.reduce((acc, s) => acc + (s.confidence.score || 0.8), 0);
    const confidence = Math.round((totalConfidenceSum / (validSpecs.length || 1)) * 100);

    // 3. Validation Quality Score (0-100)
    const errorsCount = issues.filter(i => i.severity === 'error').length;
    const warningsCount = issues.filter(i => i.severity === 'warning').length;
    const validationQuality = Math.max(0, 100 - (errorsCount * 35 + warningsCount * 12));

    // 4. Commerce Readiness Score (0-100)
    const commerceReadiness = Math.round(
      0.35 * completeness + 0.35 * confidence + 0.30 * validationQuality
    );

    // Automated Review Status Determination
    let derivedStatus: ReviewStatus = 'READY';
    if (errorsCount > 0) {
      derivedStatus = 'CONFLICT';
    } else if (warningsCount > 0 || commerceReadiness < 80) {
      derivedStatus = 'REVIEW_REQUIRED';
    }

    return {
      scores: {
        completeness,
        confidence,
        validationQuality,
        commerceReadiness
      },
      derivedStatus
    };
  }
}
