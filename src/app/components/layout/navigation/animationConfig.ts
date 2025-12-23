/**
 * Shared framer-motion animation configurations for navigation components
 *
 * This file centralizes all animation timings and configurations to ensure
 * consistent motion design across the navigation system. All durations and
 * easing functions are defined here for easy tuning.
 */

import { Transition } from "framer-motion"

/**
 * Spring animation for active tab indicators (underlines and triangles)
 *
 * Used for:
 * - Desktop nav: Animated underline that moves between active links
 * - Mobile nav: Vertical accent bar and triangle indicators
 * - Button links: Triangle pointer below button
 *
 * Spring physics:
 * - stiffness: 260 (how quickly the spring responds - higher = faster)
 * - damping: 20 (how quickly motion settles - lower = more bounce)
 *
 * Result: Smooth, natural movement with subtle bounce when switching between links
 */
export const tabIndicatorTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
}

/**
 * Layout animation for nav link containers (desktop only)
 *
 * Used for:
 * - DesktopNavLink wrapper motion.div
 * - Ensures smooth repositioning when layout shifts
 *
 * Duration: 200ms with easeInOut for balanced acceleration/deceleration
 */
export const navLinkLayoutTransition: Transition = {
  duration: 0.2,
  ease: "easeInOut",
}

/**
 * Mobile menu container animation (outer layer)
 *
 * Controls the overall mobile menu reveal/hide:
 * - Starts collapsed (height: 0) and transparent (opacity: 0)
 * - Expands to auto height and fades in
 * - Reverses on close
 *
 * Duration: 300ms - Fast enough to feel responsive, slow enough to be smooth
 * Easing: easeInOut - Balanced animation that feels natural
 */
export const mobileMenuContainerAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
}

/**
 * Mobile menu inner content animation (secondary layer)
 *
 * Adds depth to the mobile menu by sliding content down:
 * - Starts 20px above final position
 * - Slides down to natural position
 * - Creates a cascading effect with the container animation
 *
 * This runs simultaneously with mobileMenuContainerAnimation for a
 * multi-layered, polished reveal effect.
 */
export const mobileMenuContentAnimation = {
  initial: { y: -20 },
  animate: { y: 0 },
  exit: { y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" },
}

/**
 * Individual mobile menu item animation factory
 *
 * Creates staggered animations for each menu item:
 * - Items slide in from the left (x: -20 to 0)
 * - Items fade in (opacity: 0 to 1)
 * - Each item delayed by 50ms (index * 0.05s)
 *
 * Stagger effect:
 * - Item 0: 0ms delay
 * - Item 1: 50ms delay
 * - Item 2: 100ms delay
 * - etc.
 *
 * This creates a smooth cascade effect as menu items appear one after another,
 * rather than all at once. Enhances the feeling of intentional, polished UX.
 *
 * @param index - The zero-based index of the menu item (for calculating delay)
 * @returns Animation props object to spread onto motion component
 *
 * @example
 * ```tsx
 * {links.map((link, index) => (
 *   <motion.div {...getMobileMenuItemAnimation(index)}>
 *     <NavLink {...link} />
 *   </motion.div>
 * ))}
 * ```
 */
export const getMobileMenuItemAnimation = (index: number) => ({
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: {
    duration: 0.3,
    delay: index * 0.05,
    ease: "easeOut",
  },
})
