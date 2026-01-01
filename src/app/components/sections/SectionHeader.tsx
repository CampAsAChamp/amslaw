"use client"

import { motion } from "framer-motion"

import { SectionHeaderProps } from "@/types"
import { useInitialInView } from "@/utils"

export default function SectionHeader({ title, subtitle, className = "", delay = 0, subtitleDelay }: SectionHeaderProps) {
  const { ref, getViewportConfig } = useInitialInView()

  const textVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  // If subtitleDelay is not provided, use delay + 0.15 for backward compatibility
  const actualSubtitleDelay = subtitleDelay !== undefined ? subtitleDelay : delay + 0.15

  return (
    <div ref={ref} className={`text-center mb-16 ${className}`}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-heading mb-4"
        variants={textVariants}
        initial="initial"
        whileInView="animate"
        viewport={getViewportConfig()}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: delay,
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-xl text-body max-w-3xl mx-auto"
          variants={textVariants}
          initial="initial"
          whileInView="animate"
          viewport={getViewportConfig()}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: actualSubtitleDelay,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
