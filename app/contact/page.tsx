import { Card, CardContent } from '@/components/ui/card'
import LeadForm from '@/components/lead-form'

export const metadata = {
  title: 'Contact Us — Coastal Realty',
  description: 'Get in touch with our South Florida real estate experts. We\'re here to help with all your luxury and waterfront property needs.'
}

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-brand-900 mb-6">
            Contact Our Team
          </h1>
          <p className="text-lg font-sans leading-8 text-slate-600 max-w-2xl mx-auto">
            Ready to buy, sell, or explore South Florida&apos;s luxury real estate market? 
            We&apos;re here to provide expert guidance every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-medium text-brand-900 mb-6">
                  Send us a Message
                </h2>
                <LeadForm type="contact" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-medium text-brand-900 mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-slate-700">(561) 555-0100</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-700">info@coastalrealty.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-slate-700">
                    <div>123 Ocean Drive</div>
                    <div>Jupiter, FL 33477</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-medium text-brand-900 mb-4">
                Office Hours
              </h3>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-medium text-brand-900 mb-4">
                Service Areas
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                <div>Jupiter</div>
                <div>Palm Beach Gardens</div>
                <div>Delray Beach</div>
                <div>Boca Raton</div>
                <div>Wellington</div>
                <div>West Palm Beach</div>
                <div>Juno Beach</div>
                <div>Tequesta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}