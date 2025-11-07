import { Card, CardContent } from '@/components/ui/card'
import LeadForm from '@/components/lead-form'

export const metadata = {
  title: 'Home Valuation — Coastal Realty',
  description: 'Get a free, accurate valuation of your South Florida property from our luxury real estate experts.'
}

export default function ValuationPage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-brand-900 mb-6">
            Free Home Valuation
          </h1>
          <p className="text-lg font-sans leading-8 text-slate-600 max-w-2xl mx-auto">
            Discover your property&apos;s current market value with our comprehensive analysis 
            of South Florida&apos;s luxury real estate market.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-medium text-brand-900 mb-6">
                  Request Your Valuation
                </h2>
                <LeadForm type="valuation" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-medium text-brand-900 mb-4">
                What You&apos;ll Receive
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-slate-900">Current Market Value</div>
                    <div className="text-sm text-slate-600">Based on recent comparable sales in your area</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-slate-900">Market Trend Analysis</div>
                    <div className="text-sm text-slate-600">Understanding how your neighborhood is performing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-slate-900">Optimization Recommendations</div>
                    <div className="text-sm text-slate-600">Tips to maximize your property&apos;s value</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-slate-900">Personalized Consultation</div>
                    <div className="text-sm text-slate-600">One-on-one discussion with our market experts</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-medium text-brand-900 mb-4">
                Why Choose Our Valuation?
              </h3>
              <div className="text-base font-sans leading-7 text-slate-600 space-y-3">
                <p>
                  Our team analyzes over 15 years of South Florida luxury market data 
                  to provide the most accurate valuations in the region.
                </p>
                <p>
                  We consider unique property features, recent improvements, and 
                  neighborhood-specific trends that automated tools often miss.
                </p>
                <p>
                  Every valuation includes a personal consultation to discuss your 
                  property&apos;s unique value drivers and market opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-serif text-brand-900 mb-2">15+</div>
              <div className="text-sm text-slate-600">Years of Local Market Experience</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-serif text-brand-900 mb-2">500+</div>
              <div className="text-sm text-slate-600">Luxury Properties Valued</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-serif text-brand-900 mb-2">24hr</div>
              <div className="text-sm text-slate-600">Average Response Time</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}