"use client"

import { motion } from "framer-motion"

import { SectionHeaderProps } from "@/types"

export default function SectionHeader({ title, subtitle, className = "", delay = 0 }: SectionHeaderProps) {
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

  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-heading mb-4"
        variants={textVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: delay + 0.15,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
