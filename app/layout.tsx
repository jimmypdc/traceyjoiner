import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/logo'
import LiveChat from '@/components/ui/live-chat'

export const metadata = {
  title: 'Keller Williams — South Florida Real Estate Experts',
  description: 'Expert real estate services for luxury and waterfront properties in Jupiter, Palm Beach Gardens, Delray Beach, and Boca Raton. Your trusted Keller Williams team.',
  openGraph: {
    title: 'Keller Williams — South Florida Real Estate Experts',
    description: 'Expert real estate services for luxury and waterfront properties in Jupiter, Palm Beach Gardens, Delray Beach, and Boca Raton.',
    images: ['/api/placeholder/1200/630?text=Keller+Williams'],
    url: 'https://kellerwilliams.com'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* KW Brand Compliance: Using system fonts until licensed Helvetica Neue Condensed is available */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter+Condensed:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <header className="border-b sticky top-0 bg-white/95 backdrop-blur-sm z-50">
          <div className="container flex items-center justify-between py-4">
            <Link 
              href="/" 
              className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-kwRed rounded-sm"
              aria-label="Keller Williams - Return to homepage"
            >
              <Logo width={180} height={54} />
            </Link>
            <nav role="navigation" aria-label="Main navigation">
              <ul className="flex gap-6 text-sm">
                <li>
                  <Link 
                    href="/search" 
                    className="text-kwGrayMedium hover:text-kwRed transition-colors focus:outline-none focus:ring-2 focus:ring-kwRed rounded-sm px-1 py-1"
                  >
                    Home Search
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/team" 
                    className="text-kwGrayMedium hover:text-kwRed transition-colors focus:outline-none focus:ring-2 focus:ring-kwRed rounded-sm px-1 py-1"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="text-kwGrayMedium hover:text-kwRed transition-colors focus:outline-none focus:ring-2 focus:ring-kwRed rounded-sm px-1 py-1"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-kwGrayMedium hover:text-kwRed transition-colors focus:outline-none focus:ring-2 focus:ring-kwRed rounded-sm px-1 py-1"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="flex-1" role="main">
          {children}
        </main>
        
                <footer className="border-t bg-kwGrayLight/20" role="contentinfo">
          <div className="container py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <Logo width={160} height={48} className="mb-4" />
                <p className="text-kwGrayMedium text-sm leading-relaxed">
                  Your trusted Keller Williams team for luxury and waterfront real estate in South Florida.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-kwBlack mb-3">Services</h4>
                <ul className="space-y-2 text-sm text-kwGrayMedium">
                  <li><Link href="/search" className="hover:text-kwRed transition-colors">Property Search</Link></li>
                  <li><Link href="/valuation" className="hover:text-kwRed transition-colors">Home Valuation</Link></li>
                  <li><Link href="/team" className="hover:text-kwRed transition-colors">Meet Our Team</Link></li>
                  <li><Link href="/contact" className="hover:text-kwRed transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-kwBlack mb-3">Areas</h4>
                <ul className="space-y-2 text-sm text-kwGrayMedium">
                  <li><Link href="/search?area=jupiter" className="hover:text-kwRed transition-colors">Jupiter</Link></li>
                  <li><Link href="/search?area=pbg" className="hover:text-kwRed transition-colors">Palm Beach Gardens</Link></li>
                  <li><Link href="/search?area=delray" className="hover:text-kwRed transition-colors">Delray Beach</Link></li>
                  <li><Link href="/search?area=boca" className="hover:text-kwRed transition-colors">Boca Raton</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-kwBlack mb-3">Contact</h4>
                <div className="space-y-2 text-sm text-kwGrayMedium">
                  <div>(561) 555-0100</div>
                  <div>info@kellerwilliams.com</div>
                  <div>123 Ocean Drive<br />Jupiter, FL 33477</div>
                </div>
              </div>
            </div>
            <div className="border-t pt-8 text-sm text-kwGray">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Keller Williams. All rights reserved.</p>
                <p>Built with Next.js, Tailwind, and Prisma.</p>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Live Chat Widget */}
        <LiveChat />
      </body>
    </html>
  )
}