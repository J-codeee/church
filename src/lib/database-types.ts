// Database types for the church application

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  passwordHash: string
  role: 'admin' | 'pastor' | 'member'
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

export interface CustomSection {
  title: string
  verses: string[]
}

export interface DailyContent {
  id: string
  date: string // Format: YYYY-MM-DD
  intercessor?: string
  opening: string[]
  lessons: string[]
  vision: string[]
  speaker: string[]
  customSections: CustomSection[]
  notes?: string
  createdBy: string // User ID
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  id: string
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
}

// API request/response types
export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
  token: string
}

export interface DailyContentRequest {
  date: string
  intercessor?: string
  opening: string[]
  lessons: string[]
  vision: string[]
  speaker: string[]
  customSections: CustomSection[]
  notes?: string
}

export interface DailyContentResponse extends DailyContent {
  createdByUser?: {
    firstName: string
    lastName: string
    email: string
  }
}

// Dashboard specific types
export interface DashboardData {
  date: string
  content?: DailyContent
  canEdit: boolean // Based on user role
}

export interface ApiError {
  error: string
  message: string
  statusCode: number
}