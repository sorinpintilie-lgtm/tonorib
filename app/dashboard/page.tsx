'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, Package, 
  Users, AlertCircle, ArrowRight, Eye, Edit, Trash2
} from 'lucide-react';
import { mockProducts, mockOrders, mockSellers, getProductsBySeller } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  // Mock current seller data
  const seller = mockSellers[0];
  const products = getProductsBySeller(seller.id);
  const orders = mockOrders.filter(o => o.sellerId === seller.id);
  
  // Stats
  const stats = [
    {
      label: 'Total Sales',
      value: '€3,240',
      change: '+12%',
      positive: true,
      icon: DollarSign,
    },
    {
      label: 'Orders This Month',
      value: '28',
      change: '+8%',
      positive: true,
      icon: ShoppingBag,
    },
    {
      label: 'Active Products',
      value: products.length.toString(),
      change: '0%',
      positive: true,
      icon: Package,
    },
    {
      label: 'Customers',
      value: '156',
      change: '+5%',
      positive: true,
      icon: Users,
    },
  ];

  // Recent orders
  const recentOrders = orders.slice(0, 5);

  // Low stock products
  const lowStockProducts = products.filter(p => p.stockKg < 30);

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
    <div className="min-h-screen">
      {/* Header with Image */}
      <div className="relative h-48 bg-ocean overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1606850780554-b55a8d5dd415?w=1920&q=80"
          alt="Fish farm"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-ocean/50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          <div>
            <h1 className="font-manrope font-bold text-2xl text-white mb-1">
              Welcome, {seller.farmName}
            </h1>
            <p className="text-silver-200">Here is your sales overview</p>
          </div>
          <Link href="/dashboard/products/add">
            <Button variant="coral" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 pe-6 lg:py-8">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-ocean" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-fresh' : 'text-coral'}`}>
                  {stat.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-slate-500 text-sm">{stat.label}</p>
              <p className="font-manrope font-bold text-2xl text-slate">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between p-5 border-b border-silver/50">
              <h2 className="font-manrope font-semibold text-lg text-slate">Recent Orders</h2>
              <Link href="/dashboard/orders" className="text-teal hover:text-teal-600 text-sm flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-seafoam">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Order</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Customer</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Amount</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Date</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-silver/50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-seafoam/50">
                      <td className="px-5 py-4 text-sm font-medium text-slate">#{order.id.slice(-6)}</td>
                      <td className="px-5 py-4 text-sm text-slate-700">Janez Novak</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate">€{order.total.toFixed(2)}</td>
                      <td className="px-5 py-4">{getStatusBadge(order.status)}</td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-5 py-4">
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <button className="p-1.5 text-slate-400 hover:text-ocean transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="card">
            <div className="flex items-center justify-between p-5 border-b border-silver/50">
              <h2 className="font-manrope font-semibold text-lg text-slate">Alerts</h2>
            </div>
            <div className="p-5">
              {lowStockProducts.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-coral-50 rounded-lg border border-coral-200">
                    <AlertCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate text-sm">Low Stock</p>
                      <p className="text-sm text-slate-600">{lowStockProducts.length} products running low</p>
                    </div>
                  </div>
                  {lowStockProducts.slice(0, 3).map((product) => (
                    <Link
                      key={product.id}
                      href={`/dashboard/products/${product.id}/edit`}
                      className="flex items-center justify-between p-3 bg-white border border-silver rounded-lg hover:border-teal transition-colors"
                    >
                      <div>
                        <p className="font-medium text-slate text-sm">{product.name}</p>
                        <p className="text-xs text-slate-500">Only {product.stockKg} kg left</p>
                      </div>
                      <Edit className="w-4 h-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No alerts</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <Link href="/dashboard/products/add" className="card p-5 hover:border-teal transition-colors cursor-pointer">
            <Package className="w-8 h-8 text-teal mb-3" />
            <h3 className="font-semibold text-slate mb-1">Add New Product</h3>
            <p className="text-sm text-slate-500">Publish a new fish or seafood product</p>
          </Link>
          <Link href="/dashboard/orders" className="card p-5 hover:border-teal transition-colors cursor-pointer">
            <ShoppingBag className="w-8 h-8 text-teal mb-3" />
            <h3 className="font-semibold text-slate mb-1">View Orders</h3>
            <p className="text-sm text-slate-500">View all orders and statuses</p>
          </Link>
          <Link href="/dashboard/profile" className="card p-5 hover:border-teal transition-colors cursor-pointer">
            <Users className="w-8 h-8 text-teal mb-3" />
            <h3 className="font-semibold text-slate mb-1">Edit Profile</h3>
            <p className="text-sm text-slate-500">Update your farm details</p>
          </Link>
        </div>
      </div>
    </div>
  );
}