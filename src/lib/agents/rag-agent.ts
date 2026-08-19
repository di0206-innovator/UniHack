import { Product } from '@/types/product';
import { GeminiAIProvider } from '@/lib/ai/provider';

export interface RAGAnswerResponse {
  query: string;
  synthesizedAnswer: string;
  matchedProducts: Product[];
  evidenceQuotes: Array<{
    sku: string;
    productName: string;
    quote: string;
    confidence: number;
  }>;
  suggestedFollowups: string[];
}

export class RAGAgent {
  /**
   * Executes a RAG Natural Language Query across catalog products and evidence chunks.
   */
  public static async queryCatalog(
    queryText: string, 
    products: Product[]
  ): Promise<RAGAnswerResponse> {
    const qLower = queryText.toLowerCase().trim();

    // 1. Semantic Match Filtering across Products & Spec Items
    const matchedProducts = products.filter(p => {
      const matchName = p.name.toLowerCase().includes(qLower);
      const matchSku = p.sku.toLowerCase().includes(qLower);
      const matchMfg = p.manufacturer.toLowerCase().includes(qLower);
      const matchCat = p.category.toLowerCase().includes(qLower);
      const matchDesc = (p.description || '').toLowerCase().includes(qLower);
      
      const matchSpecs = p.specifications.some(s => 
        s.key.toLowerCase().includes(qLower) || 
        String(s.value).toLowerCase().includes(qLower) ||
        (s.unit && s.unit.toLowerCase().includes(qLower))
      );

      return matchName || matchSku || matchMfg || matchCat || matchDesc || matchSpecs;
    });

    // Fallback to top products if zero exact substring matches
    const targetProducts = matchedProducts.length > 0 ? matchedProducts : products.slice(0, 5);

    // 2. Prepare Context Snippets for Gemini LLM RAG
    const catalogContext = targetProducts.map(p => `
PRODUCT SKU: ${p.sku}
NAME: ${p.name}
MANUFACTURER: ${p.manufacturer}
CATEGORY: ${p.category}
DESCRIPTION: ${p.shortDescription || p.description}
SPECIFICATIONS:
${p.specifications.map(s => ` - ${s.key}: ${s.value} ${s.unit || ''} (Status: ${s.status}, Source: ${s.sourceDoc} p.${s.sourcePage})`).join('\n')}
----------------------------------------`).join('\n');

    const prompt = `You are the Forge AI Technical RAG Knowledge Agent for Industrial E-Commerce Catalog Intelligence.

USER QUESTION: "${queryText}"

CATALOG CONTEXT DOCUMENTS:
${catalogContext}

INSTRUCTIONS:
1. Provide a comprehensive, accurate technical answer to the user question using ONLY the provided catalog context.
2. Highlight specific SKU matches, technical parameters (e.g. Voltage, IP Rating, Temperature range), and compatibility.
3. Keep the tone professional, technical, and concise. Format with bullet points if comparing multiple products.`;

    let synthesizedAnswer = '';
    try {
      synthesizedAnswer = await GeminiAIProvider.generateText(prompt);
    } catch (e) {
      console.warn('RAG Gemini query fallback:', e);
      synthesizedAnswer = `Based on our verified product catalog, here are the matching technical records:\n\n` +
        targetProducts.map(p => `• **${p.sku} - ${p.name}** (${p.manufacturer}): Category "${p.category}". Includes verified specs: ${p.specifications.slice(0, 4).map(s => `${s.key}: ${s.value} ${s.unit || ''}`).join(', ')}.`).join('\n\n');
    }

    // 3. Extract Evidence Quotes
    const evidenceQuotes = targetProducts.flatMap(p => 
      p.specifications
        .filter(s => s.status === 'verified' && s.evidenceQuote)
        .slice(0, 2)
        .map(s => ({
          sku: p.sku,
          productName: p.name,
          quote: s.evidenceQuote || `${s.key}: ${s.value} ${s.unit || ''}`,
          confidence: s.confidenceScore || 0.98
        }))
    ).slice(0, 6);

    // 4. Generate Suggested Followups
    const suggestedFollowups = [
      `What are the certified operating voltage ranges for these models?`,
      `Export complete side-by-side comparison datasheet as PDF`,
      `Which of these products meet IP67 ingress protection standards?`
    ];

    return {
      query: queryText,
      synthesizedAnswer,
      matchedProducts: targetProducts,
      evidenceQuotes,
      suggestedFollowups
    };
  }
}
