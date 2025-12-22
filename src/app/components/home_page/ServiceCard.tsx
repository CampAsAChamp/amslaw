"use client"

import { motion } from "framer-motion"
import { ServiceCardProps } from "@/types"

export default function ServiceCard({ icon, title, description, features, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      className="card-base"
      initial={{ scaleX: 0.05, scaleY: 0.05, opacity: 0 }}
      whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: delay + 0.3,
        }}
      >
        <div className="text-primary-hover mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-heading mb-4">{title}</h3>
        <p className="text-body mb-6">{description}</p>
        <ul className="text-sm text-body space-y-2">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
