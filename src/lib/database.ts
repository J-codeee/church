import { sql } from '@vercel/postgres'
import { User, DailyContent } from './database-types'

// User database operations
export async function createUser(userData: {
  email: string
  firstName: string
  lastName: string
  passwordHash: string
}): Promise<User> {
  const { email, firstName, lastName, passwordHash } = userData

  try {
    const result = await sql`
      INSERT INTO users (email, first_name, last_name, password_hash)
      VALUES (${email}, ${firstName}, ${lastName}, ${passwordHash})
      RETURNING id, email, first_name as "firstName", last_name as "lastName",
                role, is_verified as "isVerified", created_at as "createdAt",
                updated_at as "updatedAt", last_login as "lastLogin"
    `

    return result.rows[0] as User
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate key')) {
      throw new Error('Email already exists')
    }
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, email, first_name as "firstName", last_name as "lastName",
             password_hash as "passwordHash", role, is_verified as "isVerified",
             created_at as "createdAt", updated_at as "updatedAt",
             last_login as "lastLogin"
      FROM users
      WHERE email = ${email}
    `

    return result.rows[0] as User || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, email, first_name as "firstName", last_name as "lastName",
             role, is_verified as "isVerified", created_at as "createdAt",
             updated_at as "updatedAt", last_login as "lastLogin"
      FROM users
      WHERE id = ${id}
    `

    return result.rows[0] as User || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

export async function updateLastLogin(userId: string): Promise<void> {
  try {
    await sql`
      UPDATE users
      SET last_login = CURRENT_TIMESTAMP
      WHERE id = ${userId}
    `
  } catch (error) {
    console.error('Error updating last login:', error)
  }
}

// Daily content database operations
export async function getDailyContent(date: string): Promise<DailyContent | null> {
  try {
    const result = await sql`
      SELECT id, date, intercessor, opening, lessons, vision, speaker,
             custom_sections as "customSections", notes,
             created_by as "createdBy", created_at as "createdAt",
             updated_at as "updatedAt"
      FROM daily_content
      WHERE date = ${date}
    `

    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return {
      ...row,
      opening: Array.isArray(row.opening) ? row.opening : (row.opening ? JSON.parse(row.opening) : []),
      lessons: Array.isArray(row.lessons) ? row.lessons : (row.lessons ? JSON.parse(row.lessons) : []),
      vision: Array.isArray(row.vision) ? row.vision : (row.vision ? JSON.parse(row.vision) : []),
      speaker: Array.isArray(row.speaker) ? row.speaker : (row.speaker ? JSON.parse(row.speaker) : []),
      customSections: Array.isArray(row.customSections) ? row.customSections : (row.customSections ? JSON.parse(row.customSections) : [])
    } as DailyContent
  } catch (error) {
    console.error('Error getting daily content:', error)
    return null
  }
}

export async function createOrUpdateDailyContent(
  date: string,
  content: {
    intercessor?: string | null
    opening: string[]
    lessons: string[]
    vision: string[]
    speaker: string[]
    customSections: Array<{title: string, verses: string[]}>
    notes?: string | null
  },
  userId: string | null
): Promise<DailyContent> {
  const {
    intercessor,
    opening,
    lessons,
    vision,
    speaker,
    customSections,
    notes
  } = content

  try {
    // Use PostgreSQL's UPSERT (INSERT ... ON CONFLICT) for atomic operation
    const result = await sql`
      INSERT INTO daily_content (
        date, intercessor, opening, lessons, vision, speaker,
        custom_sections, notes, created_by
      )
      VALUES (
        ${date}, ${intercessor}, ${JSON.stringify(opening)}::jsonb,
        ${JSON.stringify(lessons)}::jsonb, ${JSON.stringify(vision)}::jsonb,
        ${JSON.stringify(speaker)}::jsonb, ${JSON.stringify(customSections)}::jsonb,
        ${notes}, ${userId}
      )
      ON CONFLICT (date)
      DO UPDATE SET
        intercessor = EXCLUDED.intercessor,
        opening = EXCLUDED.opening,
        lessons = EXCLUDED.lessons,
        vision = EXCLUDED.vision,
        speaker = EXCLUDED.speaker,
        custom_sections = EXCLUDED.custom_sections,
        notes = EXCLUDED.notes,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, date, intercessor, opening, lessons, vision, speaker,
                custom_sections as "customSections", notes,
                created_by as "createdBy", created_at as "createdAt",
                updated_at as "updatedAt"
    `

    const row = result.rows[0]
    return {
      ...row,
      // Since we're using JSONB, these should already be parsed
      opening: Array.isArray(row.opening) ? row.opening : [],
      lessons: Array.isArray(row.lessons) ? row.lessons : [],
      vision: Array.isArray(row.vision) ? row.vision : [],
      speaker: Array.isArray(row.speaker) ? row.speaker : [],
      customSections: Array.isArray(row.customSections) ? row.customSections : []
    } as DailyContent
  } catch (error) {
    console.error('Error creating/updating daily content:', error)
    console.error('Error details:', {
      date,
      content,
      userId,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}

export async function getRecentDailyContent(limit: number = 7): Promise<DailyContent[]> {
  try {
    const result = await sql`
      SELECT id, date, intercessor, opening, lessons, vision, speaker,
             custom_sections as "customSections", notes,
             created_by as "createdBy", created_at as "createdAt",
             updated_at as "updatedAt"
      FROM daily_content
      ORDER BY date DESC
      LIMIT ${limit}
    `

    return result.rows.map(row => ({
      ...row,
      opening: Array.isArray(row.opening) ? row.opening : (row.opening ? JSON.parse(row.opening) : []),
      lessons: Array.isArray(row.lessons) ? row.lessons : (row.lessons ? JSON.parse(row.lessons) : []),
      vision: Array.isArray(row.vision) ? row.vision : (row.vision ? JSON.parse(row.vision) : []),
      speaker: Array.isArray(row.speaker) ? row.speaker : (row.speaker ? JSON.parse(row.speaker) : []),
      customSections: Array.isArray(row.customSections) ? row.customSections : (row.customSections ? JSON.parse(row.customSections) : [])
    })) as DailyContent[]
  } catch (error) {
    console.error('Error getting recent daily content:', error)
    return []
  }
}