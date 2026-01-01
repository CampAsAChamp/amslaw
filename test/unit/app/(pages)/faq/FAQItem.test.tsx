import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import FAQItem from "@/app/(pages)/faq/FAQItem"

// Mock framer-motion to simplify testing
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) => (
      <div className={className} data-motion="true" {...props}>
        {children}
      </div>
    ),
    svg: ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) => (
      <svg className={className} data-motion="true" {...props}>
        {children}
      </svg>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe("FAQItem", () => {
  const mockQuestion = "What is estate planning?"
  const mockAnswer = "Estate planning is the process of arranging for the management and disposal of your estate."
  const mockOnToggle = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders question text", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    expect(screen.getByText(mockQuestion)).toBeInTheDocument()
  })

  it("does not show answer when closed", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    expect(screen.queryByText(mockAnswer)).not.toBeInTheDocument()
  })

  it("shows answer when open", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={true} onToggle={mockOnToggle} />)

    expect(screen.getByText(mockAnswer)).toBeInTheDocument()
  })

  it("calls onToggle when button is clicked", async () => {
    const user = userEvent.setup()
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const button = screen.getByRole("button")
    await user.click(button)

    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it("has correct aria-expanded attribute when closed", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-expanded", "false")
  })

  it("has correct aria-expanded attribute when open", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={true} onToggle={mockOnToggle} />)

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-expanded", "true")
  })

  it("renders chevron with motion attributes when open", () => {
    const { container } = render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={true} onToggle={mockOnToggle} />)

    const chevron = container.querySelector("svg")
    expect(chevron).toBeInTheDocument()
    expect(chevron).toHaveAttribute("data-motion", "true")
  })

  it("renders chevron with motion attributes when closed", () => {
    const { container } = render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const chevron = container.querySelector("svg")
    expect(chevron).toBeInTheDocument()
    expect(chevron).toHaveAttribute("data-motion", "true")
  })

  it("renders chevron icon", () => {
    const { container } = render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const chevron = container.querySelector("svg")
    expect(chevron).toBeInTheDocument()
    expect(chevron).toHaveClass("text-primary")
  })

  it("applies correct styling classes to container", () => {
    const { container } = render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv).toHaveClass("rounded-lg")
    expect(outerDiv).toHaveClass("overflow-hidden")
    expect(outerDiv).toHaveClass("bg-surface")
    expect(outerDiv).toHaveAttribute("data-motion", "true")
  })

  it("applies correct styling to button", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("w-full")
    expect(button).toHaveClass("px-6")
    expect(button).toHaveClass("py-4")
    expect(button).toHaveClass("text-left")
    expect(button).toHaveClass("cursor-pointer")
  })

  it("applies correct styling to question heading", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const heading = screen.getByRole("heading", { level: 3 })
    expect(heading).toHaveClass("faq-link-wipe")
    expect(heading).toHaveClass("font-semibold")
    expect(heading).toHaveClass("text-lg")
  })

  it("applies correct styling to answer when visible", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={true} onToggle={mockOnToggle} />)

    const answer = screen.getByText(mockAnswer)
    const answerParagraph = answer as HTMLElement
    expect(answerParagraph).toHaveClass("text-body")
    expect(answerParagraph).toHaveClass("leading-relaxed")
  })

  it("answer section has correct styling", () => {
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={true} onToggle={mockOnToggle} />)

    // Find the div containing the answer
    const answerContainer = screen.getByText(mockAnswer).parentElement as HTMLElement
    expect(answerContainer).toHaveClass("px-6")
    expect(answerContainer).toHaveClass("py-4")
  })

  it("calls onToggle multiple times when clicked multiple times", async () => {
    const user = userEvent.setup()
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const button = screen.getByRole("button")
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(mockOnToggle).toHaveBeenCalledTimes(3)
  })

  it("renders long question text correctly", () => {
    const longQuestion = "This is a very long question that might span multiple lines in the UI. ".repeat(5).trim()
    render(<FAQItem question={longQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    expect(screen.getByText((content) => content.includes(longQuestion))).toBeInTheDocument()
  })

  it("renders long answer text correctly", () => {
    const longAnswer = "This is a very long answer that contains a lot of detailed information. ".repeat(10).trim()
    render(<FAQItem question={mockQuestion} answer={longAnswer} isOpen={true} onToggle={mockOnToggle} />)

    expect(screen.getByText((content) => content.includes(longAnswer))).toBeInTheDocument()
  })

  it("button is keyboard accessible", async () => {
    const user = userEvent.setup()
    render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    const button = screen.getByRole("button")

    // Tab to focus the button
    await user.tab()
    expect(button).toHaveFocus()

    // Press Enter to activate
    await user.keyboard("{Enter}")
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it("toggles between open and closed states correctly", () => {
    const { rerender } = render(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)

    // Initially closed
    expect(screen.queryByText(mockAnswer)).not.toBeInTheDocument()

    // Rerender as open
    rerender(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={true} onToggle={mockOnToggle} />)
    expect(screen.getByText(mockAnswer)).toBeInTheDocument()

    // Rerender as closed again
    rerender(<FAQItem question={mockQuestion} answer={mockAnswer} isOpen={false} onToggle={mockOnToggle} />)
    expect(screen.queryByText(mockAnswer)).not.toBeInTheDocument()
  })
})
