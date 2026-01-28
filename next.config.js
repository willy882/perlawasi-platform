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
  },
}

module.exports = nextConfig
