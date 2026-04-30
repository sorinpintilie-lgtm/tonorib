'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, CreditCard, CheckCircle, ChevronLeft, ShoppingCart, Shield, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { createOrder, fetchProductById, fetchSellerById } from '@/lib/firebase-data';
import { Product, SellerProfile } from '@/lib/types';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loaded, setLoaded] = useState<{ product: Product; seller: SellerProfile | null; quantity: number }[]>([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: user?.email || '', phone: '', address: '', city: '', postalCode: '', note: '', paymentMethod: 'cod' });

  useEffect(() => {
    Promise.all(items.map(async (item) => {
      const product = await fetchProductById(item.productId);
      if (!product) return null;
      const seller = await fetchSellerById(product.sellerId);
      return { product, seller, quantity: item.quantityKg };
    })).then((rows) => setLoaded(rows.filter(Boolean) as any[]));
  }, [items]);

  useEffect(() => {
    if (user?.email) setFormData((prev) => ({ ...prev, email: user.email }));
  }, [user]);

  const grouped = useMemo(() => loaded.reduce((acc, item) => {
    if (!acc[item.product.sellerId]) acc[item.product.sellerId] = [] as typeof loaded;
    acc[item.product.sellerId].push(item);
    return acc;
  }, {} as Record<string, typeof loaded>), [loaded]);

  const subtotal = loaded.reduce((sum, item) => sum + item.product.pricePerKg * item.quantity, 0);
  const deliveryFee = Object.keys(grouped).length * 12;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    if (!user || loaded.length === 0) return;
    setSubmitting(true);
    try {
      const createdIds = await Promise.all(Object.entries(grouped).map(async ([sellerId, sellerItems]) => {
        const sellerName = sellerItems[0]?.seller?.farmName || 'Seller';
        return createOrder({
          buyerId: user.uid,
          buyerName: `${formData.firstName} ${formData.lastName}`.trim(),
          buyerEmail: formData.email,
          sellerId,
          sellerName,
          items: sellerItems.map((item) => ({ productId: item.product.id, sellerId: item.product.sellerId, name: item.product.name, quantityKg: item.quantity, pricePerKg: item.product.pricePerKg })),
          subtotal: sellerItems.reduce((sum, item) => sum + item.product.pricePerKg * item.quantity, 0),
          deliveryFee: 12,
          total: sellerItems.reduce((sum, item) => sum + item.product.pricePerKg * item.quantity, 0) + 12,
          status: 'pending',
          shippingAddress: formData.address,
          shippingCity: formData.city,
          shippingPostalCode: formData.postalCode,
          shippingPhone: formData.phone,
          paymentMethod: formData.paymentMethod,
          note: formData.note,
        });
      }));
      setOrderId(createdIds[0]);
      clearCart();
      setStep(3);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate mb-4">Login required</h1><p className="text-slate-500 mb-6">You need an account before placing a real order.</p><Link href="/login"><Button variant="primary">Login</Button></Link></div></div>;
  }

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8"><Link href="/cart" className="flex items-center gap-2 text-slate-500 hover:text-ocean mb-4"><ChevronLeft className="w-4 h-4" />Back to cart</Link><h1 className="font-manrope font-bold text-2xl text-slate">Checkout</h1></div>
        <div className="flex items-center justify-center mb-8">{['Delivery', 'Review', 'Confirmation'].map((label, index) => <div key={label} className="flex items-center"><div className={`flex items-center gap-2 ${step > index ? 'text-fresh' : step === index + 1 ? 'text-ocean' : 'text-slate-400'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > index ? 'bg-fresh text-white' : step === index + 1 ? 'bg-ocean text-white' : 'bg-silver'}`}>{step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}</div><span className="hidden sm:block text-sm font-medium">{label}</span></div>{index < 2 && <div className={`w-12 h-0.5 mx-2 ${step > index + 1 ? 'bg-fresh' : 'bg-silver'}`} />}</div>)}</div>
        <form onSubmit={handleSubmit}>
          {step === 1 && <div className="card"><div className="p-5 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg text-slate flex items-center gap-2"><MapPin className="w-5 h-5 text-ocean" />Delivery Address</h2></div><div className="p-5 space-y-6"><div className="grid sm:grid-cols-2 gap-4"><Input label="First name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} /><Input label="Last name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} /></div><div className="grid sm:grid-cols-2 gap-4"><Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /><Input label="Phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div><Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} /><div className="grid sm:grid-cols-2 gap-4"><Input label="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} /><Input label="Postal code" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} /></div><div><label className="block text-sm font-medium text-slate mb-2">Note (optional)</label><textarea value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} rows={3} className="w-full px-4 py-3 border border-silver rounded-input bg-white resize-none" /></div></div></div>}
          {step === 2 && <div className="space-y-6"><div className="card"><div className="p-5 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg text-slate flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-ocean" />Products</h2></div><div className="divide-y divide-silver/50">{loaded.map(({ product, seller, quantity }, idx) => <div key={idx} className="p-4 flex justify-between"><div><p className="font-medium text-slate">{product.name}</p><p className="text-sm text-slate-500">{seller?.farmName || 'Seller'} • {product.pricePerKg}€/kg × {quantity}kg</p></div><span className="font-medium text-slate">€{(product.pricePerKg * quantity).toFixed(2)}</span></div>)}</div></div><div className="card"><div className="p-5 border-b border-silver/50"><h2 className="font-manrope font-semibold text-lg text-slate flex items-center gap-2"><CreditCard className="w-5 h-5 text-ocean" />Payment Method</h2></div><div className="p-5 space-y-3"><label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-ocean bg-ocean-50' : 'border-silver'}`}><input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })} /><div><p className="font-medium text-slate">Cash on delivery</p><p className="text-sm text-slate-500">Pay upon receipt</p></div></label><label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'bank' ? 'border-ocean bg-ocean-50' : 'border-silver'}`}><input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })} /><div><p className="font-medium text-slate">Bank transfer</p><p className="text-sm text-slate-500">A payment confirmation flow can be added next.</p></div></label></div></div></div>}
          {step === 3 && <div className="card text-center py-12"><div className="w-16 h-16 rounded-full bg-fresh flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-white" /></div><h2 className="font-manrope font-bold text-2xl text-slate mb-2">Order placed</h2><p className="text-slate-500 mb-6">Your order was stored in Firebase successfully.</p><div className="bg-seafoam rounded-lg p-4 max-w-sm mx-auto mb-6"><p className="text-sm text-slate-500">Order reference</p><p className="font-manrope font-bold text-xl text-ocean">#{orderId || 'created'}</p></div><div className="flex flex-col sm:flex-row gap-3 justify-center"><Link href="/account/orders"><Button variant="primary">View orders</Button></Link><Link href="/catalog"><Button variant="outline">Continue shopping</Button></Link></div></div>}
          {step < 3 && <div className="mt-6"><div className="card"><div className="p-5 border-b border-silver/50"><h3 className="font-semibold text-slate">Summary</h3></div><div className="p-5 space-y-3"><div className="flex justify-between text-sm"><span className="text-slate-500">Products</span><span className="font-medium">€{subtotal.toFixed(2)}</span></div><div className="flex justify-between text-sm"><span className="text-slate-500">Delivery</span><span className="font-medium">€{deliveryFee.toFixed(2)}</span></div><hr className="border-silver/50" /><div className="flex justify-between"><span className="font-semibold">Total</span><span className="font-manrope font-bold text-xl">€{total.toFixed(2)}</span></div></div><div className="p-4 bg-seafoam/50 border-t border-silver/50 space-y-2"><div className="flex items-center gap-2 text-sm text-slate-600"><Shield className="w-4 h-4 text-fresh" />Secure account-based order flow</div><div className="flex items-center gap-2 text-sm text-slate-600"><Truck className="w-4 h-4 text-teal" />Delivery charged per seller</div><div className="flex items-center gap-2 text-sm text-slate-600"><Clock className="w-4 h-4 text-ocean" />Orders stored instantly in Firestore</div></div><div className="p-5 border-t border-silver/50"><Button type="submit" variant="coral" size="lg" className="w-full" disabled={submitting}>{step === 1 ? 'Continue to review' : submitting ? 'Placing order...' : 'Confirm order'}</Button></div></div></div>}
        </form>
      </div>
    </div>
  );
}
