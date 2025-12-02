import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, createPasswordResetToken } from '@/lib/database'
import { generatePasswordResetToken, validateEmail } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Missing email', message: 'Email is required' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email', message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if user exists
    const user = await getUserByEmail(normalizedEmail)

    // For security reasons, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      return NextResponse.json(
        { message: 'If an account with that email exists, a password reset link has been sent.' },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = generatePasswordResetToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Store token in database
    await createPasswordResetToken(normalizedEmail, resetToken, expiresAt)

    // Create reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

    // TODO: Send email with reset link
    // For now, we'll log it to console (in production, use a proper email service)
    console.log('Password reset link:', resetUrl)
    console.log('This link expires in 1 hour')

    // In development, you might want to expose the link for testing
    // Remove this in production
    if (process.env.NODE_ENV === 'development') {
      console.log('========================================')
      console.log('PASSWORD RESET LINK FOR:', normalizedEmail)
      console.log(resetUrl)
      console.log('========================================')
    }

    return NextResponse.json(
      {
        message: 'If an account with that email exists, a password reset link has been sent.',
        // Only include this in development
        ...(process.env.NODE_ENV === 'development' && { resetUrl })
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)

    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to process password reset request' },
      { status: 500 }
    )
  }
}
