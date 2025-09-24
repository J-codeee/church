'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
    )
  }

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ]

  const currentThemeIndex = themes.findIndex(t => t.name === theme)

  const handleToggle = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length
    setTheme(themes[nextIndex].name)
  }

  const CurrentIcon = themes[currentThemeIndex]?.icon || Sun

  return (
    <motion.button
      onClick={handleToggle}
      className="relative w-10 h-10 rounded-full bg-white/10 dark:bg-neutral-800/50 backdrop-blur-sm border border-white/20 dark:border-neutral-700/50 flex items-center justify-center group hover:bg-white/20 dark:hover:bg-neutral-700/50 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${themes[(currentThemeIndex + 1) % themes.length].label} theme`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <CurrentIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-accent-500 transition-colors duration-300" />
        </motion.div>
      </AnimatePresence>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-500 to-forest-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
    </motion.button>
  )
}