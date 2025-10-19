'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface Blog {
  id: string;
  title: string;
  body: string;
  image: string | null;
  created_at: string;
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = use(params);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
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
      setLoading(false);
    };

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(session?.user?.id === 'a7560fa4-39cc-4564-a04c-e894f9ee33bd');
    };

    fetchBlogPost();
    checkAuth();
  }, [id, router]);

  if (loading) {
    return <div className="min-h-screen bg-[#d7cdbc] pt-[120px] px-2 text-center">Loading...</div>;
  }

  if (!blog) {
    return <div className="min-h-screen bg-[#d7cdbc] pt-[120px] px-2 text-center">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#d7cdbc] pt-[120px] pb-[150px] px-2">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">{blog.title}</h1>
        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            width={1024}
            height={768}
            className="w-full object-cover rounded mb-4"
          />
        )}
        <div
          className="text-gray-800 mb-4 font-inter [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_p]:my-4 [&_p]:text-[20px]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(blog.body) as string),
          }}
        />
        <small className="text-black block mb-4">
          {new Date(blog.created_at).toLocaleDateString()}
        </small>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
          {isAdmin && (
            <Link
              href={`/admin/blog/${blog.id}/edit`}
              className="bg-[#24572b] text-white px-4 py-2 rounded hover:bg-black"
            >
              Edit Post
            </Link>
          )}
          <Link
            href="/blog"
            className="bg-[#24572b] text-white px-4 py-2 rounded hover:bg-black"
          >
            Back to Blog
          </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href={`https://x.com/share?url=${encodeURIComponent(
                `https://shedooby.com/blog/${blog.id}`
              )}&text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/x-icon.png" alt="X" width={30} height={30} />
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `https://shedooby.com/blog/${blog.id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/facebook-icon.png" alt="Facebook" width={30} height={30} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}