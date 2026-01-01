# E2E Animation Tests Guide

## Overview

This directory contains comprehensive E2E tests for homepage animations to ensure:

- No blank space appears when sections are visible on first load
- Animations trigger correctly when scrolling
- Visual appearance remains consistent across viewports

## Test Files

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
