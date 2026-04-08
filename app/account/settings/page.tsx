'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Settings, ChevronRight, Loader2, User, Mail, Phone, Lock, Bell, Shield } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ocean" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/account" className="flex items-center gap-2 text-teal hover:text-teal-600 text-sm">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to account
          </Link>
        </div>

        <h1 className="font-manrope font-bold text-2xl text-slate mb-6">Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Section */}
          <div className="card p-6">
            <h2 className="font-semibold text-lg text-slate mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-ocean" />
              Profile Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="card p-6">
            <h2 className="font-semibold text-lg text-slate mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-ocean" />
              Change Password
            </h2>
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
              />
              <Input
                label="New Password"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </div>
          </div>

          {/* Notifications Section */}
          <div className="card p-6">
            <h2 className="font-semibold text-lg text-slate mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-ocean" />
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                  className="w-4 h-4 text-teal rounded"
                />
                <span className="text-sm text-slate-600">Email notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.orderUpdates}
                  onChange={(e) => setFormData(prev => ({ ...prev, orderUpdates: e.target.checked }))}
                  className="w-4 h-4 text-teal rounded"
                />
                <span className="text-sm text-slate-600">Order updates</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.marketingEmails}
                  onChange={(e) => setFormData(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                  className="w-4 h-4 text-teal rounded"
                />
                <span className="text-sm text-slate-600">Marketing emails</span>
              </label>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}