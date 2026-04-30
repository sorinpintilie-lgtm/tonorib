'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { fetchOrdersBySeller, fetchSellerByOwnerId } from '@/lib/firebase-data';
import { Order } from '@/lib/types';

export default function CustomersPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== 'seller') return;
    fetchSellerByOwnerId(user.uid).then(async (seller) => {
      if (!seller) return;
      setOrders(await fetchOrdersBySeller(seller.id));
    });
  }, [user]);

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; orders: number; spent: number; lastOrder?: string }>();
    orders.forEach((order) => {
      const key = order.buyerEmail || order.buyerId;
      const current = map.get(key) || { name: order.buyerName || 'Buyer', email: order.buyerEmail || '', phone: order.shippingPhone || '', orders: 0, spent: 0, lastOrder: order.createdAt };
      current.orders += 1;
      current.spent += order.total;
      current.lastOrder = order.createdAt || current.lastOrder;
      map.set(key, current);
    });
    return Array.from(map.values()).filter((customer) => !searchQuery || `${customer.name} ${customer.email}`.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [orders, searchQuery]);

  if (!user || user.role !== 'seller') return null;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8"><h1 className="font-manrope font-bold text-2xl text-slate mb-1">Customers</h1><p className="text-slate-500">Real customers derived from your order history</p></div>
      <div className="card mb-6"><div className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" /><input type="text" placeholder="Search customers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-silver rounded-input text-sm" /></div></div></div>
      <div className="card overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-seafoam"><tr><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Customer</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Contact</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Orders</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Total Spent</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Last Order</th></tr></thead><tbody className="divide-y divide-silver/50">{customers.map((customer) => <tr key={customer.email || customer.name} className="hover:bg-seafoam/50"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center"><span className="text-white font-medium">{customer.name.charAt(0)}</span></div><span className="font-medium text-slate">{customer.name}</span></div></td><td className="px-5 py-4"><div className="text-sm"><p className="text-slate-600">{customer.email || '-'}</p><p className="text-slate-400">{customer.phone || '-'}</p></div></td><td className="px-5 py-4"><span className="font-medium text-slate">{customer.orders}</span></td><td className="px-5 py-4"><span className="font-semibold text-fresh">€{customer.spent.toFixed(2)}</span></td><td className="px-5 py-4 text-sm text-slate-500">{customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString('en-GB') : '-'}</td></tr>)}</tbody></table></div>{customers.length === 0 && <div className="p-8 text-slate-500">No customer data yet.</div>}</div>
    </div>
  );
}
