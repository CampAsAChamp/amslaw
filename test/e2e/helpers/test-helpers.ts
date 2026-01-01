import { expect, Locator, Page, TestInfo } from "@playwright/test"

// eslint-disable-next-line no-restricted-imports
import { API_ENDPOINTS, NAV_LINKS } from "../data/test-data"

/**
 * Navigate to a page and verify navigation succeeded
 * @param page - Playwright page object
 * @param linkName - Name of the navigation link to click
 * @param urlPattern - Expected URL pattern after navigation
 * @param verifyText - Optional text to verify on the destination page
 */
export async function navigateAndVerify(page: Page, linkName: string, urlPattern: RegExp, verifyText?: RegExp): Promise<void> {
  // Click the navigation link (use first() to handle multiple matches)
  await page.getByRole("link", { name: linkName }).first().click()

  // Verify URL changed
  await expect(page).toHaveURL(urlPattern)

  // Verify page content if specified
  if (verifyText) {
    await expect(page.getByText(verifyText).first()).toBeVisible()
  }
}

/**
 * Open the mobile menu
 * @param page - Playwright page object
 */
export async function openMobileMenu(page: Page): Promise<void> {
  const menuButton = page.getByRole("button", { name: /Open menu/i })
  await menuButton.click()

  // Wait for menu to open
  await expect(page.getByRole("button", { name: /Close menu/i })).toBeVisible()
  await page.waitForTimeout(500) // Allow animation to complete
}

/**
 * Close the mobile menu
 * @param page - Playwright page object
 */
export async function closeMobileMenu(page: Page): Promise<void> {
  const closeButton = page.getByRole("button", { name: /Close menu/i })
  await closeButton.click()

  // Wait for menu to close
  await expect(page.getByRole("button", { name: /Open menu/i })).toBeVisible()
  await page.waitForTimeout(500) // Allow animation to complete
}

/**
 * Check if test is running in mobile viewport
 * @param testInfo - Playwright test info object
 * @returns true if mobile viewport
 */
export function isMobileViewport(testInfo: TestInfo): boolean {
  return testInfo.project.name === "mobile" || testInfo.project.name === "mobile-android"
}

/**
 * Mock the contact form API endpoint
 * @param page - Playwright page object
 * @param success - Whether the submission should succeed
 * @param delay - Optional delay in milliseconds
 */
export async function mockContactFormSubmit(page: Page, success: boolean = true, delay: number = 0): Promise<void> {
  await page.route(API_ENDPOINTS.contact, async (route) => {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    if (success) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, messageId: "mock-id" }),
      })
    } else {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal server error" }),
      })
    }
  })
}

/**
 * Fill the contact form with provided data
 * @param page - Playwright page object
 * @param data - Form data to fill
 */
export async function fillContactForm(
  page: Page,
  data: {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
    preferredContact: string
  }
): Promise<void> {
  await page.getByLabel("Full Name").fill(data.name)
  await page.getByRole("textbox", { name: /Email Address/i }).fill(data.email)

  if (data.phone) {
    await page.getByRole("textbox", { name: /Phone Number/i }).fill(data.phone)
  }

  await page.getByLabel("Subject").selectOption(data.subject)
  await page.getByLabel("Preferred Contact Method").selectOption(data.preferredContact)
  await page.getByLabel("Message").fill(data.message)
}

/**
 * Verify all contact form fields are cleared
 * @param page - Playwright page object
 * @param timeout - Optional timeout in milliseconds
 */
export async function expectFormCleared(page: Page, timeout: number = 15000): Promise<void> {
  await expect(page.getByLabel("Full Name")).toHaveValue("", { timeout })
  await expect(page.getByRole("textbox", { name: /Email Address/i })).toHaveValue("", { timeout })
  await expect(page.getByRole("textbox", { name: /Phone Number/i })).toHaveValue("", { timeout })
  await expect(page.getByLabel("Message")).toHaveValue("", { timeout })
}

/**
 * Find a navigation link scoped to the main navigation
 * @param page - Playwright page object
 * @param linkName - Name of the link to find
 * @returns Locator for the navigation link
 */
export function findInNav(page: Page, linkName: keyof typeof NAV_LINKS): Locator {
  const nav = page.getByRole("navigation", { name: "Main navigation" })
  return nav.getByRole("link", { name: NAV_LINKS[linkName] })
}

/**
 * Navigate to a page and wait for it to be ready
 * Includes waiting for network idle and fonts to load
 * @param page - Playwright page object
 * @param path - Path to navigate to
 */
export async function gotoAndWait(page: Page, path: string): Promise<void> {
  await page.goto(path)
  await page.waitForLoadState("networkidle")
  await page.evaluate(() => document.fonts.ready)
}

/**
 * Click a link and wait for navigation to complete
 * @param page - Playwright page object
 * @param linkName - Name of the link to click
 * @param scope - Optional scope (e.g., 'main navigation')
 */
export async function clickLinkAndWait(page: Page, linkName: string, scope?: string): Promise<void> {
  let link: Locator

  if (scope) {
    const container = page.getByRole("navigation", { name: scope })
    link = container.getByRole("link", { name: linkName })
  } else {
    link = page.getByRole("link", { name: linkName }).first()
  }

  await link.click()
  await page.waitForLoadState("networkidle")
}

/**
 * Submit the contact form and wait for button to return to normal state
 * @param page - Playwright page object
 */
export async function submitContactForm(page: Page): Promise<void> {
  const submitButton = page.getByRole("button", { name: /send message/i })
  await submitButton.click()

  // Wait for button to return to normal state (not "Sending...")
  await expect(submitButton).toContainText(/^Send Message$/, { timeout: 10000 })

  // Additional wait for state updates to propagate
  await page.waitForTimeout(500)
}

/**
 * Check if a mobile menu button is visible
 * @param page - Playwright page object
 * @returns true if mobile menu button is visible
 */
export async function isMobileMenuVisible(page: Page): Promise<boolean> {
  const menuButton = page.getByRole("button", { name: /open menu|close menu/i })
  return await menuButton.isVisible()
}

/**
 * Navigate through sequence of pages
 * @param page - Playwright page object
 * @param sequence - Array of [linkName, urlPattern] tuples
 */
export async function navigateSequence(page: Page, sequence: Array<[string, RegExp]>): Promise<void> {
  for (const [linkName, urlPattern] of sequence) {
    await page.getByRole("link", { name: linkName }).first().click()
    await expect(page).toHaveURL(urlPattern)
  }
}
