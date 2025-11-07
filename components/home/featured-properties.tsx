import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

interface Property {
  id: string
  title: string
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFootage: number | null
  images: string[]
  listingType: string
  status: string
  features: any
}

export default async function FeaturedProperties() {
  // Fetch properties from database (temporarily fetch all until featured field is available)
  const properties = await prisma.property.findMany({
    where: { 
      status: 'ACTIVE' 
    },
    take: 3,
    orderBy: { createdAt: 'desc' }
  })

  // Helper function to format property features display
  const getDisplayFeatures = (property: any) => {
    const features = []
    if (property.bedrooms) features.push(`${property.bedrooms} Bed`)
    if (property.bathrooms) features.push(`${Number(property.bathrooms)} Bath`)
    if (property.sqft) features.push(`${property.sqft.toLocaleString()} Sq Ft`)
    return features.join(' • ')
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold leading-snug text-kwBlack mb-4">
            Featured Properties
          </h2>
          <p className="text-base md:text-lg font-sans leading-7 text-kwGrayMedium max-w-2xl mx-auto">
            Discover exceptional homes carefully selected for their unique character and prime locations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property: any) => (
            <Card key={property.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={property.images?.[0] || `/api/placeholder/400/300?text=${encodeURIComponent(property.address)}`}
                  alt={property.address}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-kwRed text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${property.price.toLocaleString()}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-kwBlack px-3 py-1 rounded-full text-sm font-medium">
                    {property.propertyType.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-sans font-semibold text-kwBlack mb-2 line-clamp-1">
                  {property.address}
                </h3>
                <p className="text-kwGrayMedium mb-3">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </p>
                <p className="text-kwGrayMedium text-sm mb-4">
                  {getDisplayFeatures(property)}
                </p>
                <Link 
                  href={`/properties/${property.id}`}
                  className="text-kwRed hover:text-kwRed/80 font-medium text-sm"
                >
                  View Details →
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/search">
            <span className="inline-flex items-center bg-kwRed hover:bg-kwRed/90 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
              View All Properties
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