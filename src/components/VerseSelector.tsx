'use client'

import React, { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { bibleBooks, maxVersesPerChapter, BibleBook } from '@/lib/bible-books'

interface VerseSelectorProps {
  value: string
  onChange: (verse: string) => void
  onRemove?: () => void
}

export default function VerseSelector({ value, onChange, onRemove }: VerseSelectorProps) {
  const [book, setBook] = useState('')
  const [chapter, setChapter] = useState('')
  const [verse1, setVerse1] = useState('')
  const [verse2, setVerse2] = useState('')

  // Parse existing value when component mounts or value changes
  useEffect(() => {
    if (value) {
      const match = value.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/)
      if (match) {
        setBook(match[1])
        setChapter(match[2])
        setVerse1(match[3])
        setVerse2(match[4] || '')
      }
    }
  }, [value])

  // Update the reference string when any field changes
  useEffect(() => {
    if (book && chapter && verse1) {
      let reference = `${book} ${chapter}:${verse1}`
      if (verse2 && verse2 !== verse1) {
        reference += `-${verse2}`
      }
      onChange(reference)
    } else if (!book && !chapter && !verse1) {
      onChange('')
    }
  }, [book, chapter, verse1, verse2])

  const handleBookChange = (selectedBook: string) => {
    setBook(selectedBook)
    setChapter('')
    setVerse1('')
    setVerse2('')
  }

  const handleChapterChange = (selectedChapter: string) => {
    setChapter(selectedChapter)
    setVerse1('')
    setVerse2('')
  }

  const chapters = book ? Array.from({ length: bibleBooks[book as BibleBook] }, (_, i) => i + 1) : []

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-3 bg-white rounded-lg border border-slate-200">
      {/* Book Select */}
      <select
        value={book}
        onChange={(e) => handleBookChange(e.target.value)}
        className="input w-full sm:w-auto min-w-32"
      >
        <option value="">Select Book</option>
        {Object.keys(bibleBooks).map((bookName) => (
          <option key={bookName} value={bookName}>
            {bookName}
          </option>
        ))}
      </select>

      {/* Chapter Select */}
      <select
        value={chapter}
        onChange={(e) => handleChapterChange(e.target.value)}
        disabled={!book}
        className="input w-full sm:w-auto min-w-20"
      >
        <option value="">Chapter</option>
        {chapters.map((chapterNum) => (
          <option key={chapterNum} value={chapterNum}>
            {chapterNum}
          </option>
        ))}
      </select>

      {/* Verse 1 Input */}
      <input
        type="number"
        value={verse1}
        onChange={(e) => setVerse1(e.target.value)}
        placeholder="Verse"
        min="1"
        max={maxVersesPerChapter}
        disabled={!chapter}
        className="input w-full sm:w-20"
      />

      <span className="text-slate-400 hidden sm:block">-</span>

      {/* Verse 2 Input */}
      <input
        type="number"
        value={verse2}
        onChange={(e) => setVerse2(e.target.value)}
        placeholder="End"
        min={verse1 || 1}
        max={maxVersesPerChapter}
        disabled={!verse1}
        className="input w-full sm:w-20"
      />

      {/* Display */}
      <div className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded text-sm font-medium text-primary min-h-10 flex items-center">
        {value || 'Select book, chapter, and verse'}
      </div>

      {/* Remove Button */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="btn btn-danger p-2 flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}