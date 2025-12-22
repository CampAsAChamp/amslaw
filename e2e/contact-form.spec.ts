import { test, expect } from "@playwright/test"

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact")
  })

  test("successfully submits contact form with mocked API", async ({ page }) => {
    // Mock the API call to prevent sending real emails
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, messageId: "mock-id" }),
      })
    })

    // Fill out the form
    await page.getByLabel("Full Name").fill("John Doe")
    await page.getByRole("textbox", { name: /Email Address/i }).fill("john.doe@example.com")
    await page.getByRole("textbox", { name: /Phone Number/i }).fill("(555) 123-4567")
    await page.getByLabel("Subject").selectOption("estate-planning")
    await page.getByLabel("Preferred Contact Method").selectOption("email")
    await page.getByLabel("Message").fill("I would like to discuss estate planning options for my family.")

    // Submit the form
    await page.getByRole("button", { name: /send message/i }).click()

    // Wait for success toast to appear (use role=status to target the toast specifically)
    await expect(page.getByRole("status")).toContainText(/email sent successfully/i, { timeout: 5000 })

    // Verify form is cleared after successful submission
    await expect(page.getByLabel("Full Name")).toHaveValue("")
    await expect(page.getByRole("textbox", { name: /Email Address/i })).toHaveValue("")
    await expect(page.getByRole("textbox", { name: /Phone Number/i })).toHaveValue("")
    await expect(page.getByLabel("Message")).toHaveValue("")
  })

  test("displays error message when API fails", async ({ page }) => {
    // Mock the API call to return an error
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal server error" }),
      })
    })

    // Fill out the form
    await page.getByLabel("Full Name").fill("Jane Smith")
    await page.getByRole("textbox", { name: /Email Address/i }).fill("jane.smith@example.com")
    await page.getByLabel("Subject").selectOption("wills")
    await page.getByLabel("Preferred Contact Method").selectOption("phone")
    await page.getByLabel("Message").fill("I need help with creating a will.")

    // Submit the form
    await page.getByRole("button", { name: /send message/i }).click()

    // Wait for error toast to appear (use role=status to target the toast specifically)
    await expect(page.getByRole("status")).toContainText(/failed to send message/i, { timeout: 5000 })

    // Verify form data is preserved after error
    await expect(page.getByLabel("Full Name")).toHaveValue("Jane Smith")
    await expect(page.getByRole("textbox", { name: /Email Address/i })).toHaveValue("jane.smith@example.com")
    await expect(page.getByLabel("Message")).toHaveValue("I need help with creating a will.")
  })

  test("validates required fields", async ({ page }) => {
    // Try to submit without filling required fields
    const submitButton = page.getByRole("button", { name: /send message/i })
    await submitButton.click()

    // Check that HTML5 validation prevents submission
    // The form should not submit and we should still be on the contact page
    await expect(page.getByLabel("Full Name")).toBeVisible()

    // Verify the name field is invalid (HTML5 validation)
    const nameInput = page.getByLabel("Full Name")
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
  })

  test("disables submit button while submitting", async ({ page }) => {
    // Mock a slow API response
    await page.route("**/api/contact", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      })
    })

    // Fill out the form
    await page.getByLabel("Full Name").fill("Test User")
    await page.getByRole("textbox", { name: /Email Address/i }).fill("test@example.com")
    await page.getByLabel("Subject").selectOption("general")
    await page.getByLabel("Preferred Contact Method").selectOption("either")
    await page.getByLabel("Message").fill("Test message")

    // Get the submit button by its type attribute (more stable than text)
    const submitButton = page.locator('button[type="submit"]')

    // Click the submit button
    await submitButton.click()

    // The button should show "Sending..." and be disabled
    await expect(submitButton).toContainText(/sending/i, { timeout: 1000 })
    await expect(submitButton).toBeDisabled()

    // Wait for submission to complete (use role=status to target the toast)
    await expect(page.getByRole("status")).toContainText(/email sent successfully/i, { timeout: 5000 })

    // Button should be enabled again and show "Send Message"
    await expect(submitButton).toBeEnabled()
    await expect(submitButton).toContainText(/send message/i)
  })

  test("navigates to contact page from home", async ({ page }) => {
    await page.goto("/")

    // Find and click a contact link/button (adjust selector based on your actual navigation)
    await page
      .getByRole("link", { name: /contact/i })
      .first()
      .click()

    // Verify we're on the contact page
    await expect(page).toHaveURL(/.*contact/)
    await expect(page.getByLabel("Full Name")).toBeVisible()
  })
})
