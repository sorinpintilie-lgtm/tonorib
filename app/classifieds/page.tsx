'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { createClassified, fetchClassifieds } from '@/lib/firebase-data';
import { ClassifiedListing } from '@/lib/types';
import { classifiedCategories } from '@/lib/constants';

export default function Classifieds() {
  const { user } = useAuth();
  const [items, setItems] = useState<ClassifiedListing[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', category: '', description: '', priceLabel: '', location: '' });

  const load = async () => {
    try {
      setError(null);
      setItems(await fetchClassifieds());
    } catch (e: any) {
      setError(e?.message || 'Unable to load classifieds.');
      setItems([]);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => items.filter((item) => {
    const matchesQuery = !query || [item.title, item.description, item.authorName, item.location, item.category]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = !category || item.category === category;
    return matchesQuery && matchesCategory;
  }), [items, query, category]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      await createClassified({
        title: form.title,
        category: form.category,
        description: form.description,
        priceLabel: form.priceLabel,
        authorId: user.uid,
        authorName: user.fullName,
        contactEmail: user.email,
        location: form.location,
        status: 'active',
      });
      setForm({ title: '', category: '', description: '', priceLabel: '', location: '' });
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ice min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-manrope text-slate mb-4">Classifieds</h1>
          <p className="text-slate-600 text-lg">
            Real listings for equipment, services, jobs and operational needs around aquaculture.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <input
              type="text"
              placeholder="Search classifieds..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 border border-silver rounded-lg text-slate placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-silver rounded-lg text-slate focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="">All categories</option>
              {classifiedCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          {error && <p className="mt-4 text-sm text-coral">{error}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((item) => (
                  <Link key={item.id} href={`/classifieds/${item.id}`} className="group block bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="bg-teal-50 text-teal border border-teal-200 text-xs px-2 py-1 rounded font-medium">{item.category}</span>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${item.status === 'active' ? 'bg-fresh-50 text-fresh border border-fresh-200' : 'bg-silver text-slate border border-silver'}`}>{item.status}</span>
                    </div>
                    <h3 className="font-semibold font-manrope text-slate mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-slate font-bold">{item.priceLabel}</span>
                      <span className="text-sm text-slate-500">{item.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location || 'Location not provided'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-card p-8 text-slate-500">No classifieds found.</div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold font-manrope text-slate mb-6">Post a Classified</h2>
              {user ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 border border-silver rounded-lg text-slate"
                    placeholder="Listing title"
                  />
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 border border-silver rounded-lg text-slate"
                  >
                    <option value="">Select category</option>
                    {classifiedCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input
                    type="text"
                    required
                    value={form.priceLabel}
                    onChange={(e) => setForm({ ...form, priceLabel: e.target.value })}
                    className="w-full px-4 py-3 border border-silver rounded-lg text-slate"
                    placeholder="Price or pricing note"
                  />
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-3 border border-silver rounded-lg text-slate"
                    placeholder="Location"
                  />
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 border border-silver rounded-lg text-slate resize-none"
                    placeholder="Describe what you are selling or looking for"
                  />
                  <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    {submitting ? 'Posting...' : 'Publish Listing'}
                  </Button>
                </form>
              ) : (
                <p className="text-sm text-slate-500">Login to publish a real classified listing.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
