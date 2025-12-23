"use client"

import { NavLink } from "@/types"
import { DesktopNavLink } from "./NavLink"

/**
 * Props for the DesktopNav component
 *
 * @property links - Array of navigation links to display
 * @property getIsActive - Function to check if a link is currently active
 * @property onLinkClick - Callback fired when a link is clicked, used for optimistic UI updates
 */
interface DesktopNavProps {
  links: NavLink[]
  getIsActive: (href: string) => boolean
  onLinkClick: (href: string) => void
}

/**
 * Desktop navigation menu component
 *
 * Features:
 * - Horizontal layout with evenly spaced links
 * - Hidden on mobile (md:block breakpoint)
 * - Uses DesktopNavLink wrapper for framer-motion layout animations
 * - Active links show animated underline (regular) or triangle indicator (button)
 * - Smooth shared element transitions between active states
 *
 * Visual behavior:
 * - Regular links: Hover shows underline wipe animation
 * - Button links: Hover shows gradient slide effect
 * - Active indicator animates smoothly when navigating between routes
 *
 * @example
 * ```tsx
 * <DesktopNav
 *   links={navigationLinks}
 *   getIsActive={(href) => pathname === href}
 *   onLinkClick={setClickedLink}
 * />
 * ```
 */
export default function DesktopNav({ links, getIsActive, onLinkClick }: DesktopNavProps) {
  return (
    // Hidden on mobile, visible on md screens and above
    <div className="hidden md:block">
      {/* Horizontal flex container with 2rem spacing between items */}
      <div className="ml-10 flex items-baseline space-x-8">
        {links.map((link) => (
          <DesktopNavLink
            key={link.href}
            link={link}
            isActive={getIsActive(link.href)}
            onClick={() => onLinkClick(link.href)}
          />
        ))}
      </div>
    </div>
  )
}
