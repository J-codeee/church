import { NextResponse } from 'next/server'
import { getAllDailyContent } from '@/lib/database'

export async function GET() {
  try {
    const posts = await getAllDailyContent()
    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error('Error fetching daily content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily content' },
      { status: 500 }
    )
  }
}