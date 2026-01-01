import { ReactElement } from "react"
import { vi } from "vitest"

import { FormData } from "@/types"
import { ThemeProvider } from "@/app/components/common/ThemeProvider"

// Sample test form data
export const mockFormData: FormData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  subject: "estate-planning",
  message: "I would like to discuss estate planning options.",
  preferredContact: "email",
}

// Additional form data variations
export const mockFormDataMinimal: FormData = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "",
  subject: "general",
  message: "Quick question",
  preferredContact: "email",
}

export const mockFormDataComplete: FormData = {
  name: "Robert Johnson",
  email: "robert.johnson@example.com",
  phone: "(555) 987-6543",
  subject: "wills",
  message: "I need comprehensive will planning services for my family.",
  preferredContact: "phone",
}

// Test wrapper that provides ThemeProvider context
export const TestWrapper = ({ children }: { children: ReactElement }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

// Mock fetch response helpers
export const createMockResponse = (data: unknown, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

// Mock successful API response
export const mockSuccessResponse = () => createMockResponse({ success: true })

// Mock error API response
export const mockErrorResponse = (message = "Internal server error") => createMockResponse({ error: message }, 500)

// Mock Resend client
export const mockResendClient = {
  emails: {
    send: vi.fn().mockResolvedValue({ id: "mock-email-id" }),
  },
}

// Helper to mock global fetch
export const mockFetch = (response: Response) => {
  global.fetch = vi.fn().mockResolvedValue(response)
}

// Helper to reset all mocks
export const resetAllMocks = () => {
  vi.clearAllMocks()
}

/**
 * Factory to create framer-motion mock configuration
 * Returns a mock object that can be used with vi.mock()
 */
export const mockFramerMotion = () => {
  // Element parameter is not used but kept for clarity of what HTML element is being created
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createMotionComponent = (_element: string) => {
    const MotionComponent = ({
      children,
      className,
      variants,
      initial,
      animate,
      whileInView,
      viewport,
      transition,
    }: {
      children?: React.ReactNode
      className?: string
      variants?: object
      initial?: string | object
      animate?: string | object
      whileInView?: string | object
      viewport?: object
      transition?: object
    }) => (
      <div
        className={className}
        data-variants={JSON.stringify(variants)}
        data-initial={typeof initial === "string" ? initial : JSON.stringify(initial)}
        data-animate={typeof animate === "string" ? animate : JSON.stringify(animate)}
        data-while-in-view={typeof whileInView === "string" ? whileInView : JSON.stringify(whileInView)}
        data-viewport={JSON.stringify(viewport)}
        data-transition={JSON.stringify(transition)}
      >
        {children}
      </div>
    )
    MotionComponent.displayName = "MotionComponent"
    return MotionComponent
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
  }
}

/**
 * Factory to create next/navigation mock configuration
 * @param pathname - The current pathname to mock
 * @returns Mock object for next/navigation
 */
export const mockNextNavigation = (pathname: string = "/") => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => pathname,
  }
}

/**
 * Create a pre-configured userEvent instance with no delay
 * This is the standard setup used across most tests
 */
export const createUserEvent = async () => {
  const { default: userEvent } = await import("@testing-library/user-event")
  return userEvent.setup({ delay: null })
}

/**
 * Helper to fill contact form fields for testing
 * @param user - UserEvent instance
 * @param screen - Testing library screen object
 * @param data - Form data to fill (partial supported)
 */
export const fillContactFormFields = async (
  user: ReturnType<typeof import("@testing-library/user-event").default.setup>,
  screen: typeof import("@testing-library/react").screen,
  data: Partial<FormData> = mockFormData
) => {
  const formData = { ...mockFormData, ...data }

  if (formData.name) {
    await user.type(screen.getByLabelText(/full name/i), formData.name)
  }

  if (formData.email) {
    await user.type(screen.getByLabelText(/email address/i), formData.email)
  }

  if (formData.phone) {
    await user.type(screen.getByLabelText(/phone number/i), formData.phone)
  }

  if (formData.subject) {
    await user.selectOptions(screen.getByLabelText(/subject/i), formData.subject)
  }

  if (formData.preferredContact) {
    await user.selectOptions(screen.getByLabelText(/preferred contact method/i), formData.preferredContact)
  }

  if (formData.message) {
    await user.type(screen.getByLabelText(/message/i), formData.message)
  }
}
