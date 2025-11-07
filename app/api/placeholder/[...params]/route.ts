import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const width = parseInt(searchParams.get('width') || '400')
  const height = parseInt(searchParams.get('height') || '300')
  const text = searchParams.get('text') || 'Image'

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#kwGrayLight"/>
      <rect width="100%" height="100%" fill="#kwGray" opacity="0.1"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="16" 
        font-weight="500"
        fill="#kwGrayMedium" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
      <text 
        x="50%" 
        y="65%" 
        font-family="Arial, sans-serif" 
        font-size="12" 
        fill="#kwGray" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${width} × ${height}
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}