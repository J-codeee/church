'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'

interface ForgotPasswordModalProps {
  onClose: () => void
}

export default function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (!email) {
      setError('Email is required')
      setIsLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      setIsSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send reset email. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[101] p-4" style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-4">
                <span className="text-gold">🔑</span>
                <span className="text-primary font-medium">Password Recovery</span>
              </div>
              <h2 className="text-2xl font-serif font-semibold text-primary mb-2">
                Forgot Your Password?
              </h2>
              <p className="text-gray-600 text-sm">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold/20 focus:border-gold transition-colors"
                    placeholder="Enter your email"
                    autoFocus
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold hover:bg-gold-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            {/* Back to login */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="text-sm text-gray-600 hover:text-gold transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </>
        ) : (
          // Success state
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-primary mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <span className="font-medium text-primary">{email}</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              The link will expire in 1 hour. If you don't see the email, check your spam folder.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gold hover:bg-gold-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Return to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
