'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Star, CheckCircle, Phone, Mail, Clock, Truck, Store } from 'lucide-react';
import { fetchProducts, fetchSellerById } from '@/lib/firebase-data';
import { Product, SellerProfile } from '@/lib/types';
import { ProductCard } from '@/components/catalog/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SupplierPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'about'>('products');

  useEffect(() => {
    fetchSellerById(params.id).then(setSeller).catch(() => setSeller(null));
    fetchProducts({ sellerId: params.id }).then(setProducts).catch(() => setProducts([]));
  }, [params.id]);

  if (!seller) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate mb-4">Seller not found</h1><Button onClick={() => router.push('/suppliers')}>Back to sellers</Button></div></div>;
  }

  return (
    <div className="min-h-screen bg-ice">
      <div className="bg-white border-b border-silver/50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"><div className="flex items-center gap-2 text-sm text-slate-500"><Link href="/" className="hover:text-ocean">Home</Link><span>/</span><Link href="/suppliers" className="hover:text-ocean">Sellers</Link><span>/</span><span className="text-slate">{seller.farmName}</span></div></div></div>

      <div className="bg-gradient-marine bg-pattern py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center shadow-card overflow-hidden">{seller.logoUrl ? <img src={seller.logoUrl} alt={seller.farmName} className="w-full h-full object-cover" /> : <Store className="w-12 h-12 text-ocean" />}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2"><h1 className="font-manrope font-bold text-2xl lg:text-3xl text-white">{seller.farmName}</h1>{seller.verified && <Badge variant="teal" className="bg-white/20 border-white text-white"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>}</div>
              <div className="flex flex-wrap items-center gap-4 text-silver-200">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{seller.location}</div>
                <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-coral fill-coral" /><span className="font-medium">{seller.rating || 0}</span></div>
                <div className="flex items-center gap-1.5"><Truck className="w-4 h-4" /><span>{products.length} products</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex gap-1 mb-6 bg-white rounded-card p-1">
              <button onClick={() => setActiveTab('products')} className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'products' ? 'bg-ocean text-white' : 'text-slate-600 hover:bg-seafoam'}`}>Products ({products.length})</button>
              <button onClick={() => setActiveTab('about')} className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'about' ? 'bg-ocean text-white' : 'text-slate-600 hover:bg-seafoam'}`}>About</button>
            </div>

            {activeTab === 'products' ? (
              products.length > 0 ? <div className="grid sm:grid-cols-2 gap-6">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="card p-12 text-center text-slate-500">This seller has no published products.</div>
            ) : (
              <div className="card p-6">
                <h2 className="font-manrope font-semibold text-lg text-slate mb-4">About {seller.farmName}</h2>
                <p className="text-slate-700 leading-relaxed mb-6">{seller.description}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-seafoam rounded-lg"><div className="flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-ocean" /><span className="font-medium text-slate">Location</span></div><p className="text-slate-600">{seller.location}</p></div>
                  <div className="p-4 bg-seafoam rounded-lg"><div className="flex items-center gap-2 mb-2"><Clock className="w-5 h-5 text-ocean" /><span className="font-medium text-slate">Member since</span></div><p className="text-slate-600">{seller.createdAt ? new Date(seller.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Recently added'}</p></div>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-slate mb-4">Contact</h3>
              <div className="space-y-3">
                {seller.email && <div className="flex items-center gap-3 text-slate-600"><Mail className="w-4 h-4 text-slate-400" /><span className="text-sm">{seller.email}</span></div>}
                {seller.phone && <div className="flex items-center gap-3 text-slate-600"><Phone className="w-4 h-4 text-slate-400" /><span className="text-sm">{seller.phone}</span></div>}
                {!seller.email && !seller.phone && <p className="text-sm text-slate-500">Contact details are not available yet.</p>}
              </div>
            </div>
            <div className="card p-6"><h3 className="font-semibold text-slate mb-4 flex items-center gap-2"><Truck className="w-5 h-5 text-ocean" />Delivery regions</h3><div className="flex flex-wrap gap-2">{seller.deliveryRegions?.length ? seller.deliveryRegions.map((region) => <Badge key={region}>{region}</Badge>) : <p className="text-sm text-slate-500">No delivery regions added yet.</p>}</div></div>
          </aside>
        </div>
      </div>
    </div>
  );
}
