import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import MapSection from "@/app/(pages)/contact/MapSection"

describe("MapSection", () => {
  it("renders the map section", () => {
    render(<MapSection />)

    expect(screen.getByText(/Visit My Office/i)).toBeInTheDocument()
  })

  it("displays office location description", () => {
    render(<MapSection />)

    expect(screen.getByText(/Conveniently located in Torrance/i)).toBeInTheDocument()
  })

  it("renders address link", () => {
    render(<MapSection />)

    const addressLink = screen.getByRole("link", { name: /Hawthorne/i })
    expect(addressLink).toBeInTheDocument()
    expect(addressLink).toHaveAttribute("href", expect.stringContaining("google.com/maps"))
  })

  it("renders embedded map iframe", () => {
    render(<MapSection />)

    const iframe = screen.getByTitle(/Anna M Schneider Law Office Location/i)
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute("src", expect.stringContaining("google.com/maps/embed"))
  })

  it("iframe has proper accessibility attributes", () => {
    render(<MapSection />)

    const iframe = screen.getByTitle(/Anna M Schneider Law Office Location/i)
    expect(iframe).toHaveAttribute("allowFullScreen")
    expect(iframe).toHaveAttribute("loading", "lazy")
  })
})
