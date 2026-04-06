'use client';

import { useState, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCart, MapPin, Star, CheckCircle, Clock, Truck, 
  ChevronLeft, ChevronRight, Package, Fish, Shield, MessageCircle,
  Minus, Plus, Heart, Share2, AlertCircle
} from 'lucide-react';
import { getProductById, getSellerById, mockProducts, Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/catalog/product-card';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const product = getProductById(params.id);
  const seller = product ? getSellerById(product.sellerId) : null;
  const [quantity, setQuantity] = useState(product?.minOrderKg || 1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate mb-4">Izdelek ne obstaja</h1>
          <Button onClick={() => router.push('/catalog')}>Nazaj na katalog</Button>
        </div>
      </div>
    );
  }

  // Get related products from same seller
  const relatedProducts = mockProducts
    .filter(p => p.sellerId === product.sellerId && p.id !== product.id)
    .slice(0, 3);

  // Calculate freshness
  const getFreshnessInfo = () => {
    if (!product.freshnessDate) return { label: 'Ni podatka', color: 'gray' };
    const freshness = new Date(product.freshnessDate);
    const today = new Date();
    const daysDiff = Math.floor((freshness.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return { label: 'Pretečen', color: 'red' };
    if (daysDiff === 0) return { label: 'Danes svež', color: 'green' };
    if (daysDiff <= 2) return { label: 'Zelo svež', color: 'green' };
    if (daysDiff <= 5) return { label: 'Svež', color: 'green' };
    return { label: ' свеž', color: 'yellow' };
  };

  const freshnessInfo = getFreshnessInfo();

  // Calculate total price
  const totalPrice = quantity * product.pricePerKg;
  const isInStock = product.stockKg > 0;
  const isLowStock = product.stockKg > 0 && product.stockKg < product.minOrderKg * 2;

  // Format category label
  const categoryLabels: Record<string, string> = {
    fresh: 'Sveže',
    frozen: 'Zamrznjeno',
    smoked: 'Dimljeno',
    live: 'Živo',
    fillet: 'File',
  };

  const tabs = [
    { id: 'description', label: 'Opis' },
    { id: 'farming', label: 'Gojenje' },
    { id: 'delivery', label: 'Dostava' },
    { id: 'reviews', label: 'Mnenja (12)' },
  ];

  return (
    <div className="min-h-screen bg-ice">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-silver/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-ocean">Domov</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-ocean">Katalog</Link>
            <span>/</span>
            <span className="text-slate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-white rounded-card overflow-hidden">
              <Image
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.category === 'fresh' && (
                  <Badge variant="fresh" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {freshnessInfo.label}
                  </Badge>
                )}
                {!isInStock && (
                  <Badge variant="stock">Ni na zalogi</Badge>
                )}
                {isInStock && isLowStock && (
                  <Badge variant="coral">Zadnji kosi</Badge>
                )}
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate" />
                  </button>
                  <button
                    onClick={() => setActiveImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <ChevronRight className="w-5 h-5 text-slate" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      activeImage === index ? 'border-ocean' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="default">{categoryLabels[product.category]}</Badge>
              {product.category === 'fresh' && product.freshnessDate && (
                <span className="text-sm text-slate-500">
                  Pobran: {new Date(product.freshnessDate).toLocaleDateString('sl-SI')}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-manrope font-bold text-2xl lg:text-3xl text-slate mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-slate-500 mb-4">{product.species}</p>
            {product.speciesScientific && (
              <p className="text-sm text-slate-400 italic mb-4">{product.speciesScientific}</p>
            )}

            {/* Seller Info */}
            {seller && (
              <Link
                href={`/supplier/${seller.id}`}
                className="flex items-center gap-3 p-3 bg-white rounded-card mb-6 hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center">
                  <Fish className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate">{seller.farmName}</h3>
                    {seller.verified && <CheckCircle className="w-4 h-4 text-teal" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {seller.location}
                    <span>•</span>
                    <Star className="w-3.5 h-3.5 text-coral fill-coral" />
                    {seller.rating}
                  </div>
                </div>
              </Link>
            )}

            {/* Price Section */}
            <div className="bg-white rounded-card p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-manrope font-bold text-3xl text-coral">
                  €{product.pricePerKg.toFixed(2)}
                </span>
                <span className="text-slate-500">/kg</span>
              </div>

              {/* Stock Info */}
              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className={`flex items-center gap-1.5 ${isInStock ? 'text-fresh' : 'text-coral'}`}>
                  {isInStock ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {isInStock ? `Na zalogi: ${product.stockKg} kg` : 'Ni na zalogi'}
                </span>
                {product.minOrderKg > 1 && (
                  <span className="text-slate-500">
                    Min. naročilo: {product.minOrderKg} kg
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              {isInStock && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-slate-700">Količina (kg):</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(product.minOrderKg, quantity - 1))}
                      disabled={quantity <= product.minOrderKg}
                      className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockKg, quantity + 1))}
                      disabled={quantity >= product.stockKg}
                      className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Estimated Total */}
              <div className="flex items-center justify-between py-4 border-t border-silver/50 mb-6">
                <span className="text-slate-700">Skupaj:</span>
                <span className="font-manrope font-bold text-xl text-slate">€{totalPrice.toFixed(2)}</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="coral"
                  size="lg"
                  disabled={!isInStock}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Dodaj v košarico
                </Button>
                <Button variant="outline" size="lg" className="flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-card p-6">
              <h3 className="font-semibold text-slate mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-ocean" />
                Možnosti dostave
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>Osebni prevzem</span>
                  </div>
                  <span className="text-slate-600">Brezplačno</span>
                </div>
                {product.deliveryRegions.slice(0, 3).map((region) => (
                  <div key={region} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-400" />
                      <span>Dostava: {region}</span>
                    </div>
                    <span className="text-slate-600">€12</span>
                  </div>
                ))}
                {product.deliveryRegions.length > 3 && (
                  <p className="text-sm text-slate-500">
                    + {product.deliveryRegions.length - 3} drugih regij
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-card mb-12">
          {/* Tab Navigation */}
          <div className="border-b border-silver/50">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-ocean text-ocean'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-slate-700 leading-relaxed">{product.description}</p>
                <h4 className="font-semibold text-slate mt-6 mb-3">Podatki o izdelku</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Vrsta ribe:</span>
                    <span className="ml-2 text-slate-700">{product.species}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">KategorUla:</span>
                    <span className="ml-2 text-slate-700">{categoryLabels[product.category]}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Izvor:</span>
                    <span className="ml-2 text-slate-700">{product.origin}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Enota:</span>
                    <span className="ml-2 text-slate-700">kg</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'farming' && (
              <div className="space-y-4">
                <p className="text-slate-700">
                  Izdelek prihaja iz {seller?.farmName}, {seller?.location}. 
                  {seller?.description}
                </p>
                <div className="flex items-start gap-3 p-4 bg-seafoam rounded-lg">
                  <Shield className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate">Preverjena kakovost</h4>
                    <p className="text-sm text-slate-600">Ta prodajalec ima certifikat za kakovost in redno preverjane izdelke.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-seafoam rounded-lg">
                  <Package className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate">Pakiranje</h4>
                    <p className="text-sm text-slate-600">Izdelek je pakiran v hladilno embalažo z ledom za ohranjanje svežine.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-seafoam rounded-lg">
                  <Truck className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate">Dostava</h4>
                    <p className="text-sm text-slate-600">Dostava poteka v 24-48 urah. Izdelek je dostavljen v hladilni verigi.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="p-4 border-b border-silver/50 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-coral fill-coral" />
                      ))}
                      <span className="text-sm text-slate-500">Janez K.</span>
                    </div>
                    <p className="text-slate-700">
                      Odlična kakovost rib, sveže in okusne. Priporočam!
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-manrope font-semibold text-2xl text-slate mb-6">
              Več izdelkov od {seller?.farmName}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}