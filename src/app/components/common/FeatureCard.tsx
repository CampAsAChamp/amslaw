"use client"

import { motion } from "framer-motion"

import { FeatureCardProps } from "@/types"

/**
 * FeatureCard - A reusable card component for displaying services with features lists or detailed sections.
 * Always renders as a card with shadow (card-base styling).
 *
 * @component
 *
 * ## Usage
 *
 * ### Service Card with Features List
 * ```tsx
 * <FeatureCard
 *   icon={<FileText className="w-12 h-12 text-primary-hover" />}
 *   title="Estate Planning"
 *   description="Comprehensive planning to protect your assets"
 *   features={[
 *     "Living Trusts",
 *     "Pour-Over Wills",
 *     "Healthcare Directives"
 *   ]}
 *   delay={0.35}
 * />
 * ```
 *
 * ### Detailed Service Card with Sections
 * ```tsx
 * <FeatureCard
 *   icon={<FileSignature className="w-16 h-16" />}
 *   title="Wills & Testaments"
 *   description="Foundation of estate planning"
 *   sections={[
 *     { heading: "What I Include:", items: ["Last Will", "Asset Planning"] },
 *     { heading: "Benefits:", items: ["Control", "Protection"] }
 *   ]}
 *   delay={0.1}
 *   animateOnMount={true}
 * />
 * ```
 *
 * ## Props
 * @param {React.ReactNode} icon - Icon or SVG element to display
 * @param {string} title - Card title/heading
 * @param {string} description - Card description text
 * @param {string[]} [features] - Optional array of feature items to display as bulleted list
 * @param {Array} [sections] - Optional array of sections with optional headings and items (strings or React nodes)
 * @param {number} [delay=0] - Animation delay in seconds
 * @param {boolean} [animateOnMount=false] - If true, animates on mount instead of on scroll
 *
 * ## Behavior
 * - **With sections:** Renders sections with optional headings and items
 * - **With features:** Renders simple bulleted feature list
 * - Both variants use card-base styling (white background, padding, shadow)
 * - Sections take priority over features if both are provided
 */
export default function FeatureCard({
  icon,
  title,
  description,
  features,
  sections,
  delay = 0,
  animateOnMount = false,
}: FeatureCardProps) {
  const hasSections = sections && sections.length > 0

  // Sections rendering (detailed services page)
  if (hasSections) {
    return (
      <motion.div
        className="card-base"
        initial={{ opacity: 0, y: 30 }}
        animate={animateOnMount ? { opacity: 1, y: 0 } : undefined}
        whileInView={!animateOnMount ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
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
    )
  }

  // Features rendering (services overview on homepage)
  return (
    <motion.div
      className="card-base"
      initial={{ opacity: 0, y: 30 }}
      animate={animateOnMount ? { opacity: 1, y: 0 } : undefined}
      whileInView={!animateOnMount ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <div className="text-primary-hover mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-heading mb-4">{title}</h3>
      <p className="text-body mb-6">{description}</p>
      {features && features.length > 0 && (
        <ul className="text-sm text-body space-y-2">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
