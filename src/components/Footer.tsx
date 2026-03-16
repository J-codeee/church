export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <div className="glass rounded-3xl border border-white/20 dark:border-white/10 shadow-glass px-6 py-8">
          <div className="flex flex-col gap-6 text-center">
            <div className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">
              <span className="text-gold-500">✞</span> United with Christ through the Holy Spirit Church
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10" />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
              <div>© 2025 UCHSC. All rights reserved.</div>
              <div>
                Developed by <span className="text-gold-500 font-semibold">Jcohannz Roz Cordoviz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}