import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, updateLastLogin } from '@/lib/database'
import { verifyPassword, generateToken, validateEmail } from '@/lib/auth'
import { LoginRequest, AuthResponse } from '@/lib/database-types'

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing credentials', message: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email', message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await getUserByEmail(email.toLowerCase().trim())
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last login
    await updateLastLogin(user.id)

    // Generate JWT token
    const token = generateToken(user.id)

    // Prepare response
    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)

    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to authenticate user' },
      { status: 500 }
    )
  }
}