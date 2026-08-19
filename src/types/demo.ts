export type DemoStepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface DemoStepInfo {
  stepId: DemoStepId;
  title: string;
  category: string;
  judgeValueProp: string;
  targetView: 'upload' | 'pipeline' | 'workspace' | 'review-queue' | 'knowledge-graph' | 'catalog' | 'agent-monitor';
  targetTab?: 'specs' | 'evidence' | 'validation' | 'review' | 'audit' | 'knowledge';
  productId?: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  productId: string;
  steps: DemoStepInfo[];
}
