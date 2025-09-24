export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-900 via-accent-900 to-purple-900 text-white py-16 mt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-r from-gold/30 to-yellow-400/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-to-r from-electric/20 to-cyan-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="text-4xl text-gold animate-pulse">✞</span>
              <div className="font-serif text-2xl sm:text-3xl font-bold">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  United with Christ through the
                </span>
                <br />
                <span className="bg-gradient-to-r from-gold via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  Holy Spirit Church
                </span>
              </div>
            </div>
            <p className="text-blue-100/80 text-lg max-w-2xl mx-auto">
              Building a community of faith, hope, and love through Christ's teachings
            </p>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-sm text-white/70">
              © 2025 UCHSC. All rights reserved. | Built with faith and love
            </div>
            <div className="text-sm text-white/70">
              Crafted by <span className="text-gold font-semibold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">Jcohannz Roz Cordoviz</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}