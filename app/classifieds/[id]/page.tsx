'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { fetchClassifiedById } from '@/lib/firebase-data';
import { ClassifiedListing } from '@/lib/types';
import { MapPin, Mail } from 'lucide-react';

export default function ClassifiedDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [item, setItem] = useState<ClassifiedListing | null>(null);

  useEffect(() => {
    fetchClassifiedById(params.id).then(setItem).catch(() => setItem(null));
  }, [params.id]);

  if (!item) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate mb-4">Listing not found</h1><Button onClick={() => router.push('/classifieds')}>Back to classifieds</Button></div></div>;
  }

  return (
    <div className="min-h-screen bg-ice py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-slate-500"><Link href="/classifieds" className="hover:text-ocean">Classifieds</Link> / <span className="text-slate">{item.title}</span></div>
        <div className="bg-white rounded-card shadow-card p-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-xs px-2 py-1 bg-teal-50 text-teal border border-teal-200 rounded-full">{item.category}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'active' ? 'bg-fresh-50 text-fresh border border-fresh-200' : 'bg-silver text-slate border border-silver'}`}>{item.status}</span>
          </div>
          <h1 className="text-3xl font-bold font-manrope text-slate mb-3">{item.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
            <span>{item.authorName}</span>
            {item.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{item.location}</span>}
            {item.contactEmail && <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{item.contactEmail}</span>}
          </div>
          <div className="text-2xl font-bold text-coral mb-6">{item.priceLabel}</div>
          <div className="whitespace-pre-line text-slate-700 leading-relaxed">{item.description}</div>
        </div>
      </div>
    </div>
  );
}
