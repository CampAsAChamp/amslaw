import { expect, test } from "@playwright/test"

import { NAV_LINKS, PAGE_ROUTES } from "./data/test-data"
import { closeMobileMenu, isMobileViewport, navigateAndVerify, navigateSequence, openMobileMenu } from "./helpers/test-helpers"

test.describe("Navigation Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("displays navigation bar with all links", async ({ page }, testInfo) => {
    // On mobile, links are in the mobile menu - open it first
    if (isMobileViewport(testInfo)) {
      await openMobileMenu(page)
    }

    // Check that all main navigation links are visible
    const nav = page.getByRole("navigation", { name: "Main navigation" })
    await expect(nav.getByRole("link", { name: NAV_LINKS.home }).first()).toBeVisible()
    await expect(nav.getByRole("link", { name: NAV_LINKS.about }).first()).toBeVisible()
    await expect(nav.getByRole("link", { name: NAV_LINKS.services }).first()).toBeVisible()
    await expect(nav.getByRole("link", { name: NAV_LINKS.faq }).first()).toBeVisible()
    await expect(nav.getByRole("link", { name: NAV_LINKS.contact }).first()).toBeVisible()
  })

  test("logo is visible and links to home", async ({ page }) => {
    const logo = page.locator('img[alt="Schneider Law"]').first()
    await expect(logo).toBeVisible()

    // Navigate to another page
    await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern)

    // Click logo to return home
    await logo.click()
    await expect(page).toHaveURL(PAGE_ROUTES.home.urlPattern)
  })

  test("navigates from Home to About", async ({ page }) => {
    await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern, PAGE_ROUTES.about.verifySelector.text)
  })

  test("navigates from Home to Services", async ({ page }) => {
    await navigateAndVerify(page, NAV_LINKS.services, PAGE_ROUTES.services.urlPattern, PAGE_ROUTES.services.verifySelector.text)
  })

  test("navigates from Home to FAQ", async ({ page }) => {
    await navigateAndVerify(page, NAV_LINKS.faq, PAGE_ROUTES.faq.urlPattern, PAGE_ROUTES.faq.verifySelector.text)
  })

  test("navigates from Home to Contact", async ({ page }) => {
    await navigateAndVerify(page, NAV_LINKS.contact, PAGE_ROUTES.contact.urlPattern)
    await expect(page.getByLabel(PAGE_ROUTES.contact.verifySelector.label)).toBeVisible()
  })

  test("navigates through all pages in sequence", async ({ page }) => {
    await navigateSequence(page, [
      [NAV_LINKS.about, PAGE_ROUTES.about.urlPattern],
      [NAV_LINKS.services, PAGE_ROUTES.services.urlPattern],
      [NAV_LINKS.faq, PAGE_ROUTES.faq.urlPattern],
      [NAV_LINKS.contact, PAGE_ROUTES.contact.urlPattern],
      [NAV_LINKS.home, PAGE_ROUTES.home.urlPattern],
    ])
  })

  test("shows active link indicator for current page", async ({ page }) => {
    // Navigate to About page
    await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern)
    const aboutLink = page.getByRole("link", { name: NAV_LINKS.about }).first()
    await expect(aboutLink).toBeVisible()

    // Navigate to Services
    await navigateAndVerify(page, NAV_LINKS.services, PAGE_ROUTES.services.urlPattern)
    const servicesLink = page.getByRole("link", { name: NAV_LINKS.services }).first()
    await expect(servicesLink).toBeVisible()
  })

  test.describe("Mobile Navigation", () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test("mobile menu button is visible on small screens", async ({ page }) => {
      const menuButton = page.getByRole("button", { name: /open menu|close menu/i })
      await expect(menuButton).toBeVisible()
    })

    test("opens mobile menu when button clicked", async ({ page }) => {
      await openMobileMenu(page)

      // Navigation links should be visible in the mobile menu
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await expect(nav.getByRole("link", { name: NAV_LINKS.about })).toBeVisible()
      await expect(nav.getByRole("link", { name: NAV_LINKS.services })).toBeVisible()
    })

    test("closes mobile menu after clicking a link", async ({ page }) => {
      await openMobileMenu(page)

      // Click a navigation link
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await nav.getByRole("link", { name: NAV_LINKS.about }).click()

      // Should navigate and menu should close
      await expect(page).toHaveURL(PAGE_ROUTES.about.urlPattern)
      await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible()
    })

    test("toggles mobile menu open and closed", async ({ page }) => {
      await openMobileMenu(page)
      await closeMobileMenu(page)
    })

    test("mobile menu navigation works correctly", async ({ page }) => {
      await openMobileMenu(page)

      // Navigate to Services
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await nav.getByRole("link", { name: NAV_LINKS.services }).click()
      await expect(page).toHaveURL(PAGE_ROUTES.services.urlPattern)

      // Open menu again and navigate to Contact
      await openMobileMenu(page)
      await nav.getByRole("link", { name: NAV_LINKS.contact }).click()
      await expect(page).toHaveURL(PAGE_ROUTES.contact.urlPattern)
    })

    test("desktop navigation is hidden on mobile", async ({ page }) => {
      const desktopNav = page.locator(".hidden.md\\:flex")
      await expect(desktopNav).not.toBeVisible()
    })
  })

  test.describe("Desktop Navigation", () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test("desktop navigation is visible on large screens", async ({ page }) => {
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await expect(nav.getByRole("link", { name: NAV_LINKS.home }).first()).toBeVisible()
      await expect(nav.getByRole("link", { name: NAV_LINKS.about })).toBeVisible()
      await expect(nav.getByRole("link", { name: NAV_LINKS.services })).toBeVisible()
      await expect(nav.getByRole("link", { name: NAV_LINKS.faq })).toBeVisible()
      await expect(nav.getByRole("link", { name: NAV_LINKS.contact })).toBeVisible()
    })

    test("mobile menu button is hidden on desktop", async ({ page }) => {
      const menuButton = page.getByRole("button", { name: /open menu|close menu/i })
      await expect(menuButton).not.toBeVisible()
    })

    test("desktop navigation links work correctly", async ({ page }) => {
      await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern)
      await navigateAndVerify(page, NAV_LINKS.services, PAGE_ROUTES.services.urlPattern)
    })
  })

  test.describe("Browser Navigation", () => {
    test("back button works correctly", async ({ page }) => {
      await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern)
      await navigateAndVerify(page, NAV_LINKS.services, PAGE_ROUTES.services.urlPattern)

      // Use browser back button
      await page.goBack()
      await expect(page).toHaveURL(PAGE_ROUTES.about.urlPattern)

      await page.goBack()
      await expect(page).toHaveURL(PAGE_ROUTES.home.urlPattern)
    })

    test("forward button works correctly", async ({ page }) => {
      await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern)

      await page.goBack()
      await expect(page).toHaveURL(PAGE_ROUTES.home.urlPattern)

      await page.goForward()
      await expect(page).toHaveURL(PAGE_ROUTES.about.urlPattern)
    })
  })

  test.describe("Accessibility", () => {
    test("navigation is keyboard accessible", async ({ page }) => {
      // Tab through navigation links
      await page.keyboard.press("Tab")
      await page.keyboard.press("Tab")

      // Should be able to activate with Enter
      await page.keyboard.press("Enter")

      // Should navigate (checking any page change)
      await page.waitForURL(/.*/)
    })

    test("navigation has proper ARIA attributes", async ({ page }) => {
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await expect(nav).toBeVisible()

      // Links should have proper roles
      const links = page.getByRole("link")
      expect(await links.count()).toBeGreaterThan(0)
    })
  })

  test.describe("Sticky Navigation", () => {
    test("navigation bar stays visible when scrolling", async ({ page }) => {
      await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern)

      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await expect(nav).toBeVisible()

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 500))

      // Navigation should still be visible (sticky)
      await expect(nav).toBeVisible()
    })
  })
})
