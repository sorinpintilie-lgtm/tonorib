'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Fish, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { createAuction, fetchAuctions, fetchSellerByOwnerId } from '@/lib/firebase-data';
import { Auction } from '@/lib/types';

export default function AuctionPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', productName: '', startingBid: '', reservePrice: '', endAt: '' });

  const load = () => fetchAuctions().then(setAuctions).catch(() => setAuctions([]));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const seller = await fetchSellerByOwnerId(user.uid);
      if (!seller) throw new Error('Seller profile required before creating an auction.');
      await createAuction({
        sellerId: seller.id,
        sellerName: seller.farmName,
        title: form.title,
        description: form.description,
        productName: form.productName,
        startingBid: Number(form.startingBid),
        reservePrice: form.reservePrice ? Number(form.reservePrice) : undefined,
        endAt: new Date(form.endAt).toISOString(),
        imageUrl: '',
        status: 'live',
        createdBy: user.uid,
      });
      setForm({ title: '', description: '', productName: '', startingBid: '', reservePrice: '', endAt: '' });
      load();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ice min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8"><h1 className="text-3xl font-bold font-manrope text-slate mb-4">Auctions</h1><p className="text-slate-600 text-lg">Live marketplace auctions stored in Firebase with dedicated detail pages and bid history.</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {auctions.map((auction) => (
                <Link key={auction.id} href={`/auction/${auction.id}`} className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-seafoam flex items-center justify-center"><Fish className="w-16 h-16 text-ocean" /></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3"><span className={`px-2 py-1 rounded text-xs font-medium ${auction.status === 'live' ? 'bg-fresh-50 text-fresh border border-fresh-200' : 'bg-silver text-slate border border-silver'}`}>{auction.status.toUpperCase()}</span><span className="text-sm text-slate-500">{auction.sellerName || 'Seller'}</span></div>
                    <h3 className="text-xl font-semibold font-manrope text-slate mb-2">{auction.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{auction.description}</p>
                    <div className="flex items-center mb-4"><span className="text-teal font-medium">Current Bid:</span><span className="text-2xl font-bold text-slate ml-2">€{auction.currentBid || auction.startingBid}</span></div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm"><Clock className="w-4 h-4" /><span>Ends {auction.endAt ? new Date(auction.endAt).toLocaleString('en-GB') : 'soon'}</span></div>
                  </div>
                </Link>
              ))}
            </div>
            {auctions.length === 0 && <div className="bg-white rounded-card p-8 text-slate-500">No auctions published yet.</div>}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold font-manrope text-slate mb-6">Create a Live Auction</h2>
              {user?.role === 'seller' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 border border-silver rounded-lg text-slate" placeholder="Auction title" />
                  <input value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} className="w-full px-4 py-3 border border-silver rounded-lg text-slate" placeholder="Product name" />
                  <input value={form.startingBid} onChange={(e) => setForm({ ...form, startingBid: e.target.value })} type="number" required className="w-full px-4 py-3 border border-silver rounded-lg text-slate" placeholder="Starting bid (€)" />
                  <input value={form.reservePrice} onChange={(e) => setForm({ ...form, reservePrice: e.target.value })} type="number" className="w-full px-4 py-3 border border-silver rounded-lg text-slate" placeholder="Reserve price (€) - optional" />
                  <input value={form.endAt} onChange={(e) => setForm({ ...form, endAt: e.target.value })} type="datetime-local" required className="w-full px-4 py-3 border border-silver rounded-lg text-slate" />
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={4} className="w-full px-4 py-3 border border-silver rounded-lg text-slate resize-none" placeholder="Describe the lot, quality and delivery terms" />
                  <Button type="submit" variant="primary" className="w-full" disabled={submitting}><PlusCircle className="w-4 h-4 mr-2" />{submitting ? 'Creating...' : 'Create Auction'}</Button>
                </form>
              ) : (
                <div className="text-slate-500 text-sm">Login as a seller to create real auctions.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
