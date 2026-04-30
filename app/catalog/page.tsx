'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Product, SellerProfile } from '@/lib/types';
import { fetchProducts, fetchSellers } from '@/lib/firebase-data';
import { categories, deliveryRegions } from '@/lib/constants';
import { ProductCard } from '@/components/catalog/product-card';
import { Button } from '@/components/ui/button';

function CatalogContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [sellers, setSellers] = useState<SellerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sellerId: '',
    region: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    sortBy: 'newest',
  });

  useEffect(() => {
    fetchSellers().then(setSellers).catch(() => setSellers([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({
      search: filters.search || undefined,
      category: filters.category || undefined,
      sellerId: filters.sellerId || undefined,
      region: filters.region || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      inStock: filters.inStock,
    })
      .then((rows) => {
        const sorted = [...rows];
        if (filters.sortBy === 'price-low') sorted.sort((a, b) => a.pricePerKg - b.pricePerKg);
        if (filters.sortBy === 'price-high') sorted.sort((a, b) => b.pricePerKg - a.pricePerKg);
        if (filters.sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sorted);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const activeFilterCount = useMemo(
    () => [filters.category, filters.sellerId, filters.region, filters.minPrice, filters.maxPrice, filters.inStock].filter(Boolean).length,
    [filters]
  );

  const clearFilters = () => setFilters({ search: '', category: '', sellerId: '', region: '', minPrice: '', maxPrice: '', inStock: false, sortBy: 'newest' });

  const FilterPanel = (
    <div className="space-y-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
        <input value={filters.search} onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))} placeholder="Search..." className="w-full pl-9 pr-3 py-2 bg-white border border-silver rounded-input text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate mb-2">Category</label>
        <select value={filters.category} onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 border border-silver rounded-input text-sm">
          <option value="">All categories</option>
          {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate mb-2">Seller</label>
        <select value={filters.sellerId} onChange={(e) => setFilters((p) => ({ ...p, sellerId: e.target.value }))} className="w-full px-3 py-2 border border-silver rounded-input text-sm">
          <option value="">All sellers</option>
          {sellers.map((seller) => <option key={seller.id} value={seller.id}>{seller.farmName}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate mb-2">Delivery region</label>
        <select value={filters.region} onChange={(e) => setFilters((p) => ({ ...p, region: e.target.value }))} className="w-full px-3 py-2 border border-silver rounded-input text-sm">
          <option value="">All regions</option>
          {deliveryRegions.map((region) => <option key={region} value={region}>{region}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input value={filters.minPrice} onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))} placeholder="Min €" type="number" className="w-full px-3 py-2 border border-silver rounded-input text-sm" />
        <input value={filters.maxPrice} onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))} placeholder="Max €" type="number" className="w-full px-3 py-2 border border-silver rounded-input text-sm" />
      </div>
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={filters.inStock} onChange={(e) => setFilters((p) => ({ ...p, inStock: e.target.checked }))} className="w-4 h-4" />
        <span className="text-sm text-slate-700">In stock only</span>
      </label>
      <Button variant="outline" onClick={clearFilters} className="w-full">Clear filters</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-ice">
      <div className="relative h-48 lg:h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=1920&q=80" alt="Fresh fish display" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ocean/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"><div><h1 className="font-manrope font-bold text-3xl lg:text-4xl text-white mb-2">Fish Catalog</h1><p className="text-silver-200">Live products from sellers on the platform.</p></div></div>
      </div>

      <div className="bg-white border-b border-silver/50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"><div className="flex items-center gap-2 text-sm text-slate-500"><Link href="/" className="hover:text-ocean">Home</Link><span>/</span><span className="text-slate">Catalog</span></div></div></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0"><div className="card p-6 sticky top-24">{FilterPanel}</div></aside>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setShowMobileFilters(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-silver rounded-button text-slate"><SlidersHorizontal className="w-4 h-4" />Filters {activeFilterCount > 0 && <span className="w-5 h-5 bg-coral text-white text-xs rounded-full flex items-center justify-center">{activeFilterCount}</span>}</button>
                <p className="text-slate-500"><span className="font-semibold text-slate">{products.length}</span> products</p>
              </div>
              <select value={filters.sortBy} onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value }))} className="px-4 py-2 bg-white border border-silver rounded-button text-sm">
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>

            {loading ? (
              <div className="bg-white rounded-card p-8 text-slate-500">Loading products...</div>
            ) : products.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
            ) : (
              <div className="text-center py-16 bg-white rounded-card">
                <p className="text-slate-500 mb-4">No products match your filters.</p>
                <Button onClick={clearFilters}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg">Filters</h2><button onClick={() => setShowMobileFilters(false)} className="p-2"><X className="w-5 h-5" /></button></div>
            <div className="p-4">{FilterPanel}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return <Suspense fallback={<div className="min-h-screen bg-ice flex items-center justify-center">Loading...</div>}><CatalogContent /></Suspense>;
}
