export default function MapSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Visit Our Office
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Conveniently located in San Diego, our office provides a comfortable and 
            professional environment for your consultation.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg h-96">
          <iframe
            src="https://maps.google.com/maps?q=7535%20Torrey%20Santa%20Fe%20Rd.%20San%20Diego,%20CA%2092129&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Anna M Schneider Law Office Location"
          />
        </div>
      </div>
    </section>
  );
}

