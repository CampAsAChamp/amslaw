import { expect, test } from "@playwright/test"

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about")
  })

  test("displays page title and hero section", async ({ page }) => {
    await expect(page).toHaveTitle(/About Anna Schneider/i)
    await expect(page.getByRole("heading", { name: /About Anna Schneider/i })).toBeVisible()
  })

  test("displays attorney profile section", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible()
  })

  test("displays client reviews from Yelp", async ({ page }) => {
    await expect(page.getByText(/What My Clients Say/i)).toBeVisible()

    // Check for Yelp link
    const yelpLink = page.getByRole("link", { name: /View all reviews on Yelp/i })
    await expect(yelpLink).toBeVisible()
    await expect(yelpLink).toHaveAttribute("href", /yelp\.com/)
  })

  test("displays philosophy section", async ({ page }) => {
    // Check that philosophy heading is present
    await expect(page.getByRole("heading", { name: /My Philosophy/i })).toBeVisible()
  })

  test("has working navigation to contact page", async ({ page }) => {
    await page
      .getByRole("link", { name: /Contact/i })
      .first()
      .click()
    await expect(page).toHaveURL(/\/contact/)
  })

  test("displays call to action section", async ({ page }) => {
    await expect(page.getByText(/Ready to Work Together/i)).toBeVisible()
  })
})
