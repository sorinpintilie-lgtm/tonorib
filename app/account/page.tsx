'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  User, Package, Heart, MapPin, FileText, Settings, LogOut,
  ShoppingBag, Clock, ChevronRight, Plus, Edit, Trash2, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockOrders, mockProducts, mockSellers } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const accountNav = [
  { name: 'My Account', href: '/account', icon: User },
  { name: 'My Orders', href: '/account/orders', icon: ShoppingBag },
  { name: 'Saved Products', href: '/account/saved', icon: Heart },
  { name: 'Delivery Addresses', href: '/account/addresses', icon: MapPin },
  { name: 'Invoices', href: '/account/invoices', icon: FileText },
  { name: 'Settings', href: '/account/settings', icon: Settings },
];

export default function AccountPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const orders = mockOrders;

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ocean" />
      </div>
    );
  }

  if (!user) return null;
  
  // Mock saved products
  const savedProducts = mockProducts.slice(0, 4);

  // Mock addresses
  const addresses = [
    { id: '1', name: 'Home address', address: 'Trg mladih 5, 1000 Ljubljana', default: true },
    { id: '2', name: 'Business address', address: 'Dunajska cesta 15, 1000 Ljubljana', default: false },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      paid: 'bg-blue-50 text-blue-700 border border-blue-200',
      processing: 'bg-teal-50 text-teal-700 border border-teal-200',
      shipped: 'bg-purple-50 text-purple-700 border border-purple-200',
      delivered: 'bg-fresh-50 text-fresh border border-fresh-200',
      cancelled: 'bg-coral-50 text-coral border border-coral-200',
    };
    const labels: Record<string, string> = {
      pending: 'Pending',
      paid: 'Paid',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return (
      <span className={`badge ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-4">
              <div className="flex items-center gap-4 p-4 border-b border-silver/50 mb-4">
                <div className="w-14 h-14 rounded-full bg-ocean flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate">John Doe</p>
                  <p className="text-sm text-slate-500">john@example.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                {accountNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                        isActive 
                          ? 'bg-ocean-50 text-ocean' 
                          : 'text-slate-600 hover:bg-seafoam'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-seafoam transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Welcome */}
            <div className="card p-6">
              <h1 className="font-manrope font-bold text-2xl text-slate mb-2">
                Welcome, John!
              </h1>
              <p className="text-slate-500">
                Here is an overview of your account and activity.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-ocean" />
                  </div>
                  <span className="text-slate-500 text-sm">Orders</span>
                </div>
                <p className="font-manrope font-bold text-2xl text-slate">{orders.length}</p>
              </div>
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center">
                    <Heart className="w-5 h-5 text-ocean" />
                  </div>
                  <span className="text-slate-500 text-sm">Saved</span>
                </div>
                <p className="font-manrope font-bold text-2xl text-slate">{savedProducts.length}</p>
              </div>
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-ocean" />
                  </div>
                  <span className="text-slate-500 text-sm">Addresses</span>
                </div>
                <p className="font-manrope font-bold text-2xl text-slate">{addresses.length}</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card">
              <div className="flex items-center justify-between p-5 border-b border-silver/50">
                <h2 className="font-manrope font-semibold text-lg text-slate">Recent Orders</h2>
                <Link href="/account/orders" className="text-teal hover:text-teal-600 text-sm flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-seafoam">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Order</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Date</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Status</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Amount</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-silver/50">
                    {orders.slice(0, 3).map((order) => (
                      <tr key={order.id} className="hover:bg-seafoam/50">
                        <td className="px-5 py-4 font-medium text-slate">#{order.id.slice(-6)}</td>
                        <td className="px-5 py-4 text-sm text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString('en-US')}
                        </td>
                        <td className="px-5 py-4">{getStatusBadge(order.status)}</td>
                        <td className="px-5 py-4 font-semibold text-slate">€{order.total.toFixed(2)}</td>
                        <td className="px-5 py-4 text-right">
                          <Link href={`/account/orders/${order.id}`}>
                            <button className="text-teal hover:text-teal-600 text-sm">Details</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Saved Products */}
            <div className="card">
              <div className="flex items-center justify-between p-5 border-b border-silver/50">
                <h2 className="font-manrope font-semibold text-lg text-slate">Saved Products</h2>
                <Link href="/account/saved" className="text-teal hover:text-teal-600 text-sm flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {savedProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="group">
                    <div className="aspect-[4/3] bg-seafoam rounded-lg mb-2 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="font-medium text-slate text-sm group-hover:text-ocean">{product.name}</p>
                    <p className="text-coral font-semibold">€{product.pricePerKg.toFixed(2)}/kg</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div className="card">
              <div className="flex items-center justify-between p-5 border-b border-silver/50">
                <h2 className="font-manrope font-semibold text-lg text-slate">Delivery Addresses</h2>
                <button className="text-teal hover:text-teal-600 text-sm flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              <div className="p-5 space-y-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="flex items-start justify-between p-4 border border-silver rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate">{addr.name}</p>
                        {addr.default && (
                          <span className="badge badge-verified text-xs">Default</span>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm">{addr.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-teal">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-coral">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
