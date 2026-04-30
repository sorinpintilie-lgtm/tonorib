'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { fetchBlogPostById } from '@/lib/firebase-data';
import { BlogPost } from '@/lib/types';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlogPostById(params.id).then(setPost).catch(() => setPost(null));
  }, [params.id]);

  if (!post) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate mb-4">Post not found</h1><Button onClick={() => router.push('/blog')}>Back to blog</Button></div></div>;
  }

  return (
    <div className="min-h-screen bg-ice py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-slate-500"><Link href="/blog" className="hover:text-ocean">Blog</Link> / <span className="text-slate">{post.title}</span></div>
        <article className="bg-white rounded-card shadow-card overflow-hidden">
          {post.coverImage && <div className="aspect-[16/7] overflow-hidden"><img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" /></div>}
          <div className="p-8">
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-4"><span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-GB') : 'Recently'}</span><span className="px-2 py-1 bg-teal-50 text-teal rounded">{post.category}</span></div>
            <h1 className="text-3xl font-bold font-manrope text-slate mb-4">{post.title}</h1>
            <p className="text-slate-500 mb-6">{post.excerpt}</p>
            <div className="prose max-w-none whitespace-pre-line text-slate-700">{post.content}</div>
          </div>
        </article>
      </div>
    </div>
  );
}
