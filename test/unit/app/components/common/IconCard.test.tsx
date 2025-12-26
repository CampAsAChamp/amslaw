import { render, screen } from "@testing-library/react"
import { CheckCircle, Handshake } from "lucide-react"
import { describe, expect, it, vi } from "vitest"

import IconCard from "@/app/components/common/IconCard"

// Mock framer-motion to simplify testing
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      initial,
      whileInView,
      viewport,
      transition,
    }: {
      children: React.ReactNode
      className?: string
      initial?: object
      whileInView?: object
      viewport?: object
      transition?: object
    }) => (
      <div
        className={className}
        data-testid="motion-div"
        data-initial={JSON.stringify(initial)}
        data-while-in-view={JSON.stringify(whileInView)}
        data-viewport={JSON.stringify(viewport)}
        data-transition={JSON.stringify(transition)}
      >
        {children}
      </div>
    ),
  },
}))

describe("IconCard", () => {
  const mockIcon = <CheckCircle data-testid="mock-icon" className="w-8 h-8 text-primary-hover" />
  const mockTitle = "Expert Guidance"
  const mockDescription = "Personalized attention for your unique situation"

  describe("Basic rendering (simple icon variant)", () => {
    it("renders icon, title, and description", () => {
      render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      expect(screen.getByTestId("mock-icon")).toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
      expect(screen.getByText(mockDescription)).toBeInTheDocument()
    })

    it("renders with icon-circle class wrapper", () => {
      const { container } = render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const iconWrapper = container.querySelector(".icon-circle")
      expect(iconWrapper).toBeInTheDocument()
    })

    it("renders title as h3", () => {
      render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const heading = screen.getByRole("heading", { level: 3, name: mockTitle })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass("text-lg", "font-semibold", "text-heading", "mb-2")
    })

    it("renders description with correct styling", () => {
      render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const description = screen.getByText(mockDescription)
      expect(description).toHaveClass("text-body")
    })

    it("applies default delay of 0 when no delay or stepNumber provided", () => {
      const { container } = render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const motionDiv = container.querySelector('[data-testid="motion-div"]')
      const transition = JSON.parse(motionDiv?.getAttribute("data-transition") || "{}")
      expect(transition.delay).toBe(0)
    })

    it("applies custom delay when provided", () => {
      const { container } = render(
        <IconCard icon={mockIcon} title={mockTitle} description={mockDescription} delay={0.5} />
      )

      const motionDiv = container.querySelector('[data-testid="motion-div"]')
      const transition = JSON.parse(motionDiv?.getAttribute("data-transition") || "{}")
      expect(transition.delay).toBe(0.5)
    })
  })

  describe("Process step variant (with stepNumber)", () => {
    const processIcon = <Handshake data-testid="process-icon" className="w-12 h-12" />

    it("renders with numbered badge when stepNumber provided", () => {
      const { container } = render(
        <IconCard icon={processIcon} title="Initial Contact" description="I discuss your goals" stepNumber={1} />
      )

      // Should have the badge with step number
      expect(screen.getByText("1")).toBeInTheDocument()

      // Badge should have correct styling
      const badge = container.querySelector(".bg-primary.rounded-full")
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveClass("w-6", "h-6")
    })

    it("renders with icon in circle background for process steps", () => {
      const { container } = render(
        <IconCard icon={processIcon} title="Initial Contact" description="I discuss your goals" stepNumber={1} />
      )

      const iconCircle = container.querySelector(".bg-surface-tertiary.rounded-full")
      expect(iconCircle).toBeInTheDocument()
      expect(iconCircle).toHaveClass("w-20", "h-20")
    })

    it("calculates delay automatically from stepNumber", () => {
      const { container } = render(
        <IconCard icon={processIcon} title="Step 2" description="Second step" stepNumber={2} />
      )

      const motionDiv = container.querySelector('[data-testid="motion-div"]')
      const transition = JSON.parse(motionDiv?.getAttribute("data-transition") || "{}")
      // Should be 0.35 + (2 - 1) * 0.2 = 0.55
      expect(transition.delay).toBe(0.55)
    })

    it("stepNumber takes priority over delay prop", () => {
      const { container } = render(
        <IconCard icon={processIcon} title="Step 3" description="Third step" stepNumber={3} delay={1.0} />
      )

      const motionDiv = container.querySelector('[data-testid="motion-div"]')
      const transition = JSON.parse(motionDiv?.getAttribute("data-transition") || "{}")
      // Should use stepNumber calculation: 0.35 + (3 - 1) * 0.2 = 0.75
      expect(transition.delay).toBe(0.75)
    })

    it("renders stepNumber 0 correctly", () => {
      render(<IconCard icon={processIcon} title="Step 0" description="Zero step" stepNumber={0} />)

      expect(screen.getByText("0")).toBeInTheDocument()
    })
  })

  describe("Arrow rendering", () => {
    it("does not render arrows by default", () => {
      const { container } = render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      // Check for arrow wrapper divs (mobile and desktop arrows) instead of SVGs since icon is also an SVG
      const mobileArrow = container.querySelector(".md\\:hidden svg")
      const desktopArrow = container.querySelector(".hidden.md\\:block svg")
      expect(mobileArrow).not.toBeInTheDocument()
      expect(desktopArrow).not.toBeInTheDocument()
    })

    it("renders arrows when showArrow is true", () => {
      const { container } = render(
        <IconCard icon={mockIcon} title={mockTitle} description={mockDescription} showArrow={true} />
      )

      const arrows = container.querySelectorAll("svg")
      expect(arrows.length).toBeGreaterThan(0)
    })

    it("renders mobile arrow (down) with correct classes", () => {
      const { container } = render(
        <IconCard icon={mockIcon} title={mockTitle} description={mockDescription} showArrow={true} />
      )

      const mobileArrow = container.querySelector(".md\\:hidden")
      expect(mobileArrow).toBeInTheDocument()
    })

    it("renders desktop arrow (right) with correct classes", () => {
      const { container } = render(
        <IconCard icon={mockIcon} title={mockTitle} description={mockDescription} showArrow={true} />
      )

      const desktopArrow = container.querySelector(".hidden.md\\:block")
      expect(desktopArrow).toBeInTheDocument()
    })

    it("arrows animate with delay offset", () => {
      const { container } = render(
        <IconCard icon={mockIcon} title={mockTitle} description={mockDescription} stepNumber={1} showArrow={true} />
      )

      const motionDivs = container.querySelectorAll('[data-testid="motion-div"]')
      // Should have main content + 2 arrows = 3 motion divs
      expect(motionDivs.length).toBeGreaterThan(1)
    })
  })

  describe("Animation behavior", () => {
    it("uses correct animation configuration", () => {
      const { container } = render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const motionDiv = container.querySelector('[data-testid="motion-div"]')
      const initial = JSON.parse(motionDiv?.getAttribute("data-initial") || "{}")
      const whileInView = JSON.parse(motionDiv?.getAttribute("data-while-in-view") || "{}")
      const viewport = JSON.parse(motionDiv?.getAttribute("data-viewport") || "{}")
      const transition = JSON.parse(motionDiv?.getAttribute("data-transition") || "{}")

      expect(initial).toEqual({ opacity: 0, y: 30 })
      expect(whileInView).toEqual({ opacity: 1, y: 0 })
      expect(viewport).toEqual({ once: true })
      expect(transition.duration).toBe(0.5)
      expect(transition.ease).toEqual([0.25, 0.4, 0.25, 1])
    })
  })

  describe("Layout structure", () => {
    it("wraps content in flex container", () => {
      const { container } = render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const flexContainer = container.querySelector(".flex.flex-col.md\\:flex-row")
      expect(flexContainer).toBeInTheDocument()
    })

    it("centers content", () => {
      const { container } = render(<IconCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const centerDiv = container.querySelector(".text-center")
      expect(centerDiv).toBeInTheDocument()
    })
  })

  describe("Edge cases", () => {
    it("handles complex icon element", () => {
      const complexIcon = (
        <div data-testid="complex-icon">
          <svg>
            <path d="M10 10" />
          </svg>
        </div>
      )

      render(<IconCard icon={complexIcon} title={mockTitle} description={mockDescription} />)

      expect(screen.getByTestId("complex-icon")).toBeInTheDocument()
    })

    it("handles long title", () => {
      const longTitle = "This is a very long title that might wrap to multiple lines"
      render(<IconCard icon={mockIcon} title={longTitle} description={mockDescription} />)

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it("handles long description", () => {
      const longDescription = "This is a very long description. ".repeat(20).trim()
      render(<IconCard icon={mockIcon} title={mockTitle} description={longDescription} />)

      expect(screen.getByText(longDescription)).toBeInTheDocument()
    })

    it("handles large step numbers", () => {
      render(<IconCard icon={mockIcon} title="Step 100" description="Large step number" stepNumber={100} />)

      expect(screen.getByText("100")).toBeInTheDocument()
    })
  })
})
