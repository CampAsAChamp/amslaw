import "@testing-library/jest-dom"

import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

// Mock matchMedia for react-hot-toast
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock clipboard API
const mockWriteText = vi.fn().mockResolvedValue(undefined)
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
  configurable: true,
})

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
  configurable: true,
})

// Cleanup after each test
afterEach(() => {
  cleanup()
  localStorageMock.clear()
})

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", async () => {
  const React = await import("react")

  // Create a component that forwards all props except motion-specific ones
  const createMotionComponent = (element: string) => {
    const component = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      // Filter out framer-motion specific props
      const motionProps = [
        "animate",
        "initial",
        "exit",
        "variants",
        "transition",
        "whileHover",
        "whileTap",
        "whileFocus",
        "whileInView",
        "viewport",
        "layoutId",
        "layout",
      ]
      const domProps = Object.keys(props)
        .filter((key) => !motionProps.includes(key))
        .reduce(
          (obj, key) => {
            obj[key] = props[key]
            return obj
          },
          {} as Record<string, unknown>
        )

      return React.createElement(element, { ...domProps, ref })
    })
    component.displayName = `Motion${element.charAt(0).toUpperCase() + element.slice(1)}`
    return component
  }

  return {
    motion: {
      div: createMotionComponent("div"),
      label: createMotionComponent("label"),
      input: createMotionComponent("input"),
      textarea: createMotionComponent("textarea"),
      select: createMotionComponent("select"),
      button: createMotionComponent("button"),
      h1: createMotionComponent("h1"),
      h2: createMotionComponent("h2"),
      h3: createMotionComponent("h3"),
      p: createMotionComponent("p"),
      section: createMotionComponent("section"),
      a: createMotionComponent("a"),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useMotionValue: vi.fn((initialValue) => {
      const value = { current: initialValue }
      return {
        get: () => value.current,
        set: (newValue: unknown) => {
          value.current = typeof newValue === "function" ? newValue(value.current) : newValue
        },
      }
    }),
    useTransform: vi.fn((source, transformer) => {
      // Get the initial value from the source
      const initialValue = typeof source === "object" && "get" in source ? source.get() : source
      // Apply the transformer if provided
      const transformedValue = transformer ? transformer(initialValue) : initialValue
      // Return the transformed value directly (so it can be rendered)
      return transformedValue
    }),
    useSpring: vi.fn((initialValue) => ({ get: () => initialValue, set: vi.fn() })),
    useInView: vi.fn(() => true),
    animate: vi.fn(() => ({ stop: vi.fn() })),
  }
})

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
}))
