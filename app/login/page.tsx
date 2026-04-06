'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fish, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, loading: authLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Redirect if already logged in based on role
  useEffect(() => {
    if (!authLoading && user) {
      if (user.role === 'seller') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    setIsSubmitting(true);

    try {
      await signIn(formData.email, formData.password);
      // Redirect based on role after successful login
      if (user?.role === 'seller') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setLocalError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
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
            <h1 className="font-manrope font-bold text-2xl text-slate mb-2">Login</h1>
            <p className="text-slate-500">Welcome back! Login to your account.</p>
          </div>

          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-card">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="janez@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-ocean mt-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <div className="flex justify-end mt-2">
                <Link href="/forgot-password" className="text-sm text-teal hover:text-teal-600">
                  Forgot password?
                </Link>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                className="w-4 h-4 text-teal rounded"
              />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                <>
                  Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-silver/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link href="/register?role=buyer" className="w-full">
                <Button variant="outline" size="md" className="w-full">
                  Register
                </Button>
              </Link>
              <Link href="/register?role=seller" className="w-full">
                <Button variant="ghost" size="md" className="w-full border border-silver">
                  As Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust note */}
        <p className="text-center text-sm text-slate-400 mt-6">
          By logging in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}