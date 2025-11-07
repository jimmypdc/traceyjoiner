import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata = { 
  title: 'Property Search — Keller Williams',
  description: 'Search luxury and waterfront properties in South Florida. Find your perfect home in Jupiter, Palm Beach Gardens, Delray Beach, and surrounding areas.'
}

export const revalidate = 60

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Await searchParams per Next.js 15 requirements
  const params = await searchParams
  
  // Get filter parameters
  const city = typeof params.city === 'string' ? params.city : undefined
  const propertyType = typeof params.type === 'string' ? params.type : undefined
  const minPrice = typeof params.minPrice === 'string' ? parseInt(params.minPrice) : undefined
  const maxPrice = typeof params.maxPrice === 'string' ? parseInt(params.maxPrice) : undefined

  // Build where clause for filtering
  const whereClause: any = {
    status: 'ACTIVE'
  }

  if (city) {
    whereClause.city = { contains: city, mode: 'insensitive' }
  }

  if (propertyType && propertyType !== 'All Types') {
    const typeMap: Record<string, string> = {
      'Single Family': 'SINGLE_FAMILY',
      'Condo': 'CONDO',
      'Townhouse': 'TOWNHOUSE',
      'Multi Family': 'MULTI_FAMILY',
      'Land': 'LAND'
    }
    whereClause.propertyType = typeMap[propertyType] || propertyType
  }

  if (minPrice || maxPrice) {
    whereClause.price = {}
    if (minPrice) whereClause.price.gte = minPrice * 100 // Convert to cents
    if (maxPrice) whereClause.price.lte = maxPrice * 100 // Convert to cents
  }

  // Fetch properties from database
  const properties = await prisma.property.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    take: 12
  })

  // Format properties for display
  const formattedProperties = properties.map(property => ({
    id: property.id,
    address: property.address,
    city: property.city,
    price: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(property.price / 100),
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms.toNumber(),
    sqft: property.sqft?.toLocaleString() || 'N/A',
    propertyType: property.propertyType.replace('_', ' '),
    images: property.images,
    neighborhood: property.neighborhood,
    features: property.features,
    daysOnMarket: property.daysOnMarket
  }))

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-sans font-semibold text-kwBlack mb-6">
          Find Your Dream Home
        </h1>
        <p className="text-lg font-sans leading-8 text-kwGrayMedium max-w-2xl mx-auto">
          Explore luxury properties in South Florida&apos;s most desirable communities
        </p>
      </div>

      {/* Search Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form method="GET" className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-2">Location</label>
              <select name="city" className="w-full border rounded-lg px-3 py-2 text-kwGrayMedium" defaultValue={city || ''}>
                <option value="">All Areas</option>
                <option value="Jupiter">Jupiter</option>
                <option value="Palm Beach Gardens">Palm Beach Gardens</option>
                <option value="Delray Beach">Delray Beach</option>
                <option value="Boca Raton">Boca Raton</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-2">Property Type</label>
              <select name="type" className="w-full border rounded-lg px-3 py-2 text-kwGrayMedium" defaultValue={propertyType || ''}>
                <option value="">All Types</option>
                <option value="Single Family">Single Family</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Multi Family">Multi Family</option>
                <option value="Land">Land</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-2">Min Price</label>
              <select name="minPrice" className="w-full border rounded-lg px-3 py-2 text-kwGrayMedium" defaultValue={minPrice?.toString() || ''}>
                <option value="">Any</option>
                <option value="500000">$500K</option>
                <option value="1000000">$1M</option>
                <option value="2000000">$2M</option>
                <option value="3000000">$3M</option>
                <option value="5000000">$5M</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-2">Max Price</label>
              <select name="maxPrice" className="w-full border rounded-lg px-3 py-2 text-kwGrayMedium" defaultValue={maxPrice?.toString() || ''}>
                <option value="">Any</option>
                <option value="1000000">$1M</option>
                <option value="2000000">$2M</option>
                <option value="3000000">$3M</option>
                <option value="5000000">$5M</option>
                <option value="10000000">$10M+</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">Search Properties</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-kwGrayMedium">
          {formattedProperties.length} {formattedProperties.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>

      {/* Property Grid */}
      {formattedProperties.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {formattedProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                <Image
                  src={property.images[0] || `/api/placeholder/400/300?text=${encodeURIComponent(property.propertyType)}`}
                  alt={property.address}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                {property.daysOnMarket && property.daysOnMarket < 30 && (
                  <div className="absolute top-4 left-4 bg-kwRed text-white px-2 py-1 rounded text-xs font-medium">
                    New Listing
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-kwRed font-medium bg-kwRed/10 px-2 py-1 rounded">
                    {property.propertyType}
                  </span>
                  <span className="font-sans text-xl text-kwBlack font-semibold">
                    {property.price}
                  </span>
                </div>
                <p className="text-kwGrayMedium mb-1 font-medium">{property.address}</p>
                <p className="text-kwGray text-sm mb-3">{property.city}</p>
                <div className="flex gap-4 text-sm text-kwGrayMedium mb-3">
                  <span>{property.bedrooms} bd</span>
                  <span>{property.bathrooms} ba</span>
                  <span>{property.sqft} sqft</span>
                </div>
                {property.neighborhood && (
                  <p className="text-xs text-kwGray mb-3">{property.neighborhood}</p>
                )}
                <Button variant="outline" className="w-full text-sm border-kwGray text-kwBlack hover:bg-kwRed hover:text-white hover:border-kwRed">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-kwGrayMedium mb-4">No properties found matching your criteria.</p>
          <p className="text-sm text-kwGray">Try adjusting your search filters or contact us for more options.</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-kwGrayLight/20 border-kwGrayLight">
          <CardContent className="py-12 px-8">
            <h2 className="text-4xl font-sans font-semibold text-kwBlack mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-base font-sans leading-7 text-kwGrayMedium mb-6 max-w-2xl mx-auto">
              Our team has access to exclusive listings and off-market properties. 
              Let us help you find the perfect home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-kwRed hover:bg-kwRed/90">
                  Contact an Agent
                </Button>
              </Link>
              <Link href="/valuation">
                <Button size="lg" variant="outline" className="border-kwGrayMedium text-kwBlack hover:bg-kwRed hover:text-white">
                  Get Property Alerts
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}