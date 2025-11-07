'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import HomeSearchModal from '@/components/modals/home-search-modal'
import HomeValuationModal from '@/components/modals/home-valuation-modal'

export default function CTA() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [valuationModalOpen, setValuationModalOpen] = useState(false)

  return (
    <>
      <section className="py-16 bg-kwBlack">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg font-sans leading-8 text-kwGrayLight mb-8 max-w-2xl mx-auto">
            Let Tracey Joiner guide you through every step of your real estate journey in South Florida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-kwRed hover:bg-kwRed/90 text-white font-medium"
              onClick={() => setSearchModalOpen(true)}
            >
              Start Home Search
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-kwBlack"
              onClick={() => setValuationModalOpen(true)}
            >
              Get Home Valuation
            </Button>
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