import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FormField from "@/app/components/contact/forms/FormField"

describe("FormField", () => {
  const mockOnChange = vi.fn()

  it("renders text input with label and placeholder", () => {
    render(
      <FormField
        id="name"
        name="name"
        label="Full Name"
        type="text"
        value=""
        onChange={mockOnChange}
        placeholder="Enter your name"
      />
    )

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument()
  })

  it("shows required indicator when required prop is true", () => {
    render(<FormField id="email" name="email" label="Email" type="email" value="" onChange={mockOnChange} required />)

    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("handles value changes for text input", async () => {
    const user = userEvent.setup()

    render(<FormField id="name" name="name" label="Name" type="text" value="" onChange={mockOnChange} />)

    const input = screen.getByLabelText("Name")
    await user.type(input, "John")

    expect(mockOnChange).toHaveBeenCalled()
  })

  it("renders textarea with correct rows", () => {
    render(
      <FormField
        id="message"
        name="message"
        label="Message"
        type="textarea"
        value=""
        onChange={mockOnChange}
        rows={10}
      />
    )

    const textarea = screen.getByLabelText("Message")
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute("rows", "10")
  })

  it("renders select with options", () => {
    const options = [
      { value: "", label: "Select option" },
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ]

    render(
      <FormField
        id="subject"
        name="subject"
        label="Subject"
        type="select"
        value=""
        onChange={mockOnChange}
        options={options}
      />
    )

    expect(screen.getByLabelText("Subject")).toBeInTheDocument()
    expect(screen.getByText("Option 1")).toBeInTheDocument()
    expect(screen.getByText("Option 2")).toBeInTheDocument()
  })

  it("handles select value changes", async () => {
    const user = userEvent.setup()
    const options = [
      { value: "", label: "Select" },
      { value: "test", label: "Test Option" },
    ]

    render(
      <FormField
        id="subject"
        name="subject"
        label="Subject"
        type="select"
        value=""
        onChange={mockOnChange}
        options={options}
      />
    )

    const select = screen.getByLabelText("Subject")
    await user.selectOptions(select, "test")

    expect(mockOnChange).toHaveBeenCalled()
  })
})
