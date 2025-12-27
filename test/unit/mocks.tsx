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
