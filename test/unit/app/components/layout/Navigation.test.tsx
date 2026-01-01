import { renderWithTheme } from "@test/unit/helpers/helpers"
import { createUserEvent, mockNextNavigation } from "@test/unit/helpers/mocks"
import { screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import Navigation from "@/app/components/layout/Navigation"

// Mock next/navigation
vi.mock("next/navigation", () => mockNextNavigation("/"))

describe("Navigation", () => {
  it("renders the navigation bar", () => {
    renderWithTheme(<Navigation />)

    const nav = screen.getByRole("navigation", { name: /Main navigation/i })
    expect(nav).toBeInTheDocument()
  })

  it("renders the logo with link to home", () => {
    renderWithTheme(<Navigation />)

    const logo = screen.getByRole("link", { name: /Schneider Law home/i })
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("href", "/")
  })

  it("renders desktop navigation links", () => {
    renderWithTheme(<Navigation />)

    const homeLinks = screen.getAllByRole("link", { name: /Home/i })
    expect(homeLinks.length).toBeGreaterThan(0)
    expect(screen.getByRole("link", { name: /Services/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument()
  })

  it("renders mobile menu button", () => {
    renderWithTheme(<Navigation />)

    const menuButton = screen.getByRole("button", { name: /Open menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it("toggles mobile menu when button is clicked", async () => {
    const user = await createUserEvent()
    renderWithTheme(<Navigation />)

    const menuButton = screen.getByRole("button", { name: /Open menu/i })
    await user.click(menuButton)

    const closeButton = screen.getByRole("button", { name: /Close menu/i })
    expect(closeButton).toBeInTheDocument()
  })

  it("renders theme toggle", () => {
    renderWithTheme(<Navigation />)

    const themeToggle = screen.getAllByRole("button", { name: /Switch to (dark|light) mode/i })
    expect(themeToggle.length).toBeGreaterThan(0)
  })
})
