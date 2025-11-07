import Image from 'next/image'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export default function Logo({ width = 200, height = 60, className }: LogoProps) {
  // Ensure minimum web size: "KELLER WILLIAMS" text ≥ 150px width
  const minWidth = Math.max(width, 150)
  const proportionalHeight = (minWidth / 200) * 60
  
  return (
    <div className={className} style={{ minWidth: `${minWidth}px` }}>
      <Image
        src="/logo/kw-logo.png"
        alt="Keller Williams"
        width={minWidth}
        height={proportionalHeight}
        priority
        unoptimized
        className="object-contain"
        style={{
          // Maintain proper clearance space (min width of "W")
          padding: `${minWidth * 0.05}px`,
        }}
      />
    </div>
  )
}

// Brand compliance note:
// - Logo proportions must NOT be altered
// - Surrounding space must be at least the width of the "W"
// - Minimum web size: "KELLER WILLIAMS" text ≥ 150px width
// - DO NOT recolor, add effects, shadows, or gradients
// - Use only approved red/gray/black variants