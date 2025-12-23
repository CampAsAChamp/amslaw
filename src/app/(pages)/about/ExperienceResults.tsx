"use client"

import { stats, testimonials } from "@/app/data"
import StatsCard from "@/app/(pages)/about/StatsCard"
import TestimonialCard from "@/app/(pages)/about/TestimonialCard"
import SectionHeader from "@/app/components/sections/SectionHeader"
import { motion } from "framer-motion"

export default function ExperienceResults() {
  return (
    <section className="py-20 bg-surface-secondary">
      <div className="container-page">
        <SectionHeader
          title="Experience & Results"
          subtitle="I have helped hundreds of families transfer their assets and secure their legacies."
          delay={0}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} number={stat.number} label={stat.label} />
          ))}
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <h3 className="text-2xl font-bold text-heading mb-6 text-center">What My Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} quote={testimonial.quote} author={testimonial.author} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
