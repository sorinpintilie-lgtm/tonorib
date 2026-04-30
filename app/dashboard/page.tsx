'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DollarSign, ShoppingBag, Package, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { fetchOrdersBySeller, fetchProducts, fetchSellerByOwnerId } from '@/lib/firebase-data';
import { Order, Product, SellerProfile } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== 'seller') return;
    fetchSellerByOwnerId(user.uid).then(async (sellerProfile) => {
      setSeller(sellerProfile);
      if (!sellerProfile) return;
      const [sellerProducts, sellerOrders] = await Promise.all([
        fetchProducts({ sellerId: sellerProfile.id }),
        fetchOrdersBySeller(sellerProfile.id),
      ]);
      setProducts(sellerProducts);
      setOrders(sellerOrders);
    });
  }, [user]);

  const totalSales = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
  const lowStockProducts = products.filter((p) => p.stockKg < 20);
  const uniqueCustomers = new Set(orders.map((order) => order.buyerEmail || order.buyerId)).size;

  if (!user || user.role !== 'seller') return null;

  const stats = [
    { label: 'Total Sales', value: `€${totalSales.toFixed(2)}`, icon: DollarSign },
    { label: 'Orders', value: String(orders.length), icon: ShoppingBag },
    { label: 'Active Products', value: String(products.length), icon: Package },
    { label: 'Customers', value: String(uniqueCustomers), icon: Users },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative h-48 bg-ocean overflow-hidden"><img src="https://images.unsplash.com/photo-1606850780554-b55a8d5dd415?w=1920&q=80" alt="Fish farm" className="w-full h-full object-cover opacity-30" /><div className="absolute inset-0 bg-ocean/50" /><div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between"><div><h1 className="font-manrope font-bold text-2xl text-white mb-1">Welcome, {seller?.farmName || user.fullName}</h1><p className="text-silver-200">Live seller dashboard connected to Firebase</p></div><Link href="/dashboard/products/add"><Button variant="coral">Add Product</Button></Link></div></div>
      <div className="p-6 lg:p-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">{stats.map((stat) => <div key={stat.label} className="card p-5"><div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center mb-3"><stat.icon className="w-5 h-5 text-ocean" /></div><p className="text-slate-500 text-sm">{stat.label}</p><p className="font-manrope font-bold text-2xl text-slate">{stat.value}</p></div>)}</div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card"><div className="flex items-center justify-between p-5 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg text-slate">Recent Orders</h2><Link href="/dashboard/orders" className="text-teal text-sm">View all</Link></div><div className="divide-y divide-silver/50">{orders.length > 0 ? orders.slice(0, 5).map((order) => <div key={order.id} className="p-5 flex items-center justify-between"><div><p className="font-medium text-slate">#{order.id.slice(-6)}</p><p className="text-sm text-slate-500">{order.buyerName || order.buyerEmail || 'Buyer'} • {order.items.length} items</p></div><div className="text-right"><p className="font-semibold text-slate">€{order.total.toFixed(2)}</p><p className="text-sm text-slate-500">{order.status}</p></div></div>) : <div className="p-5 text-slate-500">No orders yet.</div>}</div></div>
          <div className="card"><div className="flex items-center justify-between p-5 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg text-slate">Alerts</h2></div><div className="p-5">{lowStockProducts.length > 0 ? <div className="space-y-4"><div className="flex items-start gap-3 p-3 bg-coral-50 rounded-lg border border-coral-200"><AlertCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" /><div><p className="font-medium text-slate text-sm">Low Stock</p><p className="text-sm text-slate-600">{lowStockProducts.length} products running low</p></div></div>{lowStockProducts.slice(0, 3).map((product) => <Link key={product.id} href="/dashboard/products" className="block p-3 bg-white border border-silver rounded-lg hover:border-teal"><p className="font-medium text-slate text-sm">{product.name}</p><p className="text-xs text-slate-500">Only {product.stockKg} kg left</p></Link>)}</div> : <p className="text-slate-500 text-sm">No alerts</p>}</div></div>
        </div>
      </div>
    </div>
  );
}
