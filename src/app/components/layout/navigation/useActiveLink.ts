"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook to manage active link state with optimistic UI updates
 *
 * Purpose:
 * Provides immediate visual feedback when a navigation link is clicked,
 * before Next.js actually navigates and updates the pathname. This creates
 * a more responsive user experience by showing the active state instantly.
 *
 * How it works:
 * 1. User clicks a link -> setClickedLink(href) is called
 * 2. getIsActive(href) immediately returns true for that link
 * 3. Link shows active styling (underline/highlight) instantly
 * 4. Next.js navigates and pathname updates
 * 5. useEffect detects pathname matches clickedLink and clears optimistic state
 * 6. Link remains active based on actual pathname match
 *
 * Benefits:
 * - Eliminates perceived lag between click and visual feedback
 * - Improves user experience on slower connections
 * - Works seamlessly with Next.js client-side navigation
 *
 * @param pathname - Current pathname from usePathname()
 * @returns Object with three properties:
 *   - clickedLink: The href of the most recently clicked link (or null)
 *   - setClickedLink: Function to update the clicked link state
 *   - getIsActive: Function to check if a given href is active
 *
 * @example
 * ```tsx
 * const pathname = usePathname()
 * const { setClickedLink, getIsActive } = useActiveLink(pathname)
 *
 * <Link
 *   href="/about"
 *   onClick={() => setClickedLink("/about")}
 *   className={getIsActive("/about") ? "active" : ""}
 * >
 *   About
 * </Link>
 * ```
 */
export function useActiveLink(pathname: string) {
  const [clickedLink, setClickedLink] = useState<string | null>(null)

  // Clear optimistic state when navigation completes
  useEffect(() => {
    if (clickedLink && pathname === clickedLink) {
      setClickedLink(null)
    }
  }, [pathname, clickedLink])

  /**
   * Check if a link is currently active
   *
   * Returns true if either:
   * 1. The current pathname matches the link href (actual active state)
   * 2. The link was just clicked and navigation is in progress (optimistic state)
   *
   * @param href - The link href to check
   * @returns true if the link should display as active
   */
  const getIsActive = (href: string): boolean => {
    return pathname === href || clickedLink === href
  }

  return {
    clickedLink,
    setClickedLink,
    getIsActive,
  }
}
