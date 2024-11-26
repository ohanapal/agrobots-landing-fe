import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import Spinner from '@/assets/icons/Spinner'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white shadow hover:bg-primary/90',
        black: 'bg-black text-white shadow hover:bg-black/90',
        success: 'bg-emerald-600 text-white shadow hover:bg-emerald-600/90',
        destructive: 'bg-destructive text-destructive-foreground text-white shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-5',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      type = 'button',
      size,
      children,
      disabled = false,
      isLoading = false,
      asChild = false,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {icon && iconPosition === 'left' ? <span className='mr-2 [&>svg]:size-4'>{icon}</span> : null}
        {children}
        {icon && iconPosition === 'right' ? <span className='ml-2 [&>svg]:size-4'>{icon}</span> : null}
        {isLoading ? <Spinner className='animate-spin ml-2 size-5' /> : null}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
