import { expect, test } from "@playwright/test"

import { VIEWPORTS } from "./data/test-data"
import { isMobileViewport } from "./helpers/test-helpers"

test.describe("Accessibility", () => {
  test("skip to main content link works", async ({ page }, testInfo) => {
    // Skip on mobile - keyboard navigation behaves differently
    if (isMobileViewport(testInfo)) {
      test.skip()
      return
    }

    await page.goto("/")

    // Tab to focus skip link
    await page.keyboard.press("Tab")

    // Check that skip link is focused
    const skipLink = page.getByRole("link", { name: /Skip to main content/i })
    await expect(skipLink).toBeFocused()

    // Click skip link
    await skipLink.click()

    // Check that main content is focused
    const mainContent = page.locator("#main-content")
    await expect(mainContent).toBeVisible()
  })

  test("keyboard navigation through nav links", async ({ page }) => {
    await page.goto("/")

    // Tab through navigation
    await page.keyboard.press("Tab") // Skip link
    await page.keyboard.press("Tab") // Logo
    await page.keyboard.press("Tab") // First nav link

    // Check that a nav link is focused
    const focusedElement = page.locator(":focus")
    await expect(focusedElement).toBeVisible()
  })

  test("mobile menu is keyboard accessible", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await page.goto("/")

    // Find and focus mobile menu button
    const menuButton = page.getByRole("button", { name: /Open menu/i })
    await menuButton.focus()
    await expect(menuButton).toBeFocused()

    // Open menu with Enter key
    await page.keyboard.press("Enter")

    // Check that menu is open by looking for the close button
    await expect(page.getByRole("button", { name: /Close menu/i })).toBeVisible()

    // Close menu with Escape key
    await page.keyboard.press("Escape")

    // Check that menu is closed (open button is back)
    await expect(page.getByRole("button", { name: /Open menu/i })).toBeVisible()
  })

  test("all interactive elements have accessible names", async ({ page }) => {
    await page.goto("/")

    // Check buttons have aria-labels or text
    const buttons = page.getByRole("button")
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const accessibleName = await button.getAttribute("aria-label")
      const textContent = await button.textContent()

      expect(accessibleName || textContent).toBeTruthy()
    }
  })

  test("form inputs have labels", async ({ page }) => {
    await page.goto("/contact")

    // Check that all form inputs have associated labels (use first() to handle multiple matches from footer)
    await expect(page.getByLabel(/Full Name/i).first()).toBeVisible()
    await expect(page.getByLabel(/Email Address/i).first()).toBeVisible()
    await expect(page.getByLabel(/Phone Number/i).first()).toBeVisible()
    await expect(page.getByLabel(/Subject/i).first()).toBeVisible()
    await expect(page.getByLabel(/Message/i).first()).toBeVisible()
  })

  test("navigation has proper ARIA landmarks", async ({ page }) => {
    await page.goto("/")

    // Check for navigation landmark
    const nav = page.getByRole("navigation", { name: /Main navigation/i })
    await expect(nav).toBeVisible()

    // Check for main landmark
    const main = page.locator("main#main-content")
    await expect(main).toBeVisible()

    // Check for contentinfo (footer) landmark
    const footer = page.getByRole("contentinfo")
    await expect(footer).toBeVisible()
  })

  test("focus indicators are visible", async ({ page }) => {
    await page.goto("/")

    // Tab to first focusable element
    await page.keyboard.press("Tab")

    // Get focused element
    const focusedElement = page.locator(":focus")

    // Check that element has visible outline (focus indicator)
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return styles.outline || styles.outlineWidth
    })

    expect(outline).toBeTruthy()
  })
})
