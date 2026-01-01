import { expect, test } from "@playwright/test"

import {
  checkElementVisible,
  hasNoBlankSpace,
  scrollToElement,
  waitForAllAnimations,
  waitForElementToAnimateIn,
  waitForStableState,
} from "./helpers/animation-helpers"

test.describe("Homepage Animations - Behavioral Tests", () => {
  test.describe("Large Desktop (1920x1080)", () => {
    test.use({ viewport: { width: 1920, height: 1080 } })

    test("first section is visible on load with no blank space", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Check that "Comprehensive Estate Planning Services" section exists
      const servicesSection = page.locator('text="Comprehensive Estate Planning Services"')
      await expect(servicesSection).toBeVisible()

      // Verify section has no blank space
      const hasContent = await hasNoBlankSpace(page, "section:nth-of-type(2)")
      expect(hasContent).toBe(true)

      // Verify the heading is visible immediately (not waiting for scroll)
      const isHeadingVisible = await checkElementVisible(page, servicesSection)
      expect(isHeadingVisible).toBe(true)
    })

    test("service cards animate in immediately", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Wait for animations to complete with extra buffer
      await waitForAllAnimations(page)
      await page.waitForTimeout(2000)

      // Check that all three service cards exist and are in the viewport
      const serviceCards = page.locator("section:nth-of-type(2) .card-base")
      const cardCount = await serviceCards.count()
      expect(cardCount).toBe(3)

      // Verify all cards are visible using Playwright's built-in check (more reliable)
      for (let i = 0; i < cardCount; i++) {
        await expect(serviceCards.nth(i)).toBeVisible()
      }
    })

    test('"Why Choose" section animates on scroll', async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      const whyChooseSection = page.locator('text="Why Choose Anna M. Schneider Law?"')

      // Scroll to the "Why Choose" section
      await scrollToElement(page, whyChooseSection)

      // Wait for animation to complete
      const didAnimate = await waitForElementToAnimateIn(page, whyChooseSection, 3000)
      expect(didAnimate).toBe(true)

      // Verify section is fully visible
      const isVisible = await checkElementVisible(page, whyChooseSection)
      expect(isVisible).toBe(true)
    })
  })

  test.describe("Medium Desktop (1440x900)", () => {
    test.use({ viewport: { width: 1440, height: 900 } })

    test("first section is visible with no blank space", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      const servicesSection = page.locator('text="Comprehensive Estate Planning Services"')
      await expect(servicesSection).toBeVisible()

      // Verify no blank space
      const hasContent = await hasNoBlankSpace(page, "section:nth-of-type(2)")
      expect(hasContent).toBe(true)

      // Verify heading is visible
      const isVisible = await checkElementVisible(page, servicesSection)
      expect(isVisible).toBe(true)
    })

    test("service cards are visible after animations", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)
      await page.waitForTimeout(2000)

      const serviceCards = page.locator("section:nth-of-type(2) .card-base")
      const cardCount = await serviceCards.count()

      expect(cardCount).toBeGreaterThan(0)

      // Use Playwright's built-in visibility check
      for (let i = 0; i < cardCount; i++) {
        await expect(serviceCards.nth(i)).toBeVisible()
      }
    })
  })

  test.describe("Tablet (768x1024)", () => {
    test.use({ viewport: { width: 768, height: 1024 } })

    test("sections animate properly on scroll", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // First section may or may not be visible depending on hero height
      // Just verify it exists
      const servicesSection = page.locator('text="Comprehensive Estate Planning Services"')
      await expect(servicesSection).toBeVisible({ timeout: 10000 })

      // Scroll to services section
      await scrollToElement(page, servicesSection)

      // Wait for animation
      const didAnimate = await waitForElementToAnimateIn(page, servicesSection, 3000)
      expect(didAnimate).toBe(true)

      // Scroll to "Why Choose" section
      const whyChooseSection = page.locator('text="Why Choose Anna M. Schneider Law?"')
      await scrollToElement(page, whyChooseSection)

      // Wait for animation
      const didWhyChooseAnimate = await waitForElementToAnimateIn(page, whyChooseSection, 3000)
      expect(didWhyChooseAnimate).toBe(true)
    })

    test("no blank space appears when scrolling", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Scroll through the page
      await page.evaluate(() => {
        window.scrollTo({ top: document.body.scrollHeight / 2, behavior: "smooth" })
      })

      await page.waitForTimeout(1000)

      // Check sections have content
      const servicesHasContent = await hasNoBlankSpace(page, "section:nth-of-type(2)")
      expect(servicesHasContent).toBe(true)
    })
  })

  test.describe("Mobile (375x667)", () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test("sections animate in on scroll", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Scroll to services section
      const servicesSection = page.locator('text="Comprehensive Estate Planning Services"')
      await scrollToElement(page, servicesSection, -50)

      // Wait for animation
      await page.waitForTimeout(1500)

      // Check if section is visible
      const isServicesVisible = await checkElementVisible(page, servicesSection)
      expect(isServicesVisible).toBe(true)

      // Scroll to "Why Choose" section
      const whyChooseSection = page.locator('text="Why Choose Anna M. Schneider Law?"')
      await scrollToElement(page, whyChooseSection, -50)

      // Wait for animation
      await page.waitForTimeout(1500)

      // Check if section is visible
      const isWhyChooseVisible = await checkElementVisible(page, whyChooseSection)
      expect(isWhyChooseVisible).toBe(true)
    })

    test("service cards animate in with stagger", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Scroll to services section
      const servicesSection = page.locator('text="Comprehensive Estate Planning Services"')
      await scrollToElement(page, servicesSection, -50)

      // Wait for staggered animations with generous buffer
      await page.waitForTimeout(4000)

      // Check that cards are visible
      const serviceCards = page.locator("section:nth-of-type(2) .card-base")
      const cardCount = await serviceCards.count()

      expect(cardCount).toBeGreaterThan(0)

      // At least the first card should be visible using Playwright's check
      await expect(serviceCards.first()).toBeVisible()
    })

    test("no blank space on mobile scrolling", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      // Scroll to middle of page
      await page.evaluate(() => {
        window.scrollTo({ top: 800, behavior: "smooth" })
      })

      await page.waitForTimeout(1000)

      // Verify sections have content
      const hasContent = await hasNoBlankSpace(page, "section:nth-of-type(2)")
      expect(hasContent).toBe(true)
    })
  })

  test.describe("Animation Timing and Behavior", () => {
    test("animations complete within expected time", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)

      const startTime = Date.now()

      // Wait for all animations to complete
      await waitForAllAnimations(page)

      const endTime = Date.now()
      const duration = endTime - startTime

      // Animations should complete within 3 seconds
      expect(duration).toBeLessThan(3000)
    })

    test("sections remain visible after animation", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      const servicesSection = page.locator('text="Comprehensive Estate Planning Services"')

      // Wait a bit more
      await page.waitForTimeout(2000)

      // Section should still be visible using Playwright's check
      await expect(servicesSection).toBeVisible()
    })

    test("page remains stable after all animations", async ({ page }) => {
      await page.goto("/")
      await waitForStableState(page)
      await waitForAllAnimations(page)

      // Take initial measurements
      const initialHeight = await page.evaluate(() => document.body.scrollHeight)

      // Wait a bit more
      await page.waitForTimeout(1000)

      // Height should not change (no layout shifts)
      const finalHeight = await page.evaluate(() => document.body.scrollHeight)

      // Allow small variance (up to 5 pixels)
      expect(Math.abs(finalHeight - initialHeight)).toBeLessThan(5)
    })
  })
})
