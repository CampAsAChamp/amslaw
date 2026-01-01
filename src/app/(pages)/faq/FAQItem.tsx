"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { answerAnimation, answerTransition, chevronTransition } from "./animationConfig"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showTextActive, setShowTextActive] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleClick = () => {
    // Clear text active state and hover immediately when closing
    if (isOpen) {
      setShowTextActive(false)
      setIsHovered(false)
      setIsClosing(true)
      // Reset closing state after animation completes
      setTimeout(() => {
        setIsClosing(false)
      }, 300)
    }
    onToggle()
  }

  const handleMouseEnter = () => {
    if (!isClosing) {
      setIsHovered(true)
      setShowTextActive(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowTextActive(false)
  }

  return (
    <motion.div
      className="rounded-lg overflow-hidden bg-surface"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        boxShadow: isOpen
          ? "0 0 0 2px rgba(0, 174, 239, 1)"
          : isClosing
            ? "0 0 0 2px rgba(0, 174, 239, 0)"
            : isHovered
              ? "0 0 0 1px rgba(0, 174, 239, 0.4)"
              : "0 0 0 0 rgba(0, 174, 239, 0)",
      }}
      transition={{
        boxShadow: {
          duration: isHovered && !isOpen && !isClosing ? 0 : 0.3,
          ease: "easeInOut",
        },
      }}
    >
      <button
        onClick={handleClick}
        className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3
          className={`font-semibold text-lg pr-4 ${
            isOpen ? "faq-link-wipe faq-link-wipe-active" : showTextActive ? "faq-link-wipe faq-link-wipe-active" : "faq-link-wipe"
          }`}
        >
          {question}
        </h3>
        <motion.svg
          className="w-6 h-6 text-primary flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={chevronTransition}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            variants={answerAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={answerTransition}
          >
            <div className="px-6 py-4">
              <p className="text-body leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
