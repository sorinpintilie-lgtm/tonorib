'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock, Gavel, Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { fetchAuctionBids, fetchAuctionById, placeAuctionBid } from '@/lib/firebase-data';
import { Auction, AuctionBid } from '@/lib/types';

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const [auctionData, bidRows] = await Promise.all([fetchAuctionById(params.id), fetchAuctionBids(params.id)]);
    setAuction(auctionData);
    setBids(bidRows);
    if (auctionData) setAmount(String((auctionData.currentBid || auctionData.startingBid) + 1));
  };

  useEffect(() => { load().catch(() => { setAuction(null); setBids([]); }); }, [params.id]);

  const handleBid = async (e: FormEvent) => {
    e.preventDefault();
    if (!auction || !user) return;
    setSubmitting(true);
    try {
      await placeAuctionBid(auction, { bidderId: user.uid, bidderName: user.fullName, amount: Number(amount), message });
      setMessage('');
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  if (!auction) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate mb-4">Auction not found</h1><Button onClick={() => router.push('/auction')}>Back to auctions</Button></div></div>;
  }

  return (
    <div className="min-h-screen bg-ice py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-slate-500"><Link href="/auction" className="hover:text-ocean">Auctions</Link> / <span className="text-slate">{auction.title}</span></div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-card shadow-card overflow-hidden">
            <div className="aspect-[16/7] bg-seafoam flex items-center justify-center"><Fish className="w-20 h-20 text-ocean" /></div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4"><span className={`px-2 py-1 rounded text-xs font-medium ${auction.status === 'live' ? 'bg-fresh-50 text-fresh border border-fresh-200' : 'bg-silver text-slate border border-silver'}`}>{auction.status.toUpperCase()}</span><span className="text-sm text-slate-500">{auction.sellerName || 'Seller'}</span></div>
              <h1 className="text-3xl font-bold font-manrope text-slate mb-3">{auction.title}</h1>
              {auction.productName && <p className="text-slate-500 mb-2">Product: {auction.productName}</p>}
              <p className="text-slate-700 mb-6">{auction.description}</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-seafoam rounded-lg"><p className="text-sm text-slate-500">Starting bid</p><p className="text-2xl font-bold text-slate">€{auction.startingBid}</p></div>
                <div className="p-4 bg-seafoam rounded-lg"><p className="text-sm text-slate-500">Current bid</p><p className="text-2xl font-bold text-coral">€{auction.currentBid}</p></div>
                <div className="p-4 bg-seafoam rounded-lg"><p className="text-sm text-slate-500">Ends</p><p className="text-sm font-semibold text-slate">{auction.endAt ? new Date(auction.endAt).toLocaleString('en-GB') : 'TBD'}</p></div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-card shadow-card p-6">
              <h2 className="text-xl font-semibold font-manrope text-slate mb-4">Place a bid</h2>
              {user ? (
                <form onSubmit={handleBid} className="space-y-4">
                  <div><label className="block text-sm text-slate mb-2">Bid amount (€)</label><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min={(auction.currentBid || auction.startingBid) + 1} required className="w-full px-4 py-3 border border-silver rounded-lg text-slate" /></div>
                  <div><label className="block text-sm text-slate mb-2">Message (optional)</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full px-4 py-3 border border-silver rounded-lg text-slate resize-none" /></div>
                  <Button type="submit" variant="primary" className="w-full" disabled={submitting || auction.status !== 'live'}><Gavel className="w-4 h-4 mr-2" />{submitting ? 'Submitting...' : 'Submit bid'}</Button>
                </form>
              ) : <p className="text-sm text-slate-500">Login to place real bids.</p>}
            </div>
            <div className="bg-white rounded-card shadow-card p-6">
              <h2 className="text-xl font-semibold font-manrope text-slate mb-4">Bid history</h2>
              <div className="space-y-3">
                {bids.length > 0 ? bids.map((bid) => <div key={bid.id} className="p-3 bg-seafoam rounded-lg"><div className="flex items-center justify-between"><span className="font-medium text-slate">{bid.bidderName || 'Bidder'}</span><span className="font-semibold text-coral">€{bid.amount}</span></div><div className="flex items-center gap-2 text-xs text-slate-500 mt-1"><Clock className="w-3 h-3" />{bid.createdAt ? new Date(bid.createdAt).toLocaleString('en-GB') : 'Just now'}</div>{bid.message && <p className="text-sm text-slate-600 mt-2">{bid.message}</p>}</div>) : <p className="text-sm text-slate-500">No bids yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
