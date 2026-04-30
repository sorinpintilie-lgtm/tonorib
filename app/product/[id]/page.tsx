'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, MapPin, Star, CheckCircle, Clock, Truck, ChevronLeft, ChevronRight, Package, Shield, Minus, Plus, Heart, Share2, AlertCircle } from 'lucide-react';
import { fetchProductById, fetchProducts, fetchSellerById } from '@/lib/firebase-data';
import { Product, SellerProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/catalog/product-card';
import { useCart } from '@/lib/cart';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProductById(params.id).then(async (nextProduct) => {
      setProduct(nextProduct);
      if (!nextProduct) return;
      setQuantity(nextProduct.minOrderKg || 1);
      const [sellerData, sellerProducts] = await Promise.all([
        fetchSellerById(nextProduct.sellerId),
        fetchProducts({ sellerId: nextProduct.sellerId }),
      ]);
      setSeller(sellerData);
      setRelatedProducts(sellerProducts.filter((p) => p.id !== nextProduct.id).slice(0, 3));
    }).catch(() => setProduct(null));
  }, [params.id]);

  if (!product) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate mb-4">Product not found</h1><Button onClick={() => router.push('/catalog')}>Back to catalog</Button></div></div>;
  }

  const getFreshnessInfo = () => {
    if (!product.freshnessDate) return { label: 'No data' };
    const freshness = new Date(product.freshnessDate);
    const today = new Date();
    const daysDiff = Math.floor((freshness.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 0) return { label: 'Expired' };
    if (daysDiff === 0) return { label: 'Fresh today' };
    if (daysDiff <= 2) return { label: 'Very fresh' };
    return { label: 'Fresh' };
  };

  const freshnessInfo = getFreshnessInfo();
  const totalPrice = quantity * product.pricePerKg;
  const isInStock = product.stockKg > 0;
  const isLowStock = product.stockKg > 0 && product.stockKg < product.minOrderKg * 2;
  const categoryLabels: Record<string, string> = { fresh: 'Fresh', frozen: 'Frozen', smoked: 'Smoked', live: 'Live', fillet: 'Fillet' };

  return (
    <div className="min-h-screen bg-ice">
      <div className="bg-white border-b border-silver/50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"><div className="flex items-center gap-2 text-sm text-slate-500"><Link href="/" className="hover:text-ocean">Home</Link><span>/</span><Link href="/catalog" className="hover:text-ocean">Catalog</Link><span>/</span><span className="text-slate">{product.name}</span></div></div></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] bg-white rounded-card overflow-hidden">
              <Image src={product.images[activeImage] || product.images[0] || '/hero.png'} alt={product.name} fill className="object-cover" priority />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.category === 'fresh' && <Badge variant="fresh" className="flex items-center gap-1"><Clock className="w-3 h-3" />{freshnessInfo.label}</Badge>}
                {!isInStock && <Badge variant="stock">Out of stock</Badge>}
                {isInStock && isLowStock && <Badge variant="coral">Last pieces</Badge>}
              </div>
              {product.images.length > 1 && <><button onClick={() => setActiveImage((prev) => prev === 0 ? product.images.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card"><ChevronLeft className="w-5 h-5 text-slate" /></button><button onClick={() => setActiveImage((prev) => prev === product.images.length - 1 ? 0 : prev + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card"><ChevronRight className="w-5 h-5 text-slate" /></button></>}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2"><Badge>{categoryLabels[product.category]}</Badge>{product.category === 'fresh' && product.freshnessDate && <span className="text-sm text-slate-500">Harvested: {new Date(product.freshnessDate).toLocaleDateString('en-US')}</span>}</div>
            <h1 className="font-manrope font-bold text-2xl lg:text-3xl text-slate mb-2">{product.name}</h1>
            <p className="text-lg text-slate-500 mb-4">{product.species}</p>
            {product.speciesScientific && <p className="text-sm text-slate-400 italic mb-4">{product.speciesScientific}</p>}

            {seller && (
              <Link href={`/supplier/${seller.id}`} className="flex items-center gap-3 p-3 bg-white rounded-card mb-6 hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center">{seller.logoUrl ? <img src={seller.logoUrl} alt={seller.farmName} className="w-full h-full rounded-full object-cover" /> : <Package className="w-6 h-6 text-white" />}</div>
                <div className="flex-1"><div className="flex items-center gap-2"><h3 className="font-semibold text-slate">{seller.farmName}</h3>{seller.verified && <CheckCircle className="w-4 h-4 text-teal" />}</div><div className="flex items-center gap-2 text-sm text-slate-500"><MapPin className="w-3.5 h-3.5" />{seller.location}<span>•</span><Star className="w-3.5 h-3.5 text-coral fill-coral" />{seller.rating || 0}</div></div>
              </Link>
            )}

            <div className="bg-white rounded-card p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-4"><span className="font-manrope font-bold text-3xl text-coral">€{product.pricePerKg.toFixed(2)}</span><span className="text-slate-500">/kg</span></div>
              <div className="flex items-center gap-4 mb-6 text-sm"><span className={`flex items-center gap-1.5 ${isInStock ? 'text-fresh' : 'text-coral'}`}>{isInStock ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}{isInStock ? `In stock: ${product.stockKg} kg` : 'Out of stock'}</span>{product.minOrderKg > 1 && <span className="text-slate-500">Min. order: {product.minOrderKg} kg</span>}</div>
              {isInStock && <div className="flex items-center gap-4 mb-6"><span className="text-slate-700">Quantity (kg):</span><div className="flex items-center gap-2"><button onClick={() => setQuantity(Math.max(product.minOrderKg, quantity - 1))} disabled={quantity <= product.minOrderKg} className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center"><Minus className="w-4 h-4" /></button><span className="w-16 text-center font-semibold text-lg">{quantity}</span><button onClick={() => setQuantity(Math.min(product.stockKg, quantity + 1))} disabled={quantity >= product.stockKg} className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center"><Plus className="w-4 h-4" /></button></div></div>}
              <div className="flex items-center justify-between py-4 border-t border-silver/50 mb-6"><span className="text-slate-700">Total:</span><span className="font-manrope font-bold text-xl text-slate">€{totalPrice.toFixed(2)}</span></div>
              <div className="flex gap-3"><Button variant="coral" size="lg" disabled={!isInStock} className="flex-1 flex items-center justify-center gap-2" onClick={() => addItem(product.id, quantity)}><ShoppingCart className="w-5 h-5" />Add to cart</Button><Button variant="outline" size="lg"><Heart className="w-5 h-5" /></Button><Button variant="outline" size="lg"><Share2 className="w-5 h-5" /></Button></div>
            </div>

            <div className="bg-white rounded-card p-6">
              <h3 className="font-semibold text-slate mb-4 flex items-center gap-2"><Truck className="w-5 h-5 text-ocean" />Delivery options</h3>
              <div className="space-y-3"><div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /><span>Pickup</span></div><span className="text-slate-600">Free</span></div>{product.deliveryRegions.slice(0, 3).map((region) => <div key={region} className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><Truck className="w-4 h-4 text-slate-400" /><span>Delivery: {region}</span></div><span className="text-slate-600">€12</span></div>)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card mb-12">
          <div className="border-b border-silver/50"><div className="flex overflow-x-auto">{['description', 'farming', 'delivery'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === tab ? 'border-ocean text-ocean' : 'border-transparent text-slate-500'}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>)}</div></div>
          <div className="p-6">
            {activeTab === 'description' && <div className="space-y-4"><p className="text-slate-700 leading-relaxed">{product.description}</p><div className="grid grid-cols-2 gap-4 text-sm"><div><span className="text-slate-500">Fish species:</span><span className="ml-2 text-slate-700">{product.species}</span></div><div><span className="text-slate-500">Origin:</span><span className="ml-2 text-slate-700">{product.origin}</span></div></div></div>}
            {activeTab === 'farming' && <div className="flex items-start gap-3 p-4 bg-seafoam rounded-lg"><Shield className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" /><div><h4 className="font-semibold text-slate">Seller information</h4><p className="text-sm text-slate-600">{seller?.description || 'Seller details will appear here.'}</p></div></div>}
            {activeTab === 'delivery' && <div className="flex items-start gap-3 p-4 bg-seafoam rounded-lg"><Truck className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" /><div><h4 className="font-semibold text-slate">Delivery</h4><p className="text-sm text-slate-600">Delivery regions: {product.deliveryRegions.join(', ') || 'No regions available yet.'}</p></div></div>}
          </div>
        </div>

        {relatedProducts.length > 0 && <div><h2 className="font-manrope font-semibold text-2xl text-slate mb-6">More products from {seller?.farmName}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div></div>}
      </div>
    </div>
  );
}
