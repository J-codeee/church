'use client'

import React from 'react'
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
}

const colorMap = {
  success: {
    bg: 'bg-green-50 dark:bg-green-950',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-900 dark:text-green-100',
    message: 'text-green-700 dark:text-green-300',
    button: 'bg-green-600 hover:bg-green-700 text-white'
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-900 dark:text-red-100',
    message: 'text-red-700 dark:text-red-300',
    button: 'bg-red-600 hover:bg-red-700 text-white'
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-100',
    message: 'text-yellow-700 dark:text-yellow-300',
    button: 'bg-yellow-600 hover:bg-yellow-700 text-white'
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-100',
    message: 'text-blue-700 dark:text-blue-300',
    button: 'bg-blue-600 hover:bg-blue-700 text-white'
  }
}

export default function NotificationModal({
  isOpen,
  onClose,
  type,
  title,
  message
}: NotificationModalProps) {
  if (!isOpen) return null

  const Icon = iconMap[type]
  const colors = colorMap[type]

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white dark:bg-slate-900 rounded-xl max-w-md w-full border ${colors.border} shadow-xl`}>
        {/* Header */}
        <div className={`${colors.bg} p-6 rounded-t-xl border-b ${colors.border}`}>
          <div className="flex items-start gap-4">
            <Icon className={`w-6 h-6 ${colors.icon} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-semibold ${colors.title} mb-1`}>
                {title}
              </h3>
              <p className={`text-sm ${colors.message} leading-relaxed`}>
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 dark:hover:bg-black/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${colors.button}`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}