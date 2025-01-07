const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/originals/**',
      },
      {
        protocol: 'https',
        hostname: 'd1ih8jugeo2m5m.cloudfront.net',
        port: '',
        pathname: '/2024/10/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Puedes agregar más opciones de configuración aquí si es necesario
};

export default nextConfig;