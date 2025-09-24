import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    const result = await sql`
      SELECT id, date, intercessor, opening, lessons, vision, speaker,
             custom_sections as "customSections", notes,
             created_by as "createdBy", created_at as "createdAt",
             updated_at as "updatedAt"
      FROM daily_content
      ORDER BY date DESC
    `

    const posts = result.rows.map(row => ({
      ...row,
      // Parse JSON fields if they're strings
      opening: Array.isArray(row.opening) ? row.opening : (row.opening ? JSON.parse(row.opening) : []),
      lessons: Array.isArray(row.lessons) ? row.lessons : (row.lessons ? JSON.parse(row.lessons) : []),
      vision: Array.isArray(row.vision) ? row.vision : (row.vision ? JSON.parse(row.vision) : []),
      speaker: Array.isArray(row.speaker) ? row.speaker : (row.speaker ? JSON.parse(row.speaker) : []),
      customSections: Array.isArray(row.customSections) ? row.customSections : (row.customSections ? JSON.parse(row.customSections) : [])
    }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching daily content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily content' },
      { status: 500 }
    )
  }
}