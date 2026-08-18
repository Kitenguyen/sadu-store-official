import { createFileRoute } from '@tanstack/react-router'
import { getRequestSiteUrl } from '../lib/site'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const siteUrl = getRequestSiteUrl(request)
        const body = [
          'User-agent: *',
          'Allow: /sadu-store-official',
          '',
          `Sitemap: ${siteUrl}/sitemap.xml`,
        ].join('\n')
        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
          },
        })
      },
    },
  },
})
