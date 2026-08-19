export type AuditAction = 
  | 'approve' 
  | 'reject' 
  | 'edit_attribute' 
  | 'select_alternative' 
  | 'mark_resolved' 
  | 'escalate';

export interface AuditEvent {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  stewardId: string;
  stewardName: string;
  action: AuditAction;
  fieldKey?: string;
  previousValue?: string;
  newValue?: string;
  reason: string;
  timestamp: string;
}

export interface TimelineStep {
  stepId: string;
  title: string;
  status: 'completed' | 'current' | 'pending' | 'flagged';
  timestamp?: string;
  actor?: string;
  details?: string;
}
