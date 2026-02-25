import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.jurispage.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "jurispage.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/seo-for-family-law-firms/:path*",
        destination: "/family-law-firm-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-personal-injury-law-firms/:path*",
        destination: "/personal-injury-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-employment-law-firms/:path*",
        destination: "/employment-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-estate-planning-lawyers/:path*",
        destination: "/estate-planning-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-immigration-law-firms/:path*",
        destination: "/immigration-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-real-estate-law-firms/:path*",
        destination: "/real-estate-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-bankruptcy-lawyers/:path*",
        destination: "/bankruptcy-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/criminal-defense-lawyer-seo/:path*",
        destination: "/criminal-defense-lawyer-marketing/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
