import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ContactInfo from "@/app/(pages)/contact/ContactInfo"

describe("ContactInfo", () => {
  it("renders office information section", () => {
    render(<ContactInfo />)

    expect(screen.getByText(/Office Information/i)).toBeInTheDocument()
  })

  it("displays address information", () => {
    render(<ContactInfo />)

    expect(screen.getByText(/Address/i)).toBeInTheDocument()
    expect(screen.getByText(/Torrance/i)).toBeInTheDocument()
  })

  it("displays phone number with copy button", () => {
    render(<ContactInfo />)

    expect(screen.getByText(/Phone/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Copy phone number/i })).toBeInTheDocument()
  })

  it("displays email with copy button", () => {
    render(<ContactInfo />)

    expect(screen.getByText(/Email/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Copy email address/i })).toBeInTheDocument()
  })

  it("displays office hours", () => {
    render(<ContactInfo />)

    expect(screen.getByText(/Office Hours/i)).toBeInTheDocument()
  })

  it("displays what to expect section", () => {
    render(<ContactInfo />)

    expect(screen.getByText(/What to Expect/i)).toBeInTheDocument()
  })

  it("renders phone link with tel: protocol", () => {
    render(<ContactInfo />)

    const phoneLink = screen.getByRole("link", { name: /\(\d{3}\) \d{3}-\d{4}/i })
    expect(phoneLink).toHaveAttribute("href", expect.stringContaining("tel:"))
  })

  it("renders email link with mailto: protocol", () => {
    render(<ContactInfo />)

    const emailLink = screen.getByRole("link", { name: /@/i })
    expect(emailLink).toHaveAttribute("href", expect.stringContaining("mailto:"))
  })
})
