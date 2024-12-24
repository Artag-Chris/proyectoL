import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bioguia.com',
        port: '',
        pathname: '/embed/**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        port: '',
        pathname: '/th/id/**',
      },
      {
        protocol: 'http',
        hostname: 'blog.eco-citric.es',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/originals/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Puedes agregar más opciones de configuración aquí si es necesario
};

export default nextConfig;
