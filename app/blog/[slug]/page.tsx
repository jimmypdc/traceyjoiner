import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ 
    where: { slug },
    select: { title: true, excerpt: true, ogImageUrl: true }
  })
  
  if (!post) return { title: 'Post Not Found' }
  
  return { 
    title: `${post.title} — Keller Williams Blog`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.ogImageUrl ? [post.ogImageUrl] : undefined
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ 
    where: { slug },
    select: {
      title: true,
      content: true,
      excerpt: true,
      publishedAt: true,
      tags: true,
      published: true
    }
  })
  
  if (!post || !post.published) {
    return notFound()
  }

  return (
    <div className="container max-w-4xl py-16">
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-6"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string) => (
            <span 
              key={tag}
              className="text-sm text-gold font-medium bg-gold/10 px-3 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-brand-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-lg font-sans leading-8 text-slate-600 mb-6">
            {post.excerpt}
          </p>
        )}
        
        {post.publishedAt && (
          <time className="text-slate-500">
            Published on {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
      </div>

      <article className="prose prose-lg prose-slate max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </article>

      <div className="mt-16 p-8 bg-brand-50 rounded-2xl border border-brand-100">
        <div className="text-center">
          <h3 className="text-3xl font-serif font-medium text-brand-900 mb-4">
            Ready to Explore South Florida Real Estate?
          </h3>
          <p className="text-base font-sans leading-7 text-slate-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help you navigate the luxury real estate market 
            with expert guidance and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                Talk to an Agent
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="border-brand-300 text-brand-700 hover:bg-brand-600 hover:text-white">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}