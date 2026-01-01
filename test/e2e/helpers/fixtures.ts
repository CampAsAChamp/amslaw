/* eslint-disable react-hooks/rules-of-hooks */
// Playwright's "use" function is not a React hook, but ESLint thinks it is
import { test as base, Page } from "@playwright/test"

// eslint-disable-next-line no-restricted-imports
import { VIEWPORTS } from "../data/test-data"

/**
 * Extended test fixtures with common setup
 */
type CustomFixtures = {
  mobilePage: Page
  desktopPage: Page
}

/**
 * Extend Playwright test with custom fixtures
 */
export const test = base.extend<CustomFixtures>({
  /**
   * Mobile page with pre-configured viewport
   */
  mobilePage: async ({ page }, use) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await use(page)
  },

  /**
   * Desktop page with pre-configured viewport
   */
  desktopPage: async ({ page }, use) => {
    await page.setViewportSize(VIEWPORTS.desktop)
    await use(page)
  },
})

export { expect } from "@playwright/test"
