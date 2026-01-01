import { expect, test } from "@playwright/test"

import { waitForAllAnimations, waitForStableState } from "./helpers/animation-helpers"

/**
 * Visual Regression Tests with Anti-Brittleness Strategies
 *
 * These tests use screenshot comparison with generous tolerance thresholds
 * to catch visual regressions while avoiding false positives.
 *
 * Strategies:
 * - Wait for stable state (fonts loaded, animations complete, network idle)
 * - Use maxDiffPixelRatio for flexible comparisons
 * - Run with --repeat-each=2 in CI to catch flaky failures
 * - Focus on major visual changes, not pixel-perfect matching
 *
 * FIRST RUN: Use --update-snapshots to create baseline screenshots
 *   yarn playwright test home-visual-regression --update-snapshots
 *
 * SUBSEQUENT RUNS: Run normally to compare against baselines
 *   yarn playwright test home-visual-regression
 */

// Configuration for screenshot comparison
const screenshotOptions = {
  maxDiffPixelRatio: 0.1, // Allow 10% pixel difference (more forgiving)
  threshold: 0.2, // Allow 20% threshold for color differences (more forgiving)
  animations: "disabled" as const, // Disable CSS animations for consistency
}

test.describe("Homepage Visual Regression Tests", () => {
  test.describe("Large Desktop (1920x1080)", () => {
    test.use({ viewport: { width: 1920, height: 1080 } })

    test("homepage loads with correct initial layout", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      // Take screenshot of full page
      await expect(page).toHaveScreenshot("desktop-1920-full-page.png", {
        ...screenshotOptions,
        fullPage: true,
      })
    })

    test("services section is visible and styled correctly", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      // Screenshot of services section
      const servicesSection = page.locator("section").nth(1)
      await expect(servicesSection).toHaveScreenshot("desktop-1920-services-section.png", screenshotOptions)
    })

    test("hero section displays correctly", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      // Screenshot of hero section
      const heroSection = page.locator("section").first()
      await expect(heroSection).toHaveScreenshot("desktop-1920-hero-section.png", screenshotOptions)
    })
  })

  test.describe("Medium Desktop (1440x900)", () => {
    test.use({ viewport: { width: 1440, height: 900 } })

    test("homepage renders correctly at medium desktop size", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      await expect(page).toHaveScreenshot("desktop-1440-full-page.png", {
        ...screenshotOptions,
        fullPage: true,
      })
    })

    test("services section layout is correct", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      const servicesSection = page.locator("section").nth(1)
      await expect(servicesSection).toHaveScreenshot("desktop-1440-services-section.png", screenshotOptions)
    })
  })

  test.describe("Tablet (768x1024)", () => {
    test.use({ viewport: { width: 768, height: 1024 } })

    test("homepage renders correctly on tablet", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      // Scroll to show more content
      await page.evaluate(() => window.scrollTo({ top: 500, behavior: "auto" }))
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot("tablet-768-scrolled.png", screenshotOptions)
    })

    test("services section adapts to tablet layout", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Scroll to services section
      const servicesSection = page.locator('text="Comprehensive Estate Planning Services"')
      await servicesSection.scrollIntoViewIfNeeded()
      await waitForAllAnimations(page)

      const section = page.locator("section").nth(1)
      await expect(section).toHaveScreenshot("tablet-768-services-section.png", screenshotOptions)
    })
  })

  test.describe("Mobile (375x667)", () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test("homepage renders correctly on mobile", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      await expect(page).toHaveScreenshot("mobile-375-initial.png", screenshotOptions)
    })

    test("services section stacks correctly on mobile", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Scroll to services section
      const servicesSection = page.locator('text="Comprehensive Estate Planning Services"')
      await servicesSection.scrollIntoViewIfNeeded()
      await waitForAllAnimations(page)

      const section = page.locator("section").nth(1)
      await expect(section).toHaveScreenshot("mobile-375-services-section.png", {
        ...screenshotOptions,
        maxDiffPixelRatio: 0.08, // Slightly higher tolerance for mobile due to text wrapping variations
      })
    })

    test("service cards display in single column on mobile", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Scroll to services section
      await page.evaluate(() => window.scrollTo({ top: 800, behavior: "auto" }))
      await page.waitForTimeout(500)
      await waitForAllAnimations(page)

      await expect(page).toHaveScreenshot("mobile-375-service-cards.png", {
        ...screenshotOptions,
        maxDiffPixelRatio: 0.08,
      })
    })
  })

  test.describe("Cross-Browser Consistency", () => {
    test("homepage looks consistent across viewport changes", async ({ page }) => {
      // Test that layout doesn't break when resizing
      await page.goto("/")
      await waitForStableState(page)

      // Start at desktop
      await page.setViewportSize({ width: 1920, height: 1080 })
      await waitForAllAnimations(page)
      await page.waitForTimeout(500)

      // Resize to tablet
      await page.setViewportSize({ width: 768, height: 1024 })
      await waitForAllAnimations(page)
      await page.waitForTimeout(500)

      // Resize to mobile
      await page.setViewportSize({ width: 375, height: 667 })
      await waitForAllAnimations(page)
      await page.waitForTimeout(500)

      // Final screenshot at mobile size
      await expect(page).toHaveScreenshot("responsive-final-mobile.png", {
        ...screenshotOptions,
        maxDiffPixelRatio: 0.1, // Higher tolerance due to multiple resizes
      })
    })
  })

  test.describe("Animation States", () => {
    test("captures page before animations start", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" })

      // Wait for fonts but not animations
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(100)

      // Screenshot should show initial state
      await expect(page).toHaveScreenshot("desktop-pre-animation.png", {
        ...screenshotOptions,
        maxDiffPixelRatio: 0.2, // Higher tolerance for animation timing (20%)
      })
    })

    test("captures page after all animations complete", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      // Extra wait to ensure stability
      await page.waitForTimeout(1000)

      await expect(page).toHaveScreenshot("desktop-post-animation.png", {
        ...screenshotOptions,
        maxDiffPixelRatio: 0.2, // Higher tolerance (20%)
      })
    })
  })

  test.describe("Dark Mode (if applicable)", () => {
    test("homepage renders correctly in dark mode", async ({ page }, testInfo) => {
      // Skip dark mode test for mobile/tablet (toggle in mobile menu)
      if (
        testInfo.project.name === "mobile" ||
        testInfo.project.name === "tablet" ||
        testInfo.project.name === "mobile-android"
      ) {
        test.skip()
        return
      }

      await page.goto("/")
      await waitForStableState(page)

      // Find visible theme toggle (desktop viewports only)
      const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="dark"]').first()
      const exists = await themeToggle.isVisible({ timeout: 2000 }).catch(() => false)

      if (!exists) {
        test.skip()
        return
      }

      await themeToggle.click()

      // Wait for theme to apply and DOM to update
      await page.waitForTimeout(500)
      await page.waitForLoadState("domcontentloaded")

      // Wait for animations to complete
      await waitForAllAnimations(page)

      await expect(page).toHaveScreenshot("desktop-dark-mode.png", {
        ...screenshotOptions,
        fullPage: true,
      })
    })
  })

  test.describe("No Blank Space Verification", () => {
    test("no visible blank spaces on large desktop", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      // Check that sections have reasonable heights (not collapsed)
      const servicesSection = page.locator("section").nth(1)
      const height = await servicesSection.evaluate((el) => el.getBoundingClientRect().height)

      expect(height).toBeGreaterThan(200) // Should have substantial height

      // Visual verification via screenshot
      await expect(servicesSection).toHaveScreenshot("desktop-services-no-blank-space.png", screenshotOptions)
    })

    test("no visible blank spaces on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto("/")
      await waitForStableState(page)

      // Scroll to services
      await page.evaluate(() => window.scrollTo({ top: 600, behavior: "auto" }))
      await page.waitForTimeout(500)
      await waitForAllAnimations(page)

      // Check section height
      const servicesSection = page.locator("section").nth(1)
      const height = await servicesSection.evaluate((el) => el.getBoundingClientRect().height)

      expect(height).toBeGreaterThan(100)

      // Visual verification
      await expect(page).toHaveScreenshot("mobile-services-no-blank-space.png", {
        ...screenshotOptions,
        maxDiffPixelRatio: 0.1,
      })
    })
  })
})
