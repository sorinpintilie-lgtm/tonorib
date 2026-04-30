'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Forum() {
  return (
    <div className="bg-ice min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-manrope text-slate mb-4">Forum</h1>
          <p className="text-silver-600 text-lg">
            Welcome to the TonoRib Forum! Connect with other fish farmers, sellers, and buyers to discuss
            best practices, market trends, and industry news.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Discussions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold font-manrope text-slate mb-6">Popular Discussions</h2>
              <div className="space-y-4">
                <Link href="/forum/topic/1" className="block p-4 bg-seafoam rounded-lg hover:bg-teal-50 transition-colors border border-silver">
                  <h3 className="font-semibold text-slate mb-2">Sustainable Fish Farming Techniques</h3>
                  <p className="text-silver-600 text-sm">Discussing eco-friendly practices in aquaculture.</p>
                  <div className="flex items-center mt-2 text-xs text-silver-600">
                    <span>23 replies</span>
                    <span className="mx-2">•</span>
                    <span>2 hours ago</span>
                  </div>
                </Link>
                <Link href="/forum/topic/2" className="block p-4 bg-seafoam rounded-lg hover:bg-teal-50 transition-colors border border-silver">
                  <h3 className="font-semibold text-slate mb-2">Market Prices for Sea Bass and Sea Bream</h3>
                  <p className="text-silver-600 text-sm">Current market trends and pricing strategies.</p>
                  <div className="flex items-center mt-2 text-xs text-silver-600">
                    <span>45 replies</span>
                    <span className="mx-2">•</span>
                    <span>5 hours ago</span>
                  </div>
                </Link>
                <Link href="/forum/topic/3" className="block p-4 bg-seafoam rounded-lg hover:bg-teal-50 transition-colors border border-silver">
                  <h3 className="font-semibold text-slate mb-2">New Regulations for Fish Imports</h3>
                  <p className="text-silver-600 text-sm">Understanding the latest EU regulations affecting our industry.</p>
                  <div className="flex items-center mt-2 text-xs text-silver-600">
                    <span>12 replies</span>
                    <span className="mx-2">•</span>
                    <span>1 day ago</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Start New Discussion */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold font-manrope text-slate mb-6">Start a New Discussion</h2>
              <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                // Handle form submission
              }} className="space-y-4">
                <div>
                  <label className="block text-slate font-medium mb-2">Topic Title</label>
                  <input
                    type="text"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                    className="w-full px-4 py-3 border border-silver rounded-lg text-slate placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="Enter your topic title"
                  />
                </div>
                <div>
                  <label className="block text-slate font-medium mb-2">Category</label>
                  <select
                    required
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {}}
                    className="w-full px-4 py-3 border border-silver rounded-lg text-slate focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="farming">Fish Farming</option>
                    <option value="market">Market & Sales</option>
                    <option value="regulations">Regulations & Compliance</option>
                    <option value="technology">Technology & Equipment</option>
                    <option value="general">General Discussion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate font-medium mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-silver rounded-lg text-slate placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                    placeholder="Write your message here..."
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Post Discussion
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}