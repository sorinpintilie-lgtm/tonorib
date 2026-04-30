'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronRight, Loader2, Plus, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { saveUserAddresses } from '@/lib/firebase-data';
import { Button } from '@/components/ui/button';

export default function AddressesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [addresses, setAddresses] = useState(user?.addresses || [] as any[]);
  const [form, setForm] = useState({ label: '', address: '', city: '', postalCode: '', phone: '' });

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);
  useEffect(() => { setAddresses(user?.addresses || []); }, [user]);

  const addAddress = async () => {
    if (!user || !form.address || !form.city || !form.postalCode) return;
    const next = [...addresses, form];
    setAddresses(next);
    await saveUserAddresses(user.uid, next as any);
    setForm({ label: '', address: '', city: '', postalCode: '', phone: '' });
  };

  if (loading || !user) return <div className="min-h-screen bg-ice flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-ocean" /></div>;

  return (
    <div className="min-h-screen bg-ice py-8"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-6"><Link href="/account" className="flex items-center gap-2 text-teal hover:text-teal-600 text-sm"><ChevronRight className="w-4 h-4 rotate-180" />Back to account</Link></div><div className="flex items-center justify-between mb-6"><h1 className="font-manrope font-bold text-2xl text-slate">Delivery Addresses</h1></div><div className="card p-6 mb-6"><h2 className="font-semibold text-slate mb-4">Add address</h2><div className="grid sm:grid-cols-2 gap-4 mb-4"><input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Label" className="w-full px-4 py-3 border border-silver rounded-input bg-white" /><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full px-4 py-3 border border-silver rounded-input bg-white" /><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" className="w-full px-4 py-3 border border-silver rounded-input bg-white sm:col-span-2" /><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full px-4 py-3 border border-silver rounded-input bg-white" /><input value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} placeholder="Postal code" className="w-full px-4 py-3 border border-silver rounded-input bg-white" /></div><Button variant="primary" size="sm" onClick={addAddress}><Plus className="w-4 h-4 mr-2" />Add Address</Button></div>{addresses.length === 0 ? <div className="card p-12 text-center"><MapPin className="w-12 h-12 text-silver mx-auto mb-4" /><p className="text-slate-500">You haven't added any addresses yet.</p></div> : <div className="space-y-4">{addresses.map((address: any, index) => <div key={index} className="card p-6"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 mb-2"><h3 className="font-semibold text-slate">{address.label || `Address ${index + 1}`}</h3>{index === 0 && <span className="inline-flex items-center gap-1 text-xs text-fresh"><CheckCircle className="w-3 h-3" />Primary</span>}</div><p className="text-slate-600">{address.address}</p><p className="text-slate-600">{address.city}, {address.postalCode}</p><p className="text-slate-500 text-sm">{address.phone || '-'}</p></div></div></div>)}</div>}</div></div>
  );
}
