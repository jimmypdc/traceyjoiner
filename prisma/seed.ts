import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      role: 'ADMIN',
      passwordHash: null
    }
  })

  await prisma.teamMember.createMany({
    data: [
      { 
        name: 'Avery Collins', 
        title: 'Lead Agent', 
        bio: 'Specialist in waterfront and luxury coastal properties with over 15 years of experience in South Florida. Avery has helped hundreds of families find their perfect coastal home and consistently ranks in the top 1% of agents in Palm Beach County.', 
        headshot: '/api/placeholder/300/400?text=Avery+Collins', 
        order: 1,
        socials: {
          email: 'avery@coastalrealty.com',
          phone: '(561) 555-0101',
          linkedin: 'https://linkedin.com/in/averycollins'
        }
      },
      { 
        name: 'Riley Morgan', 
        title: 'Buyer Specialist', 
        bio: 'Dedicated to guiding relocations and first-time luxury buyers through the South Florida market. Riley\'s background in finance and keen eye for value help clients make confident investment decisions in their new coastal lifestyle.', 
        headshot: '/api/placeholder/300/400?text=Riley+Morgan', 
        order: 2,
        socials: {
          email: 'riley@coastalrealty.com',
          phone: '(561) 555-0102',
          instagram: 'https://instagram.com/rileymorgan_realestate'
        }
      },
      { 
        name: 'Jordan Blake', 
        title: 'Listing Coordinator', 
        bio: 'Expert in white-glove listing preparation and marketing for luxury properties. Jordan\'s strategic approach to staging, photography, and digital marketing ensures maximum exposure and optimal pricing for every listing.', 
        headshot: '/api/placeholder/300/400?text=Jordan+Blake', 
        order: 3,
        socials: {
          email: 'jordan@coastalrealty.com',
          phone: '(561) 555-0103',
          website: 'https://jordanblake.com'
        }
      }
    ]
  })

  // Upsert blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'south-florida-waterfront-guide-2025' },
    update: {},
    create: { 
      slug: 'south-florida-waterfront-guide-2025', 
      title: 'South Florida Waterfront Living: A 2025 Guide', 
      content: `# South Florida Waterfront Living: A 2025 Guide

South Florida's waterfront communities offer an unparalleled lifestyle combining luxury, natural beauty, and year-round boating weather. As we move through 2025, the market for waterfront properties continues to evolve with new opportunities and considerations for buyers.

## Popular Waterfront Communities

**Jupiter**: Known for its pristine beaches and excellent fishing, Jupiter offers everything from luxury condos to sprawling waterfront estates. The Jupiter Inlet provides direct ocean access, making it a favorite among boating enthusiasts.

**Palm Beach Gardens**: While inland, PBG features beautiful canal-front properties and communities like Admiral's Cove, offering deep-water dockage and resort-style amenities.

**Delray Beach**: The Intracoastal Waterway runs through Delray, providing both direct ocean access and protected waters perfect for all types of watercraft.

## What to Consider Before Buying

- **Dock rights and restrictions**: Understanding HOA rules and municipal regulations
- **Hurricane preparedness**: Modern building codes and insurance considerations  
- **Maintenance costs**: Salt air and water exposure require ongoing care
- **Access to ocean**: Bridges, depth restrictions, and navigational considerations

## Investment Outlook

Waterfront properties in South Florida have shown remarkable resilience and growth potential. With limited inventory and increasing demand from both domestic and international buyers, well-located waterfront homes continue to appreciate above market averages.

Ready to explore waterfront living? Contact our team for a personalized consultation and exclusive property previews.`, 
      excerpt: 'Everything you need to know about buying waterfront property in South Florida, from Jupiter to Delray Beach.', 
      published: true, 
      publishedAt: new Date('2025-01-15'), 
      tags: ['waterfront','guide','jupiter','market-update'],
      ogImageUrl: '/api/placeholder/1200/630?text=Waterfront+Guide+2025'
    }
  })

  await prisma.blogPost.upsert({
    where: { slug: 'best-gated-communities-palm-beach-gardens' },
    update: {},
    create: { 
      slug: 'best-gated-communities-palm-beach-gardens', 
      title: 'Best Gated Communities in Palm Beach Gardens', 
      content: `# Best Gated Communities in Palm Beach Gardens

Palm Beach Gardens stands out as one of South Florida's premier destinations for luxury gated community living. With championship golf courses, top-rated schools, and resort-style amenities, these communities offer the perfect blend of security, luxury, and lifestyle.

## Top Gated Communities

**PGA National**: Home to championship golf and world-class spa facilities. This massive community offers everything from condos to custom estates, all centered around the famous golf courses that host PGA events.

**Admiral's Cove**: Waterfront luxury with deep-water marina access. This exclusive community features custom homes, a private beach club, and some of the area's most prestigious addresses.

**Frenchman's Creek**: Jack Nicklaus-designed golf course and ultra-luxury estates. Known for its privacy and exclusivity, with homes often exceeding $5 million.

**BallenIsles**: Family-friendly community with excellent schools and diverse housing options. Features two championship golf courses and extensive recreational facilities.

## Amenities to Expect

- Championship golf courses designed by legendary architects
- Resort-style pools and fitness centers  
- Tennis and pickleball courts
- Marina access (select communities)
- 24/7 security and gated entry
- Dining facilities and event spaces

## Investment Considerations

Gated communities in PBG have shown consistent appreciation, particularly those with golf and water amenities. The combination of lifestyle amenities, security, and proximity to excellent schools makes these properties attractive to both full-time residents and seasonal buyers.

## School Districts

Most PBG gated communities fall within highly-rated school zones, making them particularly attractive to families with children.

Contact us for private tours and current inventory in your preferred community.`, 
      excerpt: 'A curated guide to family-friendly, amenity-rich gated communities in Palm Beach Gardens.', 
      published: true, 
      publishedAt: new Date('2025-01-10'), 
      tags: ['gated-communities','palm-beach-gardens','luxury','golf'],
      ogImageUrl: '/api/placeholder/1200/630?text=PBG+Gated+Communities'
    }
  })

  await prisma.blogPost.upsert({
    where: { slug: 'moving-to-jupiter-florida-2025' },
    update: {},
    create: { 
      slug: 'moving-to-jupiter-florida-2025', 
      title: 'Moving to Jupiter, FL: Neighborhoods & Schools Guide', 
      content: `# Moving to Jupiter, FL: Neighborhoods & Schools Guide

Jupiter consistently ranks among Florida's most desirable places to live, offering a unique combination of small-town charm, world-class amenities, and easy access to both Palm Beach and Fort Lauderdale. For families considering a move to Jupiter, understanding the neighborhoods and school options is essential.

## Top Neighborhoods for Families

**Abacoa**: Master-planned community with top-rated schools, shopping, and entertainment. Home to the Roger Dean Stadium and numerous family-friendly events throughout the year.

**Jupiter Inlet Colony**: Exclusive beachside community with luxury homes and private beach access. Perfect for families seeking both luxury and beach lifestyle.

**Egret Landing**: Gated community with golf course and family amenities. Known for its excellent schools and active community life.

**Old Port Cove**: Waterfront community with marina access and luxury amenities. Features both single-family homes and condos with boat slips.

## School Districts and Ratings

Jupiter is served by some of Palm Beach County's highest-rated schools:

- **Jupiter Elementary**: A+ rated school with innovative programs
- **Independence Middle School**: Highly rated with advanced academic programs  
- **Jupiter High School**: Excellent graduation rates and college preparation programs

Many neighborhoods also have access to highly-rated charter and private schools, providing families with excellent educational choices.

## Lifestyle and Amenities

- **Beaches**: Some of Florida's most pristine coastline
- **Golf**: Multiple championship courses including Jupiter Hills Club
- **Boating**: Jupiter Inlet provides direct Atlantic access
- **Shopping**: Gardens Mall and Legacy Place nearby
- **Dining**: From casual beachside to fine dining options
- **Healthcare**: Jupiter Medical Center and specialists

## Cost of Living Considerations

While Jupiter commands premium prices, the quality of life, school systems, and long-term appreciation potential make it an excellent investment for families planning to establish roots in South Florida.

## Getting Started

We recommend visiting during different seasons to experience the community year-round. Our team can arrange neighborhood tours, school visits, and meetings with local community leaders to help make your transition smooth.

Ready to explore Jupiter? Contact us for a comprehensive relocation package.`, 
      excerpt: 'Complete relocation guide for families moving to Jupiter, Florida - covering top neighborhoods, schools, and lifestyle.', 
      published: true, 
      publishedAt: new Date('2025-01-05'), 
      tags: ['relocation','jupiter','schools','neighborhoods','family'],
      ogImageUrl: '/api/placeholder/1200/630?text=Moving+to+Jupiter+FL'
    }
  })

  // Seed testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Sarah & Michael Chen',
        title: 'Home Buyers',
        content: 'Avery made our dream of waterfront living come true. As first-time buyers in the luxury market, we were intimidated by the process, but Avery guided us through every step with expertise and patience. Our Jupiter home exceeded every expectation.',
        rating: 5,
        location: 'Jupiter, FL',
        featured: true,
        order: 1
      },
      {
        name: 'Dr. Jennifer Martinez',
        title: 'Home Seller',
        content: 'When we decided to downsize from our large estate, Riley handled the transition flawlessly. The marketing strategy was exceptional - we had multiple offers within a week and closed above asking price. Truly white-glove service.',
        rating: 5,
        location: 'Palm Beach Gardens, FL',
        featured: true,
        order: 2
      },
      {
        name: 'Robert & Linda Thompson',
        title: 'Relocation Buyers',
        content: 'Moving from New York to Florida was stressful until we met Jordan. They understood our needs for both a luxury home and access to amenities. Our Delray Beach condo is perfect for our retirement lifestyle.',
        rating: 5,
        location: 'Delray Beach, FL',
        featured: true,
        order: 3
      },
      {
        name: 'The Morrison Family',
        title: 'First-Time Buyers',
        content: 'Outstanding service from start to finish. The team helped us navigate the competitive market and secure our dream home in a great school district. Our kids love their new community!',
        rating: 5,
        location: 'Boca Raton, FL',
        featured: false,
        order: 4
      }
    ]
  })

  // Seed neighborhoods
  await prisma.neighborhood.createMany({
    data: [
      {
        slug: 'jupiter',
        name: 'Jupiter',
        description: 'Pristine beaches, excellent schools, and a charming downtown make Jupiter one of South Florida\'s most desirable communities. From waterfront estates to family-friendly neighborhoods, Jupiter offers luxury living with small-town charm.',
        avgPrice: 125000000, // $1.25M in cents
        totalHomes: 450,
        features: ['Top-rated schools', 'Jupiter Inlet access', 'Donald Ross Golf Course', 'Harbourside Place', 'Jupiter Beach Park'],
        schools: {
          elementary: ['Jupiter Elementary (A)', 'Limestone Creek Elementary (A)'],
          middle: ['Independence Middle School (A)'],
          high: ['Jupiter High School (A)']
        },
        amenities: {
          beaches: ['Jupiter Beach', 'Carlin Park'],
          golf: ['Jupiter Hills Club', 'Admiral\'s Cove'],
          shopping: ['Harbourside Place', 'Legacy Place'],
          dining: ['Sinclair\'s Ocean Grill', 'Guanabanas']
        }
      },
      {
        slug: 'palm-beach-gardens',
        name: 'Palm Beach Gardens',
        description: 'Home to world-class golf, shopping, and dining, Palm Beach Gardens combines suburban convenience with luxury amenities. The city features numerous gated communities and is known for its family-friendly atmosphere.',
        avgPrice: 95000000, // $950K in cents
        totalHomes: 680,
        features: ['PGA National Resort', 'Gardens Mall', 'Downtown at the Gardens', 'A-rated schools', 'Championship golf courses'],
        schools: {
          elementary: ['Allamanda Elementary (A)', 'Garden Lakes Elementary (A)'],
          middle: ['Watson B. Duncan Middle School (A)'],
          high: ['William T. Dwyer High School (A)']
        },
        amenities: {
          golf: ['PGA National', 'BallenIsles', 'Frenchman\'s Creek'],
          shopping: ['Gardens Mall', 'Downtown at the Gardens', 'Legacy Place'],
          dining: ['Ironwood Steak & Seafood', 'Seasons 52', 'The Capital Grille'],
          recreation: ['John D. MacArthur Beach State Park', 'Juno Beach Pier']
        }
      },
      {
        slug: 'delray-beach',
        name: 'Delray Beach',
        description: 'Known for its vibrant Atlantic Avenue, beautiful beaches, and thriving arts scene, Delray Beach offers an eclectic mix of luxury waterfront properties and charming downtown living.',
        avgPrice: 85000000, // $850K in cents
        totalHomes: 520,
        features: ['Atlantic Avenue downtown', 'Delray Beach Municipal Beach', 'Cultural arts district', 'Intracoastal access', 'Vibrant nightlife'],
        schools: {
          elementary: ['Pine Grove Elementary (B+)', 'Orchard View Elementary (A-)'],
          middle: ['Carver Community Middle School (B)'],
          high: ['Atlantic Community High School (B+)']
        },
        amenities: {
          beaches: ['Delray Beach Municipal Beach', 'South Beach Park'],
          arts: ['Cornell Art Museum', 'Delray Beach Playhouse', 'Arts Warehouse'],
          shopping: ['Atlantic Avenue shops', 'Town Center at Boca Raton'],
          dining: ['32 East', 'Cut 432', 'Max\'s Grille']
        }
      },
      {
        slug: 'boca-raton',
        name: 'Boca Raton',
        description: 'Sophisticated and upscale, Boca Raton features luxury shopping, dining, and some of South Florida\'s most prestigious gated communities. The city is known for its Mediterranean-style architecture and resort lifestyle.',
        avgPrice: 110000000, // $1.1M in cents
        totalHomes: 780,
        features: ['Town Center at Boca Raton', 'Boca Raton Resort & Club', 'Florida Atlantic University', 'Mizner Park', 'Red Reef Park'],
        schools: {
          elementary: ['Addison Mizner Elementary (A)', 'Calusa Elementary (A)'],
          middle: ['Boca Raton Community Middle School (A-)'],
          high: ['Boca Raton Community High School (A-)']
        },
        amenities: {
          golf: ['Boca Raton Resort & Club', 'Woodfield Country Club', 'St. Andrews Country Club'],
          shopping: ['Town Center at Boca Raton', 'Mizner Park', 'Royal Palm Place'],
          dining: ['Abe & Louie\'s', 'Morton\'s The Steakhouse', 'Rocco\'s Tacos'],
          beaches: ['Red Reef Park', 'South Beach Park']
        }
      }
    ]
  })

  // Seed mock properties for IDX-style browsing
  await prisma.property.createMany({
    data: [
      {
        mls: 'RX-10912345',
        address: '456 Ocean View Drive',
        city: 'Jupiter',
        zipCode: '33477',
        price: 285000000, // $2.85M
        bedrooms: 5,
        bathrooms: 4.5,
        sqft: 4200,
        yearBuilt: 2019,
        propertyType: 'SINGLE_FAMILY',
        description: 'Stunning waterfront estate with private dock and panoramic ocean views. This custom-built home features a chef\'s kitchen, master suite with spa bath, and resort-style pool area.',
        features: ['Waterfront', 'Private dock', 'Ocean views', 'Pool', 'Chef\'s kitchen', 'Master suite', '3-car garage'],
        neighborhood: 'Jupiter Inlet Colony',
        lat: 26.9342,
        lng: -80.0931,
        images: ['/api/placeholder/800/600?text=Waterfront+Estate'],
        daysOnMarket: 12
      },
      {
        mls: 'RX-10912346',
        address: '789 Golf Club Lane',
        city: 'Palm Beach Gardens',
        zipCode: '33418',
        price: 197500000, // $1.975M
        bedrooms: 4,
        bathrooms: 3.5,
        sqft: 3600,
        yearBuilt: 2021,
        propertyType: 'SINGLE_FAMILY',
        description: 'Elegant home on the 16th fairway of PGA National. Open floor plan with volume ceilings, gourmet kitchen, and expansive outdoor living space overlooking the golf course.',
        features: ['Golf course views', 'Open floor plan', 'Gourmet kitchen', 'Outdoor living', 'Volume ceilings', '2-car garage'],
        neighborhood: 'PGA National',
        lat: 26.8412,
        lng: -80.0883,
        images: ['/api/placeholder/800/600?text=Golf+Course+Home'],
        daysOnMarket: 8
      },
      {
        mls: 'RX-10912347',
        address: '321 Marina Way',
        city: 'Delray Beach',
        zipCode: '33483',
        price: 320000000, // $3.2M
        bedrooms: 6,
        bathrooms: 5.5,
        sqft: 5100,
        yearBuilt: 2020,
        propertyType: 'SINGLE_FAMILY',
        description: 'Luxurious Intracoastal estate with deep-water dockage for large yacht. Contemporary design with floor-to-ceiling windows, wine cellar, and rooftop terrace.',
        features: ['Intracoastal access', 'Deep-water dock', 'Contemporary design', 'Wine cellar', 'Rooftop terrace', 'Elevator'],
        neighborhood: 'Intracoastal',
        lat: 26.4615,
        lng: -80.0728,
        images: ['/api/placeholder/800/600?text=Marina+Estate'],
        daysOnMarket: 21
      },
      {
        mls: 'RX-10912348',
        address: '654 Bay Front Street',
        city: 'Jupiter',
        zipCode: '33477',
        price: 165000000, // $1.65M
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2900,
        yearBuilt: 2018,
        propertyType: 'CONDO',
        description: 'Sophisticated waterfront condominium with panoramic water views. Features include marble floors, custom millwork, and private balcony overlooking the Intracoastal.',
        features: ['Waterfront', 'Panoramic views', 'Marble floors', 'Custom millwork', 'Private balcony', 'Concierge service'],
        neighborhood: 'Jupiter Bay',
        lat: 26.9279,
        lng: -80.0917,
        images: ['/api/placeholder/800/600?text=Luxury+Condo'],
        daysOnMarket: 15
      }
    ]
  })

  console.log('Seeded admin user, team members, blog posts, testimonials, neighborhoods, and properties.')
}

main().finally(async ()=> prisma.$disconnect())