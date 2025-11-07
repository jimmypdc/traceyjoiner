import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return <div className={clsx('rounded-2xl border bg-white shadow-sm', className)}>{children}</div>
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={clsx('p-4 border-b', className)}>{children}</div>
}

export function CardContent({ children, className }: CardProps) {
  return <div className={clsx('p-4', className)}>{children}</div>
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={clsx('p-4 border-t', className)}>{children}</div>
}