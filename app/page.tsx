import Hero from '@/components/home/hero'
import QuickSearch from '@/components/home/quick-search'
import FeaturedProperties from '@/components/home/featured-properties'
import Areas from '@/components/home/areas'
import ValueProps from '@/components/home/value-props'
import Testimonials from '@/components/home/testimonials'
import BlogTeaser from '@/components/home/blog-teaser'
import CTA from '@/components/home/cta'

export const metadata = {
  title: 'Tracey Joiner — Keller Williams Luxury Real Estate',
  description: 'Expert real estate services for luxury and waterfront properties in Jupiter, Palm Beach Gardens, Delray Beach, and Boca Raton. Your trusted Keller Williams agent.',
  openGraph: {
    title: 'Tracey Joiner — Keller Williams Luxury Real Estate',
    description: 'Expert real estate services for luxury and waterfront properties in Jupiter, Palm Beach Gardens, Delray Beach, and Boca Raton.',
    images: ['/api/placeholder/1200/630?text=Tracey+Joiner+Keller+Williams'],
    url: 'https://traceyjoiner.com'
  }
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <FeaturedProperties />
      <Areas />
      <ValueProps />
      <Testimonials />
      <BlogTeaser />
      <CTA />
    </>
  )
}