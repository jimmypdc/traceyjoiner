import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

// Placeholder listing data - replace with real IDX later
const featuredListings = [
  {
    id: '1',
    address: '123 Ocean Drive, Jupiter, FL',
    price: '$2,495,000',
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    image: '/api/placeholder/400/300?text=Luxury+Waterfront+Home',
    type: 'Waterfront'
  },
  {
    id: '2', 
    address: '456 Golf Club Lane, Palm Beach Gardens, FL',
    price: '$1,875,000',
    beds: 5,
    baths: 4,
    sqft: 4100,
    image: '/api/placeholder/400/300?text=Golf+Course+Estate',
    type: 'Golf Course'
  },
  {
    id: '3',
    address: '789 Coastal Way, Delray Beach, FL',
    price: '$3,200,000',
    beds: 6,
    baths: 5.5,
    sqft: 5200,
    image: '/api/placeholder/400/300?text=Beachfront+Villa',
    type: 'Beachfront'
  },
  {
    id: '4',
    address: '321 Marina Vista, Boca Raton, FL',
    price: '$1,650,000',
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: '/api/placeholder/400/300?text=Marina+Condo',
    type: 'Marina'
  }
]

export default function FeaturedListings() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold leading-snug text-brand-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-base md:text-lg font-sans leading-7 text-slate-600 max-w-2xl mx-auto">
            Discover exceptional homes in South Florida&apos;s most desirable communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-slate-200 rounded-t-xl overflow-hidden relative">
                <Image
                  src={listing.image}
                  alt={listing.address}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gold font-medium bg-gold/10 px-2 py-1 rounded">
                    {listing.type}
                  </span>
                  <span className="font-serif text-xl text-brand-900">
                    {listing.price}
                  </span>
                </div>
                <p className="text-slate-600 mb-3 text-sm">{listing.address}</p>
                <div className="flex gap-4 text-sm text-slate-500">
                  <span>{listing.beds} bd</span>
                  <span>{listing.baths} ba</span>
                  <span>{listing.sqft.toLocaleString()} sqft</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/search" 
            className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium"
          >
            View All Properties
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}