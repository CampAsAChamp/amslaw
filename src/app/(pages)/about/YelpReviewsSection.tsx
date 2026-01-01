"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

import type { YelpReview } from "@/types/data"
import YelpReviewCard from "@/app/(pages)/about/YelpReviewCard"

const YELP_BUSINESS_URL = "https://www.yelp.com/biz/anna-m-schneider-torrance"

interface YelpReviewsSectionProps {
  reviews: YelpReview[]
}

/**
 * YelpReviewsSection Component
 * Displays Yelp reviews (passed as props from server-side fetch)
 *
 * @param reviews - Array of Yelp reviews fetched server-side
 */
export default function YelpReviewsSection({ reviews }: YelpReviewsSectionProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted mb-4">No reviews available at this time</p>
        <a
          href={YELP_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 text-primary hover:text-primary-hover transition-colors font-medium group"
        >
          <Image src="/yelp-logo.svg" alt="Yelp" width={24} height={24} className="w-6 h-6 transition-opacity group-hover:opacity-80" />
          <span className="flex items-center gap-2">
            View our reviews on Yelp
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <YelpReviewCard review={review} />
          </motion.div>
        ))}
      </div>

      {/* Yelp Attribution and Link */}
      <div className="text-center pt-6 border-t border-surface-tertiary">
        <a
          href={YELP_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 text-primary hover:text-primary-hover transition-colors font-medium group"
        >
          <Image src="/yelp-logo.svg" alt="Yelp" width={24} height={24} className="w-6 h-6 transition-opacity group-hover:opacity-80" />
          <span className="flex items-center gap-2">
            View all reviews on Yelp
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  )
}
