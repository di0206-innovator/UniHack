import { Product } from '@/types/product';

export interface RAGQueryResultPDF {
  query: string;
  synthesizedAnswer: string;
  matchedProductsCount: number;
  evidenceQuotes: Array<{
    sku: string;
    productName: string;
    quote: string;
    confidence: number;
  }>;
  generatedAt: string;
}

export class PDFExportService {
  /**
   * Generates and downloads a clean, printable PDF document for RAG natural language query answers.
   */
  public static downloadRAGAnswerPDF(ragData: RAGQueryResultPDF) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Forge AI - Technical Specification RAG Report</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #09090b;
            margin: 40px;
            line-height: 1.6;
          }
          .header-bar {
            border-bottom: 3px solid #f59e0b;
            padding-bottom: 12px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .brand {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #09090b;
            text-transform: uppercase;
          }
          .badge {
            background-color: #f59e0b;
            color: #000000;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 8px;
            text-transform: uppercase;
          }
          .meta {
            font-size: 11px;
            color: #52525b;
            margin-bottom: 20px;
          }
          .query-box {
            background-color: #fffbeb;
            border: 2px solid #f59e0b;
            padding: 16px;
            margin-bottom: 24px;
            font-weight: 700;
            font-size: 15px;
          }
          .answer-box {
            background-color: #fafafa;
            border: 1px solid #e4e4e7;
            padding: 20px;
            margin-bottom: 24px;
            white-space: pre-wrap;
          }
          .section-title {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
            border-bottom: 1px solid #e4e4e7;
            padding-bottom: 6px;
          }
          .evidence-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
          }
          .evidence-table th, .evidence-table td {
            border: 1px solid #e4e4e7;
            padding: 10px;
            font-size: 12px;
            text-align: left;
          }
          .evidence-table th {
            background-color: #f4f4f5;
            font-weight: 700;
            text-transform: uppercase;
          }
          .footer {
            margin-top: 40px;
            font-size: 10px;
            color: #a1a1aa;
            border-top: 1px solid #e4e4e7;
            padding-top: 12px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header-bar">
          <div class="brand">Forge AI <span class="badge">Enterprise RAG Report</span></div>
          <div style="font-size: 12px; font-weight: 700;">CONFIDENTIAL TECHNICAL DOSSIER</div>
        </div>

        <div class="meta">
          <strong>Generated Date:</strong> ${ragData.generatedAt} | 
          <strong>Source Documents Searched:</strong> ${ragData.matchedProductsCount} Verified Catalog Products
        </div>

        <div class="query-box">
          <span style="font-size: 11px; text-transform: uppercase; color: #b45309; display: block; margin-bottom: 4px;">USER NATURAL LANGUAGE SPEC QUERY:</span>
          "${ragData.query}"
        </div>

        <div class="section-title">AI Synthesized Technical Response</div>
        <div class="answer-box">
          ${ragData.synthesizedAnswer}
        </div>

        ${ragData.evidenceQuotes.length > 0 ? `
          <div class="section-title">Verifiable Evidence Sources</div>
          <table class="evidence-table">
            <thead>
              <tr>
                <th>Product SKU</th>
                <th>Product Name</th>
                <th>Verifiable Source Quote</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              ${ragData.evidenceQuotes.map(ev => `
                <tr>
                  <td><strong>${ev.sku}</strong></td>
                  <td>${ev.productName}</td>
                  <td>"${ev.quote}"</td>
                  <td><span style="color: #059669; font-weight: 700;">${(ev.confidence * 100).toFixed(0)}%</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}

        <div class="footer">
          FORGE AI PLATFORM INC. © 2026. AUTONOMOUS INDUSTRIAL SPEC EXTRACTION & RAG QUERY SYSTEM.
        </div>
      </body>
      </html>
    `;

    // Open print window / trigger HTML-to-PDF save
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 300);
    }
  }

  /**
   * Generates and downloads a PDF datasheet for a single Product record.
   */
  public static downloadProductDatasheetPDF(product: Product) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Technical Datasheet - ${product.sku}</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #09090b;
            margin: 40px;
          }
          .header {
            border-bottom: 3px solid #f59e0b;
            padding-bottom: 12px;
            margin-bottom: 24px;
          }
          .sku {
            font-size: 24px;
            font-weight: 800;
            font-family: monospace;
          }
          .title {
            font-size: 18px;
            font-weight: 700;
            color: #27272a;
          }
          .spec-grid {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .spec-grid th, .spec-grid td {
            border: 1px solid #e4e4e7;
            padding: 10px;
            font-size: 12px;
          }
          .spec-grid th {
            background-color: #f4f4f5;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="sku">${product.sku}</div>
          <div class="title">${product.name} (${product.manufacturer})</div>
          <div style="font-size: 12px; color: #71717a; margin-top: 4px;">Category: ${product.category} | Readiness Score: ${product.scores.commerceReadiness}/100</div>
        </div>

        <p>${product.description || 'Verified industrial product twin extracted by 8-agent AI consensus pipeline.'}</p>

        <h3>Extracted Specifications Matrix</h3>
        <table class="spec-grid">
          <thead>
            <tr>
              <th>Specification Key</th>
              <th>Extracted Value</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Source Reference</th>
            </tr>
          </thead>
          <tbody>
            ${product.specifications.map(s => `
              <tr>
                <td><strong>${s.key}</strong></td>
                <td>${Array.isArray(s.value) ? s.value.join(', ') : s.value}</td>
                <td>${s.unit || '-'}</td>
                <td><span style="color: ${s.status === 'valid' ? '#059669' : '#d97706'}; font-weight: 700;">${s.status.toUpperCase()}</span></td>
                <td>${s.confidence?.sourceDocName || 'Datasheet'} (p. ${s.confidence?.pageNumber || 1})</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 300);
    }
  }
}
