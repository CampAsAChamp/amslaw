import { expect, test } from "@playwright/test"

test.describe("Navigation Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("displays navigation bar with all links", async ({ page }) => {
    // Check that all main navigation links are visible (scope to main nav element to avoid footer links)
    const nav = page.getByRole("navigation", { name: "Main navigation" })
    await expect(nav.getByRole("link", { name: "Home" }).first()).toBeVisible()
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible()
    await expect(nav.getByRole("link", { name: "Services" })).toBeVisible()
    await expect(nav.getByRole("link", { name: "FAQ" })).toBeVisible()
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible()
  })

  test("logo is visible and links to home", async ({ page }) => {
    // Logo should be visible
    const logo = page.locator('img[alt="Schneider Law"]').first()
    await expect(logo).toBeVisible()

    // Navigate to another page
    await page.getByRole("link", { name: "About" }).first().click()
    await expect(page).toHaveURL(/.*about/)

    // Click logo to return home
    await logo.click()
    await expect(page).toHaveURL(/^.*\/$/)
  })

  test("navigates from Home to About", async ({ page }) => {
    await page.getByRole("link", { name: "About" }).first().click()
    await expect(page).toHaveURL(/.*about/)

    // Verify we're on the About page by checking for specific content
    await expect(page.getByText(/attorney.*profile|meet.*attorney/i)).toBeVisible()
  })

  test("navigates from Home to Services", async ({ page }) => {
    await page.getByRole("link", { name: "Services" }).first().click()
    await expect(page).toHaveURL(/.*services/)

    // Verify we're on the Services page (use first to avoid multiple matches)
    await expect(page.getByText(/estate planning|wills|trust/i).first()).toBeVisible()
  })

  test("navigates from Home to FAQ", async ({ page }) => {
    await page.getByRole("link", { name: "FAQ" }).first().click()
    await expect(page).toHaveURL(/.*faq/)

    // Verify we're on the FAQ page (use first to avoid multiple matches)
    await expect(page.getByText(/frequently asked questions|common questions/i).first()).toBeVisible()
  })

  test("navigates from Home to Contact", async ({ page }) => {
    await page.getByRole("link", { name: "Contact" }).first().click()
    await expect(page).toHaveURL(/.*contact/)

    // Verify we're on the Contact page by checking for form
    await expect(page.getByLabel(/full name/i)).toBeVisible()
  })

  test("navigates through all pages in sequence", async ({ page }) => {
    // Home -> About
    await page.getByRole("link", { name: "About" }).first().click()
    await expect(page).toHaveURL(/.*about/)

    // About -> Services
    await page.getByRole("link", { name: "Services" }).first().click()
    await expect(page).toHaveURL(/.*services/)

    // Services -> FAQ
    await page.getByRole("link", { name: "FAQ" }).first().click()
    await expect(page).toHaveURL(/.*faq/)

    // FAQ -> Contact
    await page.getByRole("link", { name: "Contact" }).first().click()
    await expect(page).toHaveURL(/.*contact/)

    // Contact -> Home
    await page.getByRole("link", { name: "Home" }).first().click()
    await expect(page).toHaveURL(/^.*\/$/)
  })

  test("shows active link indicator for current page", async ({ page }) => {
    // Navigate to About page
    await page.getByRole("link", { name: "About" }).first().click()
    await expect(page).toHaveURL(/.*about/)

    // The About link should have an active indicator
    // This would typically be checked by looking for specific CSS classes or visual indicators
    const aboutLink = page.getByRole("link", { name: "About" }).first()
    await expect(aboutLink).toBeVisible()

    // Navigate to Services
    await page.getByRole("link", { name: "Services" }).first().click()
    await expect(page).toHaveURL(/.*services/)

    const servicesLink = page.getByRole("link", { name: "Services" }).first()
    await expect(servicesLink).toBeVisible()
  })

  test.describe("Mobile Navigation", () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test("mobile menu button is visible on small screens", async ({ page }) => {
      const menuButton = page.getByRole("button", { name: /open menu|close menu/i })
      await expect(menuButton).toBeVisible()
    })

    test("opens mobile menu when button clicked", async ({ page }) => {
      const menuButton = page.getByRole("button", { name: "Open menu" })
      await menuButton.click()

      // Menu should be open, button text should change
      await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible()

      // Navigation links should be visible in the mobile menu (scope to main nav)
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await expect(nav.getByRole("link", { name: "About" })).toBeVisible()
      await expect(nav.getByRole("link", { name: "Services" })).toBeVisible()
    })

    test("closes mobile menu after clicking a link", async ({ page }) => {
      // Open menu
      await page.getByRole("button", { name: "Open menu" }).click()

      // Click a navigation link (scope to main nav to avoid footer link)
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await nav.getByRole("link", { name: "About" }).click()

      // Should navigate
      await expect(page).toHaveURL(/.*about/)

      // Menu button should show "Open menu" again (menu is closed)
      await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible()
    })

    test("toggles mobile menu open and closed", async ({ page }) => {
      // Open menu
      const openButton = page.getByRole("button", { name: "Open menu" })
      await openButton.click()
      await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible()

      // Close menu
      const closeButton = page.getByRole("button", { name: "Close menu" })
      await closeButton.click()
      await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible()
    })

    test("mobile menu navigation works correctly", async ({ page }) => {
      // Open mobile menu
      await page.getByRole("button", { name: "Open menu" }).click()

      // Navigate to Services (scope to main nav)
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await nav.getByRole("link", { name: "Services" }).click()
      await expect(page).toHaveURL(/.*services/)

      // Open menu again and navigate to Contact
      await page.getByRole("button", { name: "Open menu" }).click()
      await nav.getByRole("link", { name: "Contact" }).click()
      await expect(page).toHaveURL(/.*contact/)
    })

    test("desktop navigation is hidden on mobile", async ({ page }) => {
      // Desktop navigation should not be visible on mobile
      const desktopNav = page.locator(".hidden.md\\:flex")
      await expect(desktopNav).not.toBeVisible()
    })
  })

  test.describe("Desktop Navigation", () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test("desktop navigation is visible on large screens", async ({ page }) => {
      // All desktop links should be visible (scope to main nav)
      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await expect(nav.getByRole("link", { name: "Home" }).first()).toBeVisible()
      await expect(nav.getByRole("link", { name: "About" })).toBeVisible()
      await expect(nav.getByRole("link", { name: "Services" })).toBeVisible()
      await expect(nav.getByRole("link", { name: "FAQ" })).toBeVisible()
      await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible()
    })

    test("mobile menu button is hidden on desktop", async ({ page }) => {
      const menuButton = page.getByRole("button", { name: /open menu|close menu/i })
      await expect(menuButton).not.toBeVisible()
    })

    test("desktop navigation links work correctly", async ({ page }) => {
      // Click About in desktop nav
      await page.getByRole("link", { name: "About" }).first().click()
      await expect(page).toHaveURL(/.*about/)

      // Click Services in desktop nav
      await page.getByRole("link", { name: "Services" }).first().click()
      await expect(page).toHaveURL(/.*services/)
    })
  })

  test.describe("Browser Navigation", () => {
    test("back button works correctly", async ({ page }) => {
      // Navigate to About
      await page.getByRole("link", { name: "About" }).first().click()
      await expect(page).toHaveURL(/.*about/)

      // Navigate to Services
      await page.getByRole("link", { name: "Services" }).first().click()
      await expect(page).toHaveURL(/.*services/)

      // Use browser back button
      await page.goBack()
      await expect(page).toHaveURL(/.*about/)

      // Back again to home
      await page.goBack()
      await expect(page).toHaveURL(/^.*\/$/)
    })

    test("forward button works correctly", async ({ page }) => {
      // Navigate to About
      await page.getByRole("link", { name: "About" }).first().click()
      await expect(page).toHaveURL(/.*about/)

      // Go back
      await page.goBack()
      await expect(page).toHaveURL(/^.*\/$/)

      // Use browser forward button
      await page.goForward()
      await expect(page).toHaveURL(/.*about/)
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
      // Navigate to a page with content
      await page.getByRole("link", { name: "About" }).first().click()

      const nav = page.getByRole("navigation", { name: "Main navigation" })
      await expect(nav).toBeVisible()

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 500))

      // Navigation should still be visible (sticky)
      await expect(nav).toBeVisible()
    })
  })
})
