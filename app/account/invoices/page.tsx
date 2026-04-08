'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, ChevronRight, Loader2, Download, Eye } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { mockOrders } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function InvoicesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders] = useState(mockOrders);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-ice flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ocean" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/account" className="flex items-center gap-2 text-teal hover:text-teal-600 text-sm">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to account
          </Link>
        </div>

        <h1 className="font-manrope font-bold text-2xl text-slate mb-6">Invoices</h1>

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <FileText className="w-12 h-12 text-silver mx-auto mb-4" />
            <p className="text-slate-500 mb-6">You don't have any invoices yet.</p>
            <Link href="/catalog">
              <Button variant="primary">Browse Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-seafoam">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Invoice #</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Order #</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Date</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Amount</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-silver/50">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-seafoam/50">
                      <td className="px-5 py-4 font-medium text-slate">INV-{order.id.slice(-6)}</td>
                      <td className="px-5 py-4 text-slate-600">#{order.id.slice(-6)}</td>
                      <td className="px-5 py-4 text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString('en-US')}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate">€{order.total.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className="badge badge-fresh">Paid</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-slate-400 hover:text-ocean transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-ocean transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}