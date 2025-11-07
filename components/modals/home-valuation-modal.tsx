'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Modal from '@/components/ui/modal'

interface HomeValuationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  address: string
  city: string
  state: string
  zipCode: string
  propertyType: string
  bedrooms: string
  bathrooms: string
  squareFootage: string
  yearBuilt: string
  name: string
  email: string
  phone: string
  timeframe: string
  additionalInfo: string
}

export default function HomeValuationModal({ isOpen, onClose }: HomeValuationModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    address: '',
    city: '',
    state: 'FL',
    zipCode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    yearBuilt: '',
    name: '',
    email: '',
    phone: '',
    timeframe: '',
    additionalInfo: ''
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
          type: 'valuation',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Home Valuation Request:
Address: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}
Property Type: ${formData.propertyType}
Bedrooms: ${formData.bedrooms}
Bathrooms: ${formData.bathrooms}
Square Footage: ${formData.squareFootage}
Year Built: ${formData.yearBuilt}
Timeframe: ${formData.timeframe}
Additional Info: ${formData.additionalInfo}`,
          source: 'home_valuation_modal'
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
      address: '',
      city: '',
      state: 'FL',
      zipCode: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      yearBuilt: '',
      name: '',
      email: '',
      phone: '',
      timeframe: '',
      additionalInfo: ''
    })
    onClose()
  }

  if (isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={resetModal} title="Thank You!">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-sans font-semibold text-kwBlack mb-2">
            Request Received!
          </h3>
          <p className="text-kwGrayMedium mb-6">
            Thank you for your home valuation request. I'll analyze your property and get back to you within 24 hours with a comprehensive market analysis.
          </p>
          <Button onClick={resetModal} className="bg-kwRed hover:bg-kwRed/90 text-white">
            Close
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Get Your Home Valuation" className="max-w-lg">
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

      {/* Step 1: Property Information */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-sans font-semibold text-kwBlack mb-4">
            Property Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Property Address *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-1">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
                placeholder="Jupiter"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-1">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              >
                <option value="FL">FL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
                placeholder="33477"
                required
              />
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
              <option value="">Select Property Type</option>
              <option value="Single Family">Single Family Home</option>
              <option value="Condo">Condominium</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Multi Family">Multi-Family</option>
              <option value="Land">Land/Lot</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleNextStep}
              disabled={!formData.address || !formData.city || !formData.zipCode || !formData.propertyType}
              className="bg-kwRed hover:bg-kwRed/90 text-white"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Property Details */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-sans font-semibold text-kwBlack mb-4">
            Property Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-1">
                Bedrooms
              </label>
              <select
                value={formData.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6+">6+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-kwBlack mb-1">
                Bathrooms
              </label>
              <select
                value={formData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4+">4+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Square Footage (approximate)
            </label>
            <input
              type="text"
              value={formData.squareFootage}
              onChange={(e) => handleInputChange('squareFootage', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              placeholder="2,500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-kwBlack mb-1">
              Year Built (approximate)
            </label>
            <input
              type="text"
              value={formData.yearBuilt}
              onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
              placeholder="2010"
            />
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
            Contact Information
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
              Selling Timeframe
            </label>
            <select
              value={formData.timeframe}
              onChange={(e) => handleInputChange('timeframe', e.target.value)}
              className="w-full px-3 py-2 border border-kwGrayMedium rounded-lg focus:ring-2 focus:ring-kwRed focus:border-transparent"
            >
              <option value="">Select Timeframe</option>
              <option value="Immediately">Immediately</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="Within 6 months">Within 6 months</option>
              <option value="Within 1 year">Within 1 year</option>
              <option value="Just exploring">Just exploring</option>
            </select>
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
              placeholder="Any additional details about your property or questions..."
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
              {isSubmitting ? 'Submitting...' : 'Get My Valuation'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}