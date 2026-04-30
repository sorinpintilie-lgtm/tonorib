'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function MakeAnOfferPage() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setProductName('');
      setQuantity('');
      setPrice('');
      setMessage('');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-ice py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-card shadow-card p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-manrope text-slate mb-3">Make an Offer</h1>
            <p className="text-slate-600">
              Send a custom buying proposal for a product, a batch, or a recurring supply request.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 rounded-lg border border-fresh-200 bg-fresh-50 p-4 text-fresh">
              Your offer draft has been submitted successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate font-medium mb-2">Product or request</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Example: Fresh sea bass, 80kg weekly"
                className="w-full px-4 py-3 border border-silver rounded-lg text-slate focus:outline-none focus:ring-2 focus:ring-teal"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate font-medium mb-2">Quantity</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 80kg"
                  className="w-full px-4 py-3 border border-silver rounded-lg text-slate focus:outline-none focus:ring-2 focus:ring-teal"
                  required
                />
              </div>
              <div>
                <label className="block text-slate font-medium mb-2">Target price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. €9.50/kg"
                  className="w-full px-4 py-3 border border-silver rounded-lg text-slate focus:outline-none focus:ring-2 focus:ring-teal"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate font-medium mb-2">Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe timing, delivery expectations, quality requirements, or other details."
                className="w-full px-4 py-3 border border-silver rounded-lg text-slate resize-none focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Submit Offer Request
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
