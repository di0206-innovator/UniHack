export type NodeType = 
  | 'product' 
  | 'manufacturer' 
  | 'category' 
  | 'material' 
  | 'industry' 
  | 'certification' 
  | 'accessory';

export type RelationshipType = 
  | 'manufactured_by' 
  | 'belongs_to' 
  | 'made_from' 
  | 'compatible_with' 
  | 'used_in' 
  | 'certified_by' 
  | 'works_with' 
  | 'alternative_to';

export interface KnowledgeNode {
  id: string;
  label: string;
  type: NodeType;
  productId?: string;
  sku?: string;
  description?: string;
  degreeCount?: number;
  x?: number;
  y?: number;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  relationship: RelationshipType;
  label: string;
  confidence?: number;
}

export interface GraphFilterOptions {
  nodeTypes: NodeType[];
  relationshipTypes: RelationshipType[];
  searchQuery?: string;
}

export interface ProductGraphData {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}
