import { getMotionProps } from "@test/unit/helpers/helpers"
import { mockFramerMotion } from "@test/unit/helpers/mocks"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import AnimatedContainer from "@/app/components/common/AnimatedContainer"

// Mock framer-motion
vi.mock("framer-motion", () => mockFramerMotion())

describe("AnimatedContainer", () => {
  it("renders children", () => {
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

    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toHaveClass("card")
  })

  it("applies custom className", () => {
    const { container } = render(
      <AnimatedContainer className="custom-class">
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toHaveClass("custom-class")
  })

  it("uses whileInView by default (animateOnMount=false)", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const props = getMotionProps(motionDiv)
    expect(props.whileInView).toBe("animate")
    expect(props.animate).toBeNull()
  })

  it("uses animate when animateOnMount=true", () => {
    const { container } = render(
      <AnimatedContainer animateOnMount={true}>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const props = getMotionProps(motionDiv)
    expect(props.animate).toBe("animate")
    expect(props.whileInView).toBeNull()
  })

  it("applies default delay of 0", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const props = getMotionProps(motionDiv)
    expect(props.transition?.delay).toBe(0)
  })

  it("applies custom delay", () => {
    const { container } = render(
      <AnimatedContainer delay={0.5}>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const props = getMotionProps(motionDiv)
    expect(props.transition?.delay).toBe(0.5)
  })

  it("sets viewport configuration for scroll-based animation", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const props = getMotionProps(motionDiv)
    expect(props.viewport?.once).toBe(true)
    expect(props.viewport?.amount).toBe(0.1)
  })

  it("uses spring transition", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const props = getMotionProps(motionDiv)
    expect(props.transition?.type).toBe("spring")
    expect(props.transition?.stiffness).toBe(200)
    expect(props.transition?.damping).toBe(20)
  })

  it("renders nested motion.div for content", () => {
    const { container } = render(
      <AnimatedContainer>
        <div data-testid="content">Test</div>
      </AnimatedContainer>
    )

    // Should have nested structure
    const outerMotion = container.firstChild as HTMLElement
    const innerMotion = outerMotion.firstChild as HTMLElement
    expect(innerMotion).toBeInTheDocument()
    expect(screen.getByTestId("content")).toBeInTheDocument()
  })
})
