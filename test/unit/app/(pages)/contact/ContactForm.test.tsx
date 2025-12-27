import { mockErrorResponse, mockFetch, mockSuccessResponse } from "@test/unit/mocks"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import ContactForm from "@/app/(pages)/contact/ContactForm"

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders all form fields", () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/preferred contact method/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument()
  })

  it("updates form data on user input", async () => {
    const user = userEvent.setup({ delay: null })
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/full name/i)
    await user.type(nameInput, "John Doe")

    expect(nameInput).toHaveValue("John Doe")
  })

  it("submits form successfully and shows success toast", async () => {
    const user = userEvent.setup({ delay: null })
    mockFetch(mockSuccessResponse())

    render(<ContactForm />)

    // Fill out form
    await user.type(screen.getByLabelText(/full name/i), "John Doe")
    await user.type(screen.getByLabelText(/email address/i), "john@example.com")
    await user.selectOptions(screen.getByLabelText(/subject/i), "estate-planning")
    await user.selectOptions(screen.getByLabelText(/preferred contact method/i), "email")
    await user.type(screen.getByLabelText(/message/i), "Test message")

    // Submit form
    const submitButton = screen.getByRole("button", { name: /send message/i })
    await user.click(submitButton)

    // Wait for success state
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      )
    })
  })

  it("shows error toast on failed submission", async () => {
    const user = userEvent.setup({ delay: null })
    mockFetch(mockErrorResponse())

    render(<ContactForm />)

    // Fill out required fields
    await user.type(screen.getByLabelText(/full name/i), "John Doe")
    await user.type(screen.getByLabelText(/email address/i), "john@example.com")
    await user.selectOptions(screen.getByLabelText(/subject/i), "estate-planning")
    await user.selectOptions(screen.getByLabelText(/preferred contact method/i), "email")
    await user.type(screen.getByLabelText(/message/i), "Test message")

    // Submit form
    const submitButton = screen.getByRole("button", { name: /send message/i })
    await user.click(submitButton)

    // Wait for error handling
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it("resets form after successful submission", async () => {
    const user = userEvent.setup({ delay: null })
    mockFetch(mockSuccessResponse())

    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement

    // Fill out form
    await user.type(nameInput, "John Doe")
    await user.type(emailInput, "john@example.com")
    await user.selectOptions(screen.getByLabelText(/subject/i), "estate-planning")
    await user.selectOptions(screen.getByLabelText(/preferred contact method/i), "email")
    await user.type(screen.getByLabelText(/message/i), "Test message")

    // Submit form
    await user.click(screen.getByRole("button", { name: /send message/i }))

    // Wait for form to reset
    await waitFor(() => {
      expect(nameInput.value).toBe("")
      expect(emailInput.value).toBe("")
    })
  })

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup({ delay: null })

    // Create a promise that we can control
    let resolvePromise: (value: Response) => void
    const promise = new Promise<Response>((resolve) => {
      resolvePromise = resolve
    })

    global.fetch = vi.fn().mockReturnValue(promise)

    render(<ContactForm />)

    // Fill out form
    await user.type(screen.getByLabelText(/full name/i), "John Doe")
    await user.type(screen.getByLabelText(/email address/i), "john@example.com")
    await user.selectOptions(screen.getByLabelText(/subject/i), "estate-planning")
    await user.selectOptions(screen.getByLabelText(/preferred contact method/i), "email")
    await user.type(screen.getByLabelText(/message/i), "Test message")

    const submitButton = screen.getByRole("button", { name: /send message/i })

    // Click submit
    await user.click(submitButton)

    // Button should be disabled and show "Sending..."
    await waitFor(() => {
      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveTextContent(/sending/i)
    })

    // Resolve the promise
    resolvePromise!(mockSuccessResponse())

    // Wait for button to be enabled again
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it("calls custom onSubmit handler when provided", async () => {
    const user = userEvent.setup({ delay: null })
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined)

    render(<ContactForm onSubmit={mockOnSubmit} />)

    // Fill out form
    await user.type(screen.getByLabelText(/full name/i), "John Doe")
    await user.type(screen.getByLabelText(/email address/i), "john@example.com")
    await user.selectOptions(screen.getByLabelText(/subject/i), "estate-planning")
    await user.selectOptions(screen.getByLabelText(/preferred contact method/i), "email")
    await user.type(screen.getByLabelText(/message/i), "Test message")

    // Submit form
    await user.click(screen.getByRole("button", { name: /send message/i }))

    // Wait for custom handler to be called
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "John Doe",
          email: "john@example.com",
          subject: "estate-planning",
          preferredContact: "email",
          message: "Test message",
        })
      )
    })
  })
})
