"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { NavLink as NavLinkType } from "@/types"
import { tabIndicatorTransition, navLinkLayoutTransition } from "./animationConfig"

interface NavLinkProps {
  link: NavLinkType
  isActive: boolean
  onClick: () => void
  variant: "desktop" | "mobile"
}

/**
 * Get the appropriate CSS class for a navigation link based on variant and type
 *
 * @param variant - "desktop" or "mobile" - determines the styling variant
 * @param isButton - true for button-styled links (Contact), false for regular links
 * @param isActive - true if the link matches the current route
 * @returns Complete className string for the link element
 *
 * Possible return values:
 * - Desktop button: Blue button with slide animation and gradient hover effect
 * - Desktop link: Text link with underline-wipe animation on hover
 * - Mobile button: Full-width blue button with slide animation
 * - Mobile link: Text link with hover color change, shows primary color when active
 */
function getLinkClassName(variant: "desktop" | "mobile", isButton: boolean, isActive: boolean): string {
  if (variant === "desktop") {
    if (isButton) {
      // Desktop button: Animated button with gradient effect (e.g., Contact link)
      return `btn-nav-animated ${isActive ? "btn-nav-animated-active" : ""} relative`
    }
    // Desktop regular link: Text link with subtle hover animation
    return "nav-link-wipe px-3 py-2 text-sm font-semibold relative"
  }

  // Mobile variant
  if (isButton) {
    // Mobile button: Full-width button with slide animation
    return `btn-nav-mobile-animated ${isActive ? "btn-nav-mobile-animated-active" : ""} relative block`
  }
  // Mobile regular link: Larger text for touch targets, color changes on active
  return `text-nav hover:text-primary-dark block px-3 py-2 text-base font-semibold relative ${
    isActive ? "text-primary" : ""
  }`
}

/**
 * Individual navigation link component with active state indicators
 * Supports both desktop and mobile variants with different styling and animations
 */
export default function NavLink({ link, isActive, onClick, variant }: NavLinkProps) {
  const linkClassName = getLinkClassName(variant, !!link.isButton, isActive)
  const layoutId = variant === "desktop" ? "activeTab" : "activeTabMobile"

  return (
    <Link href={link.href} onClick={onClick} className={linkClassName}>
      {link.label}

      {/* Active indicator for regular links */}
      {isActive && !link.isButton && (
        <motion.div
          layoutId={layoutId}
          className={
            variant === "desktop"
              ? "absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              : "absolute left-0 top-0 bottom-0 w-1 bg-primary"
          }
          transition={tabIndicatorTransition}
        />
      )}

      {/* Active indicator for button links (triangle pointer) */}
      {isActive && link.isButton && (
        <motion.div
          layoutId={layoutId}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-primary"
          transition={tabIndicatorTransition}
        />
      )}
    </Link>
  )
}

/**
 * Wrapper component for desktop nav links with layout animation
 */
export function DesktopNavLink({ link, isActive, onClick }: Omit<NavLinkProps, "variant">) {
  return (
    <motion.div layout transition={navLinkLayoutTransition}>
      <NavLink link={link} isActive={isActive} onClick={onClick} variant="desktop" />
    </motion.div>
  )
}
