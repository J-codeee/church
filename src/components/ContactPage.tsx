export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-6">
            <span className="gradient-text">Connect With Us</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-accent via-purple to-electric rounded-full mx-auto mb-6"></div>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you and welcome you into our faith community
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="card p-8 text-center animate-scale-up [animation-delay:200ms] group">
            <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-400 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">⛪</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-3 gradient-text">Saturday Service</h3>
            <p className="text-slate-700 font-semibold mb-2">Every Saturday at 8:00 AM</p>
            <p className="text-slate-600 text-sm">Join us for worship and fellowship</p>
          </div>

          <div className="card p-8 text-center animate-scale-up [animation-delay:300ms] group">
            <div className="w-16 h-16 bg-gradient-to-r from-electric to-cyan-400 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">📍</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-3 gradient-text">Address</h3>
            <p className="text-slate-700 font-semibold mb-2">Esperanza, Sison, Pangasinan</p>
            <p className="text-slate-600 text-sm">Philippines</p>
          </div>

          <div className="card p-8 text-center animate-scale-up [animation-delay:400ms] group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple to-pink-400 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">📞</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-3 gradient-text">Phone</h3>
            <p className="text-slate-700 font-semibold mb-2">09260252017</p>
            <p className="text-slate-600 text-sm">Available for prayer and support</p>
          </div>

          <div className="card p-8 text-center animate-scale-up [animation-delay:500ms] group">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">✉️</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-3 gradient-text">Email</h3>
            <a
              href="mailto:jcohannzcordoviz76@gmail.com"
              className="text-slate-700 hover:text-gold transition-colors mb-2 block break-all text-sm sm:text-base font-semibold hover:underline"
            >
              jcohannzcordoviz76@gmail.com
            </a>
            <p className="text-slate-600 text-sm">We'd love to hear from you!</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* Get In Touch Section */}
          <div className="card p-12 animate-fade-in [animation-delay:600ms] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent/10 to-purple/10 rounded-full blur-2xl"></div>
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-purple rounded-full mb-6">
                <span className="text-2xl text-white">💬</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-8">
                <span className="gradient-text">Get In Touch</span>
              </h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-slate-700 leading-relaxed text-lg">
                  Whether you're looking for spiritual guidance, want to join our community, or have
                  questions about our services, we're here to help. Feel free to reach out to us
                  through any of the contact methods above.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  We welcome visitors and new members with open arms. Come as you are and experience
                  the love of Christ in our community.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button className="btn-primary text-lg px-8 py-4">
                  Join Our Community
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Learn More About Us
                </button>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="card p-10 animate-fade-in [animation-delay:700ms]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-electric to-cyan-400 rounded-full mb-4">
                <span className="text-2xl text-white">🗺️</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                <span className="gradient-text">Find Our Church</span>
              </h2>
              <p className="text-slate-700 text-lg">
                Located in the beautiful community of Esperanza, Sison, Pangasinan
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.5647477847754!2d120.65885231484243!3d15.919781688541748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3390d1c5a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sEsperanza%2C%20Sison%2C%20Pangasinan%2C%20Philippines!5e0!3m2!1sen!2sph!4v1640995200000!5m2!1sen!2sph"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-center mt-6">
              <a
                href="https://maps.app.goo.gl/vabn1hDXqezC542HA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric inline-flex items-center gap-3 text-lg px-8 py-4"
              >
                <span className="text-xl">📍</span>
                Get Directions to Our Church
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}