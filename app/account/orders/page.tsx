'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { fetchOrdersByBuyer } from '@/lib/firebase-data';
import { Order } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => { if (user) fetchOrdersByBuyer(user.uid).then(setOrders).catch(() => setOrders([])); }, [user]);

  if (loading || !user) return <div className="min-h-screen bg-ice flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-ocean" /></div>;

  return (
    <div className="min-h-screen bg-ice py-8"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-6"><Link href="/account" className="flex items-center gap-2 text-teal hover:text-teal-600 text-sm"><ChevronRight className="w-4 h-4 rotate-180" />Back to account</Link></div><h1 className="font-manrope font-bold text-2xl text-slate mb-6">My Orders</h1>{orders.length === 0 ? <div className="card p-12 text-center"><p className="text-slate-500 mb-6">You do not have any orders yet.</p><Link href="/catalog"><Button variant="primary">Browse Catalog</Button></Link></div> : <div className="space-y-4">{orders.map((order) => <div key={order.id} className="card p-6"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"><div><p className="font-semibold text-slate">Order #{order.id.slice(-6)}</p><p className="text-sm text-slate-500">{order.createdAt ? new Date(order.createdAt).toLocaleString('en-GB') : '-'}</p></div><span className="badge badge-default">{order.status}</span></div><div className="mt-4 space-y-2">{order.items.map((item, index) => <div key={index} className="flex items-center justify-between text-sm"><span className="text-slate-600">{item.name} × {item.quantityKg}kg</span><span className="text-slate">€{(item.quantityKg * item.pricePerKg).toFixed(2)}</span></div>)}</div><div className="mt-4 pt-4 border-t border-silver/50 flex items-center justify-between"><span className="text-slate-500">Total</span><span className="font-semibold text-slate">€{order.total.toFixed(2)}</span></div></div>)}</div>}</div></div>
  );
}
