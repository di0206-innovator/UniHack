import { AgentContext, AgentResult } from '@/types/agent';
import { ProductIntelligenceScores, ReviewStatus } from '@/types/product';

export class CommerceAgent {
  public static async execute(context: AgentContext): Promise<AgentResult> {
    const startTime = Date.now();
    const logs: string[] = [];
    const specs = context.product.specifications || [];
    const issues = context.product.validationIssues || [];
    const conflicts = context.product.conflicts || [];

    logs.push(`Commerce Agent compiling e-commerce catalog readiness metrics`);

    const validSpecs = specs.filter(s => s.status !== 'missing');
    const completeness = Math.min(100, Math.round((validSpecs.length / Math.max(specs.length, 6)) * 100));
    const confidence = Math.round(validSpecs.reduce((acc, s) => acc + (s.confidence?.score || 0.8), 0) / (validSpecs.length || 1) * 100);
    
    const errorCount = issues.filter(i => i.severity === 'error').length;
    const warningCount = issues.filter(i => i.severity === 'warning').length;
    const validationQuality = Math.max(0, 100 - (errorCount * 35 + warningCount * 12));

    const commerceReadiness = Math.round(0.35 * completeness + 0.35 * confidence + 0.30 * validationQuality);

    let reviewStatus: ReviewStatus = 'READY';
    if (errorCount > 0 || conflicts.length > 0) {
      reviewStatus = 'CONFLICT';
    } else if (warningCount > 0 || commerceReadiness < 80) {
      reviewStatus = 'REVIEW_REQUIRED';
    }

    logs.push(`Final Commerce Readiness Score: ${commerceReadiness}% | Classification: ${reviewStatus}`);

    const exportPayload = {
      sku: context.product.sku,
      name: context.product.name,
      manufacturer: context.product.manufacturer,
      category: context.product.category,
      specifications: specs.map(s => ({ key: s.key, value: s.value, unit: s.unit })),
      commerceReadiness,
      reviewStatus
    };

    return {
      agentId: 'commerce',
      agentName: 'Commerce Agent',
      status: reviewStatus === 'READY' ? 'success' : 'warning',
      output: {
        scores: { completeness, confidence, validationQuality, commerceReadiness },
        reviewStatus,
        exportPayload
      },
      confidence: commerceReadiness / 100,
      evidence: [],
      issues: [],
      nextAction: 'Pipeline Complete. Product Ready in Workspace',
      executionTimeMs: Date.now() - startTime,
      logs
    };
  }
}
