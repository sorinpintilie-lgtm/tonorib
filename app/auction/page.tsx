'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Fish, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Auction() {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<{ id: number; title: string; description: string; currentBid?: number; startingBid?: number } | null>(null);

  const auctions = [
    {
      id: 1,
      title: "Premium Sea Bass Lot",
      description: "Fresh catch from the Adriatic Sea, approximately 50kg",
      currentBid: 120,
      timeLeft: "02:15:30",
      status: "LIVE",
    },
    {
      id: 2,
      title: "Aquaculture Equipment Bundle",
      description: "Filters, pumps, and aeration systems for medium-sized farms",
      currentBid: 850,
      timeLeft: "01:45:12",
      status: "LIVE",
    },
    {
      id: 3,
      title: "Live Tilapia Auction",
      description: "1000pcs live tilapia, ready for delivery",
      startingBid: 300,
      timeLeft: "04:20:00",
      status: "UPCOMING",
    },
  ];

  const openOfferModal = (auction: { id: number; title: string; description: string; currentBid?: number; startingBid?: number }) => {
    setSelectedAuction(auction);
    setShowOfferModal(true);
  };

  const closeOfferModal = () => {
    setShowOfferModal(false);
    setSelectedAuction(null);
  };

  return (
    <div className="bg-ice min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-manrope text-slate mb-4">Live Auctions</h1>
          <p className="text-silver-600 text-lg">
            Participate in live auctions for fresh fish, seafood, and aquaculture equipment. Bid in real-time and win great deals!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search auctions..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                className="w-full px-4 py-3 border border-silver rounded-lg text-slate placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="px-6">
                Search
              </Button>
              <Link href="/auction/create">
                <Button variant="primary" className="px-6">
                  Start an Auction
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <a href="#" className="text-teal hover:text-teal-600 font-medium">
              All Categories →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden">
              <div className="relative">
                <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                  auction.status === 'LIVE'
                    ? 'bg-fresh-50 text-fresh border border-fresh-200'
                    : 'bg-silver text-slate border border-silver'
                }`}>
                  {auction.status}
                </div>
                <div className="aspect-w-4 aspect-h-3 bg-seafoam flex items-center justify-center">
                  <Fish className="w-16 h-16 text-ocean" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-manrope text-slate mb-2">{auction.title}</h3>
                <p className="text-silver-600 text-sm mb-4">{auction.description}</p>
                <div className="flex items-center mb-4">
                  <span className="text-teal font-medium">
                    {auction.currentBid ? "Current Bid:" : "Starting Bid:"}
                  </span>
                  <span className="text-2xl font-bold text-slate ml-2">
                    €{auction.currentBid || auction.startingBid}
                  </span>
                </div>
                <div className="flex items-center mb-6">
                  <Clock className="w-4 h-4 text-silver-600 mr-2" />
                  <span className="text-silver-600 text-sm">{auction.timeLeft}</span>
                </div>
                <Button
                  onClick={() => openOfferModal(auction)}
                  variant="primary"
                  className="w-full"
                >
                  {auction.status === 'LIVE' ? 'Place Bid' : 'Make Offer'}
                </Button>
              </div>
            </div>
          ))}
      </div>

        {/* Make Offer Modal */}
        {showOfferModal && selectedAuction && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-silver">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold font-manrope text-slate">Make an Offer</h2>
                  <button
                    onClick={closeOfferModal}
                    className="text-silver-600 hover:text-slate text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6">
                <MakeOfferForm auction={selectedAuction} onClose={closeOfferModal} />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

function MakeOfferForm({ auction, onClose }: { auction: { id: number; title: string; description: string; currentBid?: number; startingBid?: number }; onClose: () => void }) {
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert('Your offer has been submitted! We will get back to you shortly.');
      setOfferAmount('');
      setMessage('');
      setSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-seafoam rounded-lg p-4">
        <h3 className="font-semibold font-manrope text-slate mb-2">{auction.title}</h3>
        <p className="text-silver-600 text-sm mb-2">{auction.description}</p>
        <div className="flex items-center">
          <span className="text-teal font-medium">Current bid:</span>
          <span className="text-slate font-bold ml-2">
            €{auction.currentBid || auction.startingBid}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-slate font-medium mb-2">Your Offer (€)</label>
        <div className="flex items-center">
          <span className="text-silver-600 mr-2">€</span>
          <input
            type="number"
            min={auction.currentBid || auction.startingBid}
            step="0.01"
            value={offerAmount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOfferAmount(e.target.value)}
            required
            className="flex-1 px-4 py-3 border border-silver rounded-lg text-slate placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            placeholder="0.00"
            disabled={submitting}
          />
        </div>
        <p className="mt-1 text-silver-600 text-sm">
          Minimum: €{auction.currentBid || auction.startingBid}
        </p>
      </div>

      <div>
        <label className="block text-slate font-medium mb-2">Message to Seller (optional)</label>
        <textarea
          rows={3}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          className="w-full px-4 py-3 border border-silver rounded-lg text-slate placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
          placeholder="Add a note about your offer..."
          disabled={submitting}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting || !offerAmount}
        variant="primary"
        className="w-full"
      >
        {submitting ? 'Submitting...' : 'Submit Offer'}
      </Button>
    </form>
  );
}
