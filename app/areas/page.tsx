import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Areas We Serve — Keller Williams',
  description: 'Explore South Florida\'s premier neighborhoods and communities. From Jupiter to Boca Raton, discover luxury living areas served by our expert team.'
}

export const revalidate = 3600 // Revalidate every hour

export default async function AreasPage() {
  const neighborhoods = await prisma.neighborhood.findMany({
    where: { published: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-sans font-semibold text-kwBlack mb-6">
          Areas We Serve
        </h1>
        <p className="text-lg font-sans leading-8 text-kwGrayMedium max-w-3xl mx-auto">
          Discover South Florida&apos;s most desirable communities, from pristine beaches 
          to luxury golf communities. Our local expertise ensures you find the perfect neighborhood.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {neighborhoods.map((neighborhood) => (
          <Link key={neighborhood.id} href={`/areas/${neighborhood.slug}`}>
            <Card className="group hover:shadow-lg transition-shadow h-full">
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                <Image
                  src={neighborhood.image || `/api/placeholder/400/300?text=${encodeURIComponent(neighborhood.name)}`}
                  alt={neighborhood.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-sans font-medium text-kwBlack mb-3 group-hover:text-kwRed transition-colors">
                  {neighborhood.name}
                </h3>
                {neighborhood.description && (
                  <p className="text-base font-sans leading-7 text-kwGrayMedium mb-4 line-clamp-3">
                    {neighborhood.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center mb-4">
                  {neighborhood.avgPrice && (
                    <div className="text-sm">
                      <span className="text-kwGray">Avg. Price:</span>
                      <span className="font-medium text-kwBlack ml-1">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(neighborhood.avgPrice / 100)}
                      </span>
                    </div>
                  )}
                  {neighborhood.totalHomes && (
                    <div className="text-sm">
                      <span className="text-kwGray">Homes:</span>
                      <span className="font-medium text-kwBlack ml-1">{neighborhood.totalHomes}+</span>
                    </div>
                  )}
                </div>

                {neighborhood.features && neighborhood.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {neighborhood.features.slice(0, 3).map((feature, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-kwRed/10 text-kwRed px-2 py-1 rounded font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Button variant="outline" className="w-full text-sm border-kwGrayMedium text-kwBlack hover:bg-kwRed hover:text-white hover:border-kwRed">
                  Explore {neighborhood.name}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-kwGrayLight/20 border-kwGrayLight">
          <CardContent className="py-12 px-8">
            <h2 className="text-4xl font-sans font-semibold text-kwBlack mb-4">
              Ready to Find Your Perfect Neighborhood?
            </h2>
            <p className="text-base font-sans leading-7 text-kwGrayMedium mb-6 max-w-2xl mx-auto">
              Our local experts know every community inside and out. Let us help you discover 
              the neighborhood that matches your lifestyle and investment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-kwRed hover:bg-kwRed/90">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" className="border-kwGrayMedium text-kwBlack hover:bg-kwRed hover:text-white">
                  Search Properties
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}