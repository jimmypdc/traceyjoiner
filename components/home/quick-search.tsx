import Link from 'next/link'
import { Button } from '@/components/ui/button'

const quickSearches = [
  { label: 'Waterfront Homes', href: '/search?type=waterfront' },
  { label: 'Golf Communities', href: '/search?type=golf' },
  { label: 'New Construction', href: '/search?type=new' },
  { label: 'Luxury Condos', href: '/search?type=luxury-condos' },
  { label: 'Gated Communities', href: '/search?type=gated' },
  { label: 'Investment Properties', href: '/search?type=investment' }
]

export default function QuickSearch() {
  return (
    <section className="py-12 bg-kwGrayLight/20">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold leading-snug text-kwBlack mb-3">
            Find Your Perfect Home
          </h2>
          <p className="text-base md:text-lg font-sans leading-7 text-kwGrayMedium max-w-2xl mx-auto">
            Explore our most popular property types and neighborhoods in South Florida
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {quickSearches.map((search) => (
            <Link key={search.href} href={search.href}>
              <Button 
                variant="outline" 
                className="border-kwGrayMedium text-kwBlack hover:bg-kwRed hover:text-white hover:border-kwRed"
              >
                {search.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}