import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received lead data:', body)
    
    // Validate required fields
    const { name, email, type } = body
    
    if (!name || !email || !type) {
      console.log('Validation failed:', { name, email, type })
      return NextResponse.json(
        { error: 'Name, email, and type are required' },
        { status: 400 }
      )
    }

    // Create lead in database with all available fields
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: body.phone || null,
        type,
        message: body.message || null,
        source: body.source || 'website',
        // Additional metadata can be stored in message field
        ...(body.timeline || body.priceRange || body.referralSource ? {
          message: [
            body.message,
            body.timeline ? `Timeline: ${body.timeline}` : null,
            body.priceRange ? `Budget: ${body.priceRange}` : null,
            body.referralSource ? `Source: ${body.referralSource}` : null
          ].filter(Boolean).join(' | ')
        } : {})
      }
    })

    console.log('Lead created successfully:', lead)
    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Lead creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}