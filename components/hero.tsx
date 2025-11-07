import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
            South Florida Luxury & Waterfront Real Estate
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Expert guidance for relocation buyers, sellers, and families seeking coastal lifestyles.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="/valuation"><Button>Get Your Home Valuation</Button></a>
            <a href="/search"><Button className="bg-slate-900 hover:bg-slate-800">Start Home Search</Button></a>
          </div>
        </div>
      </div>
    </section>
  )
}