'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-2xl overflow-hidden relative transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-neutral-900 shadow-lg hover:shadow-xl border border-neutral-200 dark:border-neutral-800',
        glass: 'bg-glass-gradient backdrop-blur-md border border-white/20 dark:border-white/10 shadow-glass hover:shadow-glow-sm',
        neumorphic: 'bg-neutral-100 dark:bg-neutral-800 shadow-neumorphism hover:shadow-neumorphism-inset',
        elevated: 'bg-white dark:bg-neutral-900 shadow-2xl hover:shadow-3xl border border-white/50 dark:border-neutral-700/50 transform hover:-translate-y-1',
        gradient: 'bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 shadow-lg hover:shadow-xl border border-neutral-200/50 dark:border-neutral-800/50',
        outline: 'bg-transparent border-2 border-neutral-200 dark:border-neutral-800 hover:border-accent-500/50 dark:hover:border-accent-400/50',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean
  glow?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover = true, glow = false, children, onClick, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
        transition={{ duration: 0.2 }}
        onClick={onClick}
      >
        {/* Glow Effect */}
        {glow && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-gold-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Subtle gradient overlay */}
        {variant === 'glass' && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 pointer-events-none" />
        )}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-serif font-bold leading-tight tracking-tight text-neutral-900 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-neutral-700 dark:text-neutral-300', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-6', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants
}