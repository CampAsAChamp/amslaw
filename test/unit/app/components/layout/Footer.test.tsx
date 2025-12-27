import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import Footer from "@/app/components/layout/Footer"

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("Footer", () => {
  it("renders the footer", () => {
    render(<Footer />)

    const footer = screen.getByRole("contentinfo")
    expect(footer).toBeInTheDocument()
  })

  it("displays company name", () => {
    render(<Footer />)

    // Company name appears multiple times (heading and copyright)
    const companyNames = screen.getAllByText(/Anna M. Schneider Law/i)
    expect(companyNames.length).toBeGreaterThan(0)
  })

  it("renders navigation links", () => {
    render(<Footer />)

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Services/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument()
  })

  it("displays contact information", () => {
    render(<Footer />)

    expect(screen.getByText(/Phone:/i)).toBeInTheDocument()
    expect(screen.getByText(/Email:/i)).toBeInTheDocument()
  })

  it("displays office hours", () => {
    render(<Footer />)

    expect(screen.getByText(/Office Hours:/i)).toBeInTheDocument()
  })

  it("displays copyright notice with current year", () => {
    render(<Footer />)

    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it("includes legal disclaimer", () => {
    render(<Footer />)

    expect(screen.getByText(/informational purposes only/i)).toBeInTheDocument()
  })
})
