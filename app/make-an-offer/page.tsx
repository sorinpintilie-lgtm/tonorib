'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MakeAnOffer() {
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Your offer has been submitted! We will get back to you shortly.');
      setOfferAmount('');
      setMessage('');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-silver-100 text-sm hover:text-white">
          <span className="mr-2">← Back to Home</span>
        </Link>
        <h1 className="text-3xl font-bold font-manrope mt-4">Make an Offer</h1>
        <p className="text-silver-100">
          Propose your price for this item. The seller will review your offer and respond.
        </p>
      </div>

      {/* In a real app, this would show item details */}
      <div className="bg-white/5 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M6 6l6 6m8-8z"></path></svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold font-manrope mb-2">Premium Sea Bass Fillet</h2>
            <p className="text-silver-100 text-sm">
              Fresh catch from the Adriatic Sea, approximately 1kg
            </p>
            <p className="mt-2">
              <span className="bg-teal-600/20 text-teal-400 text-xs px-2 py-1 rounded">Seafood</span>
              <span className="ml-2 text-silver-100 text-xs">€25/kg</span>
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-silver-100 mb-2 font-medium">Your Offer (€)</label>
            <div className="flex items-center">
              <span className="mr-2 text-silver-100">€</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={offerAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)} => setOfferAmount(e.target.value)
                required
                className="w-48 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-silver-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="0.00"
                disabled={submitting}
              />
            </div>
            <p className="mt-1 text-silver-100 text-xs">
              Seller's asking price: €25.00
            </p>
          </div>
          <div>
            <label className="block text-silver-100 mb-2 font-medium">Message to Seller (optional)</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)} => setMessage(e.target.value)
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-silver-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Add a note about your offer..."
              disabled={submitting}
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !offerAmount}
            className="w-fit px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Offer'}
          </button>
        </div>
      </form>
    </div>
  );
}