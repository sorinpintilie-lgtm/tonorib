'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ChevronRight, Loader2, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { mockOrders } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState(mockOrders);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-fresh" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-coral" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-teal" />;
      default:
        return <Package className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pending',
      paid: 'Paid',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      paid: 'bg-blue-50 text-blue-700 border border-blue-200',
      processing: 'bg-teal-50 text-teal-700 border border-teal-200',
      shipped: 'bg-purple-50 text-purple-700 border border-purple-200',
      delivered: 'bg-green-50 text-green-700 border border-green-200',
      cancelled: 'bg-red-50 text-red-700 border border-red-200',
    };
    return styles[status] || styles.pending;
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ocean" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/account" className="flex items-center gap-2 text-teal hover:text-teal-600 text-sm">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to account
          </Link>
        </div>

        <h1 className="font-manrope font-bold text-2xl text-slate mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-silver mx-auto mb-4" />
            <p className="text-slate-500 mb-6">You haven't placed any orders yet.</p>
            <Link href="/catalog">
              <Button variant="primary">Browse Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-slate">Order #{order.id.slice(-6)}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <span className={`badge ${getStatusStyle(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{getStatusLabel(order.status)}</span>
                  </span>
                </div>

                <div className="border-t border-silver/50 pt-4">
                  <p className="text-sm text-slate-600 mb-2">{order.items.length} items</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate">Total: €{order.total.toFixed(2)}</p>
                    <Link href={`/account/orders/${order.id}`}>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}