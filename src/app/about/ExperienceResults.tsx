import { stats, testimonials } from "@/app/data";
import StatsCard from "@/app/about/StatsCard";
import TestimonialCard from "@/app/about/TestimonialCard";

export default function ExperienceResults() {
  return (
    <section className="py-20 bg-surface-secondary">
      <div className="container-page">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Experience & Results
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            I have helped hundreds of families 
            transfer their assets and secure their legacies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold text-heading mb-6 text-center">
            What My Clients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

