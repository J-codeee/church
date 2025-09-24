export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-8 flex-wrap mb-4">
            <div className="font-serif text-xl font-semibold">
              ✞ United with Christ through the Holy Spirit Church
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm opacity-80">
              © 2025 UCHSC. All rights reserved.
            </div>
            <div className="text-sm opacity-80">
              Developed by <span className="text-gold font-medium">Jcohannz Roz Cordoviz</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}