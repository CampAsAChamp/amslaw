"use client"

import { philosophyFeatures } from "@/app/data"
import FeatureCard from "@/app/components/cards/FeatureCard"
import { motion } from "framer-motion"

export default function PhilosophySection() {
  return (
    <section className="section-padding bg-surface">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-heading mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            My Philosophy
          </motion.h2>
          <motion.p
            className="text-xl text-body max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            I believe that estate planning is about more than just legal documents—it&apos;s about protecting the people
            and values you hold most dear.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.35 + index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
