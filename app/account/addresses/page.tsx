'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronRight, Loader2, Plus, Edit, Trash2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', name: 'Home', address: 'Trg mladih 5', city: 'Ljubljana', postalCode: '1000', phone: '+386 40 123 456', isDefault: true },
    { id: '2', name: 'Office', address: 'Dunajska cesta 15', city: 'Ljubljana', postalCode: '1000', phone: '+386 1 234 567', isDefault: false },
  ]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/account" className="flex items-center gap-2 text-teal hover:text-teal-600 text-sm">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to account
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="font-manrope font-bold text-2xl text-slate">Delivery Addresses</h1>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
        </div>

        {addresses.length === 0 ? (
          <div className="card p-12 text-center">
            <MapPin className="w-12 h-12 text-silver mx-auto mb-4" />
            <p className="text-slate-500 mb-6">You haven't added any addresses yet.</p>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="card p-5 flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-ocean" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate">{addr.name}</p>
                      {addr.isDefault && (
                        <span className="badge badge-verified text-xs">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{addr.address}</p>
                    <p className="text-sm text-slate-600">{addr.postalCode}, {addr.city}</p>
                    <p className="text-sm text-slate-500 mt-1">{addr.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="p-2 text-slate-400 hover:text-teal transition-colors"
                      title="Set as default"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 text-slate-400 hover:text-ocean transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteAddress(addr.id)}
                    className="p-2 text-slate-400 hover:text-coral transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}