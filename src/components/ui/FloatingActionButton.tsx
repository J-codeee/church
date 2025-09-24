'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface FloatingActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'accent' | 'gold'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  pulse?: boolean
}

const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({
    className,
    size = 'default',
    variant = 'default',
    position = 'bottom-right',
    pulse = false,
    children,
    disabled,
    onClick,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: 'h-12 w-12',
      default: 'h-14 w-14',
      lg: 'h-16 w-16',
    }

    const variantClasses = {
      default: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-glow-md hover:shadow-glow-lg',
      accent: 'bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 text-white shadow-glow-md hover:shadow-glow-lg',
      gold: 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-primary-900 shadow-glow-md hover:shadow-glow-lg',
    }

    const positionClasses = {
      'bottom-right': 'fixed bottom-6 right-6',
      'bottom-left': 'fixed bottom-6 left-6',
      'top-right': 'fixed top-20 right-6',
      'top-left': 'fixed top-20 left-6',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          'rounded-full flex items-center justify-center z-50 transition-all duration-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-sm transform hover:-translate-y-1',
          sizeClasses[size],
          variantClasses[variant],
          positionClasses[position],
          pulse && 'animate-pulse',
          className
        )}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300" />

        {/* Pulse Ring */}
        {pulse && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent-400 opacity-0"
            animate={{
              scale: [1, 1.5, 2],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}

        {/* Content */}
        <span className="relative z-10">
          {children}
        </span>

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20 opacity-0"
          whileTap={{
            opacity: [0, 0.3, 0],
            scale: [0, 1, 1.2]
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    )
  }
)

FloatingActionButton.displayName = 'FloatingActionButton'

export { FloatingActionButton }