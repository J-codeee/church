export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-center text-primary mb-12 relative">
          About Our Church
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gold rounded-full"></div>
        </h1>

        <div className="space-y-8">
          <div className="card p-8">
            <h2 className="text-2xl font-serif font-semibold text-center text-primary mb-6">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              United with Christ through the Holy Spirit Church is a vibrant community of believers
              dedicated to spreading God&apos;s love and building lasting relationships centered on faith,
              hope, and love.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Founded on the principles of Christian fellowship and spiritual growth, our church
              welcomes everyone seeking to deepen their relationship with Jesus Christ and find
              their purpose in God&apos;s plan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Faith</h3>
              <p className="text-slate-600">
                We believe in the transformative power of faith in Jesus Christ and the guidance
                of the Holy Spirit in our daily lives.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Community</h3>
              <p className="text-slate-600">
                We foster a welcoming environment where all members can grow together in love,
                support, and Christian fellowship.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Service</h3>
              <p className="text-slate-600">
                We are committed to serving our community and sharing God&apos;s love through acts
                of kindness and compassion.
              </p>
            </div>
          </div>

          <div className="card p-8">
            <p className="text-slate-600 leading-relaxed text-center">
              Join us every Sunday for worship, fellowship, and spiritual growth as we journey
              together in faith.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}