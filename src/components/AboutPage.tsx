export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-6">
            <span className="gradient-text">About Our Church</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-accent via-purple to-electric rounded-full mx-auto mb-6"></div>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Discovering God's love through worship, fellowship, and spiritual transformation
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission Section */}
          <div className="card p-10 animate-fade-in [animation-delay:200ms] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-purple/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-purple rounded-full mb-4">
                  <span className="text-2xl text-white">✞</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                  <span className="gradient-text">Our Mission</span>
                </h2>
              </div>
              <div className="space-y-6 max-w-4xl mx-auto text-center">
                <p className="text-slate-700 leading-relaxed text-lg">
                  United with Christ through the Holy Spirit Church is a vibrant community of believers
                  dedicated to spreading God's love and building lasting relationships centered on faith,
                  hope, and love.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  Founded on the principles of Christian fellowship and spiritual growth, our church
                  welcomes everyone seeking to deepen their relationship with Jesus Christ and find
                  their purpose in God's plan.
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center animate-scale-up [animation-delay:400ms] group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-400 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🙏</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4 gradient-text">Faith</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                We believe in the transformative power of faith in Jesus Christ and the guidance
                of the Holy Spirit in our daily lives.
              </p>
            </div>

            <div className="card p-8 text-center animate-scale-up [animation-delay:500ms] group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-electric to-cyan-400 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4 gradient-text">Community</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                We foster a welcoming environment where all members can grow together in love,
                support, and Christian fellowship.
              </p>
            </div>

            <div className="card p-8 text-center animate-scale-up [animation-delay:600ms] group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple to-pink-400 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">❤️</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4 gradient-text">Service</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                We are committed to serving our community and sharing God's love through acts
                of kindness and compassion.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="card p-12 text-center animate-fade-in [animation-delay:700ms] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-purple/5 to-electric/5"></div>
            <div className="relative">
              <h3 className="text-3xl font-serif font-bold text-primary mb-6 gradient-text">
                Join Our Faith Community
              </h3>
              <p className="text-slate-700 leading-relaxed text-xl mb-8 max-w-3xl mx-auto">
                Join us every Sunday for worship, fellowship, and spiritual growth as we journey
                together in faith and discover God's amazing plan for our lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-8 py-4">
                  Visit Our Dashboard
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}