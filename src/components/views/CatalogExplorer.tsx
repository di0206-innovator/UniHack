'use client';

import React, { useState, useMemo } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { CommerceReadinessEngine } from '@/lib/commerce/readiness-engine';
import { ExportModal } from '@/components/views/ExportModal';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  Box, 
  Search, 
  Filter, 
  ArrowRight,
  Plus,
  Trash2,
  Download,
  Check,
  ArrowUpDown
} from 'lucide-react';

export const CatalogExplorer: React.FC = () => {
  const { products, selectProduct, setActiveView, deleteProduct, updateReviewStatus, recordAuditEvent } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'readiness' | 'sku' | 'name' | 'confidence'>('readiness');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  const filteredAndSorted = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'ALL' || p.reviewStatus === statusFilter;
        const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCat;
      })
      .sort((a, b) => {
        let valA: any = a.scores.commerceReadiness;
        let valB: any = b.scores.commerceReadiness;

        if (sortBy === 'sku') { valA = a.sku; valB = b.sku; }
        if (sortBy === 'name') { valA = a.name; valB = b.name; }
        if (sortBy === 'confidence') { valA = a.scores.confidence; valB = b.scores.confidence; }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [products, searchQuery, statusFilter, categoryFilter, sortBy, sortOrder]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAndSorted.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAndSorted.map(p => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    selectedIds.forEach(id => {
      const prod = products.find(p => p.id === id);
      if (prod) {
        updateReviewStatus(id, 'READY', 'Bulk steward approval');
        recordAuditEvent(prod, 'approve', undefined, prod.reviewStatus, 'READY', 'Bulk catalog steward approval');
      }
    });
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => deleteProduct(id));
    setSelectedIds([]);
  };

  const exportProducts = products.filter(p => selectedIds.includes(p.id));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        category="Commerce Catalog Management"
        title="Structured Product Data Grid"
        subtitle="Search, sort, filter, bulk approve, and export validated product records to PIM/ERP catalog feeds."
        icon={Box}
        actions={
          <button
            onClick={() => setActiveView('upload')}
            className="neu-btn-primary text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Ingest New Product</span>
          </button>
        }
      />

      {/* Bulk Action Bar (Visible when items selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 neu-sunken rounded-xl flex items-center justify-between text-xs text-cyan-200 shadow-lg border border-cyan-500/30">
          <div className="flex items-center gap-2 font-mono">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span><strong>{selectedIds.length}</strong> Product(s) Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkApprove}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Check className="h-3.5 w-3.5" /> Bulk Approve
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="neu-btn-primary text-white px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="h-3.5 w-3.5" /> Export Selected ({selectedIds.length})
            </button>

            <button
              onClick={handleBulkDelete}
              className="neu-btn text-slate-300 hover:text-rose-400 px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 neu-flat">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by SKU, Name, Manufacturer, Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full neu-sunken rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="neu-sunken rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="READY">Commerce Ready</option>
              <option value="REVIEW_REQUIRED">Review Required</option>
              <option value="CONFLICT">Conflict Flagged</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="neu-sunken rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none max-w-[150px]"
            >
              <option value="ALL">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="neu-sunken rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none"
            >
              <option value="readiness">Sort by Readiness</option>
              <option value="confidence">Sort by Confidence</option>
              <option value="sku">Sort by SKU</option>
              <option value="name">Sort by Name</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="neu-btn px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-white"
            >
              {sortOrder.toUpperCase()}
            </button>
          </div>
        </div>
      </Card>

      {/* High-Density Catalog Data Grid */}
      <Card className="p-0 overflow-hidden neu-flat border border-slate-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#070a12] text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800/80">
            <tr>
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredAndSorted.length && filteredAndSorted.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                />
              </th>
              <th className="p-4">SKU / Item Name</th>
              <th className="p-4">Manufacturer</th>
              <th className="p-4">Category</th>
              <th className="p-4">Readiness Breakdown</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredAndSorted.map((prod) => {
              const isSelected = selectedIds.includes(prod.id);
              const readiness = CommerceReadinessEngine.evaluateReadiness(prod);

              return (
                <tr key={prod.id} className={`hover:bg-slate-900/40 transition-colors ${isSelected ? 'bg-cyan-950/20' : ''}`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(prod.id)}
                      className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-lg neu-pill">
                        {prod.sku}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-100 text-sm mt-1">{prod.name}</h4>
                  </td>
                  <td className="p-4 font-medium text-slate-300">{prod.manufacturer}</td>
                  <td className="p-4 text-slate-400 font-mono text-[11px]">{prod.category}</td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-bold text-cyan-400 text-sm">{readiness.score}%</span>
                        <div className="w-24 bg-slate-900 neu-sunken h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${readiness.score}%` }}></div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">{readiness.summaryText}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={prod.reviewStatus} size="sm" />
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => selectProduct(prod.id)}
                      className="neu-btn text-slate-200 hover:text-white font-medium px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 ml-auto"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Export Modal Component */}
      {showExportModal && (
        <ExportModal
          products={exportProducts}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};
