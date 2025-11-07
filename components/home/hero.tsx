'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import HomeSearchModal from '@/components/modals/home-search-modal'
import HomeValuationModal from '@/components/modals/home-valuation-modal'

export default function Hero() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [valuationModalOpen, setValuationModalOpen] = useState(false)

  return (
    <>
      <section className="relative bg-kwRed text-white">
        <div className="container py-20 lg:py-32">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-sans font-semibold leading-tight mb-6 text-white">
              South Florida Real Estate Expert
            </h1>
            <p className="text-base md:text-lg font-sans leading-7 text-white/90 mb-8 max-w-2xl">
              Your trusted Keller Williams agent for luxury and waterfront properties throughout South Florida. Experience excellence with Tracey Joiner.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-white text-kwRed hover:bg-white/90 hover:text-kwRed font-medium"
                onClick={() => setSearchModalOpen(true)}
              >
                Start Home Search
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-kwRed"
                onClick={() => setValuationModalOpen(true)}
              >
                Get Home Valuation
              </Button>
            </div>

            <div className="max-w-md">
              <p className="text-white/80 text-sm mb-3">Get market insights delivered weekly</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-kwBlack placeholder:text-kwGrayMedium"
                  aria-label="Email address for market insights"
                />
                <Button type="submit" className="bg-white text-kwRed hover:bg-white/90 hover:text-kwRed font-medium">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <HomeSearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
      <HomeValuationModal 
        isOpen={valuationModalOpen} 
        onClose={() => setValuationModalOpen(false)} 
      />
    </>
  )
}