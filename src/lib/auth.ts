import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from './database-types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded
  } catch (error) {
    return null
  }
}

export function getUserFromToken(token: string): { userId: string } | null {
  try {
    return verifyToken(token)
  } catch (error) {
    return null
  }
}

// Password validation
export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter'
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter'
  }

  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number'
  }

  return null
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}