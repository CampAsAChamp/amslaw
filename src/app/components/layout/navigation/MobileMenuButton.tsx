/**
 * Props for the MobileMenuButton component
 *
 * @property isOpen - Whether the mobile menu is currently open
 * @property onClick - Callback fired when the button is clicked
 */
interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

/**
 * Animated hamburger menu button for mobile navigation
 *
 * Features:
 * - Three-line hamburger icon that transforms into an X when open
 * - Smooth CSS transitions (300ms ease-in-out)
 * - Accessible with dynamic aria-label
 * - 32px × 32px touch target for mobile usability
 *
 * Animation behavior:
 * - Closed state: Three horizontal lines stacked vertically
 * - Open state: Top and bottom lines rotate and translate to form an X, middle line fades out
 *
 * Accessibility:
 * - Proper aria-label that changes based on state ("Open menu" / "Close menu")
 * - Keyboard accessible button element
 * - Focus outline removed (relies on browser default focus behavior)
 *
 * @example
 * ```tsx
 * <MobileMenuButton
 *   isOpen={isMenuOpen}
 *   onClick={() => setIsMenuOpen(!isMenuOpen)}
 * />
 * ```
 */
export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-8 h-8 flex items-center justify-center focus:outline-none"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {/* 24px × 20px container for the three lines */}
      <div className="w-6 h-5 relative flex flex-col justify-between">
        {/* Top line: Rotates 45deg and moves down to form top of X */}
        <span
          className={`block h-0.5 w-full bg-nav transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-[9px]" : ""}`}
        />
        {/* Middle line: Fades out when open */}
        <span className={`block h-0.5 w-full bg-nav transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`} />
        {/* Bottom line: Rotates -45deg and moves up to form bottom of X */}
        <span
          className={`block h-0.5 w-full bg-nav transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
        />
      </div>
    </button>
  )
}
