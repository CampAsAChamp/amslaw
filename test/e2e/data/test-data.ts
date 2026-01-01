/**
 * Shared test data for E2E tests
 * Centralizes common test users, routes, and form data
 */

/**
 * Test user data for form submissions
 */
export const TEST_USERS = {
  validUser: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    subject: "estate-planning",
    message: "I would like to discuss estate planning options for my family.",
    preferredContact: "email",
  },
  minimalUser: {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "",
    subject: "wills",
    message: "I need help with creating a will.",
    preferredContact: "phone",
  },
  completeUser: {
    name: "Test User",
    email: "test@example.com",
    phone: "(555) 987-6543",
    subject: "general",
    message: "Test message",
    preferredContact: "either",
  },
  longName: {
    name: "Christopher Alexander Montgomery III",
    email: "christopher.montgomery@example.com",
    phone: "(555) 555-5555",
    subject: "trust-administration",
    message: "I require assistance with trust administration and related legal matters.",
    preferredContact: "email",
  },
} as const

/**
 * Page routes with URL patterns and verification selectors
 */
export const PAGE_ROUTES = {
  home: {
    path: "/",
    urlPattern: /^.*\/$/,
    verifySelector: { role: "heading", name: /estate planning|welcome/i },
  },
  about: {
    path: "/about",
    urlPattern: /.*about/,
    verifySelector: { text: /attorney.*profile|meet.*attorney/i },
  },
  services: {
    path: "/services",
    urlPattern: /.*services/,
    verifySelector: { text: /estate planning|wills|trust/i },
  },
  faq: {
    path: "/faq",
    urlPattern: /.*faq/,
    verifySelector: { text: /frequently asked questions|common questions/i },
  },
  contact: {
    path: "/contact",
    urlPattern: /.*contact/,
    verifySelector: { label: /full name/i },
  },
} as const

/**
 * Navigation link names
 */
export const NAV_LINKS = {
  home: "Home",
  about: "About",
  services: "Services",
  faq: "FAQ",
  contact: "Contact",
} as const

/**
 * Common viewport sizes for testing
 */
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  mobileAndroid: { width: 412, height: 915 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  largeDesktop: { width: 1920, height: 1080 },
} as const

/**
 * API endpoints used in tests
 */
export const API_ENDPOINTS = {
  contact: "**/api/contact",
} as const

/**
 * Common test timeouts (in milliseconds)
 */
export const TIMEOUTS = {
  animation: 1000,
  apiCall: 5000,
  formSubmit: 10000,
  pageLoad: 15000,
} as const
