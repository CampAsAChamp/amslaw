import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import SectionHeader from "@/app/components/sections/SectionHeader"

// Note: SectionHeader uses framer-motion which is handled by vitest config

describe("SectionHeader", () => {
  it("renders title and subtitle", () => {
    render(<SectionHeader title="Test Title" subtitle="Test Subtitle" />)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
  })

  it("renders only title when subtitle is not provided", () => {
    render(<SectionHeader title="Test Title" />)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
  })

  it("renders with proper heading level", () => {
    render(<SectionHeader title="Test Title" subtitle="Test Subtitle" />)

    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("Test Title")
  })
})
