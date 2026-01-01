"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import FAQItem from "@/app/(pages)/faq/FAQItem"
import { faqCategories } from "@/app/data"

export default function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>([])

  const toggleFAQ = (id: string) => {
    setOpenIds((prevOpenIds) => (prevOpenIds.includes(id) ? prevOpenIds.filter((openId) => openId !== id) : [...prevOpenIds, id]))
  }

  // Animation variants for category sections
  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      },
    },
  }

  // Animation variants for FAQ items container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  // Animation variants for individual FAQ items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={categoryVariants}
            >
              <h2 className="text-heading text-2xl font-bold mb-6 pb-2 border-b-2 border-primary flex items-center gap-3">
                {category.icon}
                <span>{category.title}</span>
              </h2>
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
              >
                {category.faqs.map((faq) => (
                  <motion.div key={faq.id} variants={itemVariants}>
                    <FAQItem
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIds.includes(faq.id)}
                      onToggle={() => toggleFAQ(faq.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
