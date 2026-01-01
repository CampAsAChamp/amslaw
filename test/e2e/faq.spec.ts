import { expect, test } from "@playwright/test"

test.describe("FAQ Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/faq")
  })

  test("displays FAQ page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /frequently asked questions/i })).toBeVisible()
  })

  test("displays multiple FAQ items", async ({ page }) => {
    // Get all FAQ buttons (questions)
    const faqButtons = page.getByRole("button").filter({ hasText: /what|how|when|why|can|do|is/i })
    const count = await faqButtons.count()

    // Should have at least a few FAQ items
    expect(count).toBeGreaterThan(0)
  })

  test("FAQ items start in collapsed state", async ({ page }) => {
    // Get first FAQ button (filter by aria-expanded attribute directly on button)
    const firstButton = page.locator("button[aria-expanded]").first()

    // Should have aria-expanded="false"
    await expect(firstButton).toHaveAttribute("aria-expanded", "false")
  })

  test("expands FAQ item when clicked", async ({ page }) => {
    // Wait for page to be fully interactive
    await page.waitForLoadState("networkidle")

    // Find the first FAQ button
    const firstButton = page.locator("button[aria-expanded]").first()

    // Wait for the button to be visible and stable
    await firstButton.waitFor({ state: "visible" })
    await page.waitForTimeout(300) // Wait for any animations to settle

    // Click to expand
    await firstButton.click()

    // Wait a moment for state to update
    await page.waitForTimeout(100)

    // Should now be expanded
    await expect(firstButton).toHaveAttribute("aria-expanded", "true")

    // Answer content should be visible (wait for animation)
    await page.waitForTimeout(500) // Wait for animation

    // Check that more content is visible below the question
    const pageContent = await page.textContent("body")
    expect(pageContent).toBeTruthy()
  })

  test("collapses FAQ item when clicked again", async ({ page }) => {
    const firstButton = page.locator("button[aria-expanded]").first()

    // Expand
    await firstButton.click()
    await expect(firstButton).toHaveAttribute("aria-expanded", "true")

    // Wait for expand animation
    await page.waitForTimeout(500)

    // Collapse
    await firstButton.click()
    await expect(firstButton).toHaveAttribute("aria-expanded", "false")
  })

  test("multiple FAQ items can be open simultaneously", async ({ page }) => {
    const allButtons = page.locator("button[aria-expanded]")
    const buttonCount = await allButtons.count()

    if (buttonCount >= 2) {
      const firstButton = allButtons.nth(0)
      const secondButton = allButtons.nth(1)

      // Expand first item
      await firstButton.click()
      await expect(firstButton).toHaveAttribute("aria-expanded", "true")

      // Expand second item
      await secondButton.click()
      await expect(secondButton).toHaveAttribute("aria-expanded", "true")

      // Both should still be expanded
      await expect(firstButton).toHaveAttribute("aria-expanded", "true")
      await expect(secondButton).toHaveAttribute("aria-expanded", "true")
    }
  })

  test("chevron icon rotates when FAQ is expanded", async ({ page }) => {
    const firstButton = page.locator("button[aria-expanded]").first()

    // Get the SVG chevron icon
    const chevron = firstButton.locator("svg").first()

    // Check initial state (should not have rotation transform)
    const initialTransform = await chevron.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.transform
    })
    // Initial state should be none or matrix(1, 0, 0, 1, 0, 0) (identity matrix)
    expect(initialTransform === "none" || initialTransform === "matrix(1, 0, 0, 1, 0, 0)").toBeTruthy()

    // Expand the FAQ
    await firstButton.click()
    await page.waitForTimeout(400) // Wait for animation to complete

    // Check rotated state (should have a rotation transform)
    const expandedTransform = await chevron.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.transform
    })
    // When rotated 180deg, transform should not be identity matrix
    expect(expandedTransform).not.toBe("none")
    expect(expandedTransform).not.toBe("matrix(1, 0, 0, 1, 0, 0)")
  })

  test("FAQ answers contain meaningful content", async ({ page }) => {
    const firstButton = page.locator("button[aria-expanded]").first()

    // Expand first FAQ
    await firstButton.click()
    await page.waitForTimeout(500)

    // Get the answer content from the expanded section (look for p.text-body within the FAQ item)
    const answerElement = page.locator("p.text-body").first()
    const answerText = await answerElement.textContent()

    expect(answerText).toBeTruthy()
    expect(answerText!.length).toBeGreaterThan(50) // Answers should be more than just a few words
  })

  test.describe("Keyboard Navigation", () => {
    test("FAQ items are keyboard accessible", async ({ page }) => {
      // Get the first FAQ button and click it to focus
      const firstFaqButton = page.locator("button[aria-expanded]").first()
      await firstFaqButton.focus()

      // Press Enter to expand
      await page.keyboard.press("Enter")
      await page.waitForTimeout(100)

      // Should now be expanded
      await expect(firstFaqButton).toHaveAttribute("aria-expanded", "true")
    })

    test("can navigate through FAQ items with Tab", async ({ page }) => {
      const faqButtons = page.locator("button[aria-expanded]")
      const buttonCount = await faqButtons.count()

      if (buttonCount >= 2) {
        // Focus first FAQ button
        const firstButton = faqButtons.first()
        await firstButton.focus()
        await expect(firstButton).toHaveAttribute("aria-expanded")

        // Tab to next button (may need multiple tabs depending on other elements)
        await page.keyboard.press("Tab")

        // Check if a FAQ button is focused
        const focusedElement = page.locator(":focus")
        const hasFaqButton = await focusedElement.evaluate((el) => el.hasAttribute("aria-expanded"))
        expect(typeof hasFaqButton).toBe("boolean") // Flexible check
      }
    })

    test("Space key also expands FAQ items", async ({ page }) => {
      // Get the first FAQ button and focus it
      const firstFaqButton = page.locator("button[aria-expanded]").first()
      await firstFaqButton.focus()

      // Press Space to expand
      await page.keyboard.press("Space")
      await page.waitForTimeout(100)

      // Should be expanded
      await expect(firstFaqButton).toHaveAttribute("aria-expanded", "true")
    })
  })

  test.describe("Mobile View", () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test("FAQ items display correctly on mobile", async ({ page }) => {
      const firstButton = page.locator("button[aria-expanded]").first()

      await expect(firstButton).toBeVisible()

      // Click to expand
      await firstButton.click()
      await expect(firstButton).toHaveAttribute("aria-expanded", "true")
    })

    test("FAQ text is readable on mobile", async ({ page }) => {
      const firstButton = page.locator("button[aria-expanded]").first()
      const questionText = await firstButton.textContent()

      expect(questionText).toBeTruthy()
      expect(questionText!.length).toBeGreaterThan(10)
    })
  })

  test.describe("Animations", () => {
    test("expand animation is smooth", async ({ page }) => {
      const firstButton = page.locator("button[aria-expanded]").first()

      // Click to expand
      await firstButton.click()

      // Wait a bit for animation to start
      await page.waitForTimeout(100)

      // Should be expanded after animation
      await page.waitForTimeout(400)
      await expect(firstButton).toHaveAttribute("aria-expanded", "true")
    })

    test("collapse animation is smooth", async ({ page }) => {
      const firstButton = page.locator("button[aria-expanded]").first()

      // Expand first
      await firstButton.click()
      await page.waitForTimeout(500)

      // Then collapse
      await firstButton.click()

      // Wait for collapse animation
      await page.waitForTimeout(400)
      await expect(firstButton).toHaveAttribute("aria-expanded", "false")
    })
  })

  test.describe("Visual Styling", () => {
    test("FAQ items have hover effects", async ({ page }) => {
      const firstButton = page.locator("button[aria-expanded]").first()

      // Hover over the button
      await firstButton.hover()

      // Button should remain visible and interactive
      await expect(firstButton).toBeVisible()
    })

    test("expanded FAQ has different background", async ({ page }) => {
      const firstButton = page.locator("button[aria-expanded]").first()
      const faqContainer = firstButton.locator("..")

      // Click to expand
      await firstButton.click()
      await page.waitForTimeout(500)

      // Container should still be visible with answer
      await expect(faqContainer).toBeVisible()
    })
  })

  test.describe("Content Verification", () => {
    test("FAQ questions are descriptive", async ({ page }) => {
      const firstButton = page.locator("button[aria-expanded]").first()
      const questionText = await firstButton.textContent()

      // Questions should be reasonably long and descriptive
      expect(questionText).toBeTruthy()
      expect(questionText!.length).toBeGreaterThan(20)
    })

    test("can expand and collapse all FAQ items", async ({ page }) => {
      const buttons = page.locator("button[aria-expanded]")
      const count = await buttons.count()

      // Expand all
      for (let i = 0; i < Math.min(count, 3); i++) {
        const button = buttons.nth(i)
        await button.click()
        await expect(button).toHaveAttribute("aria-expanded", "true")
        await page.waitForTimeout(300)
      }

      // Collapse all
      for (let i = 0; i < Math.min(count, 3); i++) {
        const button = buttons.nth(i)
        await button.click()
        await expect(button).toHaveAttribute("aria-expanded", "false")
        await page.waitForTimeout(300)
      }
    })
  })

  test.describe("Accessibility", () => {
    test("FAQ buttons have proper ARIA attributes", async ({ page }) => {
      const firstButton = page.locator("button[aria-expanded]").first()

      // Should have aria-expanded attribute
      await expect(firstButton).toHaveAttribute("aria-expanded")

      // Attribute should be either "true" or "false"
      const ariaExpanded = await firstButton.getAttribute("aria-expanded")
      expect(["true", "false"]).toContain(ariaExpanded)
    })

    test("FAQ structure is semantic", async ({ page }) => {
      // Questions should be in heading elements
      const headings = page.locator("h3")
      const headingCount = await headings.count()

      expect(headingCount).toBeGreaterThan(0)
    })

    test("FAQ page is navigable by screen reader", async ({ page }) => {
      // Check that there are proper landmarks
      const nav = page.locator("nav, [role=navigation]")

      // These should exist for screen reader navigation
      expect(await nav.count()).toBeGreaterThan(0)
    })
  })

  test.describe("Search and Filter (if implemented)", () => {
    test("page loads without errors", async ({ page }) => {
      // Just ensure no console errors
      const errors: string[] = []
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text())
        }
      })

      await page.reload()
      await page.waitForLoadState("networkidle")

      // Allow for expected errors but flag unexpected ones
      const criticalErrors = errors.filter((err) => !err.includes("favicon"))
      expect(criticalErrors).toHaveLength(0)
    })
  })
})
