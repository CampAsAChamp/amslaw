import CallToAction from "@/app/components/sections/CallToAction";
import HeroSection from "@/app/components/hero/HeroSection";
import AttorneyProfile from "@/app/about/AttorneyProfile";
import PhilosophySection from "@/app/about/PhilosophySection";
import ExperienceResults from "@/app/about/ExperienceResults";

export default function About() {
  return (
    <div className="bg-page">
      <HeroSection
        title="About AMS Law"
        subtitle="Dedicated to protecting your family's future with expert legal guidance and personalized estate planning solutions."
        primaryButtonText="Schedule Consultation"
        primaryButtonLink="/contact"
      />

      <AttorneyProfile />
      <PhilosophySection />
      <ExperienceResults />

      <CallToAction
        title="Ready to Work Together?"
        subtitle="Let's discuss how we can help protect your family's future. Schedule a free consultation to get started."
        buttonText="Schedule Free Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}
