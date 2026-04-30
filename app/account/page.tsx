'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, MapPin, FileText, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { fetchOrdersByBuyer, fetchProductById } from '@/lib/firebase-data';
import { Order, Product } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    fetchOrdersByBuyer(user.uid).then(setOrders).catch(() => setOrders([]));
    Promise.all((user.savedProductIds || []).map((id) => fetchProductById(id))).then((rows) => setSavedProducts(rows.filter(Boolean) as Product[]));
  }, [user]);

  const totalSpent = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);

  if (loading) return <div className="min-h-screen bg-ice flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-ocean" /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8"><h1 className="font-manrope font-bold text-2xl text-slate mb-1">My Account</h1><p className="text-slate-500">Manage your real account data and orders</p></div>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="card p-5"><p className="text-slate-500 text-sm">Orders</p><p className="font-manrope font-bold text-2xl text-slate">{orders.length}</p></div>
          <div className="card p-5"><p className="text-slate-500 text-sm">Saved Products</p><p className="font-manrope font-bold text-2xl text-slate">{savedProducts.length}</p></div>
          <div className="card p-5"><p className="text-slate-500 text-sm">Addresses</p><p className="font-manrope font-bold text-2xl text-slate">{user.addresses?.length || 0}</p></div>
          <div className="card p-5"><p className="text-slate-500 text-sm">Total Spent</p><p className="font-manrope font-bold text-2xl text-slate">€{totalSpent.toFixed(2)}</p></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/account/orders" className="card p-6 hover:border-teal transition-colors"><ShoppingBag className="w-8 h-8 text-teal mb-3" /><h3 className="font-semibold text-slate mb-1">My Orders</h3><p className="text-sm text-slate-500">Track live orders stored in Firebase</p></Link>
          <Link href="/account/saved" className="card p-6 hover:border-teal transition-colors"><Heart className="w-8 h-8 text-teal mb-3" /><h3 className="font-semibold text-slate mb-1">Saved Products</h3><p className="text-sm text-slate-500">See products saved on your profile</p></Link>
          <Link href="/account/addresses" className="card p-6 hover:border-teal transition-colors"><MapPin className="w-8 h-8 text-teal mb-3" /><h3 className="font-semibold text-slate mb-1">Delivery Addresses</h3><p className="text-sm text-slate-500">Maintain your address list</p></Link>
          <Link href="/account/invoices" className="card p-6 hover:border-teal transition-colors"><FileText className="w-8 h-8 text-teal mb-3" /><h3 className="font-semibold text-slate mb-1">Invoices</h3><p className="text-sm text-slate-500">Review order totals and invoice references</p></Link>
          <Link href="/account/settings" className="card p-6 hover:border-teal transition-colors"><Settings className="w-8 h-8 text-teal mb-3" /><h3 className="font-semibold text-slate mb-1">Settings</h3><p className="text-sm text-slate-500">Update your profile details</p></Link>
        </div>
        {orders.length === 0 && <div className="card p-8 mt-8"><p className="text-slate-500 mb-4">You do not have any orders yet.</p><Link href="/catalog"><Button variant="primary">Browse Catalog</Button></Link></div>}
      </div>
    </div>
  );
}
