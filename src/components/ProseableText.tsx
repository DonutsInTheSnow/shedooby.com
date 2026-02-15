// src/components/ProseableText.tsx
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

type Props = {
  value: PortableTextBlock[];
  className?: string;
};

const ProseableText: React.FC<Props> = ({ value }) => {
  // ---- Custom Tailwind-styled components (no prose) ----
  const components: Partial<PortableTextReactComponents> = {
    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-amber-200">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl lg:text-4xl font-semibold mb-5 text-amber-200">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-amber-200">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-xl lg:text-2xl leading-relaxed tracking-wide mb-6 text-gray-200">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-amber-600 pl-4 italic text-amber-100 mb-6">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="list-disc ml-6 space-y-2 text-xl lg:text-2xl text-gray-200 mb-6">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal ml-6 space-y-2 text-xl lg:text-2xl text-gray-200 mb-6">
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => <li className="ml-1">{children}</li>,
      number: ({ children }) => <li className="ml-1">{children}</li>,
    },

    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className="text-amber-400 underline font-medium hover:text-amber-300"
        >
          {children}
        </a>
      ),
    },

        // ← ADD THIS NEW SECTION (for inline images)
    types: {
      image: ({ value }) => {
        if (!value?.asset?.url) return null;

        return (
          <div className="my-12 -mx-8 md:-mx-16 lg:-mx-32">
            <Image
              src={value.asset.url + "?w=600&auto=format"}  // optimizes delivery
              alt={value.alt || ""}
              width={600}
              height={400}  // adjust or calculate real aspect ratio if needed
              className="rounded-xl shadow-xl mx-auto"
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 90vw, 600px"
              priority={false}
            />
          </div>
        );
      },
    },

  };

  return (
    <PortableText
      value={value}
      components={components}
    />
  );
};

export default ProseableText;
