'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';

const navigation = [
  { name: 'Catalog', href: '/catalog' },
  { name: 'Sellers', href: '/suppliers' },
  { name: 'How it Works', href: '/how-it-works' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { itemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`);
  };

  const menuItems = user?.role === 'seller'
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'My Products', href: '/dashboard/products' },
        { name: 'Orders', href: '/dashboard/orders' },
        { name: 'Profile', href: '/dashboard/profile' },
      ]
    : [
        { name: 'My Account', href: '/account' },
        { name: 'My Orders', href: '/account/orders' },
        { name: 'Saved Products', href: '/account/saved' },
      ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-silver/50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/tonorib-logo.png" alt="TonoRib" width={150} height={50} priority className="h-12 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={cn('text-sm font-medium transition-colors hover:text-ocean', pathname === item.href ? 'text-ocean' : 'text-slate-600')}>
                {item.name}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fish, products, sellers..."
                className="w-full pl-10 pr-4 py-2.5 bg-seafoam border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </form>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/cart" className="relative p-2 text-slate-600 hover:text-ocean transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-coral text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen((v) => !v)} className="flex items-center gap-2 p-2 text-slate-600 hover:text-ocean">
                  <div className="w-8 h-8 rounded-full bg-ocean flex items-center justify-center text-white text-sm font-semibold">
                    {user.fullName?.[0] || 'U'}
                  </div>
                  <ChevronDown className={cn('w-4 h-4 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-card shadow-card-hover border border-silver/50 py-2">
                    <div className="px-4 py-2 border-b border-silver/50">
                      <p className="text-sm font-medium text-slate">{user.fullName}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    {menuItems.map((item) => (
                      <Link key={item.name} href={item.href} onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-seafoam">
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={async () => {
                        await logout();
                        setUserMenuOpen(false);
                        router.push('/');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-coral hover:bg-seafoam flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                <Link href="/register"><Button variant="primary" size="sm">Register</Button></Link>
              </div>
            )}

            <button onClick={() => setMobileMenuOpen((v) => !v)} className="md:hidden p-2 text-slate-600">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-silver/50">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-seafoam border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </form>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className={cn('block px-3 py-2 rounded-lg text-base font-medium', pathname === item.href ? 'bg-ocean-50 text-ocean' : 'text-slate-600 hover:bg-seafoam')}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
