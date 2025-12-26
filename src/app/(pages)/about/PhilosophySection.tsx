"use client"

import { IconCard } from "@/app/components/common"
import SectionHeader from "@/app/components/sections/SectionHeader"
import { philosophyFeatures } from "@/app/data"

export default function PhilosophySection() {
  return (
    <section className="section-padding bg-surface">
      <div className="section-container">
        <SectionHeader
          title="My Philosophy"
          subtitle="I believe that estate planning is about more than just legal documents—it's about protecting the people and values you hold most dear."
          delay={0}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyFeatures.map((feature, index) => (
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
  )
}
