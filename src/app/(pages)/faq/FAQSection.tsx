"use client"

import { useState } from "react"
import FAQItem from "@/app/(pages)/faq/FAQItem"
import { faqCategories } from "@/app/data"

export default function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>([])

  const toggleFAQ = (id: string) => {
    setOpenIds((prevOpenIds) =>
      prevOpenIds.includes(id) ? prevOpenIds.filter((openId) => openId !== id) : [...prevOpenIds, id]
    )
  }

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-heading text-2xl font-bold mb-6 pb-2 border-b-2 border-primary flex items-center gap-3">
                {category.icon}
                <span>{category.title}</span>
              </h2>
              <div className="space-y-4">
                {category.faqs.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIds.includes(faq.id)}
                    onToggle={() => toggleFAQ(faq.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
