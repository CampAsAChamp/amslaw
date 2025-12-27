"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { NavLink as NavLinkType } from "@/types"

import { getMobileMenuItemAnimation, mobileMenuContainerAnimation, mobileMenuContentAnimation } from "./animationConfig"
import NavLink from "./NavLink"

/**
 * Props for the MobileNav component
 *
 * @property isOpen - Controls whether the mobile menu is visible
 * @property links - Array of navigation links to display
 * @property getIsActive - Function to check if a link is currently active
 * @property onLinkClick - Callback fired when a link is clicked, used for optimistic UI updates
 * @property onClose - Callback to close the mobile menu (called after link click)
 */
interface MobileNavProps {
  isOpen: boolean
  links: NavLinkType[]
  getIsActive: (href: string) => boolean
  onLinkClick: (href: string) => void
  onClose: () => void
}

/**
 * Mobile navigation menu component
 *
 * Features:
 * - Vertical dropdown menu for mobile devices
 * - Hidden on desktop (md:hidden)
 * - Controlled by parent via isOpen prop
 * - Automatically closes when a link is clicked
 * - Uses framer-motion for smooth enter/exit animations
 *
 * Animation sequence:
 * 1. Container slides down with height/opacity fade (300ms)
 * 2. Inner content animates upward (300ms)
 * 3. Individual links stagger in from left with 50ms delay each (300ms each)
 *
 * Visual behavior:
 * - Regular links: Show vertical accent bar on left when active
 * - Button links: Full-width buttons with triangle indicator when active
 * - Active indicator animates smoothly via shared layoutId
 * - Touch-friendly: Larger text and padding for easier tapping
 *
 * @example
 * ```tsx
 * <MobileNav
 *   isOpen={isMenuOpen}
 *   links={navigationLinks}
 *   getIsActive={(href) => pathname === href}
 *   onLinkClick={setClickedLink}
 *   onClose={() => setIsMenuOpen(false)}
 * />
 * ```
 */
export default function MobileNav({ isOpen, links, getIsActive, onLinkClick, onClose }: MobileNavProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  /**
   * Handle link click: update optimistic state and close menu
   */
  const handleLinkClick = (href: string) => {
    onLinkClick(href)
    onClose()
  }

  /**
   * Focus management: Focus first link when menu opens
   */
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      // Small delay to ensure animation has started
      setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  /**
   * Handle Escape key to close menu
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  /**
   * Trap focus within menu when open
   */
  useEffect(() => {
    if (!isOpen) return

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return

      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements || focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      // Shift + Tab on first element: go to last
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
      // Tab on last element: go to first
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener("keydown", handleTab)
    return () => document.removeEventListener("keydown", handleTab)
  }, [isOpen])

  return (
    // AnimatePresence enables exit animations when isOpen becomes false
    <AnimatePresence>
      {isOpen && (
        // Outer container: Handles height and opacity animation
        <motion.div
          ref={menuRef}
          className="md:hidden overflow-hidden"
          role="dialog"
          aria-label="Mobile navigation menu"
          {...mobileMenuContainerAnimation}
        >
          {/* Inner content wrapper: Slides in from above */}
          <motion.div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface" {...mobileMenuContentAnimation}>
            {/* Each link animates in with staggered delay */}
            {links.map((link, index) => (
              <motion.div key={link.href} {...getMobileMenuItemAnimation(index)}>
                <NavLink
                  link={link}
                  isActive={getIsActive(link.href)}
                  onClick={() => handleLinkClick(link.href)}
                  variant="mobile"
                  ref={index === 0 ? firstLinkRef : undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
