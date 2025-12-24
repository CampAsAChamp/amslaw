import Image from "next/image"
import { ExternalLink, Star } from "lucide-react"

import type { YelpReview } from "@/types/data"

interface YelpReviewCardProps {
  review: YelpReview
}

/**
 * YelpReviewCard Component
 * Displays an individual Yelp review with star rating, reviewer info, and review text
 *
 * @param review - The Yelp review data to display
 */
export default function YelpReviewCard({ review }: YelpReviewCardProps) {
  // Format the date
  const reviewDate = new Date(review.time_created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-primary fill-primary" : "text-muted"}`}
        aria-hidden="true"
      />
    ))
  }

  return (
    <div className="border-l-4 border-primary pl-6">
      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-3" role="img" aria-label={`${review.rating} star rating`}>
        {renderStars(review.rating)}
      </div>

      {/* Review Text */}
      <p className="text-body mb-4 italic">&ldquo;{review.text}&rdquo;</p>

      {/* Reviewer Info */}
      <div className="flex items-center gap-3 mb-3">
        {review.user.image_url && (
          <Image
            src={review.user.image_url}
            alt={`${review.user.name}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <div className="font-semibold text-heading">{review.user.name}</div>
          <div className="text-sm text-muted">{reviewDate}</div>
        </div>
      </div>

      {/* Read More Link */}
      <a
        href={review.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:text-primary-hover transition-colors text-sm font-medium"
      >
        Read full review on Yelp
        <ExternalLink className="w-3 h-3" aria-hidden="true" />
      </a>
    </div>
  )
}
