import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'

export const metadata = { 
  title: 'Real Estate Blog — Coastal Realty',
  description: 'Expert insights on South Florida real estate, market trends, and luxury property guides for Jupiter, Palm Beach Gardens, and surrounding areas.'
}

export const revalidate = 60

export default async function BlogIndex() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 20,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      publishedAt: true,
      tags: true
    }
  })

  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-semibold text-brand-900 mb-6">
          Real Estate Insights & Guides
        </h1>
        <p className="text-lg font-sans leading-8 text-slate-600 max-w-3xl mx-auto">
          Stay informed with the latest market trends, buying guides, and neighborhood insights 
          for South Florida&apos;s luxury real estate market.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No blog posts available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span 
                        key={tag}
                        className="text-xs text-gold font-medium bg-gold/10 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-brand-900 mb-3 group-hover:text-brand-700 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-base font-sans leading-7 text-slate-600 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <time className="text-xs text-slate-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}