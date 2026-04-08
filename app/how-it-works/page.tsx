'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Fish, Search, ShoppingCart, Truck, Shield, CheckCircle, 
  Users, Store, DollarSign, Clock, ArrowRight, Package,
  MapPin, Phone, Mail, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HowItWorksPage() {
  const [activeRole, setActiveRole] = useState<'buyer' | 'seller'>('buyer');

  const buyerSteps = [
    {
      number: 1,
      title: 'Browse Catalog',
      description: 'Explore our wide selection of fresh fish from verified local farms. Use filters to find exactly what you need.',
      icon: Search,
    },
    {
      number: 2,
      title: 'Order Online',
      description: 'Add products to your cart, choose delivery address, and pay securely. Multiple payment options available.',
      icon: ShoppingCart,
    },
    {
      number: 3,
      title: 'Fresh Delivery',
      description: 'Receive your order within 24-48 hours, packed in insulated packaging to maintain freshness.',
      icon: Truck,
    },
    {
      number: 4,
      title: 'Enjoy & Review',
      description: 'Enjoy your fresh fish and leave a review to help other buyers.',
      icon: Star,
    },
  ];

  const sellerBenefits = [
    {
      title: 'Expand Your Reach',
      description: 'Access thousands of buyers across the region without your own e-commerce website.',
      icon: Users,
    },
    {
      title: 'Easy Management',
      description: 'Manage products, orders, and inventory from a simple seller dashboard.',
      icon: Package,
    },
    {
      title: 'Secure Payments',
      description: 'Get paid securely through the platform with order protection.',
      icon: Shield,
    },
    {
      title: 'Fast Delivery',
      description: 'Integrated logistics help you deliver fresh products quickly.',
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-ice">
      {/* Hero */}
      <section className="bg-ocean py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-manrope font-bold text-3xl sm:text-4xl text-white mb-4">
            How TonoRib Works
          </h1>
          <p className="text-lg text-silver-200 max-w-2xl mx-auto">
            A simple, secure marketplace connecting fish farmers with restaurants, 
            distributors, and quality-conscious buyers.
          </p>
        </div>
      </section>

      {/* Role Toggle */}
      <section className="bg-white border-b border-silver/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <Button
              variant={activeRole === 'buyer' ? 'primary' : 'outline'}
              onClick={() => setActiveRole('buyer')}
              size="lg"
            >
              For Buyers
            </Button>
            <Button
              variant={activeRole === 'seller' ? 'primary' : 'outline'}
              onClick={() => setActiveRole('seller')}
              size="lg"
            >
              For Sellers
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works for Buyers */}
      {activeRole === 'buyer' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-manrope font-bold text-2xl text-slate text-center mb-12">
              How to Buy
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {buyerSteps.map((step) => (
                <div key={step.number} className="card p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-manrope font-bold text-3xl text-ocean mb-2">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-slate mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 card p-8 bg-ocean">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-manrope font-bold text-xl text-white mb-3">
                    Why Buy on TonoRib?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-fresh" />
                      <span>Fresh fish directly from farms</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-fresh" />
                      <span>Verified sellers with quality certification</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-fresh" />
                      <span>Secure payments and order protection</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-fresh" />
                      <span>Delivery in 24-48 hours</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center lg:text-right">
                  <Link href="/catalog">
                    <Button variant="coral" size="lg">
                      Start Shopping
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How it Works for Sellers */}
      {activeRole === 'seller' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-manrope font-bold text-2xl text-slate text-center mb-12">
              Why Sell on TonoRib?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {sellerBenefits.map((benefit) => (
                <div key={benefit.title} className="card p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-seafoam flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-ocean" />
                  </div>
                  <h3 className="font-semibold text-slate mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-500">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 card p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-manrope font-bold text-xl text-slate mb-3">
                    Start Selling Today
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Join hundreds of fish farmers already selling on TonoRib. 
                    Set up your account and list products in minutes.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-fresh" />
                      <span>Free to register</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-fresh" />
                      <span>Low commission on sales</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-fresh" />
                      <span>Dedicated seller support</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center lg:text-right">
                  <Link href="/register?role=seller">
                    <Button variant="primary" size="lg">
                      Become a Seller
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope font-bold text-2xl text-slate text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-semibold text-slate mb-2">What areas do you deliver to?</h3>
              <p className="text-sm text-slate-500">
                Currently we deliver across Slovenia. Delivery regions vary by seller. 
                Check each product page for delivery availability.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-slate mb-2">How fresh is the fish?</h3>
              <p className="text-sm text-slate-500">
                All fish is harvested fresh and delivered within 24-48 hours. 
                Products show their harvest date so you know exactly how fresh they are.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-slate mb-2">What if I'm not satisfied?</h3>
              <p className="text-sm text-slate-500">
                Contact us within 24 hours of delivery. We offer solutions for 
                any quality issues to ensure your satisfaction.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-slate mb-2">How do I become a seller?</h3>
              <p className="text-sm text-slate-500">
                Register as a seller, complete your farm profile, and 
                start listing products. Verification typically takes 1-2 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-manrope font-bold text-2xl text-white mb-4">
            Have Questions?
          </h2>
          <p className="text-silver-200 mb-6">
            We're here to help. Reach out to our team.
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:info@tonorib.com" className="flex items-center gap-2 text-silver-100 hover:text-white">
              <Mail className="w-5 h-5" />
              info@tonorib.com
            </a>
            <a href="tel:+38612345678" className="flex items-center gap-2 text-silver-100 hover:text-white">
              <Phone className="w-5 h-5" />
              +386 1 234 5678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}