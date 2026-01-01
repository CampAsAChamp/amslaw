"use client"

import { motion } from "framer-motion"

import { IconCardProps } from "@/types"
import { useInitialInView } from "@/utils"

/**
 * Simple icon with circle background
 */
function SimpleIcon({ icon }: { icon: React.ReactNode }) {
  return <div className="icon-circle">{icon}</div>
}

/**
 * Process step icon with numbered badge
 */
function ProcessStepIcon({ icon, stepNumber }: { icon: React.ReactNode; stepNumber: number }) {
  return (
    <div className="relative inline-flex justify-center items-center mb-4">
      <div className="bg-surface-tertiary w-20 h-20 rounded-full flex items-center justify-center text-primary">{icon}</div>
      <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-on-primary">{stepNumber}</span>
      </div>
    </div>
  )
}

/**
 * Arrows for process flows (responsive: down arrow on mobile, right arrow on desktop)
 */
function ProcessArrows({ animationDelay }: { animationDelay: number }) {
  return (
    <>
      {/* Down arrow for mobile */}
      <motion.div
        className="md:hidden flex-shrink-0 mt-2 mb-6"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
        viewport={{ once: true }}
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
  )
}

/**
 * IconCard - A reusable component for displaying simple icon + title + description items.
 * Supports optional step numbers and arrows for process flows.
 *
 * @component
 *
 * ## Usage
 *
 * ### Simple Icon Card
 * ```tsx
 * <IconCard
 *   icon={<CheckCircle className="w-8 h-8 text-primary-hover" />}
 *   title="Expert Guidance"
 *   description="Personalized attention for your unique situation"
 *   delay={0.35}
 * />
 * ```
 *
 * ### Process Step with Number and Arrow
 * ```tsx
 * <IconCard
 *   icon={<Handshake className="w-12 h-12" />}
 *   title="Initial Contact"
 *   description="I discuss your goals and assets"
 *   stepNumber={1}
 *   showArrow={true}
 * />
 * ```
 *
 * ## Props
 * @param {React.ReactNode} icon - Icon or SVG element to display
 * @param {string} title - Card title/heading
 * @param {string} description - Card description text
 * @param {number} [stepNumber] - Optional step number to display as badge on icon
 * @param {boolean} [showArrow=false] - Whether to show arrow (for process flows)
 * @param {number} [delay] - Animation delay in seconds. If stepNumber is provided, auto-calculates delay
 *
 * ## Behavior
 * - Centers icon with circle background
 * - If stepNumber provided, displays numbered badge and calculates delay automatically
 * - If showArrow is true, displays arrows between steps (responsive: down on mobile, right on desktop)
 */
export default function IconCard({ icon, title, description, stepNumber, showArrow = false, delay }: IconCardProps) {
  const { ref, getViewportConfig } = useInitialInView()

  // Determine if this is a process step (has step number)
  const hasStepNumber = stepNumber !== undefined

  // Calculate animation delay
  // For process steps: base delay (0.35s) + stagger interval (0.2s per step)
  // For simple icons: use provided delay or default to 0
  let animationDelay = 0
  if (hasStepNumber) {
    const baseDelay = 0.35 // Allow SectionHeader to animate first
    const staggerInterval = 0.2 // Delay between each step
    animationDelay = baseDelay + (stepNumber - 1) * staggerInterval
  } else {
    animationDelay = delay || 0
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <motion.div
        ref={ref}
        className="text-center flex-1"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={getViewportConfig()}
        transition={{
          duration: 0.5,
          delay: animationDelay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {hasStepNumber ? <ProcessStepIcon icon={icon} stepNumber={stepNumber} /> : <SimpleIcon icon={icon} />}
        <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>
        <p className="text-body">{description}</p>
      </motion.div>

      {showArrow && <ProcessArrows animationDelay={animationDelay} />}
    </div>
  )
}
