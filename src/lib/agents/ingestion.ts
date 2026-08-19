import { SourceDocument, SourceChunk, ExtractionRequest } from '@/types/product';

export class IngestionAgent {
  /**
   * Process raw input request into a normalized SourceDocument with evidence chunks
   */
  public static processSource(request: ExtractionRequest): { doc: SourceDocument; chunks: SourceChunk[] } {
    const docId = `doc-${Date.now()}`;
    const fileName = request.fileName || (request.sourceType === 'url' ? 'Web_Catalog_Scrape.html' : 'Product_Specification_Doc.txt');
    const rawText = request.content || 'Industrial Product Specification Content';

    // Split content into line-bounded chunks
    const lines = rawText.split('\n');
    const chunkSize = 5; // 5 lines per chunk
    const chunks: SourceChunk[] = [];

    let currentChunkLines: string[] = [];
    let startLine = 1;

    lines.forEach((line, idx) => {
      currentChunkLines.push(line);
      if (currentChunkLines.length >= chunkSize || idx === lines.length - 1) {
        const snippet = currentChunkLines.join('\n').trim();
        if (snippet.length > 0) {
          const pageNumber = Math.floor(startLine / 30) + 1; // Approx 30 lines per page
          chunks.push({
            id: `chunk-${docId}-${chunks.length + 1}`,
            sourceDocId: docId,
            sourceDocName: fileName,
            pageNumber,
            lineStart: startLine,
            lineEnd: startLine + currentChunkLines.length - 1,
            snippet,
            confidenceScore: 0.95
          });
        }
        startLine = idx + 2;
        currentChunkLines = [];
      }
    });

    const doc: SourceDocument = {
      id: docId,
      fileName,
      fileType: (request.fileType as any) || (request.sourceType === 'url' ? 'url' : 'text'),
      fileSize: rawText.length,
      uploadedAt: new Date().toISOString(),
      extractedFieldCount: 0,
      pageCount: Math.ceil(lines.length / 30) || 1,
      contentSnippet: rawText.slice(0, 300),
      rawText,
      chunks
    };

    return { doc, chunks };
  }
}
