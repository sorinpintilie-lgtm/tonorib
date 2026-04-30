'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Fish, Truck, Shield, ArrowRight, CheckCircle, MapPin, Users, TrendingUp, Store, Gavel, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/catalog/product-card';
import { fetchProducts, fetchSellers } from '@/lib/firebase-data';
import { Product, SellerProfile } from '@/lib/types';
import { categories } from '@/lib/constants';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredSellers, setFeaturedSellers] = useState<SellerProfile[]>([]);

  useEffect(() => {
    fetchProducts().then((rows) => setFeaturedProducts(rows.slice(0, 6))).catch(() => setFeaturedProducts([]));
    fetchSellers().then((rows) => setFeaturedSellers(rows.slice(0, 4))).catch(() => setFeaturedSellers([]));
  }, []);

  const stats = [
    { value: `${featuredSellers.length}+`, label: 'Active Farms', icon: Store },
    { value: `${featuredProducts.length}+`, label: 'Live Products', icon: Fish },
    { value: '24h', label: 'Typical Delivery Window', icon: Users },
    { value: 'MVP', label: 'Live Marketplace Build', icon: TrendingUp },
  ];

  return (
    <div className="animate-fade-in">
      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero.png" alt="Fresh fish" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean/90 via-ocean/75 to-ocean/55" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="font-manrope font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Fresh fish marketplace, built for real buyers and real farms
            </h1>
            <p className="text-lg sm:text-xl text-silver-200 mb-8">
              Browse live products, compare sellers, place orders, follow auctions and join industry discussions in one place.
            </p>

            <form action="/catalog" className="relative max-w-xl mb-8">
              <div className="relative flex items-center">
                <Search className="absolute left-5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="search"
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

            <div className="flex flex-wrap gap-3">
              <Link href="/catalog" className="px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors">Browse catalog</Link>
              <Link href="/auction" className="px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors">Live auctions</Link>
              <Link href="/forum" className="px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors">Community forum</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-manrope font-semibold text-2xl lg:text-3xl text-slate">Categories</h2>
            <Link href="/catalog" className="flex items-center gap-2 text-teal hover:text-teal-600 transition-colors">
              <span className="hidden sm:inline">All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/catalog?category=${category.id}`} className="group p-6 bg-seafoam rounded-card text-center hover:bg-teal-50 transition-colors">
                <Fish className="w-10 h-10 mx-auto mb-3 text-ocean group-hover:text-teal transition-colors" />
                <h3 className="font-manrope font-semibold text-slate group-hover:text-ocean transition-colors">{category.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-12 lg:py-16 bg-seafoam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-fresh-50 flex items-center justify-center flex-shrink-0"><Fish className="w-6 h-6 text-fresh" /></div><div><h3 className="font-manrope font-semibold text-lg text-slate mb-2">Freshness first</h3><p className="text-slate-600 text-sm">Products are listed with stock, freshness and delivery regions.</p></div></div>
            <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0"><Shield className="w-6 h-6 text-teal" /></div><div><h3 className="font-manrope font-semibold text-lg text-slate mb-2">Verified seller flow</h3><p className="text-slate-600 text-sm">Seller accounts connect to a real dashboard and publish real products.</p></div></div>
            <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-coral-50 flex items-center justify-center flex-shrink-0"><Gavel className="w-6 h-6 text-coral" /></div><div><h3 className="font-manrope font-semibold text-lg text-slate mb-2">Real auctions</h3><p className="text-slate-600 text-sm">Auctions can be created and bid on with separate detail pages.</p></div></div>
            <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0"><MessageSquare className="w-6 h-6 text-ocean" /></div><div><h3 className="font-manrope font-semibold text-lg text-slate mb-2">Real discussions</h3><p className="text-slate-600 text-sm">Forum posts and replies are stored in Firestore.</p></div></div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-manrope font-semibold text-2xl lg:text-3xl text-slate mb-2">Featured Products</h2>
              <p className="text-slate-500">Live inventory pulled from the marketplace</p>
            </div>
            <Link href="/catalog" className="flex items-center gap-2 text-teal hover:text-teal-600 transition-colors">
              <span className="hidden sm:inline">Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          ) : (
            <div className="bg-ice rounded-card p-8 text-slate-500">No published products are available yet.</div>
          )}
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-manrope font-semibold text-2xl lg:text-3xl text-slate mb-2">Active Sellers</h2>
              <p className="text-slate-500">Seller profiles loaded from Firebase</p>
            </div>
            <Link href="/suppliers" className="flex items-center gap-2 text-teal hover:text-teal-600 transition-colors"><span className="hidden sm:inline">All Sellers</span><ArrowRight className="w-4 h-4" /></Link>
          </div>
          {featuredSellers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSellers.map((seller) => (
                <Link key={seller.id} href={`/supplier/${seller.id}`} className="card card-hover p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-ocean flex items-center justify-center">{seller.logoUrl ? <img src={seller.logoUrl} alt={seller.farmName} className="w-full h-full rounded-full object-cover" /> : <Store className="w-7 h-7 text-white" />}</div>
                    {seller.verified && <CheckCircle className="w-5 h-5 text-teal" />}
                  </div>
                  <h3 className="font-manrope font-semibold text-lg text-slate mb-1">{seller.farmName}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-2"><MapPin className="w-3.5 h-3.5" />{seller.location}</div>
                  <p className="text-sm text-slate-500">{seller.productsCount || 0} published products</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-card p-8 text-slate-500">No sellers found.</div>
          )}
        </div>
      </section>

      <section className="relative py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1559827260-dc66d9bef32b?w=1920&q=80" alt="Fish farming" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-ocean/85" /></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-manrope font-bold text-3xl lg:text-4xl text-white mb-4">Are you a fish farmer and want to sell?</h2>
              <p className="text-silver-200 mb-6">Create a seller account, publish products, manage orders, launch auctions and run your profile from one dashboard.</p>
              <ul className="space-y-2 mb-8">
                {['Firebase auth for real accounts', 'Seller profile stored in Firestore', 'Product publishing dashboard', 'Order-ready checkout flow'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-silver-200"><CheckCircle className="w-4 h-4 text-teal" />{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/register?role=seller"><Button variant="coral" size="lg">Become a Seller</Button></Link>
                <Link href="/dashboard"><Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean">Open Dashboard</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
