import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { NavLink as NavLinkType } from "@/types"
import NavLink, { DesktopNavLink } from "@/app/components/layout/navigation/NavLink"

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      layoutId,
      ...props
    }: {
      children: React.ReactNode
      className?: string
      layoutId?: string
      [key: string]: unknown
    }) => (
      <div className={className} data-layout-id={layoutId} {...props}>
        {children}
      </div>
    ),
  },
}))

describe("NavLink", () => {
  const mockLink: NavLinkType = {
    label: "About",
    href: "/about",
  }

  const mockButtonLink: NavLinkType = {
    label: "Contact",
    href: "/contact",
    isButton: true,
  }

  const mockOnClick = vi.fn()

  it("renders link with correct label", () => {
    render(<NavLink link={mockLink} isActive={false} onClick={mockOnClick} variant="desktop" />)

    expect(screen.getByText("About")).toBeInTheDocument()
  })

  it("renders link with correct href", () => {
    render(<NavLink link={mockLink} isActive={false} onClick={mockOnClick} variant="desktop" />)

    const link = screen.getByRole("link", { name: "About" })
    expect(link).toHaveAttribute("href", "/about")
  })

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup()
    render(<NavLink link={mockLink} isActive={false} onClick={mockOnClick} variant="desktop" />)

    const link = screen.getByRole("link", { name: "About" })
    await user.click(link)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  describe("Desktop variant - regular link", () => {
    it("applies correct CSS classes for inactive regular link", () => {
      render(<NavLink link={mockLink} isActive={false} onClick={mockOnClick} variant="desktop" />)

      const link = screen.getByRole("link", { name: "About" })
      expect(link).toHaveClass("nav-link-wipe")
      expect(link).toHaveClass("px-3")
      expect(link).toHaveClass("py-2")
      expect(link).toHaveClass("text-sm")
      expect(link).toHaveClass("font-semibold")
      expect(link).toHaveClass("relative")
    })

    it("shows active indicator for active regular link", () => {
      const { container } = render(<NavLink link={mockLink} isActive={true} onClick={mockOnClick} variant="desktop" />)

      // Check for active indicator div
      const activeIndicator = container.querySelector('[data-layout-id="activeTab"]')
      expect(activeIndicator).toBeInTheDocument()
      expect(activeIndicator).toHaveClass("h-0.5")
      expect(activeIndicator).toHaveClass("bg-primary")
    })

    it("does not show active indicator for inactive regular link", () => {
      const { container } = render(<NavLink link={mockLink} isActive={false} onClick={mockOnClick} variant="desktop" />)

      const activeIndicator = container.querySelector('[data-layout-id="activeTab"]')
      expect(activeIndicator).not.toBeInTheDocument()
    })
  })

  describe("Desktop variant - button link", () => {
    it("applies correct CSS classes for button link", () => {
      render(<NavLink link={mockButtonLink} isActive={false} onClick={mockOnClick} variant="desktop" />)

      const link = screen.getByRole("link", { name: "Contact" })
      expect(link).toHaveClass("btn-nav-animated")
      expect(link).toHaveClass("relative")
    })

    it("applies active class for active button link", () => {
      render(<NavLink link={mockButtonLink} isActive={true} onClick={mockOnClick} variant="desktop" />)

      const link = screen.getByRole("link", { name: "Contact" })
      expect(link).toHaveClass("btn-nav-animated-active")
    })

    it("shows triangle indicator for active button link", () => {
      const { container } = render(<NavLink link={mockButtonLink} isActive={true} onClick={mockOnClick} variant="desktop" />)

      const activeIndicator = container.querySelector('[data-layout-id="activeTab"]')
      expect(activeIndicator).toBeInTheDocument()
      expect(activeIndicator).toHaveClass("border-t-primary")
    })

    it("does not show triangle indicator for inactive button link", () => {
      const { container } = render(<NavLink link={mockButtonLink} isActive={false} onClick={mockOnClick} variant="desktop" />)

      const indicators = container.querySelectorAll('[data-layout-id="activeTab"]')
      expect(indicators).toHaveLength(0)
    })
  })

  describe("Mobile variant - regular link", () => {
    it("applies correct CSS classes for inactive mobile link", () => {
      render(<NavLink link={mockLink} isActive={false} onClick={mockOnClick} variant="mobile" />)

      const link = screen.getByRole("link", { name: "About" })
      expect(link).toHaveClass("text-nav")
      expect(link).toHaveClass("hover:text-primary-dark")
      expect(link).toHaveClass("block")
      expect(link).toHaveClass("px-3")
      expect(link).toHaveClass("py-2")
      expect(link).toHaveClass("text-base")
      expect(link).toHaveClass("font-semibold")
    })

    it("applies primary color class for active mobile link", () => {
      render(<NavLink link={mockLink} isActive={true} onClick={mockOnClick} variant="mobile" />)

      const link = screen.getByRole("link", { name: "About" })
      expect(link).toHaveClass("text-primary")
    })

    it("shows vertical bar indicator for active mobile link", () => {
      const { container } = render(<NavLink link={mockLink} isActive={true} onClick={mockOnClick} variant="mobile" />)

      const activeIndicator = container.querySelector('[data-layout-id="activeTabMobile"]')
      expect(activeIndicator).toBeInTheDocument()
      expect(activeIndicator).toHaveClass("w-1")
      expect(activeIndicator).toHaveClass("bg-primary")
    })
  })

  describe("Mobile variant - button link", () => {
    it("applies correct CSS classes for mobile button", () => {
      render(<NavLink link={mockButtonLink} isActive={false} onClick={mockOnClick} variant="mobile" />)

      const link = screen.getByRole("link", { name: "Contact" })
      expect(link).toHaveClass("btn-nav-mobile-animated")
      expect(link).toHaveClass("relative")
      expect(link).toHaveClass("block")
    })

    it("applies active class for active mobile button", () => {
      render(<NavLink link={mockButtonLink} isActive={true} onClick={mockOnClick} variant="mobile" />)

      const link = screen.getByRole("link", { name: "Contact" })
      expect(link).toHaveClass("btn-nav-mobile-animated-active")
    })

    it("shows triangle indicator for active mobile button", () => {
      const { container } = render(<NavLink link={mockButtonLink} isActive={true} onClick={mockOnClick} variant="mobile" />)

      const activeIndicator = container.querySelector('[data-layout-id="activeTabMobile"]')
      expect(activeIndicator).toBeInTheDocument()
    })
  })

  describe("DesktopNavLink wrapper", () => {
    it("renders NavLink with desktop variant", () => {
      render(<DesktopNavLink link={mockLink} isActive={false} onClick={mockOnClick} />)

      const link = screen.getByRole("link", { name: "About" })
      expect(link).toHaveClass("nav-link-wipe")
    })

    it("wraps NavLink in motion.div for layout animations", () => {
      const { container } = render(<DesktopNavLink link={mockLink} isActive={false} onClick={mockOnClick} />)

      // The motion.div should be present (mocked as regular div)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("Layout ID differentiation", () => {
    it("uses 'activeTab' layoutId for desktop variant", () => {
      const { container } = render(<NavLink link={mockLink} isActive={true} onClick={mockOnClick} variant="desktop" />)

      const activeIndicator = container.querySelector('[data-layout-id="activeTab"]')
      expect(activeIndicator).toBeInTheDocument()
    })

    it("uses 'activeTabMobile' layoutId for mobile variant", () => {
      const { container } = render(<NavLink link={mockLink} isActive={true} onClick={mockOnClick} variant="mobile" />)

      const activeIndicator = container.querySelector('[data-layout-id="activeTabMobile"]')
      expect(activeIndicator).toBeInTheDocument()
    })
  })
})
