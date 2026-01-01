"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  /**
   * If true, uses 'animate' instead of 'whileInView' for immediate animation
   * Used for content that should animate on mount rather than on scroll
   */
  animateOnMount?: boolean
}

export default function AnimatedContainer({ children, className = "card", delay = 0, animateOnMount = false }: AnimatedContainerProps) {
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

  const cardAnimationProps = animateOnMount
    ? {
        initial: "initial" as const,
        animate: "animate" as const,
      }
    : {
        initial: "initial" as const,
        whileInView: "animate" as const,
        viewport: { once: true, amount: 0.1 },
      }

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      {...cardAnimationProps}
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
        {children}
      </motion.div>
    </motion.div>
  )
}
