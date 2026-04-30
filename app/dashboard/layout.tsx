'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, Fish, LogOut, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

const dashboardNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/dashboard/profile', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ice">
      <div className="lg:hidden bg-ocean text-white px-4 py-3 flex items-center justify-between"><Link href="/dashboard" className="flex items-center gap-2"><Fish className="w-6 h-6" /><span className="font-semibold">TonoRib Seller</span></Link><button onClick={() => setMobileMenuOpen(true)} className="p-2"><Menu className="w-6 h-6" /></button></div>
      <div className="flex">
        <aside className={cn('fixed lg:static inset-y-0 left-0 z-40 bg-ocean text-white transition-all duration-300', sidebarCollapsed ? 'w-16' : 'w-64', mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden absolute top-3 right-3 p-2"><X className="w-5 h-5" /></button>
          <div className="h-16 flex items-center justify-center border-b border-white/10"><Link href="/dashboard" className="flex items-center gap-2"><Fish className="w-8 h-8" />{!sidebarCollapsed && <span className="font-semibold">TonoRib</span>}</Link></div>
          <nav className="p-3 space-y-1">{dashboardNav.map((item) => <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors', pathname === item.href ? 'bg-white/15' : 'hover:bg-white/10')}><item.icon className="w-5 h-5 flex-shrink-0" />{!sidebarCollapsed && <span className="text-sm font-medium">{item.name}</span>}</Link>)}</nav>
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-silver-200 hover:text-white transition-colors"><Fish className="w-5 h-5" />{!sidebarCollapsed && <span className="text-sm">Back to marketplace</span>}</Link>
            <button onClick={async () => { await logout(); router.push('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-silver-200 hover:text-white transition-colors"><LogOut className="w-5 h-5" />{!sidebarCollapsed && <span className="text-sm">Logout</span>}</button>
          </div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-ocean border-2 border-white rounded-full items-center justify-center shadow-card">{sidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}</button>
        </aside>
        {mobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileMenuOpen(false)} />}
        <main className="flex-1 min-h-0 bg-ice">{children}</main>
      </div>
    </div>
  );
}
