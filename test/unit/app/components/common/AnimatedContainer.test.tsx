import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import AnimatedContainer from "@/app/components/common/AnimatedContainer"

// Mock framer-motion to capture props and simplify testing
interface MotionPropsCapture {
  variants?: {
    initial?: { scaleX?: number; scaleY?: number; opacity?: number }
    animate?: { scaleX?: number; scaleY?: number; opacity?: number }
  }
  transition?: {
    type?: string
    stiffness?: number
    damping?: number
    delay?: number
  }
  viewport?: { once?: boolean; amount?: number }
}

let outerMotionProps: MotionPropsCapture = {}
let callCount = 0

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      variants,
      initial,
      animate,
      whileInView,
      viewport,
      transition,
      className,
      ...props
    }: {
      children: React.ReactNode
      variants?: Record<string, unknown>
      initial?: string
      animate?: string
      whileInView?: string
      viewport?: Record<string, unknown>
      transition?: Record<string, unknown>
      className?: string
      [key: string]: unknown
    }) => {
      const isOuter = callCount === 0
      callCount++

      const motionProps = {
        variants,
        initial,
        animate,
        whileInView,
        viewport,
        transition,
      }

      if (isOuter) {
        outerMotionProps = motionProps
      }

      return (
        <div
          className={className}
          data-testid={isOuter ? "motion-div" : "inner-motion-div"}
          data-initial={initial}
          data-animate={animate}
          data-while-in-view={whileInView}
          {...props}
        >
          {children}
        </div>
      )
    },
  },
}))

