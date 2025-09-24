interface HeroSectionProps {
  onNavigateToDashboard: () => void
  onNavigateToAbout: () => void
}

export default function HeroSection({ onNavigateToDashboard, onNavigateToAbout }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-accent-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-accent/20 to-purple/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-electric/15 to-accent/15 rounded-full blur-3xl animate-float [animation-delay:2s]"></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-r from-gold/20 to-yellow-400/20 rounded-full blur-3xl animate-float [animation-delay:4s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-accent/5 via-purple/5 to-electric/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative z-10 text-center text-white max-w-5xl px-6 sm:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 glass-dark border border-white/20 px-6 py-3 rounded-full text-sm mb-8 animate-scale-up shadow-2xl">
          <span className="text-gold text-xl animate-pulse">✞</span>
          <span className="font-medium">Welcome to our spiritual community</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 animate-slide-up [animation-delay:200ms]">
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            United with Christ through the
          </span>
          <br />
          <span className="bg-gradient-to-r from-gold via-yellow-300 to-amber-300 bg-clip-text text-transparent animate-gradient-xy">
            Holy Spirit Church
          </span>
        </h1>

        {/* Subtitle */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 animate-slide-up [animation-delay:400ms] border border-white/10">
          <p className="text-xl sm:text-2xl text-blue-100 italic font-light leading-relaxed">
            &ldquo;For where two or three gather in my name, there am I with them.&rdquo;
          </p>
          <p className="text-sm text-white/60 mt-3 font-medium">
            Matthew 18:20
          </p>
        </div>

        {/* Mission Statement */}
        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in [animation-delay:600ms]">
          Experience God's love through worship, fellowship, and spiritual growth in our vibrant community.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up [animation-delay:800ms]">
          <button
            onClick={onNavigateToDashboard}
            className="px-10 py-4 bg-gradient-to-r from-gold via-amber-500 to-yellow-500 hover:from-gold-600 hover:via-amber-600 hover:to-yellow-600 text-slate-900 font-bold rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/30 transform hover:scale-105 text-lg animate-pulse-glow"
          >
            Explore Dashboard
          </button>
          <button
            onClick={onNavigateToAbout}
            className="px-10 py-4 glass-dark border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-bold rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-lg backdrop-blur-xl"
          >
            Discover Our Story
          </button>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-electric/20 to-cyan-400/20 rounded-full blur-xl animate-float [animation-delay:1s]"></div>
        <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-r from-purple/20 to-pink-400/20 rounded-full blur-xl animate-float [animation-delay:3s]"></div>
      </div>
    </section>
  )
}