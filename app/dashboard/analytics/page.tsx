'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { fetchOrdersBySeller, fetchProducts, fetchSellerByOwnerId } from '@/lib/firebase-data';
import { Order, Product } from '@/lib/types';

export default function AnalyticsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== 'seller') return;
    fetchSellerByOwnerId(user.uid).then(async (seller) => {
      if (!seller) return;
      const [orderRows, productRows] = await Promise.all([fetchOrdersBySeller(seller.id), fetchProducts({ sellerId: seller.id })]);
      setOrders(orderRows);
      setProducts(productRows);
    });
  }, [user]);

  const revenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
  const customers = useMemo(() => new Set(orders.map((order) => order.buyerEmail || order.buyerId)).size, [orders]);
  const topProducts = useMemo(() => {
    const totals = new Map<string, { name: string; quantity: number; revenue: number }>();
    orders.forEach((order) => order.items.forEach((item) => {
      const current = totals.get(item.productId) || { name: item.name, quantity: 0, revenue: 0 };
      current.quantity += item.quantityKg;
      current.revenue += item.quantityKg * item.pricePerKg;
      totals.set(item.productId, current);
    }));
    return Array.from(totals.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [orders]);

  if (!user || user.role !== 'seller') return null;

  const stats = [
    { label: 'Total Revenue', value: `€${revenue.toFixed(2)}`, icon: DollarSign },
    { label: 'Orders', value: String(orders.length), icon: ShoppingBag },
    { label: 'Products', value: String(products.length), icon: Package },
    { label: 'Customers', value: String(customers), icon: Users },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8"><h1 className="font-manrope font-bold text-2xl text-slate mb-1">Analytics</h1><p className="text-slate-500">Live marketplace analytics derived from real orders</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">{stats.map((stat) => <div key={stat.label} className="card p-5"><div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center mb-3"><stat.icon className="w-5 h-5 text-ocean" /></div><p className="text-slate-500 text-sm">{stat.label}</p><p className="font-manrope font-bold text-2xl text-slate">{stat.value}</p></div>)}</div>
      <div className="grid lg:grid-cols-2 gap-8"><div className="card p-6"><h2 className="font-manrope font-semibold text-lg text-slate mb-4">Top Products</h2><div className="space-y-3">{topProducts.length > 0 ? topProducts.map((item) => <div key={item.name} className="flex items-center justify-between p-3 bg-seafoam rounded-lg"><div><p className="font-medium text-slate">{item.name}</p><p className="text-sm text-slate-500">{item.quantity}kg sold</p></div><div className="font-semibold text-slate">€{item.revenue.toFixed(2)}</div></div>) : <p className="text-slate-500">No product sales yet.</p>}</div></div><div className="card p-6"><h2 className="font-manrope font-semibold text-lg text-slate mb-4">Order Status Mix</h2><div className="space-y-3">{['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => { const count = orders.filter((order) => order.status === status).length; return <div key={status} className="flex items-center justify-between p-3 bg-seafoam rounded-lg"><span className="capitalize text-slate">{status}</span><span className="font-semibold text-slate">{count}</span></div>; })}</div></div></div>
    </div>
  );
}
