'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories, deliveryRegions, speciesOptions } from '@/lib/constants';
import { createProduct, fetchSellerByOwnerId, uploadImage } from '@/lib/firebase-data';
import { useAuth } from '@/lib/auth';

export default function AddProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({ name: '', species: '', category: 'fresh', description: '', pricePerKg: '', stockKg: '', minOrderKg: '1', freshnessDate: '', deliveryRegions: [] as string[], origin: '', images: [] as string[] });

  const updateFormData = (field: string, value: any) => setFormData((prev) => ({ ...prev, [field]: value }));
  const toggleDeliveryRegion = (region: string) => setFormData((prev) => ({ ...prev, deliveryRegions: prev.deliveryRegions.includes(region) ? prev.deliveryRegions.filter((r) => r !== region) : [...prev.deliveryRegions, region] }));

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const url = await uploadImage(file, 'products');
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const seller = await fetchSellerByOwnerId(user.uid);
      if (!seller) throw new Error('Seller profile not found.');
      await createProduct({
        sellerId: seller.id,
        name: formData.name,
        species: formData.species,
        speciesScientific: '',
        category: formData.category as any,
        pricePerKg: Number(formData.pricePerKg),
        stockKg: Number(formData.stockKg),
        minOrderKg: Number(formData.minOrderKg),
        unit: 'kg',
        freshnessDate: formData.freshnessDate ? new Date(formData.freshnessDate).toISOString() : '',
        images: formData.images,
        description: formData.description,
        origin: formData.origin,
        deliveryRegions: formData.deliveryRegions,
        isPublished: true,
      });
      router.push('/dashboard/products');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8"><Link href="/dashboard/products" className="p-2 hover:bg-seafoam rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-slate" /></Link><div><h1 className="font-manrope font-bold text-2xl text-slate mb-1">Add New Product</h1><p className="text-slate-500">Create a real published product in Firestore</p></div></div>
      <div className="card p-6 space-y-6">
        <Input label="Product Name" placeholder="Rainbow Trout - Fresh" value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} />
        <div className="grid sm:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium text-slate mb-2">Fish Species</label><select value={formData.species} onChange={(e) => updateFormData('species', e.target.value)} className="w-full px-4 py-3 border border-silver rounded-input bg-white"><option value="">Select species</option>{speciesOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-slate mb-2">Category</label><select value={formData.category} onChange={(e) => updateFormData('category', e.target.value)} className="w-full px-4 py-3 border border-silver rounded-input bg-white">{categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}</select></div>
        </div>
        <div><label className="block text-sm font-medium text-slate mb-2">Description</label><textarea value={formData.description} onChange={(e) => updateFormData('description', e.target.value)} rows={4} className="w-full px-4 py-3 border border-silver rounded-input bg-white resize-none" /></div>
        <div className="grid sm:grid-cols-3 gap-6"><Input label="Price per kg (€)" type="number" step="0.01" value={formData.pricePerKg} onChange={(e) => updateFormData('pricePerKg', e.target.value)} /><Input label="Stock (kg)" type="number" value={formData.stockKg} onChange={(e) => updateFormData('stockKg', e.target.value)} /><Input label="Minimum Order (kg)" type="number" value={formData.minOrderKg} onChange={(e) => updateFormData('minOrderKg', e.target.value)} /></div>
        <div className="grid sm:grid-cols-2 gap-6"><Input label="Freshness / Harvest Date" type="date" value={formData.freshnessDate} onChange={(e) => updateFormData('freshnessDate', e.target.value)} /><Input label="Origin / Location" value={formData.origin} onChange={(e) => updateFormData('origin', e.target.value)} /></div>
        <div><label className="block text-sm font-medium text-slate mb-2">Delivery Regions</label><div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">{deliveryRegions.map((region) => <button key={region} onClick={() => toggleDeliveryRegion(region)} type="button" className={`p-3 border rounded-lg text-left text-sm transition-colors ${formData.deliveryRegions.includes(region) ? 'border-ocean bg-ocean-50 text-ocean' : 'border-silver hover:border-teal'}`}>{region}</button>)}</div></div>
        <div><label className="block text-sm font-medium text-slate mb-2">Product Image</label><label className="border-2 border-dashed border-silver rounded-card p-8 text-center hover:border-teal transition-colors cursor-pointer block"><ImageIcon className="w-10 h-10 text-silver mx-auto mb-3" /><p className="text-slate-600 mb-1">Upload one image</p><p className="text-sm text-slate-400">PNG, JPG up to 5MB</p><input type="file" accept="image/*" onChange={handleFile} className="hidden" /></label>{imageUploading && <p className="text-sm text-slate-500 mt-2">Uploading...</p>}{formData.images[0] && <img src={formData.images[0]} alt="Preview" className="mt-3 h-28 rounded-lg object-cover" />}</div>
        <div className="flex justify-end"><Button variant="coral" onClick={handleSubmit} disabled={submitting || imageUploading}>{submitting ? 'Publishing...' : 'Publish Product'}</Button></div>
      </div>
    </div>
  );
}
