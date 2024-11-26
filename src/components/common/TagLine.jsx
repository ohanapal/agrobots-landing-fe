import { cn } from '@/lib/utils'

export default function TagLine({ className, children, variant }) {
  return (
    <p
      className={cn(
        'text-white bg-primary px-3 py-1 text-xs rounded-full inline-block',
        { 'bg-primary-light text-primary font-medium': variant === 'light' },
        className
      )}
    >
      {children}
    </p>
  )
}
