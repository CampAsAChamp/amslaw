"use client"

import { motion } from "framer-motion"

interface EducationItem {
  degree: string
  institution: string
}

interface EducationCardProps {
  items: EducationItem[]
  delay?: number
}

export default function EducationCard({ items, delay = 0 }: EducationCardProps) {
  return (
    <motion.div
      className="card-info"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <h3 className="text-xl font-semibold text-heading mb-4">Education</h3>
      <ul className="space-y-2 text-body">
        {items.map((item, index) => (
          <li key={index}>
            • {item.degree} - {item.institution}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
