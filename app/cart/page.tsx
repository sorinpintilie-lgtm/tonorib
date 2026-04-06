'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, Truck, MapPin, AlertCircle } from 'lucide-react';
import { mockProducts, mockSellers, Product, Seller } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CartPage() {
  // Mock cart items (in a real app this would come from context/state)
  const [items, setItems] = useState<CartItem[]>([
    { product: mockProducts[0], quantity: 10 }, // Postrv from seller 1
    { product: mockProducts[2], quantity: 3 }, // Orada from seller 2
  ]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setItems(prev => prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.min(newQuantity, item.product.stockKg) }
          : item
      ));
    }
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // Group items by seller
  const groupedBySeller = items.reduce((acc, item) => {
    const sellerId = item.product.sellerId;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        seller: mockSellers.find(s => s.id === sellerId),
        items: [],
      };
    }
    acc[sellerId].items.push(item);
    return acc;
  }, {} as Record<string, { seller: Seller | undefined; items: CartItem[] }>);

  const subtotal = items.reduce((sum, item) => sum + (item.product.pricePerKg * item.quantity), 0);
  const deliveryFee = Object.keys(groupedBySeller).length * 12; // €12 per seller
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <ShoppingCart className="w-16 h-16 text-silver mx-auto mb-4" />
          <h1 className="font-manrope font-bold text-2xl text-slate mb-2">Vaša košarica je prazna</h1>
          <p className="text-slate-500 mb-6">Dodajte izdelke, da boste lahko nadaljevali z nakupom.</p>
          <Link href="/catalog">
            <Button variant="primary">Brskaj po katalogu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-manrope font-bold text-2xl text-slate">Košarica</h1>
          <p className="text-slate-500">{items.length} izdelkov v košarici</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedBySeller).map(([sellerId, { seller, items: sellerItems }]) => (
              <div key={sellerId} className="card">
                {/* Seller Header */}
                <div className="p-4 border-b border-silver/50 bg-seafoam/50">
                  <Link href={`/supplier/${sellerId}`} className="flex items-center gap-2">
                    <span className="font-semibold text-slate hover:text-ocean">{seller?.farmName || 'Prodajalec'}</span>
                  </Link>
                </div>

                {/* Items */}
                <div className="divide-y divide-silver/50">
                  {sellerItems.map(({ product, quantity }) => (
                    <div key={product.id} className="p-4 flex gap-4">
                      {/* Image */}
                      <Link href={`/product/${product.id}`} className="w-24 h-24 rounded-lg bg-seafoam overflow-hidden flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${product.id}`} className="block">
                          <h3 className="font-semibold text-slate hover:text-ocean">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-slate-500">{product.species}</p>
                        <p className="text-coral font-semibold mt-1">€{product.pricePerKg.toFixed(2)}/kg</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-seafoam rounded-lg">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-2 hover:bg-teal-50 rounded-l-lg"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">{quantity} kg</span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-2 hover:bg-teal-50 rounded-r-lg"
                              disabled={quantity >= product.stockKg}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="p-2 text-slate-400 hover:text-coral transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="text-right">
                        <p className="font-semibold text-slate">€{(product.pricePerKg * quantity).toFixed(2)}</p>
                        {quantity >= product.stockKg - 5 && product.stockKg < 50 && (
                          <p className="text-xs text-coral mt-1">Opozorilo: majhna zaloga</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seller Delivery */}
                <div className="p-4 border-t border-silver/50 bg-seafoam/30">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Truck className="w-4 h-4" />
                    <span>Dostava: {seller?.deliveryRegions.slice(0, 2).join(', ')}</span>
                    <span className="text-slate-700 font-medium">+€12</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="p-5 border-b border-silver/50">
                <h2 className="font-manrope font-semibold text-lg text-slate">Povzetek naročila</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Medvmesna vsota</span>
                  <span className="text-slate font-medium">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Dostava ({Object.keys(groupedBySeller).length} prodajalcev)</span>
                  <span className="text-slate font-medium">€{deliveryFee.toFixed(2)}</span>
                </div>
                <hr className="border-silver/50" />
                <div className="flex justify-between">
                  <span className="font-semibold text-slate">Skupaj</span>
                  <span className="font-manrope font-bold text-xl text-slate">€{total.toFixed(2)}</span>
                </div>

                {/* Delivery Info */}
                <div className="flex items-start gap-2 p-3 bg-seafoam rounded-lg text-sm">
                  <MapPin className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">
                    Dostava na naslov: <strong>Trg mladih 5, 1000 Ljubljana</strong>
                  </p>
                </div>

                {/* CTA */}
                <Link href="/checkout" className="block">
                  <Button variant="coral" size="lg" className="w-full flex items-center justify-center gap-2">
                    Na blagajno
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/catalog" className="block text-center">
                  <Button variant="ghost" size="sm">Nadaljuj z nakupovanjem</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
