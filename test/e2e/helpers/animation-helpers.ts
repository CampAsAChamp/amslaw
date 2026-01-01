import { Locator, Page } from "@playwright/test"

/**
 * Wait for a specific element to complete its animation
 * @param page - Playwright page object
 * @param selector - CSS selector or locator for the element
 * @param duration - Expected animation duration in milliseconds (default: 1000ms)
 * @param bufferTime - Additional buffer time after animation (default: 500ms)
 */
export async function waitForAnimation(
  page: Page,
  selector: string | Locator,
  duration: number = 1000,
  bufferTime: number = 500
): Promise<void> {
  const locator = typeof selector === "string" ? page.locator(selector) : selector

  // Wait for element to be visible
  await locator.waitFor({ state: "visible", timeout: 10000 })

  // Wait for animation duration + buffer
  await page.waitForTimeout(duration + bufferTime)
}

/**
 * Wait for all animations on the page to complete
 * Uses multiple strategies to ensure stable state
 * @param page - Playwright page object
 */
export async function waitForAllAnimations(page: Page): Promise<void> {
  // Wait for network to be idle
  await page.waitForLoadState("networkidle")

  // Wait for fonts to load - wrap in try-catch in case of navigation
  try {
    await page.evaluate(() => document.fonts.ready)
  } catch (error) {
    // Context might be destroyed due to navigation, continue anyway
    console.log("Font loading check failed (likely due to navigation):", error)
  }

  // Wait for any pending CSS animations and transitions - wrap in try-catch
  try {
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        // Check if there are any running animations
        const animations = document.getAnimations()

        if (animations.length === 0) {
          resolve()
          return
        }

        // Wait for all animations to finish with a timeout
        Promise.race([
          Promise.all(animations.map((animation) => animation.finished)),
          new Promise<void>((timeoutResolve) => setTimeout(timeoutResolve, 5000)),
        ]).then(() => {
          resolve()
        })
      })
    })
  } catch (error) {
    // Context might be destroyed due to navigation, continue anyway
    console.log("Animation wait failed (likely due to navigation):", error)
  }

  // Additional buffer for any delayed animations
  await page.waitForTimeout(300)
}

/**
 * Check if an element is visible (not hidden with opacity 0 or display none)
 * @param page - Playwright page object
 * @param selector - CSS selector or locator for the element
 * @param minOpacity - Minimum opacity to consider visible (default: 0.5)
 * @returns true if element is visible with sufficient opacity
 */
export async function checkElementVisible(page: Page, selector: string | Locator, minOpacity: number = 0.5): Promise<boolean> {
  const locator = typeof selector === "string" ? page.locator(selector) : selector

  try {
    // Wait for element to be in DOM
    await page.waitForTimeout(200)

    // Check if element exists and is visible with longer timeout
    const isVisible = await locator.isVisible({ timeout: 10000 })
    if (!isVisible) return false

    // Check opacity with retries
    let opacity = 0
    for (let i = 0; i < 5; i++) {
      opacity = await getOpacity(page, selector)
      if (opacity >= minOpacity) return true
      await page.waitForTimeout(500)
    }

    return opacity >= minOpacity
  } catch {
    return false
  }
}

/**
 * Smooth scroll to an element to trigger scroll animations
 * @param page - Playwright page object
 * @param selector - CSS selector or locator for the element
 * @param offset - Additional offset from top in pixels (default: -100)
 */
export async function scrollToElement(page: Page, selector: string | Locator, offset: number = -100): Promise<void> {
  const locator = typeof selector === "string" ? page.locator(selector) : selector

  // Scroll element into view with smooth behavior
  await locator.scrollIntoViewIfNeeded()

  // Add small offset to ensure element is fully in view
  if (offset !== 0) {
    await page.evaluate((offset) => {
      window.scrollBy({ top: offset, behavior: "smooth" })
    }, offset)
  }

  // Wait for scroll to complete
  await page.waitForTimeout(500)
}

/**
 * Get the computed opacity of an element
 * @param page - Playwright page object
 * @param selector - CSS selector or locator for the element
 * @returns opacity value (0-1)
 */
export async function getOpacity(page: Page, selector: string | Locator): Promise<number> {
  const locator = typeof selector === "string" ? page.locator(selector) : selector

  try {
    const opacity = await locator.evaluate((element) => {
      const style = window.getComputedStyle(element)
      return parseFloat(style.opacity)
    })

    return opacity
  } catch {
    return 0
  }
}

/**
 * Wait for page to reach a stable state before taking screenshots or assertions
 * Ensures fonts are loaded, animations complete, and network is idle
 * @param page - Playwright page object
 */
export async function waitForStableState(page: Page): Promise<void> {
  // Wait for initial page load
  await page.waitForLoadState("domcontentloaded")

  // Wait for network to be idle
  await page.waitForLoadState("networkidle")

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready)

  // Wait for images to load
  await page.evaluate(() => {
    const images = Array.from(document.images)
    return Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve())
          img.addEventListener("error", () => resolve()) // Resolve even on error
        })
      })
    )
  })

  // Wait for any CSS animations to complete
  await page.evaluate(() => {
    return new Promise<void>((resolve) => {
      const animations = document.getAnimations()
      if (animations.length === 0) {
        resolve()
        return
      }
      Promise.all(animations.map((animation) => animation.finished)).then(() => {
        resolve()
      })
    })
  })

  // Final buffer to ensure everything is settled
  await page.waitForTimeout(500)
}

/**
 * Wait for an element to animate in by checking opacity changes
 * @param page - Playwright page object
 * @param selector - CSS selector or locator for the element
 * @param maxWaitTime - Maximum time to wait in milliseconds (default: 5000ms)
 * @returns true if element animated in, false if timeout
 */
export async function waitForElementToAnimateIn(page: Page, selector: string | Locator, maxWaitTime: number = 5000): Promise<boolean> {
  const startTime = Date.now()

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const opacity = await getOpacity(page, selector)
      if (opacity >= 0.9) {
        return true
      }
    } catch {
      // Element might not be in DOM yet
    }

    await page.waitForTimeout(100)
  }

  return false
}

/**
 * Check if section has no blank space (all content visible or animating)
 * @param page - Playwright page object
 * @param sectionSelector - CSS selector for the section
 * @returns true if no blank space detected
 */
export async function hasNoBlankSpace(page: Page, sectionSelector: string): Promise<boolean> {
  // Check if section and its children are present
  const section = page.locator(sectionSelector)
  const isVisible = await section.isVisible()

  if (!isVisible) return false

  // Check if section has content
  const hasContent = await section.evaluate((el) => {
    const text = el.textContent || ""
    return text.trim().length > 0
  })

  if (!hasContent) return false

  // Check if section height is reasonable (not collapsed)
  const height = await section.evaluate((el) => el.getBoundingClientRect().height)

  return height > 50 // Reasonable minimum height
}

/**
 * Mask dynamic content in screenshots (dates, times, etc.)
 * @param page - Playwright page object
 * @param selectors - Array of CSS selectors to mask
 */
export async function maskDynamicContent(page: Page, selectors: string[]): Promise<void> {
  for (const selector of selectors) {
    const elements = page.locator(selector)
    const count = await elements.count()

    for (let i = 0; i < count; i++) {
      await elements.nth(i).evaluate((el) => {
        el.style.opacity = "0"
      })
    }
  }
}
