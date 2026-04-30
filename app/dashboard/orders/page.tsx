'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { fetchOrdersBySeller, fetchSellerByOwnerId } from '@/lib/firebase-data';
import { Order } from '@/lib/types';

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== 'seller') return;
    fetchSellerByOwnerId(user.uid).then(async (seller) => {
      if (!seller) return;
      const rows = await fetchOrdersBySeller(seller.id);
      setOrders(rows);
    });
  }, [user]);

  const filtered = useMemo(() => orders.filter((order) => {
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const text = `${order.buyerName || ''} ${order.buyerEmail || ''} ${order.id}`.toLowerCase();
    const matchesSearch = !searchQuery || text.includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  }), [orders, statusFilter, searchQuery]);

  if (!user || user.role !== 'seller') return null;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8"><h1 className="font-manrope font-bold text-2xl text-slate mb-1">Orders</h1><p className="text-slate-500">View and manage your real orders</p></div>
      <div className="card mb-6"><div className="p-4 flex flex-col sm:flex-row gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" /><input type="text" placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-silver rounded-input text-sm" /></div><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 bg-white border border-silver rounded-input text-sm min-w-[180px]"><option value="">All statuses</option><option value="pending">Pending</option><option value="paid">Paid</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select></div></div>
      <div className="card overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-seafoam"><tr><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Order</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Customer</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Items</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Amount</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Status</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Date</th></tr></thead><tbody className="divide-y divide-silver/50">{filtered.map((order) => <tr key={order.id} className="hover:bg-seafoam/50"><td className="px-5 py-4"><span className="font-medium text-slate">#{order.id.slice(-6)}</span></td><td className="px-5 py-4"><div><p className="text-sm font-medium text-slate">{order.buyerName || 'Buyer'}</p><p className="text-xs text-slate-500">{order.buyerEmail || order.shippingAddress}</p></div></td><td className="px-5 py-4"><div>{order.items.map((item, idx) => <p key={idx} className="text-sm text-slate">{item.quantityKg}kg × {item.name}</p>)}</div></td><td className="px-5 py-4"><span className="font-semibold text-slate">€{order.total.toFixed(2)}</span></td><td className="px-5 py-4"><span className="badge badge-default">{order.status}</span></td><td className="px-5 py-4 text-sm text-slate-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : '-'}</td></tr>)}</tbody></table></div>{filtered.length === 0 && <div className="p-8 text-slate-500">No orders found.</div>}</div>
    </div>
  );
}
