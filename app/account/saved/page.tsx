'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ChevronRight, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';
import { mockProducts, Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function SavedProductsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [savedProducts, setSavedProducts] = useState<Product[]>(mockProducts.slice(0, 4));

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const removeProduct = (productId: string) => {
    setSavedProducts(prev => prev.filter(p => p.id !== productId));
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/account" className="flex items-center gap-2 text-teal hover:text-teal-600 text-sm">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to account
          </Link>
        </div>

        <h1 className="font-manrope font-bold text-2xl text-slate mb-6">Saved Products</h1>

        {savedProducts.length === 0 ? (
          <div className="card p-12 text-center">
            <Heart className="w-12 h-12 text-silver mx-auto mb-4" />
            <p className="text-slate-500 mb-6">You haven't saved any products yet.</p>
            <Link href="/catalog">
              <Button variant="primary">Browse Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <div key={product.id} className="card overflow-hidden group">
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-[4/3] bg-seafoam overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-slate group-hover:text-ocean transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-500">{product.species}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-semibold text-coral">€{product.pricePerKg.toFixed(2)}/kg</p>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="p-2 text-slate-400 hover:text-coral transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}