import ContactHero from "@/app/contact/ContactHero";
import ContactForm from "@/app/contact/ContactForm";
import ContactInfo from "@/app/contact/ContactInfo";
import MapSection from "@/app/contact/MapSection";

export default function Contact() {
  return (
    <div className="bg-page">
      <ContactHero />

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
