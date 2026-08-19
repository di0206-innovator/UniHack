import { Product } from '@/types/product';
import { CommerceCatalogPayload, CommerceCatalogItem } from '@/types/commerce';

export class CommerceExportService {
  /**
   * Convert validated products into standardized catalog items
   */
  public static toCatalogItems(products: Product[]): CommerceCatalogItem[] {
    return products.map(p => {
      const attributes: Record<string, string> = {};
      let certs = 'CE, RoHS';

      p.specifications.forEach(s => {
        if (s.status !== 'missing' && s.value !== 'UNSPECIFIED') {
          if (s.category === 'certifications') {
            certs = String(s.value);
          } else {
            attributes[s.key] = s.unit ? `${s.value} ${s.unit}` : String(s.value);
          }
        }
      });

      return {
        sku: p.sku,
        name: p.name,
        manufacturer: p.manufacturer,
        category: p.category,
        description: p.shortDescription || p.description,
        attributes,
        certifications: certs,
        readinessScore: p.scores.commerceReadiness,
        reviewStatus: p.reviewStatus,
        lastUpdated: p.updatedAt
      };
    });
  }

  /**
   * Generate JSON Catalog Payload String
   */
  public static generateJSON(products: Product[]): string {
    const items = this.toCatalogItems(products);
    const payload: CommerceCatalogPayload = {
      catalogName: 'Forge AI Verified Industrial Commerce Feed',
      generatedAt: new Date().toISOString(),
      itemCount: items.length,
      items
    };
    return JSON.stringify(payload, null, 2);
  }

  /**
   * Generate CSV Catalog Feed String
   */
  public static generateCSV(products: Product[]): string {
    const items = this.toCatalogItems(products);
    if (items.length === 0) return 'SKU,Name,Manufacturer,Category,ReadinessScore,Status\n';

    // Extract all unique attribute keys
    const attributeKeys = Array.from(
      new Set(items.flatMap(item => Object.keys(item.attributes)))
    );

    const headers = ['SKU', 'Name', 'Manufacturer', 'Category', 'ReadinessScore', 'ReviewStatus', 'Certifications', ...attributeKeys];
    
    const rows = items.map(item => {
      const baseValues = [
        `"${item.sku.replace(/"/g, '""')}"`,
        `"${item.name.replace(/"/g, '""')}"`,
        `"${item.manufacturer.replace(/"/g, '""')}"`,
        `"${item.category.replace(/"/g, '""')}"`,
        item.readinessScore,
        item.reviewStatus,
        `"${item.certifications.replace(/"/g, '""')}"`
      ];

      const attrValues = attributeKeys.map(k => {
        const val = item.attributes[k] || '';
        return `"${val.replace(/"/g, '""')}"`;
      });

      return [...baseValues, ...attrValues].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
}
