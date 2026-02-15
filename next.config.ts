import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ['www.pexels.com', 'pfbaeqmduprtzpjwcxin.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
