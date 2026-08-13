const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  eslint: {
    // Advertencia: Esto permite que las compilaciones de producción se completen incluso si hay errores de ESLint.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Advertencia: Esto permite que las compilaciones de producción se completen incluso si hay errores de tipo.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Default is 60s, which means optimized images are barely cached at the edge —
    // every repeat visit re-processes them. 7 days keeps repeat loads instant while
    // still picking up replaced assets within a week (assets aren't filename-hashed).
    minimumCacheTTL: 604800,
  },
  async headers() {
    return [
      {
        // Static marketing assets (backgrounds, hero photos) — long cache, revalidate weekly.
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' },
        ],
      },
      {
        // Hero videos — same policy, these are large (5-7MB) and never change on the fly.
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
