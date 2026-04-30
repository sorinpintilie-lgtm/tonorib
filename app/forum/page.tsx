'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { createForumPost, fetchForumPosts } from '@/lib/firebase-data';
import { ForumPost } from '@/lib/types';
import { forumCategories } from '@/lib/constants';

export default function Forum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [form, setForm] = useState({ title: '', category: '', content: '' });

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      setPosts(await fetchForumPosts());
    } catch (e: any) {
      setError(e?.message || 'Unable to load forum posts.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filteredPosts = useMemo(() => posts.filter((post) => {
    const matchesQuery = !query || [post.title, post.content, post.authorName, post.category]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = !categoryFilter || post.category === categoryFilter;
    return matchesQuery && matchesCategory;
  }), [posts, query, categoryFilter]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      await createForumPost({ title: form.title, category: form.category, content: form.content, authorId: user.uid, authorName: user.fullName });
      setForm({ title: '', category: '', content: '' });
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ice min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-manrope text-slate mb-4">Forum</h1>
          <p className="text-slate-600 text-lg">Real discussions between farms, sellers and buyers stored in Firestore.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-[1fr_240px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full px-4 py-3 border border-silver rounded-lg text-slate"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 border border-silver rounded-lg text-slate"
            >
              <option value="">All categories</option>
              {forumCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          {error && <p className="mt-4 text-sm text-coral">{error}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold font-manrope text-slate mb-6">Latest Discussions</h2>
              <div className="space-y-4">
                {loading ? (
                  <p className="text-slate-500">Loading discussions...</p>
                ) : filteredPosts.length > 0 ? filteredPosts.map((post) => (
                  <Link key={post.id} href={`/forum/${post.id}`} className="block p-4 bg-seafoam rounded-lg hover:bg-teal-50 transition-colors border border-silver">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-slate">{post.title}</h3>
                      <span className="text-xs px-2 py-1 bg-white rounded-full border border-silver text-slate-600">{post.category}</span>
                    </div>
                    <p className="text-slate-600 text-sm line-clamp-2">{post.content}</p>
                    <div className="flex flex-wrap items-center mt-2 text-xs text-slate-600 gap-x-2 gap-y-1">
                      <span>{post.replyCount} replies</span>
                      <span>•</span>
                      <span>{post.lastActivityAt ? new Date(post.lastActivityAt).toLocaleString('en-GB') : 'Just now'}</span>
                      <span>•</span>
                      <span>{post.authorName}</span>
                    </div>
                  </Link>
                )) : <p className="text-slate-500">No discussion topics found.</p>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold font-manrope text-slate mb-6">Start a New Discussion</h2>
              {user ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-slate font-medium mb-2">Topic Title</label>
                    <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 border border-silver rounded-lg text-slate" placeholder="Enter your topic title" />
                  </div>
                  <div>
                    <label className="block text-slate font-medium mb-2">Category</label>
                    <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 border border-silver rounded-lg text-slate">
                      <option value="">Select a category</option>
                      {forumCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate font-medium mb-2">Message</label>
                    <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} className="w-full px-4 py-3 border border-silver rounded-lg text-slate resize-none" placeholder="Write your message here..." />
                  </div>
                  <Button type="submit" variant="primary" className="w-full" disabled={submitting}>{submitting ? 'Posting...' : 'Post Discussion'}</Button>
                </form>
              ) : <p className="text-sm text-slate-500">Login to create a real discussion topic.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
