import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function BlogTeaser() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      publishedAt: true,
      authorId: true
    }
  })

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-sans font-semibold leading-snug text-kwBlack mb-4">
              Latest Market Insights
            </h2>
            <p className="text-base md:text-lg font-sans leading-7 text-kwGrayMedium max-w-2xl">
              Market updates, buying guides, and South Florida real estate insights
            </p>
          </div>
          <Link 
            href="/blog" 
            className="hidden md:inline-flex items-center text-kwRed hover:text-kwRed/80 font-medium"
          >
            View All Posts
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-sans font-medium text-kwBlack mb-3 group-hover:text-kwRed transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-base font-sans leading-7 text-kwGrayMedium mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-kwGrayMedium">
                    <span>
                      By Tracey Joiner
                    </span>
                    {post.publishedAt && (
                      <time>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-kwRed hover:text-kwRed/80 font-medium"
          >
            View All Posts
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}