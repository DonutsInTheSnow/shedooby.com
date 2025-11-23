'use client';

import { useEffect, useState } from 'react';
import { fetchBlog } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface Blog {
  id: string;
  slug: string;
  title: string;
  body: string;
  image: string | null; // Image is nullable in Supabase
  created_at: string; // Supabase returns ISO string
}

export default function Blog() {
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    const getBlog = async () => {
      const blogFromDB = await fetchBlog();
      setBlog(blogFromDB);
    };

    getBlog();
  }, []);

  return (
    <div className="min-h-screen bg-[#d7cdbc] pt-[120px] pb-[150px] px-2">
      <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Blog</h2>
      <div className="bg-[#cac0b0] h-[42px] mx-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pt-7">
        {blog.length === 0 ? (
          <p className="text-center text-lg text-gray-800">No blog available.</p>
        ) : (
          blog.map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md text-center">
              {blog.image ? (
                blog.image.endsWith('.mp4') ? (
                  <video
                    src={blog.image}
                    className="w-full aspect-square object-cover rounded"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover rounded"
                  />
                )
              ) : (
                <div className="w-full aspect-square bg-gray-200 rounded" />
              )}
              <h2 className="text-xl font-semibold text-gray-800 mt-2">{blog.title}</h2>
              <div
                className="text-gray-800 text-left"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked.parse(blog.body.slice(0, 100)) + '...'),
                }}
              />
              <small className="text-black">{new Date(blog.created_at).toLocaleDateString()}</small>
              <div className="mt-4">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="bg-[#24572b] text-white px-4 py-2 rounded hover:bg-black"
                >
                  Read Post
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}