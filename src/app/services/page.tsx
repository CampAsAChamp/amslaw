import CallToAction from "@/app/components/sections/CallToAction";
import HeroSection from "@/app/components/hero/HeroSection";
import ProcessStep from "@/app/services/ProcessStep";
import SectionHeader from "@/app/components/sections/SectionHeader";
import ServiceDetail from "./ServiceDetail";
import { processSteps } from "@/app/constants";
import { servicesData } from "./servicesData";

export default function Services() {
  return (
    <div className="bg-page">
      {/* Hero Section */}
      <HeroSection
        title="Comprehensive Legal Services"
        subtitle="Expert guidance for all your estate planning and probate needs. Protecting your family&apos;s future with professional legal services."
        primaryButtonText="Consultation"
        primaryButtonLink="/contact"
      />

      {/* Main Services */}
      <section className="py-20 bg-surface-secondary">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {servicesData.map((service, index) => (
              <ServiceDetail
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                sections={service.sections}
                buttonText={service.buttonText}
                buttonLink={service.buttonLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-surface">
        <div className="section-container">
          <SectionHeader
            title="Our Simple Process"
            subtitle="We make estate planning straightforward and stress-free with our proven process that ensures your documents are comprehensive and legally sound."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to Secure Your Legacy?"
        subtitle="Don&apos;t leave your family&apos;s future to chance. Schedule a consultation to discuss your estate planning needs today."
        buttonText="Schedule Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}
