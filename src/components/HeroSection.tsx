import { getDailyVerse } from '@/data/dailyVerses'

interface HeroSectionProps {
  onNavigateToDashboard: () => void
  onNavigateToAbout: () => void
}

export default function HeroSection({ onNavigateToDashboard, onNavigateToAbout }: HeroSectionProps) {
  const dailyVerse = getDailyVerse()
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-accent/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gold/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl px-6 sm:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm mb-8 animate-fade-in-up">
          <span>✞</span>
          <span>Welcome to our community</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6 animate-fade-in-up [animation-delay:200ms]">
          United with Christ through the Holy Spirit Church
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-white/80 italic mb-4 animate-fade-in-up [animation-delay:400ms]">
          &ldquo;{dailyVerse.verse}&rdquo;
        </p>

        {/* Verse Reference */}
        <p className="text-sm text-white/60 mb-12 animate-fade-in-up [animation-delay:600ms]">
          {dailyVerse.reference}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:800ms]">
          <button
            onClick={onNavigateToDashboard}
            className="px-8 py-4 bg-gold hover:bg-gold-600 text-slate-900 font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/25"
          >
            Visit Dashboard
          </button>
          <button
            onClick={onNavigateToAbout}
            className="px-8 py-4 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}