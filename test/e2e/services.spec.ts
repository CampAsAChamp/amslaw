import { expect, test } from "@playwright/test"

test.describe("Services Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services")
  })

  test("displays page title and hero section", async ({ page }) => {
    await expect(page).toHaveTitle(/Estate Planning Services/i)
    await expect(page.getByRole("heading", { name: /Comprehensive Legal Services/i })).toBeVisible()
  })

  test("displays all service cards", async ({ page }) => {
    // Check for service headings (use first() to handle multiple matches)
    await expect(page.getByRole("heading", { name: /Wills & Testaments/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /Trust Planning/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /^Probate$/i }).first()).toBeVisible()
    await expect(page.getByRole("heading", { name: /Trust Administration/i })).toBeVisible()
  })

  test("displays process section", async ({ page }) => {
    await expect(page.getByText(/My Process/i)).toBeVisible()
  })

  test("displays process steps", async ({ page }) => {
    // Check for numbered steps
    await expect(page.getByText(/Initial Contact/i)).toBeVisible()
    await expect(page.getByText(/Create Your Plan/i)).toBeVisible()
    await expect(page.getByText(/Document Review/i)).toBeVisible()
    await expect(page.getByText(/Sign & Finalize/i)).toBeVisible()
  })

  test("has working contact button", async ({ page }) => {
    const contactButton = page.getByRole("link", { name: /Contact/i }).first()
    await expect(contactButton).toBeVisible()
    await expect(contactButton).toHaveAttribute("href", "/contact")
  })

  test("displays call to action section", async ({ page }) => {
    await expect(page.getByText(/Ready to Secure Your Legacy/i)).toBeVisible()
  })
})
