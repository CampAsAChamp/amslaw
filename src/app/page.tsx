import { services, whyChooseUsFeatures } from "@/app/constants";

import CallToAction from "@/app/components/sections/CallToAction";
import FeatureCard from "@/app/components/cards/FeatureCard";
import HeroSection from "@/app/components/hero/HeroSection";
import SectionHeader from "@/app/components/sections/SectionHeader";
import ServiceCard from "@/app/components/cards/ServiceCard";

export default function Home() {
  return (
    <div className="bg-page">
      {/* Hero Section */}
      <HeroSection
        title="Protect Your Family's Future"
        subtitle="Expert legal services for wills, trusts, and estate planning. Secure your legacy with professional guidance you can trust."
        primaryButtonText="Free Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Our Services"
        secondaryButtonLink="/services"
        showLogo={true}
      />

      {/* Services Overview */}
      <section className="section-padding bg-surface-secondary">
        <div className="section-container">
          <SectionHeader
            title="Comprehensive Estate Planning Services"
            subtitle="We provide expert legal guidance to help you create a comprehensive estate plan that protects your assets and ensures your wishes are carried out."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                buttonText="Learn More"
                buttonLink="/services"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-surface">
        <div className="section-container">
          <SectionHeader
            title="Why Choose AMS Law?"
            subtitle="With years of experience in estate planning, we provide personalized service and expert guidance to protect what matters most to you."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to Protect Your Legacy?"
        subtitle="Don't wait to secure your family's future. Schedule a free consultation to discuss your estate planning needs."
        buttonText="Schedule Free Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}
