'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, CheckCircle, Filter, ChevronRight } from 'lucide-react';
import { mockSellers } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredSellers = mockSellers.filter(s => {
    const matchesSearch = !searchQuery || 
      s.farmName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || s.location.includes(locationFilter);
    return matchesSearch && matchesLocation;
  });

  const uniqueLocations = [...new Set(mockSellers.map(s => s.location.split(', ')[1] || s.location))];

  return (
    <div className="min-h-screen bg-ice">
      {/* Hero with Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb35d7?w=1920&q=80"
          alt="Fish market"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-manrope font-bold text-3xl lg:text-4xl text-white mb-4">
              Top Fish Farms
            </h1>
            <p className="text-silver-200 max-w-2xl mx-auto mb-8">
            Discover verified fish farms and aquaculture producers. 
            Buy fresh directly from producers.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search farms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-white rounded-full text-slate shadow-card focus:outline-none focus:ring-4 focus:ring-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-silver/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">Filtriraj:</span>
            </div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-silver rounded-button text-sm"
            >
              <option value="">Vse lokacije</option>
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-teal hover:text-teal-600"
              >
                Počisti iskanje
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-500">
            <span className="font-semibold text-slate">{filteredSellers.length}</span> prodajalcev
          </p>
        </div>

        {filteredSellers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSellers.map((seller) => (
              <Link
                key={seller.id}
                href={`/supplier/${seller.id}`}
                className="card card-hover p-6 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-ocean flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-white font-bold">
                      {seller.farmName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-manrope font-semibold text-lg text-slate group-hover:text-ocean transition-colors line-clamp-1">
                        {seller.farmName}
                      </h3>
                      {seller.verified && (
                        <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {seller.location}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {seller.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-silver/50">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-coral fill-coral" />
                    <span className="font-semibold text-slate">{seller.rating}</span>
                    <span className="text-slate-400 text-sm">({seller.productsCount})</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-ocean transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">Noben prodajalec ne ustreza vašim filtrom.</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setLocationFilter(''); }} className="mt-4">
              Počisti filtre
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
