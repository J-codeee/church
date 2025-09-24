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
      opening: row.opening || [],
      lessons: row.lessons || [],
      vision: row.vision || [],
      speaker: row.speaker || [],
      customSections: row.customSections || []
    } as DailyContent
  } catch (error) {
    console.error('Error getting daily content:', error)
    return null
  }
}

export async function createOrUpdateDailyContent(
  date: string,
  content: {
    intercessor?: string
    opening: string[]
    lessons: string[]
    vision: string[]
    speaker: string[]
    customSections: Array<{title: string, verses: string[]}>
    notes?: string
  },
  userId: string
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
    // Try to update first, then insert if not exists
    const updateResult = await sql`
      UPDATE daily_content
      SET intercessor = ${intercessor},
          opening = ${opening},
          lessons = ${lessons},
          vision = ${vision},
          speaker = ${speaker},
          custom_sections = ${JSON.stringify(customSections)},
          notes = ${notes},
          updated_at = CURRENT_TIMESTAMP
      WHERE date = ${date}
      RETURNING id, date, intercessor, opening, lessons, vision, speaker,
                custom_sections as "customSections", notes,
                created_by as "createdBy", created_at as "createdAt",
                updated_at as "updatedAt"
    `

    if (updateResult.rows.length > 0) {
      const row = updateResult.rows[0]
      return {
        ...row,
        opening: row.opening || [],
        lessons: row.lessons || [],
        vision: row.vision || [],
        speaker: row.speaker || [],
        customSections: row.customSections || []
      } as DailyContent
    }

    // If update didn't affect any rows, insert new record
    const insertResult = await sql`
      INSERT INTO daily_content (
        date, intercessor, opening, lessons, vision, speaker,
        custom_sections, notes, created_by
      )
      VALUES (
        ${date}, ${intercessor}, ${opening}, ${lessons}, ${vision}, ${speaker},
        ${JSON.stringify(customSections)}, ${notes}, ${userId}
      )
      RETURNING id, date, intercessor, opening, lessons, vision, speaker,
                custom_sections as "customSections", notes,
                created_by as "createdBy", created_at as "createdAt",
                updated_at as "updatedAt"
    `

    const row = insertResult.rows[0]
    return {
      ...row,
      opening: row.opening || [],
      lessons: row.lessons || [],
      vision: row.vision || [],
      speaker: row.speaker || [],
      customSections: row.customSections || []
    } as DailyContent
  } catch (error) {
    console.error('Error creating/updating daily content:', error)
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
      opening: row.opening || [],
      lessons: row.lessons || [],
      vision: row.vision || [],
      speaker: row.speaker || [],
      customSections: row.customSections || []
    })) as DailyContent[]
  } catch (error) {
    console.error('Error getting recent daily content:', error)
    return []
  }
}