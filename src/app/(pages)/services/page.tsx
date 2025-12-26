import { FeatureCard, IconCard } from "@/app/components/common"
import HeroSection from "@/app/components/hero/HeroSection"
import CallToAction from "@/app/components/sections/CallToAction"
import SectionHeader from "@/app/components/sections/SectionHeader"
import { processSteps } from "@/app/data"

import { servicesData } from "./servicesData"

export default function Services() {
  return (
    <div className="bg-page">
      {/* Hero Section */}
      <HeroSection
        title="Comprehensive Legal Services"
        subtitle="Expert guidance for all your estate planning and probate needs. Protecting your family's future with professional legal services."
        primaryButtonText="Contact"
        primaryButtonLink="/contact"
      />

      {/* Main Services */}
      <section className="py-20 bg-surface-secondary">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {servicesData.map((service, index) => (
              <FeatureCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                sections={service.sections}
                delay={0.1 + index * 0.15}
                animateOnMount={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-surface">
        <div className="section-container">
          <SectionHeader
            title="My Process"
            subtitle="I make estate planning straightforward and understandable that ensures your documents are comprehensive and legally sound."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {processSteps.map((step, index) => (
              <IconCard
                key={index}
                stepNumber={step.stepNumber}
                icon={step.icon}
                title={step.title}
                description={step.description}
                showArrow={index < processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to Secure Your Legacy?"
        subtitle="Don't leave your family's future to chance. Schedule a consultation to discuss your estate planning needs today."
        buttonText="Contact"
        buttonLink="/contact"
      />
    </div>
  )
}
