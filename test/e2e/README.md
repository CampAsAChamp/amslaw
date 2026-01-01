# E2E Tests Guide

## Overview

This directory contains comprehensive E2E tests for the entire application, including navigation, forms, animations, and accessibility.

## Shared Test Utilities (NEW)

### Test Data (`data/test-data.ts`)

Centralized test data for consistent testing across all E2E tests:

```typescript
import { NAV_LINKS, PAGE_ROUTES, TEST_USERS, VIEWPORTS } from "./data/test-data"

// Use pre-defined test users
await fillContactForm(page, TEST_USERS.validUser)

// Use route constants for navigation
await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern)

// Use viewport constants
await page.setViewportSize(VIEWPORTS.mobile)
```

**Available constants:**

- `TEST_USERS` - Pre-configured user data for forms (validUser, minimalUser, etc.)
- `PAGE_ROUTES` - Route paths, URL patterns, and verification selectors
- `NAV_LINKS` - Navigation link names
- `VIEWPORTS` - Common viewport sizes
- `API_ENDPOINTS` - API endpoint patterns
- `TIMEOUTS` - Standard timeout values

### Test Helpers (`helpers/test-helpers.ts`)

Reusable helper functions that reduce duplication:

**Navigation helpers:**

```typescript
// Navigate and verify in one call
await navigateAndVerify(page, "About", /.*about/, /attorney profile/i)

// Navigate through multiple pages
await navigateSequence(page, [
  ["About", /.*about/],
  ["Services", /.*services/],
  ["Contact", /.*contact/],
])

// Find navigation links scoped to main nav
const aboutLink = findInNav(page, "about")
```

**Mobile menu helpers:**

```typescript
// Open mobile menu with proper waiting
await openMobileMenu(page)

// Close mobile menu
await closeMobileMenu(page)

// Check viewport type
if (isMobileViewport(testInfo)) {
  await openMobileMenu(page)
}
```

**Form helpers:**

```typescript
// Mock contact form API
await mockContactFormSubmit(page, true) // success
await mockContactFormSubmit(page, false, 1000) // failure with delay

// Fill contact form from test data
await fillContactForm(page, TEST_USERS.validUser)

// Submit and wait for completion
await submitContactForm(page)

// Verify form cleared
await expectFormCleared(page)
```

**Page helpers:**

```typescript
// Navigate and wait for page ready
await gotoAndWait(page, "/about")

// Click link and wait for navigation
await clickLinkAndWait(page, "About", "Main navigation")
```

### Test Fixtures (`helpers/fixtures.ts`)

Pre-configured Playwright fixtures for common scenarios:

```typescript
import { expect, test } from "./helpers/fixtures"

// Use mobile page fixture
test("my test", async ({ mobilePage }) => {
  await mobilePage.goto("/")
  // Page is already set to mobile viewport
})

// Use desktop page fixture
test("my test", async ({ desktopPage }) => {
  await desktopPage.goto("/")
  // Page is already set to desktop viewport
})
```

## Unit Test Utilities

The unit tests (`test/unit/`) also have shared utilities for consistency:

### Unit Test Helpers (`test/unit/helpers.tsx`)

```typescript
import { renderWithTheme, getMotionProps, expectMotionAnimation } from "@test/unit/helpers"

// Render with ThemeProvider automatically
renderWithTheme(<MyComponent />)

// Extract motion props for testing
const props = getMotionProps(element)
expect(props.transition?.delay).toBe(0.5)

// Assert motion animation properties
expectMotionAnimation(element, {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay: 0.5 }
})
```

### Unit Test Mocks (`test/unit/mocks.tsx`)

```typescript
import { createUserEvent, fillContactFormFields, mockFormData, mockFramerMotion, mockNextNavigation } from "@test/unit/mocks"

// Mock framer-motion in tests
vi.mock("framer-motion", () => mockFramerMotion())

// Mock next/navigation
vi.mock("next/navigation", () => mockNextNavigation("/about"))

// Create userEvent instance
const user = await createUserEvent()

// Fill contact form in unit tests
await fillContactFormFields(user, screen, mockFormData)
```

