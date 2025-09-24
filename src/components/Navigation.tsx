'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showAdminAccess, setShowAdminAccess] = useState(false)

  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle logo clicks for admin access
  useEffect(() => {
    if (logoClickCount >= 3) {
      setShowAdminAccess(true)
      setLogoClickCount(0)
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShowAdminAccess(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [logoClickCount])

  const handleLogoClick = () => {
    if (!user) {
      setLogoClickCount(prev => prev + 1)
      // Reset click count after 2 seconds if not completed
      setTimeout(() => setLogoClickCount(0), 2000)
    } else {
      onPageChange('home')
    }
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/98 backdrop-blur-xl shadow-lg border-b border-slate-200'
        : 'bg-white/95 backdrop-blur-xl border-b border-slate-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 text-xl font-serif font-semibold text-primary hover:text-accent transition-colors"
            title={!user ? "Triple-click for admin access" : "Home"}
          >
            <span className="text-2xl text-gold">✞</span>
            UCHSC
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-accent bg-accent/5'
                    : 'text-slate-600 hover:text-accent hover:bg-accent/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Admin Access - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 text-primary hover:bg-gold/20 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.firstName}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
                      {user.email}
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : showAdminAccess ? (
              <div className="flex items-center gap-3 animate-fade-in">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="px-4 py-2 bg-gold hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
                >
                  Admin Login
                </button>
                <button
                  onClick={() => setShowAdminAccess(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Close"
                >
                  ×
                </button>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent/5 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white/98 backdrop-blur-xl">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'text-accent bg-accent/5'
                      : 'text-slate-600 hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-slate-200">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{user.firstName} {user.lastName}</span>
                    </div>
                    <div className="text-xs text-gray-500 px-4">{user.email}</div>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                ) : showAdminAccess ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setShowLoginForm(true)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 bg-gold hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Admin Login
                    </button>
                    <button
                      onClick={() => setShowAdminAccess(false)}
                      className="w-full px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4 text-sm text-gray-500 italic">
                    Triple-click the logo for admin access
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Authentication Modals */}
      {showLoginForm && (
        <LoginForm
          onSwitchToSignup={() => {
            setShowLoginForm(false)
            setShowSignupForm(true)
          }}
          onClose={() => setShowLoginForm(false)}
        />
      )}

      {showSignupForm && (
        <SignupForm
          onSwitchToLogin={() => {
            setShowSignupForm(false)
            setShowLoginForm(true)
          }}
          onClose={() => setShowSignupForm(false)}
        />
      )}
    </nav>
  )
}