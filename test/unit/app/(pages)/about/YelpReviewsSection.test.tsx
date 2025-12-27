import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import YelpReviewsSection from "@/app/(pages)/about/YelpReviewsSection"
import { yelpReviews } from "@/app/data"

describe("YelpReviewsSection", () => {
  it("renders the reviews section", () => {
    render(<YelpReviewsSection reviews={yelpReviews} />)

    // YelpReviewsSection doesn't have a title - it just renders reviews
    // The title is added by the parent component (ExperienceResults)
    expect(screen.getByText(yelpReviews[0].user.name)).toBeInTheDocument()
  })

  it("displays all provided reviews", () => {
    render(<YelpReviewsSection reviews={yelpReviews} />)

    // Check that review cards are rendered
    yelpReviews.forEach((review) => {
      expect(screen.getByText(review.user.name)).toBeInTheDocument()
    })
  })

  it("renders link to Yelp page", () => {
    render(<YelpReviewsSection reviews={yelpReviews} />)

    const yelpLink = screen.getByRole("link", { name: /View all reviews on Yelp/i })
    expect(yelpLink).toBeInTheDocument()
    expect(yelpLink).toHaveAttribute("href", expect.stringContaining("yelp.com"))
  })

  it("handles empty reviews array gracefully", () => {
    const { container } = render(<YelpReviewsSection reviews={[]} />)

    expect(container).toBeInTheDocument()
  })
})
