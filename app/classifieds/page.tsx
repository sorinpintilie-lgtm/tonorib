'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Classifieds() {
  return (
    <div className="bg-ice min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-manrope text-slate mb-4">Classifieds</h1>
          <p className="text-silver-600 text-lg">
            Buy and sell fish farming equipment, services, and more in our classifieds section.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search classifieds..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                className="w-full px-4 py-3 border border-silver rounded-lg text-slate placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="px-6">
                Search
              </Button>
              <Link href="/classifieds/create">
                <Button variant="primary" className="px-6">
                  Post a Classified
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
          {/* Classified Card 1 */}
          <Link href="/classifieds/1" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.737 1.707h17.414c.921 0 1.366-.807.737-1.707L20.705 5.293a1 1 0 00-1.414-1.414L12 9l-4.293-4.293a1 1 0 00-1.414 1.414L5.4 12H19l4 8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold font-manrope text-slate mb-2">Used Fish Farming Equipment</h3>
                <p className="text-silver-600 text-sm mb-3">Complete set of tanks, filters, and pumps for sale. In good condition.</p>
                <div className="flex items-center justify-between">
                  <span className="bg-teal-50 text-teal border border-teal-200 text-xs px-2 py-1 rounded font-medium">Equipment</span>
                  <span className="text-slate font-bold">€1,200</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Classified Card 2 */}
          <Link href="/classifieds/2" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold font-manrope text-slate mb-2">Fish Feed Supply Contract</h3>
                <p className="text-silver-600 text-sm mb-3">Long-term supply agreement for high-quality fish feed. Available immediately.</p>
                <div className="flex items-center justify-between">
                  <span className="bg-fresh-50 text-fresh border border-fresh-200 text-xs px-2 py-1 rounded font-medium">Services</span>
                  <span className="text-slate font-bold">Contact for pricing</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Classified Card 3 */}
          <Link href="/classifieds/3" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold font-manrope text-slate mb-2">Wanted: Fish Farm Consultant</h3>
                <p className="text-silver-600 text-sm mb-3">Experienced consultant needed for setting up a new tilapia farm.</p>
                <div className="flex items-center justify-between">
                  <span className="bg-coral-50 text-coral border border-coral-200 text-xs px-2 py-1 rounded font-medium">Jobs</span>
                  <span className="text-slate font-bold">Negotiable</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Classified Card 4 */}
          <Link href="/classifieds/4" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V9a2 2 0 00-2 2m2 2h6" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold font-manrope text-slate mb-2">Live Fish Transport Trucks</h3>
                <p className="text-silver-600 text-sm mb-3">Two refrigerated trucks for live fish transport. Well maintained.</p>
                <div className="flex items-center justify-between">
                  <span className="bg-[#E8EFF2] text-slate-700 border border-[#C9D6DF] text-xs px-2 py-1 rounded font-medium">Vehicles</span>
                  <span className="text-slate font-bold">€15,000 each</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}