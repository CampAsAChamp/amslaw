import { expectMotionAnimation, getMotionProps } from "@test/unit/helpers/helpers"
import { mockFramerMotion } from "@test/unit/helpers/mocks"
import { render, screen } from "@testing-library/react"
import { FileText } from "lucide-react"
import { describe, expect, it, vi } from "vitest"

import FeatureCard from "@/app/components/common/FeatureCard"

// Mock framer-motion to simplify testing
vi.mock("framer-motion", () => mockFramerMotion())

describe("FeatureCard", () => {
  const mockIcon = <FileText data-testid="mock-icon" className="w-12 h-12 text-primary-hover" />
  const mockTitle = "Estate Planning"
  const mockDescription = "Comprehensive planning to protect your assets"

  describe("With features (card with features list)", () => {
    const mockFeatures = ["Living Trusts", "Pour-Over Wills", "Healthcare Directives"]

    it("renders icon, title, description, and features", () => {
      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      expect(screen.getByTestId("mock-icon")).toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
      expect(screen.getByText(mockDescription)).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("Living Trusts"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("Pour-Over Wills"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("Healthcare Directives"))).toBeInTheDocument()
    })

    it("always applies card-base class", () => {
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const wrapper = container.querySelector(".card-base")
      expect(wrapper).toBeInTheDocument()
    })

    it("applies text-primary-hover to icon wrapper", () => {
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const iconWrapper = container.querySelector('[class*="text-primary-hover"]')
      expect(iconWrapper).toBeInTheDocument()
      expect(iconWrapper).toHaveClass("mb-4")
    })

    it("renders title as h3 with correct styling", () => {
      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const title = screen.getByRole("heading", { level: 3, name: mockTitle })
      expect(title).toHaveClass("text-xl", "font-semibold", "text-heading", "mb-4")
    })

    it("applies margin to description", () => {
      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const description = screen.getByText(mockDescription)
      expect(description).toHaveClass("text-body", "mb-6")
    })

    it("renders features as bulleted list", () => {
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const list = container.querySelector("ul")
      expect(list).toBeInTheDocument()
      expect(list).toHaveClass("text-sm", "text-body", "space-y-2")

      const listItems = container.querySelectorAll("li")
      expect(listItems).toHaveLength(3)
    })

    it("features have bullet points", () => {
      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      expect(screen.getByText((content) => content.includes("• Living Trusts"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("• Pour-Over Wills"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("• Healthcare Directives"))).toBeInTheDocument()
    })

    it("renders with single feature", () => {
      const singleFeature = ["Single Feature"]
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={singleFeature} />)

      const listItems = container.querySelectorAll("li")
      expect(listItems).toHaveLength(1)
      expect(screen.getByText("• Single Feature")).toBeInTheDocument()
    })

    it("renders with many features", () => {
      const manyFeatures = ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"]
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={manyFeatures} />)

      const listItems = container.querySelectorAll("li")
      expect(listItems).toHaveLength(6)
    })

    it("handles empty features array gracefully", () => {
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={[]} />)

      // Should still render card but without features list
      expect(container.querySelector(".card-base")).toBeInTheDocument()
      expect(container.querySelector("ul")).not.toBeInTheDocument()
    })
  })

  describe("With sections (complex service card)", () => {
    const mockSections = [
      {
        heading: "What I Include:",
        items: ["Last Will and Testament", "Asset Inventory and Planning"],
      },
      {
        heading: "Why You Need a Will:",
        items: ["Control asset distribution", "Name guardians for minor children", "Minimize family disputes"],
      },
    ]

    it("renders icon, title, description, and sections", () => {
      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByTestId("mock-icon")).toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
      expect(screen.getByText(mockDescription)).toBeInTheDocument()
      expect(screen.getByText("What I Include:")).toBeInTheDocument()
      expect(screen.getByText("Why You Need a Will:")).toBeInTheDocument()
    })

    it("always applies card-base class", () => {
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const wrapper = container.querySelector(".card-base")
      expect(wrapper).toBeInTheDocument()
    })

    it("renders section headings as h3", () => {
      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const heading1 = screen.getByRole("heading", { level: 3, name: "What I Include:" })
      const heading2 = screen.getByRole("heading", { level: 3, name: "Why You Need a Will:" })
      expect(heading1).toBeInTheDocument()
      expect(heading2).toBeInTheDocument()
      expect(heading1).toHaveClass("text-lg", "font-semibold", "text-heading", "mb-3")
    })

    it("renders section items as bulleted list when multiple items", () => {
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const lists = container.querySelectorAll("ul")
      expect(lists.length).toBeGreaterThan(0)
    })

    it("renders single item section as paragraph", () => {
      const singleItemSections = [
        {
          heading: "Overview",
          items: ["This is a single paragraph description."],
        },
      ]

      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={singleItemSections} />)

      const paragraph = screen.getByText("This is a single paragraph description.")
      expect(paragraph.tagName).toBe("P")
      expect(paragraph).toHaveClass("text-body")
    })

    it("renders sections without headings", () => {
      const noHeadingSections = [
        {
          items: ["Item 1", "Item 2", "Item 3"],
        },
      ]

      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={noHeadingSections} />)

      expect(screen.getByText((content) => content.includes("Item 1"))).toBeInTheDocument()
      expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument()
    })

    it("renders React nodes in section items", () => {
      const reactNodeSections = [
        {
          heading: "Healthcare",
          items: [
            <span key="healthcare" data-testid="custom-item">
              Custom <strong>React</strong> Node
            </span>,
          ],
        },
      ]

      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={reactNodeSections} />)

      expect(screen.getByTestId("custom-item")).toBeInTheDocument()
      expect(screen.getByText("React")).toBeInTheDocument()
    })

    it("renders title as h2 when using sections", () => {
      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const heading = screen.getByRole("heading", { level: 2, name: mockTitle })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass("text-2xl", "font-bold", "text-heading", "mb-4")
    })

    it("applies proper spacing to sections layout", () => {
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const iconWrapper = container.querySelector('[class*="text-primary-hover"]')
      expect(iconWrapper).toHaveClass("mb-6")
    })

    it("supports animateOnMount prop", () => {
      const { container } = render(
        <FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} animateOnMount={true} />
      )

      const motionDiv = container.firstChild as HTMLElement
      const props = getMotionProps(motionDiv)
      expect(props.animate).toBeTruthy()
      expect(props.animate).not.toBe("undefined")
    })

    it("prefers sections over features when both provided", () => {
      const mockFeatures = ["Feature 1", "Feature 2"]

      render(
        <FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} sections={mockSections} />
      )

      // Should render sections (h2 title)
      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toBeInTheDocument()

      // Should render section headings
      expect(screen.getByText("What I Include:")).toBeInTheDocument()
    })
  })

  describe("Animation behavior", () => {
    it("applies default delay of 0", () => {
      const mockFeatures = ["Feature 1"]
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const motionDiv = container.firstChild as HTMLElement
      const props = getMotionProps(motionDiv)
      expect(props.transition?.delay).toBe(0)
    })

    it("applies custom delay when provided", () => {
      const mockFeatures = ["Feature 1"]
      const { container } = render(
        <FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} delay={0.5} />
      )

      const motionDiv = container.firstChild as HTMLElement
      expectMotionAnimation(motionDiv, {
        transition: { delay: 0.5 },
      })
    })

    it("uses correct animation configuration", () => {
      const mockFeatures = ["Feature 1"]
      const { container } = render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const motionDiv = container.firstChild as HTMLElement
      expectMotionAnimation(motionDiv, {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
      })
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

      const mockFeatures = ["Feature 1"]
      render(<FeatureCard icon={complexIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      expect(screen.getByTestId("complex-icon")).toBeInTheDocument()
    })

    it("handles long title text", () => {
      const longTitle = "This is a very long title that might wrap to multiple lines"
      const mockFeatures = ["Feature 1"]
      render(<FeatureCard icon={mockIcon} title={longTitle} description={mockDescription} features={mockFeatures} />)

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it("handles long description text", () => {
      const longDescription = "This is a very long description. ".repeat(10).trim()
      const mockFeatures = ["Feature 1"]
      render(<FeatureCard icon={mockIcon} title={mockTitle} description={longDescription} features={mockFeatures} />)

      expect(screen.getByText((content) => content.includes(longDescription))).toBeInTheDocument()
    })

    it("handles sections with empty items array", () => {
      const emptySections = [
        {
          heading: "Empty Section",
          items: [],
        },
      ]

      render(<FeatureCard icon={mockIcon} title={mockTitle} description={mockDescription} sections={emptySections} />)

      expect(screen.getByText("Empty Section")).toBeInTheDocument()
    })
  })
})
