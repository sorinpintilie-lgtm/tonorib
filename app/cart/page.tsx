'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { fetchProductById, fetchSellerById } from '@/lib/firebase-data';
import { Product, SellerProfile } from '@/lib/types';

interface LoadedCartItem {
  product: Product;
  quantity: number;
  seller: SellerProfile | null;
}

export default function CartPage() {
  const { items, updateItem, removeItem } = useCart();
  const [loadedItems, setLoadedItems] = useState<LoadedCartItem[]>([]);

  useEffect(() => {
    Promise.all(items.map(async (item) => {
      const product = await fetchProductById(item.productId);
      if (!product) return null;
      const seller = await fetchSellerById(product.sellerId);
      return { product, quantity: item.quantityKg, seller };
    })).then((rows) => setLoadedItems(rows.filter(Boolean) as LoadedCartItem[]));
  }, [items]);

  const groupedBySeller = useMemo(() => loadedItems.reduce((acc, item) => {
    const sellerId = item.product.sellerId;
    if (!acc[sellerId]) acc[sellerId] = { seller: item.seller, items: [] as LoadedCartItem[] };
    acc[sellerId].items.push(item);
    return acc;
  }, {} as Record<string, { seller: SellerProfile | null; items: LoadedCartItem[] }>), [loadedItems]);

  const subtotal = loadedItems.reduce((sum, item) => sum + (item.product.pricePerKg * item.quantity), 0);
  const deliveryFee = Object.keys(groupedBySeller).length * 12;
  const total = subtotal + deliveryFee;

  if (loadedItems.length === 0) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-center max-w-md mx-auto p-8"><ShoppingCart className="w-16 h-16 text-silver mx-auto mb-4" /><h1 className="font-manrope font-bold text-2xl text-slate mb-2">Your cart is empty</h1><p className="text-slate-500 mb-6">Add products to continue shopping.</p><Link href="/catalog"><Button variant="primary">Browse catalog</Button></Link></div></div>;
  }

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8"><h1 className="font-manrope font-bold text-2xl text-slate">Cart</h1><p className="text-slate-500">{loadedItems.length} products in cart</p></div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedBySeller).map(([sellerId, { seller, items: sellerItems }]) => (
              <div key={sellerId} className="card">
                <div className="p-4 border-b border-silver/50 bg-seafoam/50"><Link href={`/supplier/${sellerId}`} className="font-semibold text-slate hover:text-ocean">{seller?.farmName || 'Seller'}</Link></div>
                <div className="divide-y divide-silver/50">
                  {sellerItems.map(({ product, quantity }) => (
                    <div key={product.id} className="p-4 flex gap-4">
                      <Link href={`/product/${product.id}`} className="w-24 h-24 rounded-lg bg-seafoam overflow-hidden flex-shrink-0"><Image src={product.images[0] || '/hero.png'} alt={product.name} width={96} height={96} className="w-full h-full object-cover" /></Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${product.id}`} className="block"><h3 className="font-semibold text-slate hover:text-ocean">{product.name}</h3></Link>
                        <p className="text-sm text-slate-500">{product.species}</p>
                        <p className="text-coral font-semibold mt-1">€{product.pricePerKg.toFixed(2)}/kg</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-seafoam rounded-lg"><button onClick={() => updateItem(product.id, quantity - 1)} className="p-2 hover:bg-teal-50 rounded-l-lg"><Minus className="w-4 h-4" /></button><span className="w-12 text-center font-medium">{quantity} kg</span><button onClick={() => updateItem(product.id, Math.min(quantity + 1, product.stockKg))} className="p-2 hover:bg-teal-50 rounded-r-lg" disabled={quantity >= product.stockKg}><Plus className="w-4 h-4" /></button></div>
                          <button onClick={() => removeItem(product.id)} className="p-2 text-slate-400 hover:text-coral"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="text-right"><p className="font-semibold text-slate">€{(product.pricePerKg * quantity).toFixed(2)}</p></div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-silver/50 bg-seafoam/30"><div className="flex items-center gap-2 text-sm text-slate-500"><Truck className="w-4 h-4" /><span>Delivery: {(seller?.deliveryRegions || []).slice(0, 2).join(', ') || 'To be confirmed'}</span><span className="text-slate-700 font-medium">+€12</span></div></div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1"><div className="card sticky top-24"><div className="p-5 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg text-slate">Order Summary</h2></div><div className="p-5 space-y-4"><div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span className="text-slate font-medium">€{subtotal.toFixed(2)}</span></div><div className="flex justify-between text-sm"><span className="text-slate-500">Delivery ({Object.keys(groupedBySeller).length} sellers)</span><span className="text-slate font-medium">€{deliveryFee.toFixed(2)}</span></div><hr className="border-silver/50" /><div className="flex justify-between"><span className="font-semibold text-slate">Total</span><span className="font-manrope font-bold text-xl text-slate">€{total.toFixed(2)}</span></div><div className="flex items-start gap-2 p-3 bg-seafoam rounded-lg text-sm"><MapPin className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" /><p className="text-slate-600">Delivery address will be added at checkout.</p></div><Link href="/checkout" className="block"><Button variant="coral" size="lg" className="w-full flex items-center justify-center gap-2">Checkout<ArrowRight className="w-4 h-4" /></Button></Link><Link href="/catalog" className="block text-center"><Button variant="ghost" size="sm">Continue shopping</Button></Link></div></div></div>
        </div>
      </div>
    </div>
  );
}
