"use client"

import { AnimatedCard } from "@/app/components/common"

interface ServiceDetailProps {
  icon: React.ReactNode
  title: string
  description: string
  sections: {
    heading?: string
    items: (string | React.ReactNode)[]
  }[]
  delay?: number
}

export default function ServiceDetail({ icon, title, description, sections, delay = 0 }: ServiceDetailProps) {
  return (
    <AnimatedCard delay={delay} animateOnMount={true}>
      <div className="text-primary-hover mb-6">{icon}</div>
      <h2 className="text-2xl font-bold text-heading mb-4">{title}</h2>
      <p className="text-body mb-6">{description}</p>

      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          {section.heading && <h3 className="text-lg font-semibold text-heading mb-3">{section.heading}</h3>}
          {section.items.length === 1 ? (
            <p className="text-body">{section.items[0]}</p>
          ) : (
            <ul className="text-body space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>• {item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </AnimatedCard>
  )
}
