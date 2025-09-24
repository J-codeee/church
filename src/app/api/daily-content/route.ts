import { NextRequest, NextResponse } from 'next/server'
import { getDailyContent, createOrUpdateDailyContent, getUserById } from '@/lib/database'
import { verifyToken } from '@/lib/auth'
import { DailyContentRequest } from '@/lib/database-types'

// Get daily content by date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Missing date', message: 'Date parameter is required' },
        { status: 400 }
      )
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format', message: 'Date must be in YYYY-MM-DD format' },
        { status: 400 }
      )
    }

    const dailyContent = await getDailyContent(date)

    if (!dailyContent) {
      return NextResponse.json(
        { message: 'No content found for this date', data: null },
        { status: 200 }
      )
    }

    return NextResponse.json({ data: dailyContent }, { status: 200 })
  } catch (error) {
    console.error('Get daily content error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to fetch daily content' },
      { status: 500 }
    )
  }
}

// Create or update daily content
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication token required' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Get user to check role
    const user = await getUserById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'User not found' },
        { status: 401 }
      )
    }

    // Check if user has permission to create/update content
    if (!['admin', 'pastor'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body: DailyContentRequest = await request.json()
    const { date, ...contentData } = body

    if (!date) {
      return NextResponse.json(
        { error: 'Missing date', message: 'Date is required' },
        { status: 400 }
      )
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format', message: 'Date must be in YYYY-MM-DD format' },
        { status: 400 }
      )
    }

    // Create or update daily content
    const dailyContent = await createOrUpdateDailyContent(date, contentData, user.id)

    return NextResponse.json({ data: dailyContent }, { status: 200 })
  } catch (error) {
    console.error('Create/update daily content error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to save daily content' },
      { status: 500 }
    )
  }
}