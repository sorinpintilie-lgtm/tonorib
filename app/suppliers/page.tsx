'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, CheckCircle, Search, Store } from 'lucide-react';
import { fetchSellers } from '@/lib/firebase-data';
import { SellerProfile } from '@/lib/types';

export default function SuppliersPage() {
  const [sellers, setSellers] = useState<SellerProfile[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSellers().then(setSellers).catch(() => setSellers([]));
  }, []);

  const filtered = sellers.filter((seller) => !search || [seller.farmName, seller.location, seller.description].filter(Boolean).some((value) => value.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="min-h-screen bg-ice py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-manrope text-slate mb-3">Fish Farms</h1>
          <p className="text-slate-600 mb-6">Real seller profiles connected to the marketplace.</p>
          <div className="max-w-md"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sellers by name or location" className="w-full px-4 py-3 border border-silver rounded-lg text-slate" /></div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((seller) => (
              <Link key={seller.id} href={`/supplier/${seller.id}`} className="bg-white rounded-card shadow-card p-6 hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-ocean flex items-center justify-center overflow-hidden">
                    {seller.logoUrl ? <img src={seller.logoUrl} alt={seller.farmName} className="w-full h-full object-cover" /> : <Store className="w-7 h-7 text-white" />}
                  </div>
                  {seller.verified && <CheckCircle className="w-5 h-5 text-teal" />}
                </div>
                <h2 className="text-xl font-semibold font-manrope text-slate mb-2">{seller.farmName}</h2>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3"><MapPin className="w-4 h-4" />{seller.location}</div>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4">{seller.description}</p>
                <p className="text-sm text-slate-500">{seller.productsCount || 0} published products</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-card p-8 text-slate-500">No sellers found.</div>
        )}
      </div>
    </div>
  );
}
