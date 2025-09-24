'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import Dashboard from '@/components/Dashboard'
import AboutPage from '@/components/AboutPage'
import ContactPage from '@/components/ContactPage'
import Footer from '@/components/Footer'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      default:
        return (
          <HeroSection
            onNavigateToDashboard={() => setCurrentPage('dashboard')}
            onNavigateToAbout={() => setCurrentPage('about')}
          />
        )
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
      <Footer />
    </main>
  )
}