import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ExperienceResults from "@/app/(pages)/about/ExperienceResults"
import { yelpReviews } from "@/app/data"

describe("ExperienceResults", () => {
  it("renders the experience and results section", () => {
    render(<ExperienceResults reviews={yelpReviews} />)

    // Check that the section heading renders
    expect(screen.getByText("Experience & Results")).toBeInTheDocument()
  })

  it("displays reviews when provided", () => {
    render(<ExperienceResults reviews={yelpReviews} />)

    // Check that reviews are displayed
    yelpReviews.forEach((review) => {
      expect(screen.getByText(review.user.name)).toBeInTheDocument()
    })
  })

  it("renders with proper structure", () => {
    const { container } = render(<ExperienceResults reviews={yelpReviews} />)

    const section = container.querySelector("section")
    expect(section).toBeInTheDocument()
  })
})
