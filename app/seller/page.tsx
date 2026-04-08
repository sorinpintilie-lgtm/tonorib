'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { 
  Store, Fish, Package, ShoppingCart, Users, BarChart3,
  DollarSign, TrendingUp, Shield, Clock, ArrowRight, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SellerPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      if (user?.role === 'seller') {
        router.replace('/dashboard');
      }
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ocean border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user?.role === 'seller') {
    return null;
  }

  return (
    <div className="min-h-screen bg-ice">
      {/* Hero */}
      <section className="bg-ocean py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-manrope font-bold text-3xl sm:text-4xl text-white mb-4">
                Sell Your Fish on TonoRib
              </h1>
              <p className="text-lg text-silver-200 mb-6">
                Reach thousands of buyers across the region. 
                Easy to use, secure platform for fish farmers.
              </p>
              <Link href="/register?role=seller">
                <Button variant="coral" size="lg">
                  Start Selling
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-4">
                <Store className="w-8 h-8 text-ocean mb-2" />
                <p className="font-manrope font-bold text-2xl text-slate">500+</p>
                <p className="text-sm text-slate-500">Active Sellers</p>
              </div>
              <div className="card p-4">
                <Fish className="w-8 h-8 text-ocean mb-2" />
                <p className="font-manrope font-bold text-2xl text-slate">12K+</p>
                <p className="text-sm text-slate-500">Orders Fulfilled</p>
              </div>
              <div className="card p-4">
                <Users className="w-8 h-8 text-ocean mb-2" />
                <p className="font-manrope font-bold text-2xl text-slate">8K+</p>
                <p className="text-sm text-slate-500">Happy Customers</p>
              </div>
              <div className="card p-4">
                <TrendingUp className="w-8 h-8 text-ocean mb-2" />
                <p className="font-manrope font-bold text-2xl text-slate">98%</p>
                <p className="text-sm text-slate-500">5-Star Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope font-bold text-2xl text-slate text-center mb-12">
            Everything You Need to Sell
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-5">
              <Package className="w-8 h-8 text-ocean mb-3" />
              <h3 className="font-semibold text-slate mb-2">Product Management</h3>
              <p className="text-sm text-slate-500">
                Easy listings with images, pricing, and stock tracking.
              </p>
            </div>
            <div className="card p-5">
              <ShoppingCart className="w-8 h-8 text-ocean mb-3" />
              <h3 className="font-semibold text-slate mb-2">Order Management</h3>
              <p className="text-sm text-slate-500">
                Track orders, manage deliveries, and handle returns.
              </p>
            </div>
            <div className="card p-5">
              <BarChart3 className="w-8 h-8 text-ocean mb-3" />
              <h3 className="font-semibold text-slate mb-2">Sales Analytics</h3>
              <p className="text-sm text-slate-500">
                See what's selling, track revenue, and grow your business.
              </p>
            </div>
            <div className="card p-5">
              <Shield className="w-8 h-8 text-ocean mb-3" />
              <h3 className="font-semibold text-slate mb-2">Secure Payments</h3>
              <p className="text-sm text-slate-500">
                Get paid reliably with order protection for buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope font-bold text-2xl text-slate text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="card p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <p className="text-slate-500">Platform Fee</p>
              <p className="font-manrope font-bold text-4xl text-slate">
                10<span className="text-xl">%</span>
              </p>
              <p className="text-sm text-slate-500">on each sale</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-fresh" />
                <span>Unlimited product listings</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-fresh" />
                <span>Seller dashboard access</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-fresh" />
                <span>Customer support</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-fresh" />
                <span>Marketing exposure</span>
              </li>
            </ul>
            <Link href="/register?role=seller" className="block">
              <Button variant="primary" size="lg" className="w-full">
                Register as Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-manrope font-bold text-2xl text-white mb-4">
            Ready to Grow Your Fish Business?
          </h2>
          <p className="text-silver-200 mb-6">
            Join hundreds of fish farmers selling on TonoRib.
          </p>
          <Link href="/register?role=seller">
            <Button variant="coral" size="lg">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}