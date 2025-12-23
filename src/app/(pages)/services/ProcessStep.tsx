"use client"

import { motion } from "framer-motion"
import { ProcessStepProps } from "@/types"

export default function ProcessStep({ stepNumber, icon, title, description, showArrow = false }: ProcessStepProps) {
  // Base delay to allow SectionHeader to animate in first
  const baseDelay = 0.35
  // Calculate delay based on step number (0.2s between each step)
  const animationDelay = baseDelay + (stepNumber - 1) * 0.2

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <motion.div
        className="text-center flex-1"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay: animationDelay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        <div className="relative inline-flex justify-center items-center mb-4">
          <div className="bg-surface-tertiary w-20 h-20 rounded-full flex items-center justify-center text-primary">
            {icon}
          </div>
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-on-primary">{stepNumber}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>
        <p className="text-body">{description}</p>
      </motion.div>

      {showArrow && (
        <>
          {/* Down arrow for mobile */}
          <motion.div
            className="md:hidden flex-shrink-0 mt-2 mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.4,
              delay: animationDelay + 0.3,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>

          {/* Right arrow for desktop */}
          <motion.div
            className="hidden md:block flex-shrink-0"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.4,
              delay: animationDelay + 0.3,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.div>
        </>
      )}
    </div>
  )
}
