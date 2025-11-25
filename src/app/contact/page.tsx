import HeroSection from "@/app/components/hero/HeroSection";
import ContactForm from "@/app/components/forms/ContactForm";
import ContactInfo from "@/app/contact/ContactInfo";
import MapSection from "@/app/contact/MapSection";

export default function Contact() {
  return (
    <div className="bg-page">
      <HeroSection 
        title="Contact Us"
        subtitle="Ready to protect your family's future? Schedule a consultation to discuss your estate planning needs."
        primaryButtonText="Call (555) 123-4567"
        primaryButtonLink="tel:5551234567"
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
  );
}
