import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export default async function Areas() {
  // Fetch top neighborhoods from database
  const neighborhoods = await prisma.neighborhood.findMany({
    where: { published: true },
    orderBy: { name: 'asc' },
    take: 6
  })

  return (
    <section className="py-16 bg-kwGrayLight/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold leading-snug text-kwBlack mb-4">
            Explore South Florida
          </h2>
          <p className="text-base md:text-lg font-sans leading-7 text-kwGrayMedium max-w-2xl mx-auto">
            From waterfront estates to golf course communities, discover the lifestyle that speaks to you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {neighborhoods.map((neighborhood) => (
            <Link key={neighborhood.id} href={`/areas/${neighborhood.slug}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                <div className="aspect-[3/2] relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={neighborhood.image || `/api/placeholder/300/200?text=${encodeURIComponent(neighborhood.name)}`}
                    alt={neighborhood.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-sans font-semibold mb-1">{neighborhood.name}</h3>
                    <p className="text-sm text-white/90 line-clamp-2">
                      {neighborhood.description || 'Luxury living in South Florida'}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/areas">
            <span className="inline-flex items-center text-kwRed hover:text-kwRed/80 font-medium">
              View All Areas
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}