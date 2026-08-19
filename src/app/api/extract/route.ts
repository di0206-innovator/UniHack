import { NextResponse } from 'next/server';
import { ExtractionRequest } from '@/types/product';
import { WorkflowOrchestrator } from '@/lib/agents/orchestrator';

export async function POST(req: Request) {
  try {
    const body: ExtractionRequest = await req.json();

    if (!body || (!body.content && !body.fileName && !body.sampleId)) {
      return NextResponse.json(
        { success: false, error: 'Extraction request requires content, fileName, or sampleId' },
        { status: 400 }
      );
    }

    const { product, results, totalTimeMs } = await WorkflowOrchestrator.runPipeline(body);

    return NextResponse.json({
      product,
      agentResults: results,
      executionTimeMs: totalTimeMs,
      modelUsed: 'Forge 8-Agent Orchestration System',
      success: true
    });
  } catch (error: any) {
    console.error('Workflow Orchestrator API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '8-Stage Agent pipeline failed' },
      { status: 500 }
    );
  }
}
