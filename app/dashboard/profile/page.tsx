'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Shield, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth';
import { fetchSellerByOwnerId, updateSellerProfile, uploadImage } from '@/lib/firebase-data';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sellerId, setSellerId] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ farmName: '', description: '', location: '', phone: '', email: '', website: '', logoUrl: '' });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== 'seller') return;
    fetchSellerByOwnerId(user.uid).then((seller) => {
      if (!seller) return;
      setSellerId(seller.id);
      setFormData({ farmName: seller.farmName || '', description: seller.description || '', location: seller.location || '', phone: seller.phone || '', email: seller.email || '', website: seller.website || '', logoUrl: seller.logoUrl || '' });
    });
  }, [user]);

  const save = async () => {
    if (!sellerId) return;
    setSaving(true);
    try {
      await updateSellerProfile(sellerId, formData);
    } finally {
      setSaving(false);
    }
  };

  const handleLogo = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const logoUrl = await uploadImage(file, 'seller-logos');
      setFormData((prev) => ({ ...prev, logoUrl }));
    } finally {
      setUploading(false);
    }
  };

  if (!user || user.role !== 'seller') return null;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8"><h1 className="font-manrope font-bold text-2xl text-slate mb-1">Farm Profile</h1><p className="text-slate-500">Manage your seller profile stored in Firebase</p></div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card"><div className="p-6 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg text-slate">Basic Information</h2></div><div className="p-6 space-y-6"><Input label="Farm Name" value={formData.farmName} onChange={(e) => setFormData({ ...formData, farmName: e.target.value })} /><div><label className="block text-sm font-medium text-slate mb-2">Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-3 border border-silver rounded-input bg-white resize-none" /></div><Input label="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} /></div></div>
          <div className="card"><div className="p-6 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg text-slate">Contact Information</h2></div><div className="p-6 space-y-6"><div className="grid sm:grid-cols-2 gap-6"><Input label="Phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /><Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div><Input label="Website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} /></div></div>
          <div className="flex justify-end"><Button variant="primary" className="flex items-center gap-2" onClick={save} disabled={saving}><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Changes'}</Button></div>
        </div>
        <div className="space-y-6">
          <div className="card p-6"><h3 className="font-semibold text-slate mb-4">Logo</h3><div className="flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-ocean flex items-center justify-center mb-4 overflow-hidden">{formData.logoUrl ? <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <Store className="w-12 h-12 text-white" />}</div><label className="flex items-center gap-2 text-sm text-teal hover:text-teal-600 cursor-pointer"><ImageIcon className="w-4 h-4" />{uploading ? 'Uploading...' : 'Upload new image'}<input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogo(e.target.files?.[0])} /></label></div></div>
          <div className="card p-6"><h3 className="font-semibold text-slate mb-4">Status</h3><div className="flex items-center gap-3 p-3 bg-seafoam rounded-lg"><Shield className="w-5 h-5 text-teal" /><div><p className="font-medium text-slate text-sm">Seller Profile Live</p><p className="text-xs text-slate-500">Profile updates save directly to Firestore</p></div></div></div>
        </div>
      </div>
    </div>
  );
}
