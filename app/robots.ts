import type { MetadataRoute } from 'next'
import { DOMAIN } from './constant/config'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${DOMAIN}/sitemap.xml`,
  }
}
