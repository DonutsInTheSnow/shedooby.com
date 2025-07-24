'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.id === 'a7560fa4-39cc-4564-a04c-e894f9ee33bd') {
        setIsAuthenticated(true);
      } else {
        router.push('/blog');
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) formData.append('image', image);

    const response = await fetch('/api/blog/create', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const { error } = await response.json();
      setError('Failed to create post: ' + error);
      return;
    }

    router.push('/blog');
  };

  if (loading) {
    return <div className="min-h-screen bg-[#d7cdbc] pt-[120px] px-2 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#d7cdbc] pt-[120px] px-2 text-center">Unauthorized</div>;
  }

  return (
    <div className="min-h-screen bg-[#d7cdbc] pt-[120px] pb-[150px] px-2">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create New Blog Post</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-800 mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2 text-amber-900"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-900 mb-2">Body</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border rounded p-2 text-amber-900"
              rows={6}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-800 mb-2">Image (optional, .webp)</label>
            <input
              id="image"
              type="file"
              accept=".webp"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full border rounded p-2 text-amber-800"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#24572b] text-white px-4 py-2 rounded hover:bg-black"
            >
              Create Post
            </button>
            <Link href="/blog" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}