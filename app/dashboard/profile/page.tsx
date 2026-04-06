'use client';

import { useState } from 'react';
import { Fish, MapPin, Phone, Mail, Globe, Shield, Star, Save, Image as ImageIcon } from 'lucide-react';
import { mockSellers } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  const seller = mockSellers[0];
  const [formData, setFormData] = useState({
    farmName: seller.farmName,
    description: seller.description,
    location: seller.location,
    phone: '+386 1 234 5678',
    email: 'info@example.com',
    website: 'https://example.com',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-manrope font-bold text-2xl text-slate mb-1">Farm Profile</h1>
        <p className="text-slate-500">Manage your farm information</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6 border-b border-silver/50">
              <h2 className="font-manrope font-semibold text-lg text-slate">Basic Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <Input
                label="Farm Name"
                value={formData.farmName}
                onChange={(e) => updateFormData('farmName', e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-slate mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-silver rounded-input bg-white resize-none"
                />
              </div>

              <Input
                label="Location"
                placeholder="Location, City"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
              />
            </div>
          </div>

          <div className="card">
            <div className="p-6 border-b border-silver/50">
              <h2 className="font-manrope font-semibold text-lg text-slate">Contact Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
              <Input
                label="Website"
                placeholder="https://..."
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo/Avatar */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate mb-4">Logo</h3>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-ocean flex items-center justify-center mb-4">
                <Fish className="w-12 h-12 text-white" />
              </div>
              <button className="flex items-center gap-2 text-sm text-teal hover:text-teal-600">
                <ImageIcon className="w-4 h-4" />
                Upload new image
              </button>
            </div>
          </div>

          {/* Verification Status */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate mb-4">Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-fresh-50 rounded-lg border border-fresh-200">
                <Shield className="w-5 h-5 text-fresh" />
                <div>
                  <p className="font-medium text-slate text-sm">Verified Seller</p>
                  <p className="text-xs text-slate-500">Your farm is verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-seafoam rounded-lg">
                <Star className="w-5 h-5 text-coral" />
                <div>
                  <p className="font-medium text-slate text-sm">Rating: {seller.rating}</p>
                  <p className="text-xs text-slate-500">156 customer ratings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate mb-4">Statistics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Sales</span>
                <span className="font-medium text-slate">€3,240</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Orders</span>
                <span className="font-medium text-slate">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Products</span>
                <span className="font-medium text-slate">{seller.productsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Member since</span>
                <span className="font-medium text-slate">{new Date(seller.createdAt).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}