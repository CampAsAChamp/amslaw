import { TestWrapper } from "@test/unit/mocks"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import HeroSection from "@/app/components/hero/HeroSection"

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("HeroSection", () => {
  it("renders title and subtitle", () => {
    render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        primaryButtonText="Get Started"
        primaryButtonLink="/contact"
      />
    )

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
  })

  it("renders primary button when provided", () => {
    render(<HeroSection title="Test" subtitle="Test" primaryButtonText="Contact" primaryButtonLink="/contact" />)

    const button = screen.getByRole("link", { name: /Contact/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("href", "/contact")
  })

  it("renders secondary button when provided", () => {
    render(
      <HeroSection
        title="Test"
        subtitle="Test"
        primaryButtonText="Contact"
        primaryButtonLink="/contact"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
      />
    )

    const button = screen.getByRole("link", { name: /Learn More/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("href", "/about")
  })

  it("renders logo when showLogo is true", () => {
    render(
      <TestWrapper>
        <HeroSection
          title="Test"
          subtitle="Test"
          primaryButtonText="Contact"
          primaryButtonLink="/contact"
          showLogo={true}
        />
      </TestWrapper>
    )

    const logo = screen.getByRole("img", { name: /Schneider Law/i })
    expect(logo).toBeInTheDocument()
  })

  it("does not render logo when showLogo is false", () => {
    render(
      <HeroSection
        title="Test"
        subtitle="Test"
        primaryButtonText="Contact"
        primaryButtonLink="/contact"
        showLogo={false}
      />
    )

    const logo = screen.queryByRole("img", { name: /Schneider Law/i })
    expect(logo).not.toBeInTheDocument()
  })

  it("renders with only primary button", () => {
    render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        primaryButtonText="Contact"
        primaryButtonLink="/contact"
      />
    )

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Contact/i })).toBeInTheDocument()
  })
})
