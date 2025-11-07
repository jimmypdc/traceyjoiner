'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function LeadForm({ type }: { type: 'valuation' | 'search' | 'contact' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    timeline: '',
    priceRange: '',
    referralSource: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type }),
      })

      if (response.ok) {
        setStatus('sent')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          timeline: '',
          priceRange: '',
          referralSource: ''
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <div className="text-green-700 font-semibold text-lg mb-2">Thank you!</div>
        <p className="text-gray-600">We'll be in touch within 24 hours.</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-center py-8">
        <div className="text-red-700 font-semibold text-lg mb-2">Oops!</div>
        <p className="text-gray-600 mb-4">Something went wrong. Please try again.</p>
        <Button onClick={() => setStatus('idle')} variant="outline">Try Again</Button>
      </div>
    )
  }

  const getFormTitle = () => {
    switch (type) {
      case 'valuation': return 'Get Your Home Value'
      case 'search': return 'Start Your Home Search'
      case 'contact': return 'Contact Us'
      default: return 'Contact Us'
    }
  }

  const getFormDescription = () => {
    switch (type) {
      case 'valuation': return 'Get a professional market analysis of your home'
      case 'search': return 'Let us help you find the perfect property'
      case 'contact': return 'Get in touch with our team'
      default: return 'Get in touch with our team'
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-kwBlack mb-2">{getFormTitle()}</h3>
        <p className="text-kwGrayMedium">{getFormDescription()}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className="border rounded-xl px-3 py-3 text-kwBlack placeholder:text-kwGrayMedium"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address *"
            className="border rounded-xl px-3 py-3 text-kwBlack placeholder:text-kwGrayMedium"
            required
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number *"
            className="border rounded-xl px-3 py-3 text-kwBlack placeholder:text-kwGrayMedium"
            required
          />
          
          {type === 'search' && (
            <select
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              className="border rounded-xl px-3 py-3 text-kwBlack"
            >
              <option value="">Price Range</option>
              <option value="Under $500K">Under $500K</option>
              <option value="$500K - $1M">$500K - $1M</option>
              <option value="$1M - $2M">$1M - $2M</option>
              <option value="$2M - $5M">$2M - $5M</option>
              <option value="$5M+">$5M+</option>
            </select>
          )}
          
          {type !== 'search' && (
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="border rounded-xl px-3 py-3 text-kwBlack"
            >
              <option value="">Timeline</option>
              <option value="ASAP">ASAP</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6+ months">6+ months</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          )}
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={
            type === 'valuation' 
              ? "Tell us about your property..."
              : type === 'search'
              ? "What are you looking for in your next home?"
              : "How can we help you?"
          }
          className="border rounded-xl px-3 py-3 text-kwBlack placeholder:text-kwGrayMedium min-h-[120px]"
          rows={4}
        />
        
        <select
          name="referralSource"
          value={formData.referralSource}
          onChange={handleChange}
          className="border rounded-xl px-3 py-3 text-kwBlack"
        >
          <option value="">How did you hear about us?</option>
          <option value="Google">Google Search</option>
          <option value="Social Media">Social Media</option>
          <option value="Referral">Friend/Family Referral</option>
          <option value="Zillow">Zillow</option>
          <option value="Realtor.com">Realtor.com</option>
          <option value="Drive By">Drive By Sign</option>
          <option value="Other">Other</option>
        </select>

        <Button 
          type="submit" 
          disabled={status === 'sending'}
          className="bg-kwRed hover:bg-kwRed/90 text-white font-semibold py-3 text-lg"
        >
          {status === 'sending' ? 'Sending...' : 'Get Started'}
        </Button>
        
        <p className="text-xs text-kwGrayMedium text-center">
          By submitting this form, you agree to receive communications from our team.
        </p>
      </form>
    </div>
  )
}
