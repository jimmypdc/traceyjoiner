import { Card, CardContent } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'

export default async function Testimonials() {
  // Fetch featured testimonials from database
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
    take: 3
  })

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-kwGrayLight/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold leading-snug text-kwBlack mb-4">
            Client Success Stories
          </h2>
          <p className="text-base md:text-lg font-sans leading-7 text-kwGrayMedium max-w-2xl mx-auto">
            Hear from families who found their dream homes with our Keller Williams team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  {/* Star rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-kwRed" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  
                  {/* Quote icon */}
                  <svg className="w-8 h-8 text-kwRed opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <blockquote className="text-base font-sans leading-7 text-kwGrayMedium mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <footer>
                  <div className="font-medium text-kwBlack">{testimonial.name}</div>
                  <div className="text-sm text-kwGray">{testimonial.title}</div>
                  {testimonial.location && (
                    <div className="text-sm text-kwGray">{testimonial.location}</div>
                  )}
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}