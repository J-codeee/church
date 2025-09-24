'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, LogOut, User, Home, LayoutDashboard, Info, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { ThemeToggle } from './ThemeToggle'
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
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (logoClickCount >= 3) {
      setShowAdminAccess(true)
      setLogoClickCount(0)
      const timer = setTimeout(() => setShowAdminAccess(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [logoClickCount])

  const handleLogoClick = () => {
    if (!user) {
      setLogoClickCount(prev => prev + 1)
      setTimeout(() => setLogoClickCount(0), 2000)
    } else {
      onPageChange('home')
    }
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-glass border-b border-white/20 dark:border-neutral-700/30'
            : 'bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm border-b border-white/10 dark:border-neutral-700/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.button
              onClick={handleLogoClick}
              className="group flex items-center gap-3 text-xl font-serif font-bold text-primary-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-400 transition-all duration-300"
              title={!user ? "Triple-click for admin access" : "Home"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: logoClickCount * 60 }}
                className="relative"
              >
                <span className="text-2xl text-gold-500 group-hover:text-gold-400 transition-colors duration-300 drop-shadow-sm">
                  ✞
                </span>
                {logoClickCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse"
                  />
                )}
              </motion.div>
              <span className="hidden sm:block bg-gradient-to-r from-primary-900 to-accent-600 dark:from-white dark:to-accent-300 bg-clip-text text-transparent">
                UCHSC
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`relative group px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      currentPage === item.id
                        ? 'text-accent-600 dark:text-accent-400 bg-glass-gradient shadow-glass-inset backdrop-blur-sm'
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-glass-gradient hover:shadow-glass-inset hover:backdrop-blur-sm'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {currentPage === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-accent-500/10 dark:bg-accent-400/10 rounded-xl border border-accent-500/20 dark:border-accent-400/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu / Admin Access */}
              <div className="hidden lg:flex items-center gap-3">
                <AnimatePresence>
                  {user ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <motion.button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-600/10 dark:from-gold-400/10 dark:to-gold-500/10 text-primary-900 dark:text-white border border-gold-500/20 hover:border-gold-500/40 hover:shadow-glow-sm transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <User className="w-4 h-4" />
                        <span className="font-medium">{user.firstName}</span>
                      </motion.button>

                      <AnimatePresence>
                        {showUserMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-56 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-2xl shadow-glass border border-white/20 dark:border-neutral-700/30 py-2 z-50"
                            onMouseLeave={() => setShowUserMenu(false)}
                          >
                            <div className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400 border-b border-white/10 dark:border-neutral-700/30">
                              <div className="font-medium text-neutral-900 dark:text-white">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="truncate">{user.email}</div>
                            </div>
                            <motion.button
                              onClick={() => {
                                logout()
                                setShowUserMenu(false)
                              }}
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : showAdminAccess ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3"
                    >
                      <motion.button
                        onClick={() => setShowLoginForm(true)}
                        className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-medium rounded-xl shadow-lg hover:shadow-glow-md transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Admin Login
                      </motion.button>
                      <motion.button
                        onClick={() => setShowAdminAccess(false)}
                        className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors rounded-lg hover:bg-white/10 dark:hover:bg-neutral-800/50"
                        whileHover={{ rotate: 90 }}
                        title="Close"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-white/10 dark:hover:bg-neutral-800/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? 'close' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                    ) : (
                      <Menu className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden border-t border-white/10 dark:border-neutral-700/30"
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          onPageChange(item.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          currentPage === item.id
                            ? 'text-accent-600 dark:text-accent-400 bg-glass-gradient shadow-glass-inset'
                            : 'text-neutral-600 dark:text-neutral-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-glass-gradient hover:shadow-glass-inset'
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </motion.button>
                    )
                  })}

                  {/* Mobile User/Admin Section */}
                  <div className="pt-4 border-t border-white/10 dark:border-neutral-700/30">
                    {user ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <User className="w-4 h-4" />
                          <div>
                            <div className="font-medium text-neutral-900 dark:text-white">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-xs">{user.email}</div>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => {
                            logout()
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </motion.button>
                      </motion.div>
                    ) : showAdminAccess ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2"
                      >
                        <motion.button
                          onClick={() => {
                            setShowLoginForm(true)
                            setIsMobileMenuOpen(false)
                          }}
                          className="w-full px-4 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-medium rounded-xl transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          Admin Login
                        </motion.button>
                        <motion.button
                          onClick={() => setShowAdminAccess(false)}
                          className="w-full px-4 py-3 text-neutral-500 dark:text-neutral-400 font-medium rounded-xl transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          Close
                        </motion.button>
                      </motion.div>
                    ) : (
                      <div className="text-center py-4 text-sm text-neutral-500 dark:text-neutral-400 italic">
                        Triple-click the logo for admin access
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Authentication Modals */}
      <AnimatePresence>
        {showLoginForm && (
          <LoginForm
            onSwitchToSignup={() => {
              setShowLoginForm(false)
              setShowSignupForm(true)
            }}
            onClose={() => setShowLoginForm(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSignupForm && (
          <SignupForm
            onSwitchToLogin={() => {
              setShowSignupForm(false)
              setShowLoginForm(true)
            }}
            onClose={() => setShowSignupForm(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}