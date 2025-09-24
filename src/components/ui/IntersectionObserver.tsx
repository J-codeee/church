'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface IntersectionObserverProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  once?: boolean
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none'
  delay?: number
  duration?: number
}

const animations = {
  'fade-up': {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  'fade-down': {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
  },
  'fade-left': {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  'fade-right': {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  'scale': {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  'none': {
    initial: {},
    animate: {},
  },
}

export function IntersectionObserver({
  children,
  className,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
}: IntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          controls.start('animate')
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsIntersecting(false)
          controls.start('initial')
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, once, controls])

  const selectedAnimation = animations[animation]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={selectedAnimation.initial}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return

    const element = elementRef.current
    if (!element) return

    const observer = new window.IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, options])

  return isIntersecting
}