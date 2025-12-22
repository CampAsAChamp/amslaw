"use client"

import { StatsCardProps } from "@/types"
import { useEffect, useRef } from "react"
import { useMotionValue, useTransform, animate, motion, useInView } from "framer-motion"

export default function StatsCard({ number, label }: StatsCardProps) {
  // Parse the number and any suffix (like "+")
  const numericValue = parseInt(number.replace(/\D/g, ""), 10) || 0
  const suffix = number.replace(/[\d]/g, "")

  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayValue = useTransform(rounded, (latest) => `${latest}${suffix}`)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: "easeOut",
      })

      return controls.stop
    }
  }, [isInView, count, numericValue])

  return (
    <div ref={ref} className="text-center">
      <motion.div className="text-4xl font-bold text-primary-hover mb-2">{displayValue}</motion.div>
      <div className="text-body">{label}</div>
    </div>
  )
}
