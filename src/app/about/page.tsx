import CallToAction from "@/app/components/sections/CallToAction"
import HeroSection from "@/app/components/hero/HeroSection"
import AttorneyProfile from "@/app/about/AttorneyProfile"
import PhilosophySection from "@/app/about/PhilosophySection"
import ExperienceResults from "@/app/about/ExperienceResults"

export default function About() {
  return (
    <div className="bg-page">
      <HeroSection
        title="About Anna Schneider"
        subtitle="Dedicated to protecting your family's future with expert legal guidance and personalized estate planning solutions."
        primaryButtonText="Contact"
        primaryButtonLink="/contact"
      />

      <AttorneyProfile />
      <PhilosophySection />
      <ExperienceResults />

      <CallToAction
        title="Ready to Work Together?"
        subtitle="Let's discuss how I can help protect your family's future. Schedule a consultation to get started."
        buttonText="Contact"
        buttonLink="/contact"
      />
    </div>
  )
}
