import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Our Team — Coastal Realty',
  description: 'Meet our experienced real estate professionals specializing in South Florida luxury and waterfront properties.'
}

export const revalidate = 60

interface SocialLinks {
  email?: string
  phone?: string
  linkedin?: string
  instagram?: string
  website?: string
}

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-semibold text-brand-900 mb-6">
          Meet Our Team
        </h1>
        <p className="text-lg font-sans leading-8 text-slate-600 max-w-3xl mx-auto">
          Our experienced professionals combine deep local market knowledge with a commitment to exceptional service. 
          Whether you&apos;re buying your first luxury home or selling a waterfront estate, our team is here to guide you every step of the way.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {teamMembers.map((member) => {
          const socials = member.socials as SocialLinks | null
          
          return (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl">
                <Image
                  src={member.headshot || '/api/placeholder/300/400?text=' + encodeURIComponent(member.name)}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-medium text-brand-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-base font-medium text-gold mb-4">
                  {member.title}
                </p>
                {member.bio && (
                  <p className="text-base font-sans leading-7 text-slate-600 mb-6">
                    {member.bio}
                  </p>
                )}
                
                {socials && (
                  <div className="space-y-2">
                    {socials.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${socials.email}`} className="text-brand-600 hover:text-brand-700">
                          {socials.email}
                        </a>
                      </div>
                    )}
                    {socials.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${socials.phone}`} className="text-brand-600 hover:text-brand-700">
                          {socials.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex gap-3 pt-2">
                      {socials.linkedin && (
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                      {socials.instagram && (
                        <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C3.85 14.724 3.2 13.14 3.2 11.35c0-1.8.65-3.374 1.926-4.641.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297 1.276 1.267 1.926 2.841 1.926 4.641 0 1.79-.65 3.374-1.926 4.641-.875.807-2.026 1.297-3.323 1.297zm7.394-9.23h-1.23c-.09-1.255-.45-2.32-1.08-3.195-.63-.875-1.41-1.567-2.34-2.076C12.643 2.155 14.135 2.725 15.3 3.89c1.165 1.165 1.735 2.657 1.543 4.107-.192 1.45-.7 2.642-1.543 3.485z"/>
                          </svg>
                        </a>
                      )}
                      {socials.website && (
                        <a href={socials.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Card className="bg-brand-50 border-brand-100">
          <CardContent className="py-12 px-8">
            <h2 className="text-4xl font-serif font-semibold text-brand-900 mb-4">
              Ready to Work with Our Team?
            </h2>
            <p className="text-base font-sans leading-7 text-slate-600 mb-6 max-w-2xl mx-auto">
              Whether you&apos;re buying, selling, or just exploring your options, 
              we&apos;re here to provide expert guidance every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                  Contact Our Team
                </Button>
              </Link>
              <Link href="/valuation">
                <Button size="lg" variant="outline" className="border-brand-300 text-brand-700 hover:bg-brand-600 hover:text-white">
                  Get Home Valuation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}