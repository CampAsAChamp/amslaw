import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import AttorneyProfile from "@/app/(pages)/about/AttorneyProfile"

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}))

describe("AttorneyProfile", () => {
  it("renders the attorney profile section", () => {
    render(<AttorneyProfile />)

    // Check for main heading
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })

  it("displays attorney information", () => {
    render(<AttorneyProfile />)

    // Check that attorney name and title are present
    expect(screen.getByText("Anna Schneider")).toBeInTheDocument()
    expect(screen.getByText("Principal Attorney")).toBeInTheDocument()
  })

  it("renders with proper semantic structure", () => {
    const { container } = render(<AttorneyProfile />)

    // Check for section element
    const section = container.querySelector("section")
    expect(section).toBeInTheDocument()
  })
})
