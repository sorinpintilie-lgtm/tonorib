'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchBlogPosts } from '@/lib/firebase-data';
import { BlogPost } from '@/lib/types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogPosts().then(setPosts).catch(() => setPosts([]));
  }, []);

  return (
    <div className="bg-ice min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-manrope text-slate mb-4">Blog</h1>
          <p className="text-slate-600 max-w-3xl">Published posts loaded from Firebase. Use this area for news, updates and educational content.</p>
        </div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block bg-white rounded-lg overflow-hidden border border-silver/60 shadow-sm hover:shadow-md transition-all">
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden">{post.coverImage ? <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400">No cover</div>}</div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-manrope text-slate mb-2">{post.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-slate-500"><span className="mr-3">{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-GB') : 'Recently'}</span><span className="bg-teal-50 text-teal px-2 py-1 rounded">{post.category}</span></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-card p-8 text-slate-500">No published blog posts yet.</div>
        )}
      </div>
    </div>
  );
}