## Best Practices

### DRY Principle

1. **Use test data constants** instead of hardcoding values
2. **Use helper functions** for repeated actions (navigation, form filling)
3. **Extract common mocks** to shared files
4. **Create reusable fixtures** for common setup

### Example: Before and After

**Before (repetitive):**

```typescript
test("navigates to about", async ({ page }) => {
  await page.getByRole("link", { name: "About" }).first().click()
  await expect(page).toHaveURL(/.*about/)
  await expect(page.getByText(/attorney profile/i)).toBeVisible()
})
```

**After (DRY):**

```typescript
test("navigates to about", async ({ page }) => {
  await navigateAndVerify(page, NAV_LINKS.about, PAGE_ROUTES.about.urlPattern, PAGE_ROUTES.about.verifySelector.text)
})
```

### Viewport Detection

Always use `isMobileViewport(testInfo)` instead of hardcoding project names:

```typescript
// ❌ Bad
if (testInfo.project.name === "mobile" || testInfo.project.name === "mobile-android") {
  // ...
}

// ✅ Good
if (isMobileViewport(testInfo)) {
  await openMobileMenu(page)
}
```

### Form Testing

Use helper functions to reduce duplication:

```typescript
// Setup API mock
await mockContactFormSubmit(page, true)

// Fill form
await fillContactForm(page, TEST_USERS.validUser)

// Submit and verify
await submitContactForm(page)
await expectFormCleared(page)
```

## Test Files

### Navigation Tests (`navigation.spec.ts`)

Tests all navigation flows including:

- Desktop and mobile navigation
- Browser back/forward buttons
- Active link indicators
- Keyboard accessibility

### Contact Form Tests (`contact-form.spec.ts`)

Tests form submission, validation, and API integration.

### Accessibility Tests (`accessibility.spec.ts`)

Tests WCAG compliance, keyboard navigation, and ARIA attributes.

### FAQ Tests (`faq.spec.ts`)

Tests interactive FAQ accordion functionality.

### `home-animations.spec.ts` - Behavioral Tests (Fast)

Tests animation **behavior** without pixel-perfect comparisons:

- Element visibility checks
- Animation timing validation
- No blank space verification
- Scroll trigger validation

**Run time:** ~2-3 minutes

### `home-visual-regression.spec.ts` - Visual Tests (Slower)

Tests visual **appearance** with screenshot comparisons:

- Layout consistency
- Visual styling
- Cross-viewport rendering
- Dark mode support

**Run time:** ~5-10 minutes (first run creates baselines)

### `helpers/animation-helpers.ts`

Reusable helper functions with anti-brittleness features:

- `waitForStableState()` - Ensures page is fully loaded
- `waitForAllAnimations()` - Waits for CSS animations to complete
- `checkElementVisible()` - Verifies elements are visible (opacity > 0.7)
- `scrollToElement()` - Smooth scrolling to trigger animations

## Running Tests

### Run All E2E Tests

```bash
npm run test:e2e
```

### Run Only Animation Behavioral Tests (Recommended for Development)

```bash
npm run test:e2e:animations
```

### Run Only Visual Regression Tests

```bash
npm run test:e2e:visual
```

### Create/Update Visual Baseline Screenshots (First Time Setup)

```bash
npm run test:e2e:visual:update
```

### Run Specific Viewport

```bash
npx playwright test --project=desktop-large
npx playwright test --project=mobile
```

### Run in UI Mode (Interactive)

```bash
npm run test:e2e:ui
```

### Debug Mode

```bash
npm run test:e2e:debug
```

## First Time Setup

1. **Run behavioral tests first** (these should pass immediately):

   ```bash
   npm run test:e2e:animations
   ```

2. **Create visual baseline screenshots**:

   ```bash
   npm run test:e2e:visual:update
   ```

3. **Verify baselines look correct**:
   - Check `test/e2e/__screenshots__/` directory
   - Review screenshots manually
   - Re-run with `--update-snapshots` if needed

