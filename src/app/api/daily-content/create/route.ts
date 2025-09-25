import { NextRequest, NextResponse } from 'next/server'
import { createOrUpdateDailyContent, getDailyContent } from '@/lib/database'

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
      notes,
      isEdit,
      originalDate
    } = body

    // Validate required fields
    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      )
    }

    // Validation to prevent accidental overwrites
    if (!isEdit) {
      // CREATE MODE: Check if a post already exists for this date
      const existingPost = await getDailyContent(date)
      if (existingPost) {
        return NextResponse.json(
          { error: `A post already exists for ${date}. Please choose a different date or edit the existing post.` },
          { status: 409 } // 409 Conflict
        )
      }
    } else {
      // EDIT MODE: Extra protection - if date changed, make sure target date is free
      if (originalDate && originalDate !== date) {
        const conflictingPost = await getDailyContent(date)
        if (conflictingPost) {
          return NextResponse.json(
            { error: `Cannot change date to ${date} because a post already exists for that date.` },
            { status: 409 } // 409 Conflict
          )
        }
      }
    }

    // For now, we'll use null for created_by since we don't have user authentication
    // In a real app, you'd get the user ID from the session
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
      null // Pass null instead of a dummy UUID
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