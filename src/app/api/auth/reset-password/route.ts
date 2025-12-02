import { NextRequest, NextResponse } from 'next/server'
import { getPasswordResetToken, deletePasswordResetToken, updateUserPassword } from '@/lib/database'
import { hashPassword, validatePassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    // Validation
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Missing required fields', message: 'Token and password are required' },
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordError = validatePassword(password)
    if (passwordError) {
      return NextResponse.json(
        { error: 'Invalid password', message: passwordError },
        { status: 400 }
      )
    }

    // Get reset token from database
    const resetToken = await getPasswordResetToken(token)

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid token', message: 'Password reset token is invalid or has expired' },
        { status: 400 }
      )
    }

    // Check if token has expired
    const now = new Date()
    const expiresAt = new Date(resetToken.expiresAt)

    if (now > expiresAt) {
      // Delete expired token
      await deletePasswordResetToken(token)

      return NextResponse.json(
        { error: 'Token expired', message: 'Password reset token has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Hash new password
    const passwordHash = await hashPassword(password)

    // Update user password
    await updateUserPassword(resetToken.email, passwordHash)

    // Delete used token
    await deletePasswordResetToken(token)

    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)

    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to reset password' },
      { status: 500 }
    )
  }
}
