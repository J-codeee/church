'use client'

import React, { useState, useEffect } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { Post, CustomSection, VerseReference } from '@/lib/types'
import { bibleBooks, maxVersesPerChapter, BibleBook } from '@/lib/bible-books'
import VerseSelector from './VerseSelector'

interface PostModalProps {
  post: Post | null
  onSave: (post: Omit<Post, 'id'>) => void
  onClose: () => void
}

export default function PostModal({ post, onSave, onClose }: PostModalProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    intercessor: '',
    opening: [''],
    lessons: [''],
    vision: [''],
    speaker: [''],
    customSections: [] as CustomSection[],
    notes: ''
  })

  useEffect(() => {
    if (post) {
      setFormData({
        date: post.date,
        intercessor: post.intercessor || '',
        opening: post.opening.length > 0 ? post.opening : [''],
        lessons: post.lessons.length > 0 ? post.lessons : [''],
        vision: post.vision.length > 0 ? post.vision : [''],
        speaker: post.speaker.length > 0 ? post.speaker : [''],
        customSections: post.customSections,
        notes: post.notes || ''
      })
    }
  }, [post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const processedData = {
      ...formData,
      opening: formData.opening.filter(v => v.trim()),
      lessons: formData.lessons.filter(v => v.trim()),
      vision: formData.vision.filter(v => v.trim()),
      speaker: formData.speaker.filter(v => v.trim()),
      customSections: formData.customSections.map(section => ({
        ...section,
        verses: section.verses.filter(v => v.trim())
      })).filter(section => section.title.trim() && section.verses.length > 0)
    }

    onSave(processedData)
  }

  const updateSectionVerse = (section: string, index: number, verse: string) => {
    setFormData(prev => {
      const sectionData = prev[section as keyof typeof prev] as string[]
      return {
        ...prev,
        [section]: sectionData.map((v: string, i: number) =>
          i === index ? verse : v
        )
      }
    })
  }

  const addVerse = (section: string) => {
    setFormData(prev => {
      const sectionData = prev[section as keyof typeof prev] as string[]
      return {
        ...prev,
        [section]: [...sectionData, '']
      }
    })
  }

  const removeVerse = (section: string, index: number) => {
    setFormData(prev => {
      const sectionData = prev[section as keyof typeof prev] as string[]
      return {
        ...prev,
        [section]: sectionData.filter((_: string, i: number) => i !== index)
      }
    })
  }

  const addCustomSection = () => {
    setFormData(prev => ({
      ...prev,
      customSections: [...prev.customSections, { title: '', verses: [''] }]
    }))
  }

  const updateCustomSection = (index: number, title: string, verses: string[]) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.map((section, i) =>
        i === index ? { title, verses } : section
      )
    }))
  }

  const removeCustomSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index)
    }))
  }

  const renderSection = (title: string, sectionKey: keyof typeof formData, verses: string[]) => (
    <div className="form-group">
      <label className="block text-sm font-medium text-primary mb-2">{title}</label>
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-primary">{title} Verses</span>
          <button
            type="button"
            onClick={() => addVerse(sectionKey as string)}
            className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-md hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20 hover:border-primary/30"
          >
            <Plus className="w-3 h-3" />
            Add Verse
          </button>
        </div>
        <div className="space-y-3">
          {verses.map((verse, index) => (
            <VerseSelector
              key={index}
              value={verse}
              onChange={(newVerse) => updateSectionVerse(sectionKey as string, index, newVerse)}
              onRemove={verses.length > 1 ? () => removeVerse(sectionKey as string, index) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <h2 className="text-xl font-serif font-semibold text-primary">
              {post ? 'Edit Post' : 'Add New Post'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Date */}
            <div className="form-group">
              <label htmlFor="date" className="block text-sm font-medium text-primary mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="input"
                required
              />
            </div>

            {/* Intercessor */}
            <div className="form-group">
              <label htmlFor="intercessor" className="block text-sm font-medium text-primary mb-2">
                Intercessor
              </label>
              <input
                type="text"
                id="intercessor"
                value={formData.intercessor}
                onChange={(e) => setFormData(prev => ({ ...prev, intercessor: e.target.value }))}
                placeholder="Enter intercessor name"
                className="input"
              />
            </div>

            {/* Standard Sections */}
            {renderSection('Lead (Opening)', 'opening', formData.opening)}
            {renderSection('Lessons', 'lessons', formData.lessons)}
            {renderSection('Vision(Vediente)', 'vision', formData.vision)}
            {renderSection('Speaker(Parlante)', 'speaker', formData.speaker)}

            {/* Custom Sections */}
            {formData.customSections.map((section, index) => (
              <div key={index} className="form-group">
                <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-primary mb-2">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        e.stopPropagation()
                        updateCustomSection(index, e.target.value, section.verses)
                      }}
                      placeholder="Enter section title (e.g., Closing, Special Prayer)"
                      className="input w-full"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => updateCustomSection(index, section.title, [...section.verses, ''])}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-md hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20 hover:border-primary/30"
                    >
                      <Plus className="w-3 h-3" />
                      Add Verse
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCustomSection(index)}
                      className="px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-md hover:bg-red-100 transition-colors border border-red-200 hover:border-red-300"
                    >
                      Remove Section
                    </button>
                  </div>
                  <div className="space-y-3">
                    {section.verses.map((verse, verseIndex) => (
                      <VerseSelector
                        key={verseIndex}
                        value={verse}
                        onChange={(newVerse) => {
                          const newVerses = [...section.verses]
                          newVerses[verseIndex] = newVerse
                          updateCustomSection(index, section.title, newVerses)
                        }}
                        onRemove={section.verses.length > 1 ? () => {
                          const newVerses = section.verses.filter((_, i) => i !== verseIndex)
                          updateCustomSection(index, section.title, newVerses)
                        } : undefined}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Add Custom Section Button */}
            <div className="form-group">
              <button
                type="button"
                onClick={addCustomSection}
                className="w-full px-4 py-3 border-2 border-dashed border-primary/30 text-primary font-medium rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                <Plus className="w-4 h-4" />
                Add Additional Section
              </button>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label htmlFor="notes" className="block text-sm font-medium text-primary mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any additional notes, reminders, or special instructions..."
                className="input min-h-24 resize-y"
                rows={3}
              />
              <p className="text-xs text-slate-500 mt-1">
                Use this field for any additional information that doesn&apos;t fit in the sections above.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 bg-white sticky bottom-0 -mx-6 px-6 pb-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {post ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}