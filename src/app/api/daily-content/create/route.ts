import { NextRequest, NextResponse } from 'next/server'
import { createOrUpdateDailyContent } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      date,
      intercessor,
      opening,
      lessons,
      vision,
      speaker,
      customSections,
      notes
    } = body

    // Validate required fields
    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      )
    }

    // For now, we'll use a dummy user ID. In a real app, you'd get this from the session
    const userId = '00000000-0000-0000-0000-000000000000'

    const result = await createOrUpdateDailyContent(
      date,
      {
        intercessor: intercessor || null,
        opening: opening || [],
        lessons: lessons || [],
        vision: vision || [],
        speaker: speaker || [],
        customSections: customSections || [],
        notes: notes || null
      },
      userId
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating/updating daily content:', error)
    return NextResponse.json(
      {
        error: 'Failed to create/update daily content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}