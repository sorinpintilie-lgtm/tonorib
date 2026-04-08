'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, Fish, ChevronDown, Package, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

const navigation = [
  { name: 'Catalog', href: '/catalog' },
  { name: 'Sellers', href: '/seller' },
  { name: 'How it Works', href: '/how-it-works' },
];

const userMenuItems = [
  { name: 'My Account', href: '/account' },
  { name: 'My Orders', href: '/account/orders' },
  { name: 'Saved Products', href: '/account/saved' },
  { name: 'Delivery Addresses', href: '/account/addresses' },
];

const sellerMenuItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'My Products', href: '/dashboard/products' },
  { name: 'Orders', href: '/dashboard/orders' },
  { name: 'Customers', href: '/dashboard/customers' },
  { name: 'Analytics', href: '/dashboard/analytics' },
  { name: 'Farm Profile', href: '/dashboard/profile' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Use auth context
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const userRole = user?.role || null;
  const cartItemsCount = 0;

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-silver/50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/tonorib-logo.png"
              alt="TonoRib"
              width={150}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-ocean',
                  pathname === item.href ? 'text-ocean' : 'text-slate-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
              <input
                type="text"
                placeholder="Search fish, products, sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-seafoam border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal placeholder:text-silver-400"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-slate-600 hover:text-ocean transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 text-slate-600 hover:text-ocean transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-ocean flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className={cn('w-4 h-4 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-card shadow-card-hover border border-silver/50 py-2 animate-fade-in">
                    {userRole === 'seller' ? (
                      sellerMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-seafoam transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))
                    ) : (
                      userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-seafoam transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))
                    )}
                    <hr className="my-2 border-silver/50" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-coral hover:bg-seafoam transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-silver/50 animate-slide-up">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-seafoam border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-ocean-50 text-ocean'
                      : 'text-slate-600 hover:bg-seafoam'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth */}
            {!isAuthenticated && (
              <div className="flex gap-3 pt-2 border-t border-silver/50">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="md" className="w-full">Login</Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button variant="primary" size="md" className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}