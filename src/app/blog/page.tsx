import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import Image from 'next/image'

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  image{
    alt,
    asset->{
      _id,
      url
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="min-h-screen bg-[#d7cdbc] pt-[120px] pb-[150px] px-2">
      <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Blog</h2>
      <div className="bg-[#cac0b0] h-[42px] mx-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pt-7">
          {posts.map((post) => (

            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
            {post.image?.asset?.url && (
              <Image
                src={post.image.asset.url}
                alt={post.image?.alt || post.title}
                width={300}
                height={300}
                className="w-full aspect-square object-cover rounded"
              />
            )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-green-600 underline group-hover:text-black transition">
                  {post.title}
                </h2>
                <p className="text-gray-700 font-semibold mb-3">{post.excerpt}</p>
                {/* <p>{new Date(post.publishedAt).toLocaleDateString()}</p> */}
              </div>
            </Link>

            ))}
      </div>
    </div>
  );
}