'use client'

import { getTodaysVerse, getUpcomingVerses } from '@/lib/daily-verses'

export default function VersePreview() {
  const todaysVerse = getTodaysVerse()
  const upcomingVerses = getUpcomingVerses(7)

  const formatDate = (daysFromToday: number) => {
    const date = new Date()
    date.setDate(date.getDate() + daysFromToday)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
        <span className="gradient-text">Daily Verse Preview</span>
      </h2>

      {/* Today's Verse */}
      <div className="card p-8 mb-8">
        <h3 className="text-2xl font-bold text-accent mb-4">Today's Verse</h3>
        <div className="bg-gradient-to-r from-accent/10 to-purple/10 p-6 rounded-xl">
          <p className="text-lg italic text-slate-700 mb-3">
            "{todaysVerse.text}"
          </p>
          <p className="text-accent font-semibold">
            {todaysVerse.reference}
          </p>
        </div>
      </div>

      {/* Upcoming Verses */}
      <div className="card p-8">
        <h3 className="text-2xl font-bold text-accent mb-6">Next 7 Days Preview</h3>
        <div className="space-y-4">
          {upcomingVerses.map((verse, index) => (
            <div key={index} className="border-l-4 border-accent/30 pl-4 py-3">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-accent">
                  {formatDate(index)}
                </span>
                <span className="text-xs text-slate-500">
                  {verse.reference}
                </span>
              </div>
              <p className="text-slate-700 italic">
                "{verse.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-slate-600">
          <strong>How it works:</strong> The verse changes automatically each day based on the current date.
          The system uses the day of the year to cycle through {upcomingVerses.length} carefully selected Bible verses,
          so you'll get a fresh, inspiring verse every single day!
        </p>
      </div>
    </div>
  )
}