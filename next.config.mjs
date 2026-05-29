/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: "/medical-tourism",
        destination: "/international-patient-care",
        permanent: true,
      },
      {
        source: "/:locale(uz|ky|en|kk|tg|tk|ru)/medical-tourism",
        destination: "/:locale/international-patient-care",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
    optimizePackageImports: ["lucide-react"],
    outputFileTracingExcludes: {
      "/*": [".git/**/*", ".next/cache/**/*"],
    },
  },
};

export default nextConfig;
