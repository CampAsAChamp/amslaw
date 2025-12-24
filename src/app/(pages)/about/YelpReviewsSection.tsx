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
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium"
        >
          View our reviews on Yelp
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {reviews.map((review) => (
          <YelpReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Yelp Attribution and Link */}
      <div className="text-center pt-6 border-t border-surface-tertiary">
        <a
          href={YELP_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium"
        >
          View all reviews on Yelp
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
