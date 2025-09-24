import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/database'
import { hashPassword, generateToken, validateEmail, validatePassword } from '@/lib/auth'
import { SignupRequest, AuthResponse } from '@/lib/database-types'

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json()
    const { email, firstName, lastName, password } = body

    // Validation
    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json(
        { error: 'Missing required fields', message: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email', message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      return NextResponse.json(
        { error: 'Invalid password', message: passwordError },
        { status: 400 }
      )
    }

    if (firstName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Invalid first name', message: 'First name must be at least 2 characters' },
        { status: 400 }
      )
    }

    if (lastName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Invalid last name', message: 'Last name must be at least 2 characters' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await createUser({
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      passwordHash,
    })

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

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)

    if (error instanceof Error && error.message === 'Email already exists') {
      return NextResponse.json(
        { error: 'Email exists', message: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to create account' },
      { status: 500 }
    )
  }
}