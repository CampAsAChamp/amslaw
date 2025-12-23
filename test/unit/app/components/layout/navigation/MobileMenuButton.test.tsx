import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MobileMenuButton from "@/app/components/layout/navigation/MobileMenuButton"

describe("MobileMenuButton", () => {
  const mockOnClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders button element", () => {
    render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("has correct aria-label when closed", () => {
    render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-label", "Open menu")
  })

  it("has correct aria-label when open", () => {
    render(<MobileMenuButton isOpen={true} onClick={mockOnClick} />)

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-label", "Close menu")
  })

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup()
    render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

    const button = screen.getByRole("button")
    await user.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("renders three line elements", () => {
    const { container } = render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

    const lines = container.querySelectorAll("span")
    expect(lines).toHaveLength(3)
  })

  describe("Closed state (hamburger icon)", () => {
    it("does not apply rotation to top line", () => {
      const { container } = render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      const lines = container.querySelectorAll("span")
      const topLine = lines[0]
      expect(topLine).not.toHaveClass("rotate-45")
      expect(topLine).not.toHaveClass("translate-y-[9px]")
    })

    it("shows middle line with full opacity", () => {
      const { container } = render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      const lines = container.querySelectorAll("span")
      const middleLine = lines[1]
      expect(middleLine).not.toHaveClass("opacity-0")
    })

    it("does not apply rotation to bottom line", () => {
      const { container } = render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      const lines = container.querySelectorAll("span")
      const bottomLine = lines[2]
      expect(bottomLine).not.toHaveClass("-rotate-45")
      expect(bottomLine).not.toHaveClass("-translate-y-[9px]")
    })
  })

  describe("Open state (X icon)", () => {
    it("applies rotation and translation to top line", () => {
      const { container } = render(<MobileMenuButton isOpen={true} onClick={mockOnClick} />)

      const lines = container.querySelectorAll("span")
      const topLine = lines[0]
      expect(topLine).toHaveClass("rotate-45")
      expect(topLine).toHaveClass("translate-y-[9px]")
    })

    it("hides middle line", () => {
      const { container } = render(<MobileMenuButton isOpen={true} onClick={mockOnClick} />)

      const lines = container.querySelectorAll("span")
      const middleLine = lines[1]
      expect(middleLine).toHaveClass("opacity-0")
    })

    it("applies rotation and translation to bottom line", () => {
      const { container } = render(<MobileMenuButton isOpen={true} onClick={mockOnClick} />)

      const lines = container.querySelectorAll("span")
      const bottomLine = lines[2]
      expect(bottomLine).toHaveClass("-rotate-45")
      expect(bottomLine).toHaveClass("-translate-y-[9px]")
    })
  })

  describe("Styling", () => {
    it("applies correct base styles to button", () => {
      render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      const button = screen.getByRole("button")
      expect(button).toHaveClass("relative")
      expect(button).toHaveClass("w-8")
      expect(button).toHaveClass("h-8")
      expect(button).toHaveClass("flex")
      expect(button).toHaveClass("items-center")
      expect(button).toHaveClass("justify-center")
      expect(button).toHaveClass("focus:outline-none")
    })

    it("applies correct styles to line container", () => {
      const { container } = render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      const lineContainer = container.querySelector(".w-6")
      expect(lineContainer).toHaveClass("w-6")
      expect(lineContainer).toHaveClass("h-5")
      expect(lineContainer).toHaveClass("relative")
      expect(lineContainer).toHaveClass("flex")
      expect(lineContainer).toHaveClass("flex-col")
      expect(lineContainer).toHaveClass("justify-between")
    })

    it("applies correct styles to all lines", () => {
      const { container } = render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      const lines = container.querySelectorAll("span")
      lines.forEach((line) => {
        expect(line).toHaveClass("block")
        expect(line).toHaveClass("h-0.5")
        expect(line).toHaveClass("w-full")
        expect(line).toHaveClass("bg-nav")
        expect(line).toHaveClass("transition-all")
        expect(line).toHaveClass("duration-300")
        expect(line).toHaveClass("ease-in-out")
      })
    })
  })

  describe("Transitions", () => {
    it("toggles between states", () => {
      const { container, rerender } = render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      const lines = container.querySelectorAll("span")
      const topLine = lines[0]
      const middleLine = lines[1]

      // Initially closed
      expect(topLine).not.toHaveClass("rotate-45")
      expect(middleLine).not.toHaveClass("opacity-0")

      // Rerender as open
      rerender(<MobileMenuButton isOpen={true} onClick={mockOnClick} />)
      expect(topLine).toHaveClass("rotate-45")
      expect(middleLine).toHaveClass("opacity-0")

      // Rerender as closed again
      rerender(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)
      expect(topLine).not.toHaveClass("rotate-45")
      expect(middleLine).not.toHaveClass("opacity-0")
    })
  })

  describe("Keyboard accessibility", () => {
    it("is keyboard accessible with Enter key", async () => {
      const user = userEvent.setup()
      render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      const button = screen.getByRole("button")

      // Tab to focus the button
      await user.tab()
      expect(button).toHaveFocus()

      // Press Enter
      await user.keyboard("{Enter}")
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it("is keyboard accessible with Space key", async () => {
      const user = userEvent.setup()
      render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

      // Tab to focus the button
      await user.tab()

      // Press Space
      await user.keyboard(" ")
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  it("handles multiple clicks", async () => {
    const user = userEvent.setup()
    render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

    const button = screen.getByRole("button")

    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(3)
  })

  it("aria-label updates when isOpen changes", () => {
    const { rerender } = render(<MobileMenuButton isOpen={false} onClick={mockOnClick} />)

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-label", "Open menu")

    rerender(<MobileMenuButton isOpen={true} onClick={mockOnClick} />)
    expect(button).toHaveAttribute("aria-label", "Close menu")
  })
})
