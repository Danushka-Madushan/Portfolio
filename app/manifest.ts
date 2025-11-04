import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Danushka-Madushan',
    short_name: 'dmTools',
    description: 'Portfolio app showcasing skills and useful webDev tools',
    start_url: '/',
    display: 'standalone',
    background_color: '#02060c',
    theme_color: '#02060c',
    icons: [
      {
        src: '/favicon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.svg',
        sizes: '64x64',
        type: 'image/svg+xml',
      },
    ],
  }
}
