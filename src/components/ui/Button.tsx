'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden relative group',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg hover:shadow-glow-md transform hover:-translate-y-0.5',
        primary: 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-primary-900 shadow-lg hover:shadow-glow-md transform hover:-translate-y-0.5',
        secondary: 'bg-glass-gradient backdrop-blur-sm border border-white/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white hover:bg-white/20 dark:hover:bg-neutral-800/50 hover:border-white/30 dark:hover:border-neutral-600/50',
        outline: 'border-2 border-accent-500/50 text-accent-600 dark:text-accent-400 hover:bg-accent-500/10 hover:border-accent-500/70 backdrop-blur-sm',
        ghost: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50 backdrop-blur-sm',
        glass: 'bg-glass-gradient backdrop-blur-md border border-white/20 dark:border-white/10 text-white shadow-glass hover:shadow-glow-sm hover:bg-white/20 dark:hover:bg-white/10',
        neumorphic: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-neumorphism hover:shadow-neumorphism-inset transform hover:scale-95',
        destructive: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5',
      },
      size: {
        sm: 'h-9 rounded-lg px-3 text-xs',
        default: 'h-11 px-6 py-3',
        lg: 'h-12 rounded-2xl px-8 text-base',
        xl: 'h-14 rounded-2xl px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  shimmer?: boolean
  glow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shimmer = false, glow = false, children, disabled, onClick, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        {/* Shimmer Effect */}
        {shimmer && (
          <motion.div
            className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100"
            animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}

        {/* Glow Effect */}
        {glow && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
        )}

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>

        {/* Ripple Effect on Click */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-white/20 opacity-0"
          initial={false}
          whileTap={{
            opacity: [0, 0.3, 0],
            scale: [0, 1, 1.1]
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }