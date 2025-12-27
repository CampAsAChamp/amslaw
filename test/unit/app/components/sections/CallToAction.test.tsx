import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import CallToAction from "@/app/components/sections/CallToAction"

describe("CallToAction", () => {
  it("renders title and subtitle", () => {
    render(<CallToAction title="Test Title" subtitle="Test Subtitle" buttonText="Click" buttonLink="/test" />)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
  })

  it("renders button with correct text and link", () => {
    render(<CallToAction title="Test" subtitle="Test" buttonText="Contact Us" buttonLink="/contact" />)

    const button = screen.getByRole("link", { name: /Contact Us/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("href", "/contact")
  })

  it("renders with proper semantic structure", () => {
    const { container } = render(<CallToAction title="Test" subtitle="Test" buttonText="Click" buttonLink="/test" />)

    const section = container.querySelector("section")
    expect(section).toBeInTheDocument()
  })
})