4. **Run visual tests normally**:
   ```bash
   npm run test:e2e:visual
   ```

## Test Configuration

Tests run across 5 viewport configurations (see `playwright.config.ts`):

- **desktop-large**: 1920x1080 (most common desktop)
- **desktop-medium**: 1440x900 (laptop)
- **tablet**: 768x1024 (iPad)
- **mobile**: 375x667 (iPhone)
- **mobile-android**: 393x851 (Pixel 5) - behavioral tests only

## Anti-Brittleness Features

### 1. Generous Thresholds

- Visual tests allow 10% pixel difference
- Opacity checks use 0.7 threshold (not strict 1.0)
- Color differences up to 20% tolerated

### 2. Retry Logic

- `checkElementVisible()` retries 3 times with delays
- Playwright's built-in screenshot retry
- CI runs tests twice (`repeatEach: 2`)

### 3. Stable State Waiting

- Waits for fonts to load
- Waits for network idle
- Waits for all CSS animations to complete
- Extra buffer time after animations

### 4. Flexible Timing

- Tests use generous timeouts (5-10s)
- Extra wait time for staggered animations
- Adaptive delays based on animation duration

## Troubleshooting

### Tests Fail with "Element not visible"

- **Cause**: Animation still in progress
- **Fix**: Increase wait times or lower opacity threshold
- **Location**: `test/e2e/helpers/animation-helpers.ts` - `checkElementVisible()`

### Visual Tests Fail with "Screenshot mismatch"

- **Cause**: Font rendering differences, minor layout shifts
- **Fix 1**: Increase `maxDiffPixelRatio` in `home-visual-regression.spec.ts`
- **Fix 2**: Update baselines: `npm run test:e2e:visual:update`
- **Fix 3**: Check if actual regression or false positive

### Tests Timeout

- **Cause**: Page not loading, animations stuck
- **Fix**: Check dev server is running on `localhost:3000`
- **Command**: `npm run dev` in separate terminal

### Flaky Tests (Pass/Fail Randomly)

- **Cause**: Timing issues, race conditions
- **Fix 1**: Add more wait time in specific test
- **Fix 2**: Use `waitForStableState()` before assertions
- **Fix 3**: Lower opacity threshold for visibility checks

## CI/CD Integration

Tests are configured for CI with:

- 2 retries on failure
- 2 test runs per test (`repeatEach: 2`)
- Serial execution (no parallel)
- Artifacts saved on failure

Only tests that fail **both** attempts are considered real failures.

## Maintenance

### When to Update Tests

**Update behavioral tests when:**

- Adding new animated sections
- Changing animation timing/duration
- Modifying scroll trigger behavior

**Update visual baselines when:**

- Intentionally changing styles/layout
- Updating fonts or colors
- Modifying breakpoints

**Update helpers when:**

- Tests become flaky
- Need new animation patterns
- Adding new wait strategies

### Keeping Tests Fast

- Run behavioral tests during development (fast feedback)
- Run visual tests before commits (catch regressions)
- Run full suite in CI (comprehensive coverage)

## Test Coverage

### Behavioral Tests Coverage

- ✅ No blank space on large screens
- ✅ Entrance animations on visible elements
- ✅ Scroll animations on hidden elements
- ✅ Staggered card animations
- ✅ Animation timing validation
- ✅ Page stability after animations

### Visual Tests Coverage

- ✅ Full page layouts (4 viewports)
- ✅ Section-specific rendering
- ✅ Cross-viewport consistency
- ✅ Dark mode appearance
- ✅ Animation state captures
- ✅ No blank space visual verification

## Performance

**Behavioral Tests:** ~2-3 minutes for full suite
**Visual Tests:** ~5-10 minutes for full suite (with baselines)
**Total:** ~15-20 minutes for all E2E tests

**Optimization Tips:**

- Use `--project` flag to test specific viewports
- Run behavioral tests first (faster feedback)
- Update visual baselines only when needed
- Use `--ui` mode for debugging (faster iteration)
