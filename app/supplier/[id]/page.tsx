'use client';

import { use, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, Star, CheckCircle, Phone, Mail, Clock, Truck, 
  Fish, Package, ChevronRight, Filter, Search
} from 'lucide-react';
import { getSellerById, getProductsBySeller, Seller, Product } from '@/lib/mock-data';
import { ProductCard } from '@/components/catalog/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SupplierPage({ params }: { params: { id: string } }) {
  const seller = getSellerById(params.id);
  const products = seller ? getProductsBySeller(seller.id) : [];
  const [activeTab, setActiveTab] = useState('products');

  if (!seller) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate mb-4">Prodajalec ne obstaja</h1>
          <Link href="/catalog">
            <Button>Nazaj na katalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ice">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-silver/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-ocean">Domov</Link>
            <span>/</span>
            <Link href="/suppliers" className="hover:text-ocean">Prodajalci</Link>
            <span>/</span>
            <span className="text-slate">{seller.farmName}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-marine bg-pattern py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center shadow-card">
              <Fish className="w-12 h-12 text-ocean" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-manrope font-bold text-2xl lg:text-3xl text-white">
                  {seller.farmName}
                </h1>
                {seller.verified && (
                  <Badge variant="teal" className="bg-white/20 border-white text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Preverjeno
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-silver-200">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {seller.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-coral fill-coral" />
                  <span className="font-medium">{seller.rating}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  <span>{products.length} izdelkov</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-ocean">
                <Mail className="w-4 h-4 mr-2" />
                Kontaktiraj
              </Button>
              <Button variant="coral">
                <Filter className="w-4 h-4 mr-2" />
                Vsi izdelki
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-white rounded-card p-1">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'products' 
                    ? 'bg-ocean text-white' 
                    : 'text-slate-600 hover:bg-seafoam'
                }`}
              >
                Izdelki ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'about' 
                    ? 'bg-ocean text-white' 
                    : 'text-slate-600 hover:bg-seafoam'
                }`}
              >
                O nas
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'reviews' 
                    ? 'bg-ocean text-white' 
                    : 'text-slate-600 hover:bg-seafoam'
                }`}
              >
                Mnenja
              </button>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
              <>
                {products.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="card p-12 text-center">
                    <Fish className="w-12 h-12 text-silver mx-auto mb-4" />
                    <p className="text-slate-500">Ta prodajalec nima objavljenih izdelkov.</p>
                  </div>
                )}
              </>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="card p-6">
                <h2 className="font-manrope font-semibold text-lg text-slate mb-4">O {seller.farmName}</h2>
                <p className="text-slate-700 leading-relaxed mb-6">{seller.description}</p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-seafoam rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-ocean" />
                      <span className="font-medium text-slate">Lokacija</span>
                    </div>
                    <p className="text-slate-600">{seller.location}</p>
                  </div>
                  <div className="p-4 bg-seafoam rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-ocean" />
                      <span className="font-medium text-slate">Član od</span>
                    </div>
                    <p className="text-slate-600">{new Date(seller.createdAt).toLocaleDateString('sl-SI', { year: 'numeric', month: 'long' })}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="card p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center">
                          <span className="text-white font-medium">J{review}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate">Janez K.</p>
                          <p className="text-sm text-slate-400">15. marca 2026</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-coral fill-coral" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600">
                      Odlična kakovost rib! Naročil sem postrv in bila je sveža in okusna. 
                      Priporočam vsem, ki iščejo kakovostne lokalne ribe.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Contact Card */}
            <div className="card p-6">
              <h3 className="font-semibold text-slate mb-4">Kontakt</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">info@{seller.farmName.toLowerCase().replace(/\s/g, '')}.si</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">+386 1 234 5678</span>
                </div>
              </div>
            </div>

            {/* Delivery Regions */}
            <div className="card p-6">
              <h3 className="font-semibold text-slate mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-ocean" />
                Regije dostave
              </h3>
              <div className="flex flex-wrap gap-2">
                {seller.deliveryRegions.map((region) => (
                  <Badge key={region} variant="default">{region}</Badge>
                ))}
              </div>
            </div>

            {/* Rating Summary */}
            <div className="card p-6">
              <h3 className="font-semibold text-slate mb-4">Ocena</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-manrope font-bold text-4xl text-slate">{seller.rating}</span>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-coral fill-coral" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">156 ocen</p>
                </div>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-8">{stars} ★</span>
                    <div className="flex-1 h-2 bg-seafoam rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-coral rounded-full" 
                        style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : '5%' }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-8">{stars === 5 ? '80' : stars === 4 ? '15' : '5'}%</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
