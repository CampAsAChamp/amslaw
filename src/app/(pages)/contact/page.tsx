import HeroSection from "@/app/components/hero/HeroSection"
import ContactForm from "@/app/(pages)/contact/ContactForm"
import ContactInfo from "./ContactInfo"
import MapSection from "./MapSection"

export default function Contact() {
  return (
    <div className="bg-page">
      <HeroSection
        title="Contact"
        subtitle="Ready to protect your family's future? Schedule a consultation to discuss your estate planning needs."
        primaryButtonText="Call (310) 792-7454"
        primaryButtonLink="tel:3107927454"
        secondaryButtonText="Schedule Appointment"
        secondaryButtonLink="https://schneiderlaw.cliogrow.com/book/23e33029a379134b415e1386768a136d"
      />

      <section className="py-20 bg-surface-secondary">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <MapSection />
    </div>
  )
}
