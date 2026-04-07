'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fish, User, Building2, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'buyer';
  const { user, signUp, loading: authLoading, error, clearError } = useAuth();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: initialRole,
    fullName: '',
    email: '',
    phone: '',
    farmName: '',
    location: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (step === 1) {
      // Validate step 1
      if (!formData.fullName || !formData.email) {
        setLocalError('Please fill in all required fields');
        return;
      }
      if (!formData.email.includes('@')) {
        setLocalError('Please enter a valid email address');
        return;
      }
      setStep(2);
      return;
    }
    
    // Step 2 validation
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    if (formData.role === 'seller' && (!formData.farmName || !formData.location)) {
      setLocalError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSuccess(false);

    try {
      const extraData: Record<string, string> = {
        phone: formData.phone,
      };
      
      if (formData.role === 'seller') {
        extraData.farmName = formData.farmName;
        extraData.location = formData.location;
      }

      await signUp(formData.email, formData.password, formData.fullName, formData.role as 'buyer' | 'seller', extraData);
      setSuccess(true);
      
      // Redirect based on role
      if (formData.role === 'seller') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setLocalError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = {
    buyer: [
      'Access to fresh local fish',
      'Direct communication with farms',
      'Order tracking',
    ],
    seller: [
      'Your own online store',
      'Inventory management',
      'Sales analytics',
    ],
  };

  const displayError = localError || error;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ocean" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ice flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean to-teal flex items-center justify-center">
            <Fish className="w-7 h-7 text-white" />
          </div>
        </Link>

        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="font-manrope font-bold text-2xl text-slate mb-2">Register</h1>
            <p className="text-slate-500">Create an account and join TonoRib</p>
          </div>

          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-card">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-card">
              <p className="text-sm text-green-600">Account created successfully!</p>
            </div>
          )}

          {/* Role Selection (Step 1) */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => updateFormData('role', 'buyer')}
                  className={`p-4 border-2 rounded-card text-center transition-all ${
                    formData.role === 'buyer'
                      ? 'border-ocean bg-ocean-50'
                      : 'border-silver hover:border-teal'
                  }`}
                >
                  <User className={`w-8 h-8 mx-auto mb-2 ${formData.role === 'buyer' ? 'text-ocean' : 'text-slate-400'}`} />
                  <p className={`font-medium ${formData.role === 'buyer' ? 'text-ocean' : 'text-slate'}`}>Buyer</p>
                  <p className="text-xs text-slate-500 mt-1">Restaurant, hotel...</p>
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData('role', 'seller')}
                  className={`p-4 border-2 rounded-card text-center transition-all ${
                    formData.role === 'seller'
                      ? 'border-ocean bg-ocean-50'
                      : 'border-silver hover:border-teal'
                  }`}
                >
                  <Building2 className={`w-8 h-8 mx-auto mb-2 ${formData.role === 'seller' ? 'text-ocean' : 'text-slate-400'}`} />
                  <p className={`font-medium ${formData.role === 'seller' ? 'text-ocean' : 'text-slate'}`}>Seller</p>
                  <p className="text-xs text-slate-500 mt-1">Fish farm, producer...</p>
                </button>
              </div>

              {/* Benefits for selected role */}
              <div className="p-4 bg-seafoam rounded-card">
                <p className="font-medium text-slate mb-3">Benefits:</p>
                <ul className="space-y-2">
                  {benefits[formData.role as keyof typeof benefits].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-fresh" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <Input
                label="Full Name"
                placeholder="Janez Novak"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="janez@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
              />

              <Input
                label="Phone"
                type="tel"
                placeholder="+386 40 123 456"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
              />

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}

          {/* Step 2: Additional fields for seller or password for buyer */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {formData.role === 'seller' && (
                <>
                  <Input
                    label="Farm / Company Name"
                    placeholder="Fish Farm d.o.o."
                    value={formData.farmName}
                    onChange={(e) => updateFormData('farmName', e.target.value)}
                    required
                  />
                  <Input
                    label="Location"
                    placeholder="Location, City"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    required
                  />
                </>
              )}

              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                required
              />

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateFormData('agreeTerms', e.target.checked)}
                  className="w-4 h-4 text-teal rounded mt-0.5"
                />
                <span className="text-sm text-slate-600">
                  I agree to the terms of service and privacy policy
                </span>
              </label>

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting || !formData.agreeTerms}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm text-slate-500 hover:text-ocean"
              >
                ← Back
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-teal hover:text-teal-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ocean" />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}