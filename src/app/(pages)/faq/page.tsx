import CallToAction from "@/app/components/sections/CallToAction"
import HeroSection from "@/app/components/hero/HeroSection"
import FAQSection from "@/app/(pages)/faq/FAQSection"

export default function FAQ() {
  return (
    <div className="bg-page">
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about estate planning, living trusts, and wills."
        primaryButtonText="Contact Us"
        primaryButtonLink="/contact"
      />

      <FAQSection />

      <CallToAction
        title="Still Have Questions?"
        subtitle="I'm here to help. Schedule a consultation to discuss your specific estate planning needs."
        buttonText="Contact"
        buttonLink="/contact"
      />
    </div>
  )
}
