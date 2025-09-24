'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, Users, BookOpen, ArrowRight } from 'lucide-react'
import { getDailyVerse } from '@/data/dailyVerses'

interface HeroSectionProps {
  onNavigateToDashboard: () => void
  onNavigateToAbout: () => void
}

export default function HeroSection({ onNavigateToDashboard, onNavigateToAbout }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const dailyVerse = getDailyVerse()

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const y3 = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const features = [
    { icon: Heart, label: 'Community Love' },
    { icon: Users, label: 'Growing Together' },
    { icon: BookOpen, label: 'Scripture Study' }
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-accent-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950"
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ x: y1, y: y2 }}
        className="absolute inset-0 opacity-40 dark:opacity-30"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-3/4 right-1/4 w-128 h-128 bg-gradient-radial from-gold-500/15 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-forest-500/25 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      </motion.div>

      {/* Interactive Parallax Elements */}
      <motion.div
        style={{
          x: mousePosition.x * 50 - 25,
          y: mousePosition.y * 50 - 25,
          opacity: y3
        }}
        className="absolute top-20 left-20 w-4 h-4 bg-gold-400 rounded-full animate-pulse opacity-60"
      />
      <motion.div
        style={{
          x: mousePosition.x * -30 + 15,
          y: mousePosition.y * -30 + 15
        }}
        className="absolute top-32 right-32 w-2 h-2 bg-accent-400 rounded-full animate-pulse opacity-40"
      />
      <motion.div
        style={{
          x: mousePosition.x * 40 - 20,
          y: mousePosition.y * 40 - 20
        }}
        className="absolute bottom-32 left-1/4 w-3 h-3 bg-forest-400 rounded-full animate-pulse opacity-50"
      />

      {/* Glass Morphism Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center"
      >
        {/* Floating Badge */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-3 bg-glass-gradient backdrop-blur-sm border border-white/20 dark:border-white/10 px-6 py-3 rounded-full text-sm mb-8 text-white shadow-glass hover:shadow-glow-sm transition-all duration-300 group cursor-default"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
              </motion.div>
              <span className="font-medium">Welcome to our spiritual community</span>
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
        >
          <span className="bg-gradient-to-r from-white via-gold-200 to-accent-200 bg-clip-text text-transparent">
            United with Christ
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-neutral-200 dark:text-neutral-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            through the Holy Spirit
          </motion.span>
        </motion.h1>

        {/* Daily Verse Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-glass-gradient backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-glass hover:shadow-glow-md transition-all duration-500 group"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-serif italic mb-4 leading-relaxed"
            >
              &ldquo;{dailyVerse.verse}&rdquo;
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-sm sm:text-base text-accent-200 font-medium tracking-wide"
            >
              — {dailyVerse.reference}
            </motion.p>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-gold-400 to-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-default"
              >
                <Icon className="w-4 h-4 text-gold-400" />
                {feature.label}
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            onClick={onNavigateToDashboard}
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-primary-900 font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-glow-lg transform hover:-translate-y-1 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Visit Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <motion.div
              className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100"
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.button>

          <motion.button
            onClick={onNavigateToAbout}
            className="group relative px-8 py-4 bg-glass-gradient backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-glow-sm transform hover:-translate-y-1 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Learn More
              <BookOpen className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>

      </motion.div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-lg opacity-20"
        />
        <motion.div
          animate={{
            rotate: -360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-gold-500/20 rounded-full opacity-30"
        />
      </div>
    </section>
  )
}