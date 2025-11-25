export default function MapSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Visit Our Office
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Located in the heart of downtown, our office provides a comfortable and 
            professional environment for your consultation.
          </p>
        </div>

        <div className="bg-surface-tertiary h-96 rounded-lg flex items-center justify-center">
          <div className="text-center text-muted">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <p className="text-lg font-semibold">Interactive Map</p>
            <p className="text-sm">123 Legal Street, Suite 100, Your City, ST 12345</p>
          </div>
        </div>
      </div>
    </section>
  );
}

