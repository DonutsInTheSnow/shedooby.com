'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  body: string;
  image: string | null;
  created_at: string;
}

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = use(params);

  useEffect(() => {
  const checkAuth = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log('Edit page session:', { session, error, userId: session?.user?.id });
    if (error || !session || session.user.id !== 'a7560fa4-39cc-4564-a04c-e894f9ee33bd') { 
      console.log('Redirecting to login, session check failed');
      router.push('/admin/login');
      return;
    }
    const fetchBlogPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching blog post:', error);
        router.push('/blog');
        return;
      }
      setBlog(data);
      setTitle(data.title);
      setBody(data.body);
      setLoading(false);
    };
      fetchBlogPost();
    };
    checkAuth();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) formData.append('image', image);

    const response = await fetch(`/api/blog/update/${id}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const { error } = await response.json();
      setError('Failed to update post: ' + error);
      return;
    }

    router.push('/blog');
  };
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const response = await fetch(`/api/blog/delete/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    console.log('Delete response:', response.status, result);

    if (!response.ok) {
      const { error } = result;
      setError('Failed to delete post: ' + error);
      return;
    }

    router.push('/blog');
  };

  if (loading) {
    return <div className="min-h-screen bg-[#d7cdbc] pt-[120px] px-2 text-center">Loading...</div>;
  }

  if (!blog) {
    return <div className="min-h-screen bg-[#d7cdbc] pt-[120px] px-2 text-center">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#d7cdbc] pt-[120px] pb-[150px] px-2">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Blog Post</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-800 mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2 text-amber-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-800 mb-2">
              Body (use Markdown: # Heading, **bold**, *italic*)
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border rounded p-2 text-amber-700"
              rows={6}
              placeholder="Enter Markdown content (e.g., # Heading\nParagraph **bold** *italic*)"
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
              className="w-full border rounded p-2 text-amber-700"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#24572b] text-white px-4 py-2 rounded hover:bg-black"
            >
              Update Post
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
            >
              Delete Post
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