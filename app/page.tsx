'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Fish, Truck, Shield, Clock, Star, ArrowRight, CheckCircle, MapPin, Users, TrendingUp, Store, ShoppingCart } from 'lucide-react';
import { mockProducts, mockSellers, categories } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/catalog/product-card';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = mockProducts.slice(0, 6);
  const featuredSellers = mockSellers.slice(0, 4);

  const stats = [
    { value: '50+', label: 'Verified Farms', icon: Store },
    { value: '200+', label: 'Product Varieties', icon: Fish },
    { value: '1000+', label: 'Happy Customers', icon: Users },
    { value: '98%', label: 'Fresh Delivery', icon: TrendingUp },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Image Background */}
      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1580476262798-b7d767ce8521?w=1920&q=80"
            alt="Fresh fish on ice"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-ocean/95 via-ocean/80 to-ocean/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="font-manrope font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Fresh Fish Direct from Trusted Farms
            </h1>
            <p className="text-lg sm:text-xl text-silver-200 mb-8">
              A modern marketplace for aquaculture sellers and buyers. 
              Buy fresh, sell with confidence. Professional platform for regional fish trade.
            </p>

            {/* Hero Search */}
            <form onSubmit={handleSearch} className="relative max-w-xl mb-8">
              <div className="relative flex items-center">
                <Search className="absolute left-5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search trout, sea bream, sea bass..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-36 py-4 bg-white rounded-full text-slate shadow-card focus:outline-none focus:ring-4 focus:ring-white/20"
                />
                <Button type="submit" variant="coral" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6">
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3">
              <span className="text-silver-300 text-sm">Popular:</span>
              {['Rainbow Trout', 'Sea Bream', 'Sea Bass', 'Carp'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    window.location.href = `/catalog?search=${term}`;
                  }}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-manrope font-semibold text-2xl lg:text-3xl text-slate">
              Categories
            </h2>
            <Link href="/catalog" className="flex items-center gap-2 text-teal hover:text-teal-600 transition-colors">
              <span className="hidden sm:inline">All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="group p-6 bg-seafoam rounded-card text-center hover:bg-teal-50 transition-colors"
              >
                <Fish className="w-10 h-10 mx-auto mb-3 text-ocean group-hover:text-teal transition-colors" />
                <h3 className="font-manrope font-semibold text-slate group-hover:text-ocean transition-colors">
                  {category.label}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-teal" />
                <p className="font-manrope font-bold text-3xl lg:text-4xl text-white mb-1">{stat.value}</p>
                <p className="text-silver-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 lg:py-16 bg-seafoam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-fresh-50 flex items-center justify-center flex-shrink-0">
                <Fish className="w-6 h-6 text-fresh" />
              </div>
              <div>
                <h3 className="font-manrope font-semibold text-lg text-slate mb-2">Freshness Guaranteed</h3>
                <p className="text-slate-600 text-sm">
                  All products are fresh or frozen immediately after catch. Delivery within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-teal" />
              </div>
              <div>
                <h3 className="font-manrope font-semibold text-lg text-slate mb-2">Verified Sellers</h3>
                <p className="text-slate-600 text-sm">
                  All sellers are manually verified with certifications and references.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-coral-50 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-coral" />
              </div>
              <div>
                <h3 className="font-manrope font-semibold text-lg text-slate mb-2">Delivery Across Region</h3>
                <p className="text-slate-600 text-sm">
                  We deliver throughout the region. Cold chain for freshness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-manrope font-semibold text-2xl lg:text-3xl text-slate mb-2">
                Featured Products
              </h2>
              <p className="text-slate-500">Most popular products this week</p>
            </div>
            <Link href="/catalog" className="flex items-center gap-2 text-teal hover:text-teal-600 transition-colors">
              <span className="hidden sm:inline">Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="py-12 lg:py-16 bg-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-manrope font-semibold text-2xl lg:text-3xl text-slate mb-2">
                Top Fish Farms
              </h2>
              <p className="text-slate-500">Meet the best regional sellers</p>
            </div>
            <Link href="/suppliers" className="flex items-center gap-2 text-teal hover:text-teal-600 transition-colors">
              <span className="hidden sm:inline">All Sellers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSellers.map((seller) => (
              <Link
                key={seller.id}
                href={`/supplier/${seller.id}`}
                className="card card-hover p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-ocean flex items-center justify-center">
                    <Fish className="w-7 h-7 text-white" />
                  </div>
                  {seller.verified && (
                    <CheckCircle className="w-5 h-5 text-teal" />
                  )}
                </div>
                <h3 className="font-manrope font-semibold text-lg text-slate mb-1">
                  {seller.farmName}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {seller.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-coral fill-coral" />
                  <span className="font-medium text-slate">{seller.rating}</span>
                  <span className="text-slate-400 text-sm">({seller.productsCount} products)</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Buyers */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-manrope font-semibold text-2xl lg:text-3xl text-slate mb-4">
              How It Works for Buyers
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Buying fresh fish has never been easier. In three simple steps to your products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-seafoam flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="font-manrope font-semibold text-lg text-slate mb-2">1. Find Products</h3>
              <p className="text-slate-500 text-sm">
                Browse the catalog, filter by type, delivery or price.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-seafoam flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="font-manrope font-semibold text-lg text-slate mb-2">2. Order</h3>
              <p className="text-slate-500 text-sm">
                Choose quantity, add to cart and complete order.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-seafoam flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="font-manrope font-semibold text-lg text-slate mb-2">3. Receive</h3>
              <p className="text-slate-500 text-sm">
                Delivery to your address. Fresh and fast anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Seller CTA */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559827260-dc66d9bef32b?w=1920&q=80"
            alt="Fish farming"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ocean/85" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-manrope font-bold text-3xl lg:text-4xl text-white mb-4">
                Are You a Fish Farmer and Want to Sell?
              </h2>
              <p className="text-silver-200 mb-6">
                Join the TonoRib marketplace and reach new customers. 
                Easy registration, powerful selling tools and reliable delivery.
              </p>
              <ul className="space-y-2 mb-8">
                {['Free Registration', 'Your Online Store', 'Delivery or Pickup', 'Cash on Delivery or Bank Transfer'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-silver-200">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/register?role=seller">
                  <Button variant="coral" size="lg">Become a Seller</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean">
                    More Info
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block w-80 h-80 relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
              <Fish className="w-64 h-64 text-white/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}