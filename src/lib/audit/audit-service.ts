import { AuditEvent, TimelineStep, AuditAction } from '@/types/audit';
import { Product } from '@/types/product';

export class AuditTrailService {
  private static auditLogs: AuditEvent[] = [
    {
      id: 'audit-001',
      productId: 'prod-003',
      productSku: 'LV429630',
      productName: 'Schneider Electric Compact NSX100N Circuit Breaker',
      stewardId: 'steward-01',
      stewardName: 'Lead Data Steward (Engineering)',
      action: 'select_alternative',
      fieldKey: 'Ultimate Breaking Capacity (Icu)',
      previousValue: '50 kA (Distributor CSV)',
      newValue: '36 kA @ 415V AC (PDF Datasheet)',
      reason: 'Accepted official manufacturer PDF Datasheet rating over distributor feed.',
      timestamp: '2026-08-17T11:20:00Z'
    }
  ];

  public static getLogsForProduct(productId: string): AuditEvent[] {
    return this.auditLogs.filter(a => a.productId === productId);
  }

  public static getAllLogs(): AuditEvent[] {
    return this.auditLogs;
  }

  public static recordEvent(
    product: Product,
    action: AuditAction,
    fieldKey: string | undefined,
    previousValue: string | undefined,
    newValue: string | undefined,
    reason: string
  ): AuditEvent {
    const event: AuditEvent = {
      id: `audit-${Date.now()}`,
      productId: product.id,
      productSku: product.sku,
      productName: product.name,
      stewardId: 'steward-01',
      stewardName: 'Data Steward Operations',
      action,
      fieldKey,
      previousValue,
      newValue,
      reason,
      timestamp: new Date().toISOString()
    };

    this.auditLogs.unshift(event);
    return event;
  }

  public static getProductLifecycleTimeline(product: Product): TimelineStep[] {
    const isReady = product.reviewStatus === 'READY';
    const isConflict = product.reviewStatus === 'CONFLICT';
    const isReviewReq = product.reviewStatus === 'REVIEW_REQUIRED';

    return [
      { stepId: 'upload', title: 'Source Ingested', status: 'completed', timestamp: product.createdAt, actor: 'System Ingestion Agent', details: `Ingested ${product.sourceDocuments.length} source file(s)` },
      { stepId: 'extracted', title: 'Attributes Extracted', status: 'completed', timestamp: product.createdAt, actor: 'Extraction Agent', details: `Extracted ${product.specifications.length} technical attributes` },
      { stepId: 'conflict', title: 'Validation & Conflicts', status: isConflict ? 'flagged' : 'completed', timestamp: product.createdAt, actor: 'Validation Agent', details: isConflict ? 'Multi-source value conflict detected' : 'Domain rule validation passed' },
      { stepId: 'enriched', title: 'Taxonomy & Knowledge', status: 'completed', timestamp: product.createdAt, actor: 'Knowledge Agent', details: 'Mapped UNSPSC taxonomy & compatible hardware' },
      { stepId: 'reviewed', title: 'Steward Human Review', status: isReady ? 'completed' : (isConflict || isReviewReq ? 'current' : 'pending'), timestamp: product.reviewedAt, actor: product.reviewedBy || 'Data Steward', details: isReady ? 'Approved for catalog release' : 'Pending steward review' },
      { stepId: 'exported', title: 'Commerce Catalog Export', status: isReady ? 'completed' : 'pending', details: 'Exportable as Commerce JSON / CSV' }
    ];
  }
}
