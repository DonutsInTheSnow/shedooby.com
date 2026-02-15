import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import type { SanityDocument, PortableTextBlock } from "next-sanity";
import ProseableText from "@/components/ProseableText";
import { Metadata } from "next";

interface Post extends SanityDocument {
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: PortableTextBlock[];
  image?: {
    alt?: string;
    asset?: {
      _ref: string;
      url?: string;
    };
  };
}

const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,

    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url
        }
      }
    },

    image {
      alt,
      asset->{
        _id,
        url
      }
    }
  }
`;

const options = { next: { revalidate: 30 } };

// Dynamic metadata for perfect social sharing
type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug }, options);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }


  const SITE_URL = "https://shedooby.com";

  const ogImage = post.image?.asset?.url 
    ? new URL(post.image.asset.url, SITE_URL).toString()
    : `${SITE_URL}/images/drill-sergeant-mobile.webp`;

  return {
    title: post.title,
    description:
      post.body[0]?.children?.[0]?.text?.slice(0, 160) ??
      "Blog post by Rich Hudson",

    openGraph: {
      title: post.title,
      description:
        post.body[0]?.children?.[0]?.text?.slice(0, 160) ??
        "Blog post by Rich Hudson",
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.image?.alt ?? post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.body[0]?.children?.[0]?.text?.slice(0, 160) ??
        "Blog post by Rich Hudson",
      images: [ogImage],
    },
  };

}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_QUERY, { slug }, options);

  if (!post) {
    return (
      <main className="container mx-auto max-w-3xl p-8">
        <h1 className="text-3xl font-bold">Post not found</h1>
      </main>
    );
  }

  const imageUrl = post.image?.asset?.url ?? null;
  const pageUrl = `https://shedooby.com/blog/${slug}`;
  const shareUrl = encodeURIComponent(pageUrl);

  const twitterUrl = `https://x.com/intent/tweet?url=${shareUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  return (
    <main className="py-22 bg-gray-800">
      <div className="max-w-3xl mx-auto min-h-screen p-8 flex flex-col gap-6">
        <Link href="/blog" className="text-gray-300 hover:underline">
          ← Back to posts
        </Link>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.image?.alt || post.title}
            width={1200}
            height={675}
            className="w-full rounded-xl object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        )}

        <h1 className="text-5xl font-bold text-center text-white">{post.title}</h1>

        <time className="text-gray-400 text-center block">
          By Rich Hudson • {new Date(post.publishedAt).toLocaleDateString()}
        </time>

        <article className="mx-auto w-full prose prose-invert max-w-none">
          <ProseableText value={post.body} />
        </article>

        {/* Social Share Buttons */}
        <div className="flex justify-center gap-8 mt-16">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Share on X"
          >
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
            </svg>
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="Share on Facebook"
          >
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}