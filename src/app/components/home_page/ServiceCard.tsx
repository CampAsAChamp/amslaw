"use client"

import { AnimatedCard } from "@/app/components/ui"
import { ServiceCardProps } from "@/types"

export default function ServiceCard({ icon, title, description, features, delay = 0 }: ServiceCardProps) {
  return (
    <AnimatedCard className="card-base" delay={delay} animateOnMount={false}>
      <div className="text-primary-hover mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-heading mb-4">{title}</h3>
      <p className="text-body mb-6">{description}</p>
      <ul className="text-sm text-body space-y-2">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </AnimatedCard>
  )
}
