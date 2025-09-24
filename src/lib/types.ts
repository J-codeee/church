export interface VerseReference {
  book: string
  chapter: number
  verse1: number
  verse2?: number
}

export interface CustomSection {
  title: string
  verses: string[]
}

export interface Post {
  id: string
  date: string
  intercessor?: string
  opening: string[]
  lessons: string[]
  vision: string[]
  speaker: string[]
  customSections: CustomSection[]
}