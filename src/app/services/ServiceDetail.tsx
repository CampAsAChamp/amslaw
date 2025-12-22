"use client"

import { motion } from "framer-motion"

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
  const cardVariants = {
    initial: {
      scaleX: 0.05,
      scaleY: 0.05,
      opacity: 0,
    },
    animate: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    },
  }

  const contentVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <motion.div
      className="card"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay,
      }}
    >
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.4,
          delay: delay + 0.3,
        }}
      >
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
      </motion.div>
    </motion.div>
  )
}
