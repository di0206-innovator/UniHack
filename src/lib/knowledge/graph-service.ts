import { Product } from '@/types/product';
import { KnowledgeNode, KnowledgeEdge, ProductGraphData, RelationshipType } from '@/types/knowledge';

export class KnowledgeGraphService {
  /**
   * Build complete knowledge graph network from product catalog
   */
  public static buildGraph(products: Product[]): ProductGraphData {
    const nodesMap = new Map<string, KnowledgeNode>();
    const edges: KnowledgeEdge[] = [];

    products.forEach((prod, pIdx) => {
      // 1. Product Node
      const pNodeId = `node-prod-${prod.id}`;
      if (!nodesMap.has(pNodeId)) {
        nodesMap.set(pNodeId, {
          id: pNodeId,
          label: prod.name,
          type: 'product',
          productId: prod.id,
          sku: prod.sku,
          description: prod.shortDescription || prod.description,
          x: 200 + (pIdx % 3) * 320,
          y: 180 + Math.floor(pIdx / 3) * 260
        });
      }

      // 2. Manufacturer Node & Edge
      if (prod.manufacturer) {
        const mfrNodeId = `node-mfr-${prod.manufacturer.replace(/\s+/g, '_')}`;
        if (!nodesMap.has(mfrNodeId)) {
          nodesMap.set(mfrNodeId, {
            id: mfrNodeId,
            label: prod.manufacturer,
            type: 'manufacturer',
            description: `Industrial Manufacturer Entity: ${prod.manufacturer}`,
            x: 100 + (pIdx % 2) * 450,
            y: 80
          });
        }
        edges.push({
          id: `edge-mfr-${prod.id}`,
          source: pNodeId,
          target: mfrNodeId,
          relationship: 'manufactured_by',
          label: 'manufactured by'
        });
      }

      // 3. Category Node & Edge
      if (prod.category) {
        const catNodeId = `node-cat-${prod.category.replace(/\s+/g, '_')}`;
        if (!nodesMap.has(catNodeId)) {
          nodesMap.set(catNodeId, {
            id: catNodeId,
            label: prod.category,
            type: 'category',
            description: `Catalog Taxonomy Domain: ${prod.category}`,
            x: 450,
            y: 480
          });
        }
        edges.push({
          id: `edge-cat-${prod.id}`,
          source: pNodeId,
          target: catNodeId,
          relationship: 'belongs_to',
          label: 'belongs to category'
        });
      }

      // 4. Material Nodes & Edges
      const matSpec = prod.specifications.find(s => s.key.toLowerCase().includes('material') || s.key.toLowerCase().includes('impeller'));
      if (matSpec) {
        const matVal = String(matSpec.value);
        const matNodeId = `node-mat-${matVal.replace(/\s+/g, '_').slice(0, 15)}`;
        if (!nodesMap.has(matNodeId)) {
          nodesMap.set(matNodeId, {
            id: matNodeId,
            label: matVal,
            type: 'material',
            description: `Industrial Material Spec: ${matVal}`,
            x: 120 + pIdx * 180,
            y: 420
          });
        }
        edges.push({
          id: `edge-mat-${prod.id}`,
          source: pNodeId,
          target: matNodeId,
          relationship: 'made_from',
          label: 'made from'
        });
      }

      // 5. Certification Nodes & Edges
      const certSpec = prod.specifications.find(s => s.category === 'certifications' || s.key.toLowerCase().includes('certif'));
      if (certSpec && certSpec.value !== 'UNSPECIFIED') {
        const certVal = String(certSpec.value);
        const certNodeId = `node-cert-${certVal.replace(/\s+/g, '_').slice(0, 15)}`;
        if (!nodesMap.has(certNodeId)) {
          nodesMap.set(certNodeId, {
            id: certNodeId,
            label: certVal,
            type: 'certification',
            description: `Regulatory Certification Standard: ${certVal}`,
            x: 650,
            y: 120 + pIdx * 100
          });
        }
        edges.push({
          id: `edge-cert-${prod.id}`,
          source: pNodeId,
          target: certNodeId,
          relationship: 'certified_by',
          label: 'certified under'
        });
      }

      // 6. Accessories & Compatible Product Edges
      const accNodeId = `node-acc-din-rail-${prod.id}`;
      nodesMap.set(accNodeId, {
        id: accNodeId,
        label: `Mounting Kit & Accessories for ${prod.sku}`,
        type: 'accessory',
        description: `Compatible Mounting Accessory Hardware`,
        x: 320 + pIdx * 120,
        y: 350
      });
      edges.push({
        id: `edge-acc-${prod.id}`,
        source: pNodeId,
        target: accNodeId,
        relationship: 'works_with',
        label: 'works with accessory'
      });
    });

    const nodes = Array.from(nodesMap.values()).map(n => {
      const degree = edges.filter(e => e.source === n.id || e.target === n.id).length;
      return { ...n, degreeCount: degree };
    });

    return { nodes, edges };
  }
}
