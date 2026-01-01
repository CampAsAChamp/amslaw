import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './test/e2e',
  
  /* Output directory for test artifacts */
  outputDir: './test_results/e2e/artifacts',
  
  /* Snapshot directory for visual regression tests */
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{-projectName}{ext}',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Repeat visual regression tests to catch brittleness */
  repeatEach: process.env.CI ? 2 : 1,
  
  /* Opt out of parallel tests on CI. Use 10 workers locally for optimal performance. */
  workers: process.env.CI ? 1 : 
           process.env.WORKERS ? parseInt(process.env.WORKERS) : 
           10,
  
  /* Timeout for tests with animations */
  timeout: 60 * 1000,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'test_results/e2e/html-report', open: 'never' }],
    ['list'],
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Wait for animations to complete */
    actionTimeout: 15 * 1000,
  },
  
  /* Configure expect for visual regression tests */
  expect: {
    /* Timeout for expect assertions */
    timeout: 10 * 1000,
    
    /* Configure screenshot comparison */
    toHaveScreenshot: {
      /* Maximum number of pixels that can differ */
      maxDiffPixels: 100,
      
      /* Animation handling */
      animations: 'disabled',
    },
  },

  /* Configure projects for major browsers and viewports */
  projects: [
    // Desktop Large - Full behavioral and visual tests
    {
      name: 'desktop-large',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    
    // Desktop Medium - Full behavioral and visual tests
    {
      name: 'desktop-medium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    
    // Tablet - Full behavioral and visual tests
    {
      name: 'tablet',
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 768, height: 1024 },
      },
    },
    
    // Mobile - Full behavioral and visual tests
    {
      name: 'mobile',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 667 },
      },
    },
    
    // Additional mobile device for cross-device testing
    {
      name: 'mobile-android',
      use: { 
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
      },
      testMatch: '**/home-animations.spec.ts', // Only run behavioral tests, not visual
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

