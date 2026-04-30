'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { createForumReply, fetchForumPostById, fetchForumReplies } from '@/lib/firebase-data';
import { ForumPost, ForumReply } from '@/lib/types';

export default function ForumPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [postData, replyRows] = await Promise.all([fetchForumPostById(params.id), fetchForumReplies(params.id)]);
      setPost(postData);
      setReplies(replyRows);
    } catch (e: any) {
      setError(e?.message || 'Unable to load this discussion.');
      setPost(null);
      setReplies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [params.id]);

  const handleReply = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      await createForumReply(params.id, { authorId: user.uid, authorName: user.fullName, content });
      setContent('');
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-slate-500">Loading discussion...</div></div>;
  }

  if (!post) {
    return <div className="min-h-screen bg-ice flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate mb-4">Discussion not found</h1>{error && <p className="text-sm text-coral mb-4">{error}</p>}<Button onClick={() => router.push('/forum')}>Back to forum</Button></div></div>;
  }

  return (
    <div className="min-h-screen bg-ice py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-slate-500"><Link href="/forum" className="hover:text-ocean">Forum</Link> / <span className="text-slate">{post.title}</span></div>
        <div className="bg-white rounded-card shadow-card p-8 mb-6">
          <div className="flex items-center justify-between gap-4 mb-4"><span className="text-xs px-2 py-1 bg-seafoam border border-silver rounded-full text-slate-600">{post.category}</span><span className="text-sm text-slate-500">{post.authorName}</span></div>
          <h1 className="text-3xl font-bold font-manrope text-slate mb-4">{post.title}</h1>
          <p className="text-slate-700 whitespace-pre-line">{post.content}</p>
          <div className="mt-4 text-sm text-slate-500">Created {post.createdAt ? new Date(post.createdAt).toLocaleString('en-GB') : 'recently'}</div>
        </div>

        <div className="bg-white rounded-card shadow-card p-6 mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold font-manrope text-slate">Replies</h2>
            <span className="text-sm text-slate-500">{replies.length} total</span>
          </div>
          <div className="space-y-4">
            {replies.length > 0 ? replies.map((reply) => <div key={reply.id} className="p-4 bg-seafoam rounded-lg"><div className="flex items-center justify-between mb-2"><span className="font-medium text-slate">{reply.authorName}</span><span className="text-xs text-slate-500">{reply.createdAt ? new Date(reply.createdAt).toLocaleString('en-GB') : 'Just now'}</span></div><p className="text-slate-700 whitespace-pre-line">{reply.content}</p></div>) : <p className="text-slate-500">No replies yet.</p>}
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-6">
          <h2 className="text-xl font-semibold font-manrope text-slate mb-4">Add reply</h2>
          {user ? (
            <form onSubmit={handleReply} className="space-y-4">
              <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={5} className="w-full px-4 py-3 border border-silver rounded-lg text-slate resize-none" placeholder="Write your reply..." />
              <Button type="submit" variant="primary" disabled={submitting}>{submitting ? 'Posting...' : 'Post Reply'}</Button>
            </form>
          ) : <p className="text-sm text-slate-500">Login to join the discussion.</p>}
        </div>
      </div>
    </div>
  );
}
