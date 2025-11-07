import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Official Keller Williams Brand Colors
        kwRed: '#B40101',
        kwGray: '#999999', 
        kwGrayMedium: '#666666',
        kwGrayLight: '#CCCCCC',
        kwBlack: '#000000',
        // Updated brand mapping for compatibility with existing components
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#B40101', // KW Red as primary
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#450a0a'
        },
        gold: '#C9A227' // Keeping existing gold for compatibility
      },
      fontFamily: {
        // TODO: Replace with licensed Helvetica Neue Condensed when available
        sans: ['Inter Condensed', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Adobe Garamond', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
}
export default config