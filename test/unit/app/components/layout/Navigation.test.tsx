import { TestWrapper } from "@test/unit/mocks"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import Navigation from "@/app/components/layout/Navigation"

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("Navigation", () => {
  it("renders the navigation bar", () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )

    const nav = screen.getByRole("navigation", { name: /Main navigation/i })
    expect(nav).toBeInTheDocument()
  })

  it("renders the logo with link to home", () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )

    const logo = screen.getByRole("link", { name: /Schneider Law home/i })
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("href", "/")
  })

  it("renders desktop navigation links", () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )

    // Check for navigation links (desktop) - use getAllByRole for links that appear multiple times
    const homeLinks = screen.getAllByRole("link", { name: /Home/i })
    expect(homeLinks.length).toBeGreaterThan(0)
    expect(screen.getByRole("link", { name: /Services/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument()
  })

  it("renders mobile menu button", () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )

    const menuButton = screen.getByRole("button", { name: /Open menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it("toggles mobile menu when button is clicked", async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )

    const menuButton = screen.getByRole("button", { name: /Open menu/i })

    // Click to open
    await user.click(menuButton)

    // After clicking, button label should change to "Close menu"
    const closeButton = screen.getByRole("button", { name: /Close menu/i })
    expect(closeButton).toBeInTheDocument()
  })

  it("renders theme toggle", () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    )

    const themeToggle = screen.getAllByRole("button", { name: /Switch to (dark|light) mode/i })
    expect(themeToggle.length).toBeGreaterThan(0)
  })
})
