import { SpecificationItem, SourceChunk } from '@/types/product';
import { getAIProvider } from '@/lib/ai/provider';

export class ExtractionAgent {
  /**
   * Extract key-value specifications from text and match evidence chunks
   */
  public static async extractSpecs(
    rawText: string,
    fileName: string,
    chunks: SourceChunk[]
  ): Promise<SpecificationItem[]> {
    const provider = getAIProvider();
    const result = await provider.extractProductInfo({
      sourceType: 'text',
      fileName,
      content: rawText
    });

    const rawSpecs = result.product.specifications || [];

    // Enhance specifications by binding to exact matching SourceChunk
    return rawSpecs.map((spec, idx) => {
      const matchingChunk = chunks.find(c => 
        c.snippet.toLowerCase().includes(spec.key.toLowerCase()) || 
        c.snippet.toLowerCase().includes(String(spec.value).toLowerCase())
      ) || chunks[0];

      return {
        ...spec,
        id: spec.id || `spec-e-${idx + 1}`,
        chunkId: matchingChunk?.id,
        confidence: {
          ...spec.confidence,
          sourceDocId: matchingChunk?.sourceDocId,
          sourceDocName: fileName,
          pageNumber: matchingChunk?.pageNumber || 1,
          evidenceQuote: spec.confidence.evidenceQuote || matchingChunk?.snippet.slice(0, 150) || `Extracted from ${fileName}`
        }
      };
    });
  }
}
