import { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

export function Button({ 
  className, 
  size = 'md', 
  variant = 'default', 
  ...props 
}: ButtonProps) {
  // Check if custom styling is provided
  const hasCustomStyling = className && (className.includes('bg-') || className.includes('text-'))
  
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-kwRed',
        // Size variants
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        // Only apply variant styling if no custom styling is provided
        !hasCustomStyling && [
          variant === 'default' && 'bg-kwRed text-white hover:bg-kwRed/90',
          variant === 'outline' && 'border border-current bg-transparent hover:bg-current hover:text-white',
          variant === 'ghost' && 'bg-transparent hover:bg-kwGrayLight/30'
        ],
        className
      )}
      {...props}
    />
  )
}