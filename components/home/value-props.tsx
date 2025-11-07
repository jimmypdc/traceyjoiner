import { Card, CardContent } from '@/components/ui/card'

const valueProps = [
  {
    icon: (
      <svg className="w-8 h-8 text-kwRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Market Expertise',
    description: 'Deep local knowledge and data-driven insights ensure you make informed decisions in every transaction.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-kwRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'White-Glove Service',
    description: 'From initial consultation to closing day, we provide personalized attention to every detail of your journey.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-kwRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Results Driven',
    description: 'Strategic marketing, skilled negotiation, and proven processes deliver exceptional outcomes for our clients.'
  }
]

export default function ValueProps() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold leading-snug text-kwBlack mb-4">
            Why Choose Tracey Joiner
          </h2>
          <p className="text-base md:text-lg font-sans leading-7 text-kwGrayMedium max-w-2xl mx-auto">
            Experience the difference that expertise, dedication, and local knowledge make with your trusted Keller Williams agent
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  {prop.icon}
                </div>
                <h3 className="text-2xl font-sans font-medium text-kwBlack mb-3">
                  {prop.title}
                </h3>
                <p className="text-base font-sans leading-7 text-kwGrayMedium">
                  {prop.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}