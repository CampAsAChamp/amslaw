import { philosophyFeatures } from "@/app/constants";
import FeatureCard from "@/app/components/cards/FeatureCard";

export default function PhilosophySection() {
  return (
    <section className="section-padding bg-surface">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Our Philosophy
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            We believe that estate planning is about more than just legal documents—it&apos;s about 
            protecting the people and values you hold most dear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyFeatures.map((feature, index) => (
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
  );
}
