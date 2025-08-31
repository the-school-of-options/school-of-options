import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || 'https://theschoolofoptions.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/dev/',
        '/preview/',
        '/_next/',
        '/knowledge-hub', // Old routes that redirect
        '/about',
        '/contact',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
