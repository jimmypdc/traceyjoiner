import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const { slug } = await params
  const neighborhood = await prisma.neighborhood.findUnique({
    where: { slug },
    select: { name: true, description: true, image: true }
  })
  
  if (!neighborhood) {
    return { title: 'Neighborhood Not Found' }
  }
  
  return {
    title: `${neighborhood.name} Real Estate — Keller Williams`,
    description: neighborhood.description || `Explore luxury homes and properties in ${neighborhood.name}, South Florida. Expert real estate services from our Keller Williams team.`,
    openGraph: {
      title: `${neighborhood.name} Real Estate`,
      description: neighborhood.description || `Luxury real estate in ${neighborhood.name}`,
      images: neighborhood.image ? [neighborhood.image] : undefined
    }
  }
}

export default async function NeighborhoodPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { slug } = await params
  
  const neighborhood = await prisma.neighborhood.findUnique({
    where: { slug }
  })
  
  if (!neighborhood || !neighborhood.published) {
    return notFound()
  }

  // Get properties in this neighborhood
  const properties = await prisma.property.findMany({
    where: { 
      OR: [
        { city: { contains: neighborhood.name, mode: 'insensitive' } },
        { neighborhood: { contains: neighborhood.name, mode: 'insensitive' } }
      ],
      status: 'ACTIVE'
    },
    take: 6,
    orderBy: { createdAt: 'desc' }
  })

  const schools = neighborhood.schools as any
  const amenities = neighborhood.amenities as any

  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="aspect-[21/9] relative overflow-hidden rounded-2xl mb-8">
          <Image
            src={neighborhood.image || `/api/placeholder/1200/400?text=${encodeURIComponent(neighborhood.name)}`}
            alt={neighborhood.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kwBlack/60 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-5xl md:text-6xl font-sans font-semibold mb-4">
              {neighborhood.name}
            </h1>
            <p className="text-lg font-sans leading-8 max-w-2xl">
              {neighborhood.description}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {neighborhood.avgPrice && (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-sans font-semibold text-kwBlack mb-2">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(neighborhood.avgPrice / 100)}
                </div>
                <div className="text-sm text-kwGrayMedium">Average Home Price</div>
              </CardContent>
            </Card>
          )}
          {neighborhood.totalHomes && (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-sans font-semibold text-kwBlack mb-2">
                  {neighborhood.totalHomes.toLocaleString()}+
                </div>
                <div className="text-sm text-kwGrayMedium">Homes Available</div>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-sans font-semibold text-kwBlack mb-2">
                A+
              </div>
              <div className="text-sm text-kwGrayMedium">School Districts</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mb-16">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Features */}
          {neighborhood.features && neighborhood.features.length > 0 && (
            <section>
              <h2 className="text-3xl font-sans font-semibold text-kwBlack mb-6">
                Neighborhood Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {neighborhood.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-kwRed rounded-full flex-shrink-0" />
                    <span className="text-kwGrayMedium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Schools */}
          {schools && (
            <section>
              <h2 className="text-3xl font-sans font-semibold text-kwBlack mb-6">
                Schools & Education
              </h2>
              <div className="space-y-4">
                {schools.elementary && (
                  <div>
                    <h3 className="text-lg font-medium text-kwBlack mb-2">Elementary Schools</h3>
                    <div className="space-y-1">
                      {schools.elementary.map((school: string, index: number) => (
                        <p key={index} className="text-kwGrayMedium">{school}</p>
                      ))}
                    </div>
                  </div>
                )}
                {schools.middle && (
                  <div>
                    <h3 className="text-lg font-medium text-kwBlack mb-2">Middle Schools</h3>
                    <div className="space-y-1">
                      {schools.middle.map((school: string, index: number) => (
                        <p key={index} className="text-kwGrayMedium">{school}</p>
                      ))}
                    </div>
                  </div>
                )}
                {schools.high && (
                  <div>
                    <h3 className="text-lg font-medium text-kwBlack mb-2">High Schools</h3>
                    <div className="space-y-1">
                      {schools.high.map((school: string, index: number) => (
                        <p key={index} className="text-kwGrayMedium">{school}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Properties */}
          {properties.length > 0 && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-sans font-semibold text-kwBlack">
                  Available Properties
                </h2>
                <Link href={`/search?city=${encodeURIComponent(neighborhood.name)}`}>
                  <Button variant="outline" className="border-kwGrayMedium text-kwBlack hover:bg-kwRed hover:text-white">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {properties.slice(0, 4).map((property) => (
                  <Card key={property.id} className="group hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                      <Image
                        src={property.images[0] || `/api/placeholder/400/300?text=${encodeURIComponent(property.propertyType)}`}
                        alt={property.address}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-kwRed font-medium bg-kwRed/10 px-2 py-1 rounded">
                          {property.propertyType.replace('_', ' ')}
                        </span>
                        <span className="font-sans text-lg text-kwBlack font-semibold">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(property.price / 100)}
                        </span>
                      </div>
                      <p className="text-kwGrayMedium mb-1 font-medium">{property.address}</p>
                      <div className="flex gap-4 text-sm text-kwGrayMedium">
                        <span>{property.bedrooms} bd</span>
                        <span>{property.bathrooms.toNumber()} ba</span>
                        <span>{property.sqft?.toLocaleString() || 'N/A'} sqft</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Amenities */}
          {amenities && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-sans font-medium text-kwBlack mb-4">
                  Local Amenities
                </h3>
                <div className="space-y-4">
                  {amenities.beaches && (
                    <div>
                      <h4 className="font-medium text-kwBlack mb-2">Beaches</h4>
                      <div className="space-y-1">
                        {amenities.beaches.map((beach: string, index: number) => (
                          <p key={index} className="text-sm text-kwGrayMedium">{beach}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {amenities.golf && (
                    <div>
                      <h4 className="font-medium text-kwBlack mb-2">Golf</h4>
                      <div className="space-y-1">
                        {amenities.golf.map((course: string, index: number) => (
                          <p key={index} className="text-sm text-kwGrayMedium">{course}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {amenities.shopping && (
                    <div>
                      <h4 className="font-medium text-kwBlack mb-2">Shopping</h4>
                      <div className="space-y-1">
                        {amenities.shopping.map((shop: string, index: number) => (
                          <p key={index} className="text-sm text-kwGrayMedium">{shop}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {amenities.dining && (
                    <div>
                      <h4 className="font-medium text-kwBlack mb-2">Dining</h4>
                      <div className="space-y-1">
                        {amenities.dining.map((restaurant: string, index: number) => (
                          <p key={index} className="text-sm text-kwGrayMedium">{restaurant}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className="bg-kwRed text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-sans font-medium mb-3">
                Interested in {neighborhood.name}?
              </h3>
              <p className="text-white/90 mb-4 text-sm">
                Get personalized insights and exclusive property previews.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-kwRed w-full">
                  Contact Our Team
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}