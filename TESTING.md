# Testing Documentation

This project includes comprehensive testing for critical functionality using Vitest and Playwright.

## Test Structure

```
amslaw/
├── src/
│   ├── app/
│   │   ├── components/ui/
│   │   │   ├── FormField.tsx
│   │   │   └── FormField.test.tsx        # Unit tests for FormField
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── ContactForm.test.tsx      # Integration tests for ContactForm
│   │   └── api/contact/
│   │       ├── route.ts
│   │       └── route.test.ts             # API route tests
│   └── test/
│       ├── setup.ts                       # Global test configuration
│       └── mocks.ts                       # Mock utilities and fixtures
├── e2e/
│   └── contact-form.spec.ts              # End-to-end tests
├── vitest.config.ts                      # Vitest configuration
└── playwright.config.ts                  # Playwright configuration
```

## Running Tests

### All Tests

```bash
# Run all tests (unit, integration, and E2E)
npm run test:all
```

### Unit & Integration Tests (Vitest)

```bash
# Run tests once (default)
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests with UI (interactive browser interface)
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### End-to-End Tests (Playwright)

```bash
# Run E2E tests (starts dev server automatically)
npm run test:e2e

# Run E2E tests with UI (interactive mode)
npm run test:e2e:ui

# Debug E2E tests (step through with debugger)
npm run test:e2e:debug
```

## Test Coverage

### Current Test Suite

**Unit Tests (6 tests):**
- FormField component rendering and interactions
- Input type variations (text, email, tel, select, textarea)
- Required field indicators
- Value change handling

**Integration Tests (7 tests):**
- ContactForm rendering
- Form data updates
- Form submission with success/error handling
- Form reset after submission
- Submit button state management
- Custom onSubmit handler

**API Route Tests (5 tests):**
- Missing required fields validation
- Successful email sending
- Test email prefix in non-production
- Email service failure handling
- JSON parsing error handling

**E2E Tests (5 tests):**
- Complete form submission flow
- Error handling with preserved form data
- Required field validation
- Submit button disabled state
- Navigation to contact page

**Total: 23 tests**

## Email Handling in Tests

### Automated Tests
**No real emails are sent during automated testing.** All tests mock the email API:

- **Unit/Integration tests**: Mock the Resend client
- **E2E tests**: Intercept API calls with Playwright's `page.route()`

### Manual Testing
When testing manually in development, emails will include a `[TEST]` prefix in the subject line.

**Gmail Auto-Delete Filter Setup:**
1. Open Gmail Settings → Filters and Blocked Addresses
2. Create filter with: **Subject contains `[TEST]`**
3. Action: **Skip Inbox** and **Delete it**
4. Apply to future emails

This ensures test emails are automatically deleted and never clutter your inbox.

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('user can complete action', async ({ page }) => {
  // Mock API if needed
  await page.route('**/api/endpoint', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto('/page');
  await page.getByLabel('Field').fill('value');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await expect(page.getByText('Success')).toBeVisible();
});
```

## Mocking Guidelines

### Framer Motion
Automatically mocked in `src/test/setup.ts` to avoid animation issues.

### Next.js Navigation
Mocked in `src/test/setup.ts` with basic router functions.

### Resend Email Service
Mocked in API route tests to prevent real emails.

### Fetch API
Use `mockFetch()` helper from `src/test/mocks.ts`:

```typescript
import { mockFetch, mockSuccessResponse } from '@/test/mocks';

mockFetch(mockSuccessResponse());
```

## Continuous Integration

Tests can be run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run unit tests
  run: npm test -- --run

- name: Run E2E tests
  run: npm run test:e2e
```

## Troubleshooting

### Tests fail with "matchMedia is not a function"
This is already handled in `src/test/setup.ts`. If you see this error, ensure the setup file is being loaded.

### E2E tests can't find elements
- Use `screen.debug()` in unit tests to see the rendered HTML
- Use `await page.screenshot({ path: 'debug.png' })` in E2E tests
- Check that selectors match the actual rendered content

### Tests timeout
- Increase timeout in test file: `test('name', async () => {...}, 10000)`
- For E2E tests, check that the dev server is running properly

## Best Practices

1. **Test user behavior, not implementation details**
   - ✅ `screen.getByRole('button', { name: /submit/i })`
   - ❌ `container.querySelector('.submit-button')`

2. **Use semantic queries**
   - Prefer `getByRole`, `getByLabelText`, `getByText`
   - Avoid `getByTestId` unless necessary

3. **Mock external dependencies**
   - Always mock API calls
   - Mock third-party services (Resend, etc.)

4. **Keep tests focused**
   - One concept per test
   - Clear test names that describe behavior

5. **Clean up after tests**
   - Automatically handled by `afterEach(cleanup)` in setup

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

