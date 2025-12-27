import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import PhilosophySection from "@/app/(pages)/about/PhilosophySection"

describe("PhilosophySection", () => {
  it("renders the philosophy section", () => {
    render(<PhilosophySection />)

    // Check for heading
    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it("displays philosophy content", () => {
    const { container } = render(<PhilosophySection />)

    // Check for section element
    const section = container.querySelector("section")
    expect(section).toBeInTheDocument()
  })

  it("renders with proper semantic structure", () => {
    const { container } = render(<PhilosophySection />)

    const section = container.querySelector("section")
    expect(section).toBeInTheDocument()
  })
})
