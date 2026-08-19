'use client';

import React, { useState, useMemo } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { KnowledgeGraphService } from '@/lib/knowledge/graph-service';
import { KnowledgeNode, KnowledgeEdge, NodeType, RelationshipType } from '@/types/knowledge';
import { 
  Network, 
  Search, 
  Filter, 
  ExternalLink, 
  Box, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Tag, 
  Zap, 
  CheckCircle2, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw,
  Info
} from 'lucide-react';

export const KnowledgeGraphView: React.FC = () => {
  const { products, selectProduct } = useProductContext();
  const graphData = useMemo(() => KnowledgeGraphService.buildGraph(products), [products]);

  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(graphData.nodes[0] || null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  const filteredNodes = useMemo(() => {
    return graphData.nodes.filter(n => {
      const matchesSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (n.sku && n.sku.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = filterType === 'ALL' || n.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [graphData.nodes, searchQuery, filterType]);

  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case 'product': return { bg: '#0284c7', border: '#38bdf8', text: '#f0f9ff' };
      case 'manufacturer': return { bg: '#7c3aed', border: '#a78bfa', text: '#f5f3ff' };
      case 'category': return { bg: '#059669', border: '#34d399', text: '#ecfdf5' };
      case 'material': return { bg: '#d97706', border: '#fbbf24', text: '#fffbeb' };
      case 'certification': return { bg: '#dc2626', border: '#f87171', text: '#fef2f2' };
      case 'accessory': return { bg: '#0284c7', border: '#7dd3fc', text: '#f0f9ff' };
      default: return { bg: '#475569', border: '#94a3b8', text: '#f8fafc' };
    }
  };

  const connectedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return graphData.edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id);
  }, [selectedNode, graphData.edges]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Network className="h-4 w-4" />
            <span>Industrial Product Knowledge Graph</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Enterprise Knowledge Relationship Topology</h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore inter-product compatibility, parent manufacturers, category domains, regulatory certifications, and accessory networks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.6))}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1.0)}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            title="Reset Zoom"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Control Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 shadow-lg">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search nodes by SKU, Product Name, Manufacturer, or Certification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Entity Node Types</option>
            <option value="product">Products Only</option>
            <option value="manufacturer">Manufacturers</option>
            <option value="category">Categories</option>
            <option value="material">Materials</option>
            <option value="certification">Certifications</option>
            <option value="accessory">Accessories</option>
          </select>
        </div>
      </div>

      {/* Main Interactive Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Graph Canvas Container */}
        <div className="lg:col-span-2 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 h-[550px] relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span> Product ({graphData.nodes.filter(n=>n.type==='product').length})
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-purple-400"></span> Brand ({graphData.nodes.filter(n=>n.type==='manufacturer').length})
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Category ({graphData.nodes.filter(n=>n.type==='category').length})
            </span>
          </div>

          <div className="w-full h-full flex items-center justify-center overflow-auto cursor-grab">
            <svg
              className="w-full h-full min-h-[500px] transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              viewBox="0 0 900 600"
            >
              {/* Edges */}
              {graphData.edges.map((edge) => {
                const srcNode = graphData.nodes.find(n => n.id === edge.source);
                const tgtNode = graphData.nodes.find(n => n.id === edge.target);
                if (!srcNode || !tgtNode) return null;

                const isConnected = selectedNode && (edge.source === selectedNode.id || edge.target === selectedNode.id);

                return (
                  <g key={edge.id}>
                    <line
                      x1={srcNode.x || 100}
                      y1={srcNode.y || 100}
                      x2={tgtNode.x || 200}
                      y2={tgtNode.y || 200}
                      stroke={isConnected ? '#38bdf8' : '#334155'}
                      strokeWidth={isConnected ? 2.5 : 1}
                      strokeDasharray={isConnected ? 'none' : '4'}
                      opacity={isConnected ? 0.9 : 0.4}
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {filteredNodes.map((node) => {
                const colors = getNodeColor(node.type);
                const isSelected = selectedNode?.id === node.id;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x || 100}, ${node.y || 100})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                  >
                    <circle
                      r={node.type === 'product' ? 24 : 18}
                      fill={colors.bg}
                      stroke={isSelected ? '#38bdf8' : colors.border}
                      strokeWidth={isSelected ? 4 : 2}
                      className="transition-all hover:scale-110"
                    />
                    <text
                      y={node.type === 'product' ? 38 : 32}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {node.label.length > 20 ? node.label.slice(0, 18) + '...' : node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Node Inspector Side Panel */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between h-[550px] shadow-2xl">
          {selectedNode ? (
            <div className="space-y-6 overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded">
                    Entity: {selectedNode.type}
                  </span>
                  {selectedNode.sku && (
                    <span className="text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
                      SKU: {selectedNode.sku}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-100">{selectedNode.label}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedNode.description}</p>
              </div>

              {/* Connected Relationships */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Network className="h-4 w-4 text-cyan-400" />
                  <span>Direct Graph Connections ({connectedEdges.length})</span>
                </h4>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {connectedEdges.map((edge) => {
                    const otherNodeId = edge.source === selectedNode.id ? edge.target : edge.source;
                    const otherNode = graphData.nodes.find(n => n.id === otherNodeId);

                    return (
                      <div
                        key={edge.id}
                        onClick={() => otherNode && setSelectedNode(otherNode)}
                        className="p-2.5 bg-slate-900/80 hover:bg-slate-900 rounded-xl border border-slate-800 cursor-pointer transition-colors flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="text-[10px] text-cyan-400 font-mono block uppercase">{edge.label}</span>
                          <span className="font-semibold text-slate-200">{otherNode?.label}</span>
                        </div>
                        <span className="text-[10px] uppercase font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded">
                          {otherNode?.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              {selectedNode.productId && (
                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => selectProduct(selectedNode.productId!)}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Open Product Workspace</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
              <Network className="h-10 w-10 mb-2" />
              <p className="text-xs">Select any node on the graph canvas to inspect relationship topology.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
