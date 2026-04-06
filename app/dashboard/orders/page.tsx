'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, Search, Eye, Package, Truck, CheckCircle, 
  X, Clock, AlertCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { mockOrders, mockSellers } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const seller = mockSellers[0];
  const orders = mockOrders.filter(o => o.sellerId === seller.id);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const statusOptions = [
    { value: '', label: 'All statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-manrope font-bold text-2xl text-slate mb-1">Orders</h1>
        <p className="text-slate-500">View and manage your orders</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-silver rounded-input text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-silver rounded-input text-sm min-w-[180px]"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-seafoam">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Order</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Customer</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Items</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Amount</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Status</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Date</th>
                <th className="px-5 py-4 text-right text-xs font-semibold text-slate uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silver/50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-seafoam/50">
                  <td className="px-5 py-4">
                    <span className="font-medium text-slate">#{order.id.slice(-6)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate">Janez Novak</p>
                      <p className="text-xs text-slate-500">{order.shippingAddress}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-slate">
                          {item.quantityKg}kg x {item.name}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate">€{order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-5 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-ocean transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-silver/50 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing {orders.length} orders</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}