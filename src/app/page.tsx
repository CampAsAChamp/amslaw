import { FeatureCard, IconCard } from "@/app/components/common"
import HeroSection from "@/app/components/hero/HeroSection"
import CallToAction from "@/app/components/sections/CallToAction"
import SectionHeader from "@/app/components/sections/SectionHeader"

import { services, whyChooseUsFeatures } from "./data"

export default function Home() {
  return (
    <div className="bg-page">
      <HeroSection
        title="Protect Your Family's Future"
        subtitle="Expert legal services for wills, trusts, and estate planning. Secure your legacy with professional guidance you can trust."
        primaryButtonText="Contact"
        primaryButtonLink="/contact"
        secondaryButtonText="Services"
        secondaryButtonLink="/services"
        showLogo={true}
      />

      {/* Services Overview */}
      <section className="section-padding bg-surface-secondary">
        <div className="section-container">
          <SectionHeader
            title="Comprehensive Estate Planning Services"
            subtitle="I provide expert legal guidance to help you create a comprehensive estate plan that protects your assets and ensures your wishes are carried out."
            delay={0}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FeatureCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                delay={0.35 + index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-surface">
        <div className="section-container">
          <SectionHeader
            title="Why Choose Anna M. Schneider Law?"
            subtitle="With years of experience in estate planning, I provide personalized service and expert guidance to protect what matters most to you."
            delay={0}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsFeatures.map((feature, index) => (
              <IconCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.35 + index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to Protect Your Legacy?"
        subtitle="Don't wait to secure your family's future. Schedule a consultation to discuss your estate planning needs."
        buttonText="Contact"
        buttonLink="/contact"
      />
    </div>
  )
}
