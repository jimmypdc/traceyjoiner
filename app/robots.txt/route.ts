export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://coastalrealty.com'
  
  const robotsTxt = [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /api/',
    'Disallow: /_next/',
    'Disallow: /admin/',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`
  ].join('\n')
  
  return new Response(robotsTxt, { 
    headers: { 
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    } 
  })
}