export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-center text-primary mb-12 relative">
          Contact Us
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gold rounded-full"></div>
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <h3 className="text-lg font-serif font-semibold text-primary mb-3">Sunday Service</h3>
            <p className="text-slate-600 mb-2">Every Sunday at 9:00 AM</p>
            <p className="text-slate-500 text-sm">Join us for worship and fellowship</p>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-lg font-serif font-semibold text-primary mb-3">Address</h3>
            <p className="text-slate-600 mb-2">123 Faith Avenue</p>
            <p className="text-slate-500 text-sm">Hope City, HC 12345</p>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-lg font-serif font-semibold text-primary mb-3">Phone</h3>
            <p className="text-slate-600 mb-2">(555) 123-PRAY</p>
            <p className="text-slate-500 text-sm">Available Monday - Friday</p>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-lg font-serif font-semibold text-primary mb-3">Email</h3>
            <p className="text-slate-600 mb-2">info@uchsc.org</p>
            <p className="text-slate-500 text-sm">We&apos;d love to hear from you!</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card p-8">
            <h2 className="text-2xl font-serif font-semibold text-center text-primary mb-6">
              Get In Touch
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Whether you&apos;re looking for spiritual guidance, want to join our community, or have
              questions about our services, we&apos;re here to help. Feel free to reach out to us
              through any of the contact methods above.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We welcome visitors and new members with open arms. Come as you are and experience
              the love of Christ in our community.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-serif font-semibold text-center text-primary mb-6">
              Find Us
            </h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.769839814324!2d121.02395631482563!3d14.56834198977534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b5f0d8e5d4a3%3A0x7c9a5b1a5a5a5a5a!2sQuezon%20City%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sph!4v1640995200000!5m2!1sen!2sph"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-center mt-4 text-slate-500 text-sm italic">
              Click on the map to get directions to our church
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}