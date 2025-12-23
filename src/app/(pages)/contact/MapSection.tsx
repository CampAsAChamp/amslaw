import { contactInfo } from "@/app/data"
import { formatAddressSingleLine } from "@/utils"

export default function MapSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Visit My Office</h2>
          <p className="text-xl text-body max-w-3xl mx-auto mb-4">
            Conveniently located in Torrance, my office provides a comfortable and professional environment for your
            consultation.
          </p>
          <a
            href={contactInfo.maps.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-primary hover:text-primary-hover transition-colors hover:underline inline-block"
          >
            {formatAddressSingleLine(contactInfo.address)}
          </a>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg h-96">
          <iframe
            src={contactInfo.maps.embed}
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
  )
}
