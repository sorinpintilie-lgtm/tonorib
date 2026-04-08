'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Truck, CreditCard, CheckCircle, ChevronLeft,
  ShoppingCart, Shield, Clock, AlertCircle
} from 'lucide-react';
import { mockProducts, mockSellers } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Delivery
    firstName: 'Janez',
    lastName: 'Novak',
    email: 'janez@example.com',
    phone: '+386 40 123 456',
    address: 'Trg mladih 5',
    city: 'Ljubljana',
    postalCode: '1000',
    note: '',
    // Payment
    paymentMethod: 'cod',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Mock cart totals
  const items = [
    { product: mockProducts[0], quantity: 10, seller: mockSellers[0] },
    { product: mockProducts[2], quantity: 3, seller: mockSellers[1] },
  ];
  const subtotal = 295;
  const deliveryFee = 24;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
    // In real app, this would process the order
  };

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="flex items-center gap-2 text-slate-500 hover:text-ocean mb-4">
            <ChevronLeft className="w-4 h-4" />
            Back to cart
          </Link>
          <h1 className="font-manrope font-bold text-2xl text-slate">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {['Delivery', 'Review', 'Confirmation'].map((label, index) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 ${step > index ? 'text-fresh' : step === index + 1 ? 'text-ocean' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index ? 'bg-fresh text-white' : 
                  step === index + 1 ? 'bg-ocean text-white' : 'bg-silver'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className="hidden sm:block text-sm font-medium">{label}</span>
              </div>
              {index < 2 && (
                <div className={`w-12 h-0.5 mx-2 ${step > index + 1 ? 'bg-fresh' : 'bg-silver'}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Delivery */}
          {step === 1 && (
            <div className="card">
              <div className="p-5 border-b border-silver/50">
                <h2 className="font-manrope font-semibold text-lg text-slate flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-ocean" />
                  Delivery Address
                </h2>
              </div>
              <div className="p-5 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="First name"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                  />
                  <Input
                    label="Last name"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                  />
                </div>
                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                  />
                  <Input
                    label="Postal code"
                    value={formData.postalCode}
                    onChange={(e) => updateFormData('postalCode', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate mb-2">Note (optional)</label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => updateFormData('note', e.target.value)}
                    rows={3}
                    placeholder="Posebna navodila za dostavo..."
                    className="w-full px-4 py-3 border border-silver rounded-input bg-white resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Delivery Summary */}
              <div className="card">
                <div className="p-5 border-b border-silver/50">
                  <h2 className="font-manrope font-semibold text-lg text-slate flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-ocean" />
                    Delivery address
                  </h2>
                </div>
                <div className="p-5">
                  <p className="font-medium text-slate">{formData.firstName} {formData.lastName}</p>
                  <p className="text-slate-600">{formData.address}</p>
                  <p className="text-slate-600">{formData.postalCode}, {formData.city}</p>
                  <p className="text-slate-500 mt-2">{formData.email} • {formData.phone}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="card">
                <div className="p-5 border-b border-silver/50">
                  <h2 className="font-manrope font-semibold text-lg text-slate flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-ocean" />
                    Products
                  </h2>
                </div>
                <div className="divide-y divide-silver/50">
                  {items.map(({ product, seller, quantity }, idx) => (
                    <div key={idx} className="p-4 flex justify-between">
                      <div>
                        <p className="font-medium text-slate">{product.name}</p>
                        <p className="text-sm text-slate-500">{seller.farmName} • {product.pricePerKg}€/kg × {quantity}kg</p>
                      </div>
                      <span className="font-medium text-slate">€{product.pricePerKg * quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <div className="p-5 border-b border-silver/50">
                  <h2 className="font-manrope font-semibold text-lg text-slate flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-ocean" />
                    Payment Method
                  </h2>
                </div>
                <div className="p-5 space-y-3">
                  <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-ocean bg-ocean-50' : 'border-silver'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => updateFormData('paymentMethod', 'cod')}
                      className="w-4 h-4 text-ocean"
                    />
                    <div>
                      <p className="font-medium text-slate">Cash on delivery</p>
                      <p className="text-sm text-slate-500">Pay upon receipt</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'bank' ? 'border-ocean bg-ocean-50' : 'border-silver'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={() => updateFormData('paymentMethod', 'bank')}
                      className="w-4 h-4 text-ocean"
                    />
                    <div>
                      <p className="font-medium text-slate">Bank transfer</p>
                      <p className="text-sm text-slate-500">You will receive a QR code after order submission</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="card text-center py-12">
              <div className="w-16 h-16 rounded-full bg-fresh flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-manrope font-bold text-2xl text-slate mb-2">Order placed!</h2>
              <p className="text-slate-500 mb-6">Your order has been successfully placed. We have sent a confirmation to your email.</p>
              <div className="bg-seafoam rounded-lg p-4 max-w-sm mx-auto mb-6">
                <p className="text-sm text-slate-500">Order number</p>
                <p className="font-manrope font-bold text-xl text-ocean">#RIB-2026-0042</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/account/orders">
                  <Button variant="primary">View order</Button>
                </Link>
                <Link href="/catalog">
                  <Button variant="outline">Continue shopping</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Order Summary Sidebar (for steps 1 & 2) */}
          {step < 3 && (
            <div className="mt-6">
              <div className="card">
                <div className="p-5 border-b border-silver/50">
                  <h3 className="font-semibold text-slate">Summary</h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Products</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery</span>
                    <span className="font-medium">€{deliveryFee.toFixed(2)}</span>
                  </div>
                  <hr className="border-silver/50" />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-manrope font-bold text-xl">€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="p-4 bg-seafoam/50 border-t border-silver/50 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-fresh" />
                    Secure payment
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Truck className="w-4 h-4 text-teal" />
                    Delivery in 24-48 hours
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-ocean" />
                    Freshness guaranteed
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-5 border-t border-silver/50">
                  <Button type="submit" variant="coral" size="lg" className="w-full">
                    {step === 1 ? 'Continue to review' : 'Confirm order'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}