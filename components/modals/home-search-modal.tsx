'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'

interface HomeSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchFormData {
  searchType: string
  priceRange: string
  bedrooms: string
  bathrooms: string
  propertyType: string
  preferredAreas: string[]
  homeFeatures: string[]
  timeframe: string
  preApproved: string
  name: string
  email: string
  phone: string
  additionalInfo: string
}

const areaOptions = [
  'Jupiter', 'Palm Beach Gardens', 'North Palm Beach', 'Juno Beach',
  'Tequesta', 'Delray Beach', 'Boca Raton', 'Wellington', 'West Palm Beach'
]

const featureOptions = [
  'Waterfront', 'Golf Course', 'Pool', 'Gated Community', 'New Construction',
  'Historic', 'High-Rise', 'Single Story', 'Guest House', 'Home Office'
]

export default function HomeSearchModal({ isOpen, onClose }: HomeSearchModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SearchFormData>({
    searchType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    preferredAreas: [],
    homeFeatures: [],
    timeframe: '',
    preApproved: '',
    name: '',
    email: '',
    phone: '',
    additionalInfo: ''
  })

  const handleInputChange = (field: keyof SearchFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: 'preferredAreas' | 'homeFeatures', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'search',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Home Search Request:
Search Type: ${formData.searchType}
Price Range: ${formData.priceRange}
Bedrooms: ${formData.bedrooms}
Bathrooms: ${formData.bathrooms}
Property Type: ${formData.propertyType}
Preferred Areas: ${formData.preferredAreas.join(', ')}
Desired Features: ${formData.homeFeatures.join(', ')}
Timeframe: ${formData.timeframe}
Pre-approved: ${formData.preApproved}
Additional Info: ${formData.additionalInfo}`,
          source: 'home_search_modal'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const resetModal = () => {
    setStep(1)
    setIsSubmitted(false)
    setFormData({
      searchType: '',
      priceRange: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      preferredAreas: [],
      homeFeatures: [],
      timeframe: '',
      preApproved: '',
      name: '',
      email: '',
      phone: '',
      additionalInfo: ''
    })
    onClose()
  }

  if (isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={resetModal} title="Welcome to Your Home Search!">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-sans font-semibold text-kwBlack mb-2">
            Search Request Received!
          </h3>
          <p className="text-kwGrayMedium mb-6">
            Thank you for starting your home search with me. I'll curate a personalized list of properties matching your criteria and send it to you within 24 hours.
          </p>
          <Button onClick={resetModal} className="bg-kwRed hover:bg-kwRed/90 text-white">
            Close
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start Your Home Search" className="max-w-lg">
      <div className="mb-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= i ? 'bg-kwRed text-white' : 'bg-kwGrayLight text-kwGrayMedium'
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > i ? 'bg-kwRed' : 'bg-kwGrayLight'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-kwGrayMedium text-center">
          Step {step} of 3
        </div>
      </div>

      {/* Step 1: Search Criteria */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-sans font-semibold text-kwBlack mb-4">
            What are you looking for?
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              I'm looking to *
            </label>
            <select
              value={formData.searchType}
              onChange={(e) => handleInputChange('searchType', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              required
            >
              <option value="">Select one</option>
              <option value="Buy a home">Buy a home</option>
              <option value="Invest in real estate">Invest in real estate</option>
              <option value="Buy a vacation home">Buy a vacation home</option>
              <option value="Relocate to South Florida">Relocate to South Florida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Price Range *
            </label>
            <select
              value={formData.priceRange}
              onChange={(e) => handleInputChange('priceRange', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              required
            >
              <option value="">Select price range</option>
              <option value="Under $500K">Under $500K</option>
              <option value="$500K - $750K">$500K - $750K</option>
              <option value="$750K - $1M">$750K - $1M</option>
              <option value="$1M - $1.5M">$1M - $1.5M</option>
              <option value="$1.5M - $2M">$1.5M - $2M</option>
              <option value="$2M - $3M">$2M - $3M</option>
              <option value="$3M+">$3M+</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-1">
                Bedrooms *
              </label>
              <select
                value={formData.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
                required
              >
                <option value="">Any</option>
                <option value="1+">1+</option>
                <option value="2+">2+</option>
                <option value="3+">3+</option>
                <option value="4+">4+</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-1">
                Bathrooms *
              </label>
              <select
                value={formData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
                required
              >
                <option value="">Any</option>
                <option value="1+">1+</option>
                <option value="2+">2+</option>
                <option value="3+">3+</option>
                <option value="4+">4+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Property Type *
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              required
            >
              <option value="">Select property type</option>
              <option value="Single Family">Single Family Home</option>
              <option value="Condo">Condominium</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Multi Family">Multi-Family</option>
              <option value="Land">Land/Lot</option>
              <option value="Any">Any</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleNextStep}
              disabled={!formData.searchType || !formData.priceRange || !formData.bedrooms || !formData.bathrooms || !formData.propertyType}
              className="bg-kwRed hover:bg-kwRed/90 text-white"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Preferences */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-sans font-semibold text-kwBlack mb-4">
            Your Preferences
          </h3>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-2">
              Preferred Areas (select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {areaOptions.map((area) => (
                <label key={area} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferredAreas.includes(area)}
                    onChange={() => handleArrayToggle('preferredAreas', area)}
                    className="w-4 h-4 text-kwRed border-kwGrayMedium rounded focus:ring-kwRed"
                  />
                  <span className="ml-2 text-sm text-kwBlack">{area}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-2">
              Desired Features (select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {featureOptions.map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.homeFeatures.includes(feature)}
                    onChange={() => handleArrayToggle('homeFeatures', feature)}
                    className="w-4 h-4 text-kwRed border-kwGrayMedium rounded focus:ring-kwRed"
                  />
                  <span className="ml-2 text-sm text-kwBlack">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              When do you want to buy?
            </label>
            <select
              value={formData.timeframe}
              onChange={(e) => handleInputChange('timeframe', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
            >
              <option value="">Select timeframe</option>
              <option value="Immediately">Immediately</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="Within 6 months">Within 6 months</option>
              <option value="Within 1 year">Within 1 year</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Are you pre-approved for a mortgage?
            </label>
            <select
              value={formData.preApproved}
              onChange={(e) => handleInputChange('preApproved', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
            >
              <option value="">Select one</option>
              <option value="Yes, I'm pre-approved">Yes, I'm pre-approved</option>
              <option value="No, but I plan to get pre-approved">No, but I plan to get pre-approved</option>
              <option value="I need help with financing">I need help with financing</option>
              <option value="Paying cash">Paying cash</option>
            </select>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              Previous
            </Button>
            <Button 
              onClick={handleNextStep}
              className="bg-kwRed hover:bg-kwRed/90 text-white"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Information */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-sans font-semibold text-kwBlack mb-4">
            Let's Connect
          </h3>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              placeholder="(555) 123-4567"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Additional Information
            </label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              rows={3}
              placeholder="Tell me more about your ideal home or any specific requirements..."
            />
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              Previous
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
              className="bg-kwRed hover:bg-kwRed/90 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Start My Search'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}