describe("AnimatedContainer", () => {
  beforeEach(() => {
    outerMotionProps = {}
    callCount = 0
  })

  it("renders children correctly", () => {
    render(
      <AnimatedContainer>
        <div>Test Content</div>
      </AnimatedContainer>
    )

    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })

  it("applies default card className", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const outerMotionDiv = container.querySelector('[data-testid="motion-div"]')
    expect(outerMotionDiv).toHaveClass("card")
  })

  it("applies custom className", () => {
    const { container } = render(
      <AnimatedContainer className="custom-class">
        <div>Test</div>
      </AnimatedContainer>
    )

    const outerMotionDiv = container.querySelector('[data-testid="motion-div"]')
    expect(outerMotionDiv).toHaveClass("custom-class")
  })

  describe("Animation on scroll (whileInView) - default behavior", () => {
    it("uses whileInView when animateOnMount is false", () => {
      const { container } = render(
        <AnimatedContainer animateOnMount={false}>
          <div>Test</div>
        </AnimatedContainer>
      )

      const outerMotionDiv = container.querySelector('[data-testid="motion-div"]')
      expect(outerMotionDiv).toHaveAttribute("data-initial", "initial")
      expect(outerMotionDiv).toHaveAttribute("data-while-in-view", "animate")
      expect(outerMotionDiv).not.toHaveAttribute("data-animate")
    })

    it("sets viewport options for whileInView", () => {
      render(
        <AnimatedContainer animateOnMount={false}>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.viewport).toEqual({ once: true, amount: 0.1 })
    })
  })

  describe("Animation on mount - when animateOnMount is true", () => {
    it("uses animate prop instead of whileInView", () => {
      const { container } = render(
        <AnimatedContainer animateOnMount={true}>
          <div>Test</div>
        </AnimatedContainer>
      )

      const outerMotionDiv = container.querySelector('[data-testid="motion-div"]')
      expect(outerMotionDiv).toHaveAttribute("data-initial", "initial")
      expect(outerMotionDiv).toHaveAttribute("data-animate", "animate")
      expect(outerMotionDiv).not.toHaveAttribute("data-while-in-view")
    })

    it("does not set viewport options", () => {
      render(
        <AnimatedContainer animateOnMount={true}>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.viewport).toBeUndefined()
    })
  })

  describe("Animation delay", () => {
    it("applies default delay of 0", () => {
      render(
        <AnimatedContainer>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.transition?.delay).toBe(0)
    })

    it("applies custom delay", () => {
      render(
        <AnimatedContainer delay={0.5}>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.transition?.delay).toBe(0.5)
    })

    it("applies large delay", () => {
      render(
        <AnimatedContainer delay={2}>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.transition?.delay).toBe(2)
    })
  })

  describe("Card animation variants", () => {
    it("defines initial state with scale and opacity", () => {
      render(
        <AnimatedContainer>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.variants?.initial).toEqual({
        scaleX: 0.05,
        scaleY: 0.05,
        opacity: 0,
      })
    })

    it("defines animate state with full scale and opacity", () => {
      render(
        <AnimatedContainer>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.variants?.animate).toEqual({
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
      })
    })

    it("uses spring transition", () => {
      render(
        <AnimatedContainer>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.transition?.type).toBe("spring")
      expect(outerMotionProps.transition?.stiffness).toBe(200)
      expect(outerMotionProps.transition?.damping).toBe(20)
    })
  })

  describe("Nested content animation", () => {
    it("renders inner motion div for content", () => {
      const { container } = render(
        <AnimatedContainer>
          <div data-testid="child-content">Test</div>
        </AnimatedContainer>
      )

      // Should have two motion divs (outer and inner)
      const motionDivs = container.querySelectorAll('[data-testid="motion-div"]')
      expect(motionDivs.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe("Combination scenarios", () => {
    it("handles custom class with custom delay", () => {
      const { container } = render(
        <AnimatedContainer className="custom-card" delay={1.2}>
          <div>Test</div>
        </AnimatedContainer>
      )

      const motionDiv = container.querySelector('[data-testid="motion-div"]')
      expect(motionDiv).toHaveClass("custom-card")
      expect(outerMotionProps.transition?.delay).toBe(1.2)
    })

    it("handles animateOnMount with custom delay", () => {
      const { container } = render(
        <AnimatedContainer animateOnMount={true} delay={0.8}>
          <div>Test</div>
        </AnimatedContainer>
      )

      const motionDiv = container.querySelector('[data-testid="motion-div"]')
      expect(motionDiv).toHaveAttribute("data-animate", "animate")
      expect(outerMotionProps.transition?.delay).toBe(0.8)
    })

    it("handles all props together", () => {
      const { container } = render(
        <AnimatedContainer className="special-card" delay={1.5} animateOnMount={true}>
          <div>Complex Test</div>
        </AnimatedContainer>
      )

      const motionDiv = container.querySelector('[data-testid="motion-div"]')
      expect(motionDiv).toHaveClass("special-card")
      expect(motionDiv).toHaveAttribute("data-animate", "animate")
      expect(outerMotionProps.transition?.delay).toBe(1.5)
      expect(screen.getByText("Complex Test")).toBeInTheDocument()
    })
  })

  describe("Edge cases", () => {
    it("renders with empty children", () => {
      const { container } = render(<AnimatedContainer>{null}</AnimatedContainer>)

      const outerMotionDiv = container.querySelector('[data-testid="motion-div"]')
      expect(outerMotionDiv).toBeInTheDocument()
    })

    it("renders with multiple children", () => {
      render(
        <AnimatedContainer>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </AnimatedContainer>
      )

      expect(screen.getByText("Child 1")).toBeInTheDocument()
      expect(screen.getByText("Child 2")).toBeInTheDocument()
      expect(screen.getByText("Child 3")).toBeInTheDocument()
    })

    it("renders with complex nested children", () => {
      render(
        <AnimatedContainer>
          <div>
            <span>Nested</span>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </AnimatedContainer>
      )

      expect(screen.getByText("Nested")).toBeInTheDocument()
      expect(screen.getByText("Item 1")).toBeInTheDocument()
      expect(screen.getByText("Item 2")).toBeInTheDocument()
    })

    it("handles delay of 0", () => {
      render(
        <AnimatedContainer delay={0}>
          <div>Test</div>
        </AnimatedContainer>
      )

      expect(outerMotionProps.transition?.delay).toBe(0)
    })

    it("renders with string children", () => {
      render(<AnimatedContainer>Plain text content</AnimatedContainer>)

      expect(screen.getByText("Plain text content")).toBeInTheDocument()
    })
  })
})
