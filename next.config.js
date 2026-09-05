/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración optimizada para Firebase App Hosting (SSR + Cloud Run)
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/app',
        destination: '/app.html',
      },
      {
        source: '/dashboard',
        destination: '/dashboard.html',
      },
    ];
  },
};

module.exports = nextConfig;
