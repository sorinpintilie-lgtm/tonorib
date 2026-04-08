'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, X, ChevronDown, ChevronUp, SlidersHorizontal, Grid, List } from 'lucide-react';
import { mockProducts, mockSellers, categories, deliveryRegions, getFilteredProducts, Product } from '@/lib/mock-data';
import { ProductCard } from '@/components/catalog/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    seller: true,
    region: true,
  });

  // Filter states
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sellerId: '',
    region: '',
    inStock: false,
  });

  // Apply filters
  useEffect(() => {
    let filtered = getFilteredProducts({
      category: filters.category || undefined,
      minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
      sellerId: filters.sellerId || undefined,
      inStock: filters.inStock || undefined,
      search: filters.search || undefined,
    });

    // Filter by region
    if (filters.region) {
      filtered = filtered.filter(p => p.deliveryRegions.includes(filters.region));
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.pricePerKg - b.pricePerKg);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.pricePerKg - a.pricePerKg);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    // newest is default (by createdAt in getFilteredProducts)

    setProducts(filtered);
  }, [filters, sortBy]);

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sellerId: '',
      region: '',
      inStock: false,
    });
  };

  const activeFilterCount = [
    filters.category,
    filters.minPrice || filters.maxPrice,
    filters.sellerId,
    filters.region,
    filters.inStock,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-ice">
      {/* Hero Banner */}
      <div className="relative h-48 lg:h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=1920&q=80"
          alt="Fresh fish display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="font-manrope font-bold text-3xl lg:text-4xl text-white mb-2">
              Fish Catalog
            </h1>
            <p className="text-silver-200">
              Browse our selection of fresh, frozen, and smoked fish from verified farms
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-silver/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-ocean">Home</Link>
            <span>/</span>
            <span className="text-slate">Catalog</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-manrope font-semibold text-lg text-slate">Filter</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-teal hover:text-teal-600"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-silver rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <button
                    onClick={() => setExpandedFilters(prev => ({ ...prev, category: !prev.category }))}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-medium text-slate"> Category</span>
                    {expandedFilters.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedFilters.category && (
                    <div className="mt-3 space-y-2">
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={filters.category === cat.id}
                            onChange={() => handleFilterChange('category', cat.id)}
                            className="w-4 h-4 text-teal focus:ring-teal"
                          />
                          <span className="text-sm text-slate-700">{cat.label}</span>
                        </label>
                      ))}
                      {filters.category && (
                        <button
                          onClick={() => handleFilterChange('category', '')}
                          className="text-xs text-teal hover:text-teal-600"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div>
                  <button
                    onClick={() => setExpandedFilters(prev => ({ ...prev, price: !prev.price }))}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-medium text-slate">Price €/kg</span>
                    {expandedFilters.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedFilters.price && (
                    <div className="mt-3 space-y-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-silver rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-silver rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                  )}
                </div>

                {/* Seller Filter */}
                <div>
                  <button
                    onClick={() => setExpandedFilters(prev => ({ ...prev, seller: !prev.seller }))}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-medium text-slate">Seller</span>
                    {expandedFilters.seller ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedFilters.seller && (
                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                      {mockSellers.map((seller) => (
                        <label key={seller.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="seller"
                            checked={filters.sellerId === seller.id}
                            onChange={() => handleFilterChange('sellerId', seller.id)}
                            className="w-4 h-4 text-teal focus:ring-teal"
                          />
                          <span className="text-sm text-slate-700">{seller.farmName}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Region Filter */}
                <div>
                  <button
                    onClick={() => setExpandedFilters(prev => ({ ...prev, region: !prev.region }))}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-medium text-slate">Delivery Region</span>
                    {expandedFilters.region ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedFilters.region && (
                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                      {deliveryRegions.slice(0, 10).map((region) => (
                        <label key={region} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="region"
                            checked={filters.region === region}
                            onChange={() => handleFilterChange('region', region)}
                            className="w-4 h-4 text-teal focus:ring-teal"
                          />
                          <span className="text-sm text-slate-700">{region}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* In Stock Toggle */}
                <div className="pt-4 border-t border-silver/50">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="w-5 h-5 text-teal focus:ring-teal rounded"
                    />
                    <span className="font-medium text-slate">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-silver rounded-button text-slate"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 bg-coral text-white text-xs rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <p className="text-slate-500">
                  <span className="font-semibold text-slate">{products.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-silver rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="hidden sm:flex items-center bg-white border border-silver rounded-button overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn('p-2 transition-colors', viewMode === 'grid' ? 'bg-ocean text-white' : 'text-slate-600 hover:bg-seafoam')}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn('p-2 transition-colors', viewMode === 'list' ? 'bg-ocean text-white' : 'text-slate-600 hover:bg-seafoam')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-silver rounded-full text-sm">
                    {categories.find(c => c.id === filters.category)?.label}
                    <button onClick={() => handleFilterChange('category', '')} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.sellerId && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-silver rounded-full text-sm">
                    {mockSellers.find(s => s.id === filters.sellerId)?.farmName}
                    <button onClick={() => handleFilterChange('sellerId', '')} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.region && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-silver rounded-full text-sm">
                    {filters.region}
                    <button onClick={() => handleFilterChange('region', '')} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.inStock && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-silver rounded-full text-sm">
                    In stock
                    <button onClick={() => handleFilterChange('inStock', false)} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className={cn(
                'grid gap-6',
                viewMode === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
              )}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-card">
                <p className="text-slate-500 mb-4">No products match your filters.</p>
                <Button onClick={clearFilters}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-silver/50">
              <h2 className="font-manrope font-semibold text-lg">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* Same filter content as desktop */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-silver rounded-input text-sm"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium text-slate mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-category"
                        checked={filters.category === cat.id}
                        onChange={() => handleFilterChange('category', cat.id)}
                        className="w-4 h-4 text-teal"
                      />
                      <span className="text-sm">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="w-5 h-5 text-teal rounded"
                  />
                  <span className="font-medium">In stock only</span>
                </label>
              </div>
            </div>
            <div className="p-4 border-t border-silver/50 flex gap-3">
              <Button variant="outline" onClick={clearFilters} className="flex-1">
                Clear
              </Button>
              <Button variant="primary" onClick={() => setShowMobileFilters(false)} className="flex-1">
                Show {products.length} products
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-ocean/20 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-silver/30 rounded"></div>
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
