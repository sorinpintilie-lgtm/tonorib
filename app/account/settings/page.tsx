'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Loader2, User } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { updateUserProfile } from '@/lib/firebase-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);
  useEffect(() => { if (user) setFormData({ fullName: user.fullName || '', email: user.email || '', phone: user.phone || '' }); }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, { fullName: formData.fullName, phone: formData.phone });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) return <div className="min-h-screen bg-ice flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-ocean" /></div>;

  return (
    <div className="min-h-screen bg-ice py-8"><div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-6"><Link href="/account" className="flex items-center gap-2 text-teal hover:text-teal-600 text-sm"><ChevronRight className="w-4 h-4 rotate-180" />Back to account</Link></div><h1 className="font-manrope font-bold text-2xl text-slate mb-6">Settings</h1><form onSubmit={handleSubmit} className="space-y-6"><div className="card p-6"><h2 className="font-semibold text-lg text-slate mb-4 flex items-center gap-2"><User className="w-5 h-5 text-ocean" />Profile Information</h2><div className="space-y-4"><Input label="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} /><Input label="Email" value={formData.email} disabled onChange={() => {}} /><Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div></div><Button type="submit" variant="primary" disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</Button></form></div></div>
  );
}
