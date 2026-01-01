import { ReactElement } from "react"
import { render, RenderOptions, RenderResult } from "@testing-library/react"
import { expect } from "vitest"

import { TestWrapper } from "./mocks"

/**
 * Custom render function that wraps components with ThemeProvider automatically
 * @param ui - The React component to render
 * @param options - Optional render options
 * @returns Render result with all testing-library queries
 */
export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">): RenderResult {
  // @ts-expect-error - TestWrapper type is compatible but TypeScript doesn't recognize it
  return render(ui, { wrapper: TestWrapper, ...options })
}

/**
 * Helper to safely parse JSON or return the string value
 */
function parseJsonOrString(value: string | null): unknown {
  if (!value || value === "null" || value === "undefined") return null
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

/**
 * Extract motion props from a motion.div element for testing
 * @param element - The HTML element with motion data attributes
 * @returns Parsed motion props object
 */
export function getMotionProps(element: HTMLElement) {
  return {
    initial: parseJsonOrString(element.getAttribute("data-initial")) as Record<string, unknown> | string | null,
    animate: parseJsonOrString(element.getAttribute("data-animate")) as Record<string, unknown> | string | null,
    whileInView: parseJsonOrString(element.getAttribute("data-while-in-view")) as
      | Record<string, unknown>
      | string
      | null,
    viewport: parseJsonOrString(element.getAttribute("data-viewport")) as Record<string, unknown> | null,
    transition: parseJsonOrString(element.getAttribute("data-transition")) as Record<string, unknown> | null,
    variants: parseJsonOrString(element.getAttribute("data-variants")) as Record<string, unknown> | null,
  }
}

/**
 * Assert that an element has expected motion animation properties
 * @param element - The HTML element to check
 * @param expected - Expected animation configuration
 */
export function expectMotionAnimation(
  element: HTMLElement,
  expected: {
    initial?: object
    animate?: string | object
    whileInView?: string | object
    viewport?: object
    transition?: object
  }
) {
  const props = getMotionProps(element)

  if (expected.initial) {
    expect(props.initial).toEqual(expected.initial)
  }

  if (expected.animate) {
    if (typeof expected.animate === "string") {
      expect(props.animate).toBe(expected.animate)
    } else {
      expect(props.animate).toEqual(expected.animate)
    }
  }

  if (expected.whileInView) {
    if (typeof expected.whileInView === "string") {
      expect(props.whileInView).toBe(expected.whileInView)
    } else {
      expect(props.whileInView).toEqual(expected.whileInView)
    }
  }

  if (expected.viewport) {
    expect(props.viewport).toEqual(expected.viewport)
  }

  if (expected.transition) {
    expect(props.transition).toMatchObject(expected.transition)
  }
}

/**
 * Query elements by partial class name match
 * @param container - The container element to search within
 * @param classPattern - Partial class name to match
 * @returns First matching element or null
 */
export function queryByClassPattern(container: HTMLElement, classPattern: string): HTMLElement | null {
  return container.querySelector(`[class*="${classPattern}"]`)
}

/**
 * Query all elements by partial class name match
 * @param container - The container element to search within
 * @param classPattern - Partial class name to match
 * @returns Array of matching elements
 */
export function queryAllByClassPattern(container: HTMLElement, classPattern: string): HTMLElement[] {
  return Array.from(container.querySelectorAll(`[class*="${classPattern}"]`))
}
