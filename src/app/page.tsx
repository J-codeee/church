'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import Dashboard from '@/components/Dashboard'
import AboutPage from '@/components/AboutPage'
import ContactPage from '@/components/ContactPage'
import Footer from '@/components/Footer'
import { FloatingActionButton } from '@/components/ui/FloatingActionButton'
import { ArrowUp, MessageCircle } from 'lucide-react'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const pageTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showScrollTop, setShowScrollTop] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Dashboard />
          </motion.div>
        )
      case 'about':
        return (
          <motion.div
            key="about"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <AboutPage />
          </motion.div>
        )
      case 'contact':
        return (
          <motion.div
            key="contact"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ContactPage />
          </motion.div>
        )
      default:
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <HeroSection
              onNavigateToDashboard={() => setCurrentPage('dashboard')}
              onNavigateToAbout={() => setCurrentPage('about')}
            />
          </motion.div>
        )
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

      <AnimatePresence mode="wait">
        {renderCurrentPage()}
      </AnimatePresence>

      <Footer />

      {/* Floating Action Buttons */}
      <AnimatePresence>
        {showScrollTop && (
          <FloatingActionButton
            onClick={scrollToTop}
            variant="accent"
            size="default"
            position="bottom-right"
            className="mb-20"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </FloatingActionButton>
        )}
      </AnimatePresence>

      <FloatingActionButton
        onClick={() => setCurrentPage('contact')}
        variant="gold"
        size="default"
        position="bottom-right"
        pulse={currentPage === 'home'}
        aria-label="Contact us"
      >
        <MessageCircle className="w-6 h-6" />
      </FloatingActionButton>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-gradient-radial from-gold-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-radial from-forest-500/5 to-transparent rounded-full blur-3xl" />
      </div>
    </main>
  )
}