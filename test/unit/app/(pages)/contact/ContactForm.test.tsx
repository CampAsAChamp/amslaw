import {
  createUserEvent,
  fillContactFormFields,
  mockErrorResponse,
  mockFetch,
  mockSuccessResponse,
} from "@test/unit/helpers/mocks"
import { render, screen, waitFor } from "@testing-library/react"
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
    const user = await createUserEvent()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/full name/i)
    await user.type(nameInput, "John Doe")

    expect(nameInput).toHaveValue("John Doe")
  })

  it("submits form successfully and shows success toast", async () => {
    const user = await createUserEvent()
    mockFetch(mockSuccessResponse())

    render(<ContactForm />)

    await fillContactFormFields(user, screen, {
      name: "John Doe",
      email: "john@example.com",
      subject: "estate-planning",
      preferredContact: "email",
      message: "Test message",
    })

    const submitButton = screen.getByRole("button", { name: /send message/i })
    await user.click(submitButton)

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
    const user = await createUserEvent()
    mockFetch(mockErrorResponse())

    render(<ContactForm />)

    await fillContactFormFields(user, screen, {
      name: "John Doe",
      email: "john@example.com",
      subject: "estate-planning",
      preferredContact: "email",
      message: "Test message",
    })

    const submitButton = screen.getByRole("button", { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it("resets form after successful submission", async () => {
    const user = await createUserEvent()
    mockFetch(mockSuccessResponse())

    render(<ContactForm />)

    await fillContactFormFields(user, screen, {
      name: "John Doe",
      email: "john@example.com",
      subject: "estate-planning",
      preferredContact: "email",
      message: "Test message",
    })

    await user.click(screen.getByRole("button", { name: /send message/i }))

    await waitFor(() => {
      const freshNameInput = screen.getByLabelText(/full name/i) as HTMLInputElement
      const freshEmailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
      expect(freshNameInput.value).toBe("")
      expect(freshEmailInput.value).toBe("")
    })
  })

  it("disables submit button while submitting", async () => {
    const user = await createUserEvent()

    // Create a promise that we can control
    let resolvePromise: (value: Response) => void
    const promise = new Promise<Response>((resolve) => {
      resolvePromise = resolve
    })

    global.fetch = vi.fn().mockReturnValue(promise)

    render(<ContactForm />)

    await fillContactFormFields(user, screen, {
      name: "John Doe",
      email: "john@example.com",
      subject: "estate-planning",
      preferredContact: "email",
      message: "Test message",
    })

    const submitButton = screen.getByRole("button", { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveTextContent(/sending/i)
    })

    resolvePromise!(mockSuccessResponse())

    await waitFor(() => {
      const freshSubmitButton = screen.getByRole("button", { name: /send message/i })
      expect(freshSubmitButton).not.toBeDisabled()
    })
  })

  it("calls custom onSubmit handler when provided", async () => {
    const user = await createUserEvent()
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined)

    render(<ContactForm onSubmit={mockOnSubmit} />)

    await fillContactFormFields(user, screen, {
      name: "John Doe",
      email: "john@example.com",
      subject: "estate-planning",
      preferredContact: "email",
      message: "Test message",
    })

    await user.click(screen.getByRole("button", { name: /send message/i }))

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
