# Anna M Schneider Law - Law Firm Website

Professional law firm website specializing in estate planning, built with Next.js 15 and React 19, deployed on Cloudflare Workers.

## Live Site

🌐 **[annamschneiderlaw.com](https://annamschneiderlaw.com)**

The site is deployed on Cloudflare Workers with automatic build and deployment on every push.

## About This Project

This is the official website for Anna M. Schneider Law, a law firm specializing in estate planning, living trusts, and wills. The site is built with modern web technologies to provide a fast, accessible, and user-friendly experience for clients seeking estate planning guidance.

## Skills & Technologies

[![My Skills](https://skills.syvixor.com/api/icons?perline=9&i=nextjs,reactjs,typescript,tailwindcss,postcss,nodejs,vitest,playwright,eslint,commitlint,framer,lucide,resend,prettier,dependabot,git,github,cloudflare)](https://builder.syvixor.com/)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15.3 with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **Animation**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Email**: [Resend](https://resend.com) with React Email components
- **Notifications**: react-hot-toast for user feedback
- **Deployment**: Cloudflare Workers via [OpenNext](https://opennext.js.org/) with automatic deployment
- **Runtime**: Node.js 22
- **Package Manager**: Yarn 4 (Berry) for fast, reliable dependency management
- **Code Quality**: ESLint with Next.js config, Stylelint for CSS linting, Prettier for formatting, lint-staged for pre-commit checks, Husky for git hooks, custom lint script with progress indicators
- **Commit Standards**: Commitlint for enforcing [Conventional Commits](https://www.conventionalcommits.org/) specification

## Site Structure

The website includes the following pages:

- **Home** (`/`) - Hero section, key features, services overview, and call-to-action
- **About** (`/about`) - Attorney profile, philosophy, experience, and client reviews from Yelp
- **Services** (`/services`) - Detailed information about legal services offered
- **FAQ** (`/faq`) - Frequently asked questions about estate planning, living trusts, and wills
- **Contact** (`/contact`) - Contact form with email integration, office information, and map

## Prerequisites

This project requires:

- **Node.js 22** or higher
- **Yarn 4** (automatically managed via `.yarnrc.yml`)

## Features

- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Component-Based Architecture** - Reusable React components for maintainability
- **Type Safety** - Full TypeScript implementation
- **Custom Design System** - CSS variables for consistent theming and easy customization
- **Dark Mode** - Full dark mode support with theme persistence and system preference detection
- **Performance Optimized** - Static generation and edge deployment for fast load times
- **SEO Optimized** - Page-specific metadata, Open Graph images, sitemap, robots.txt, and Schema.org structured data
- **Accessibility** - WCAG AA compliant with skip links, keyboard navigation, ARIA labels, and focus indicators
- **Smooth Animations** - Framer Motion for enhanced user experience
- **Modern Icons** - Lucide React icon library
- **Contact Form** - Integrated contact form with Resend email delivery and React Email templates
- **User Notifications** - Toast notifications for form submissions and user feedback
- **Yelp Reviews Integration** - Automatically displays latest client reviews from Yelp
- **Interactive Maps** - Office location map integration
- **FAQ Section** - Comprehensive answers to common estate planning questions
- **Error Handling** - Custom 404 page, error boundaries, and loading states
- **Code Quality Tools** - Pre-commit hooks with ESLint, Prettier, and automated testing
- **Conventional Commits** - Enforced commit message format for better version control and changelogs
- **Comprehensive Testing** - Unit tests with Vitest and E2E tests with Playwright
- **Automatic Deployment** - Cloudflare Workers automatically builds and deploys on every push

## Automated Dependency Updates

This project uses **Dependabot** to automatically keep dependencies up to date. Configuration is in `.github/dependabot.yml`.

**Update Schedule:**

- Monthly updates on Mondays at 9:00 AM PST
- Covers both npm packages and GitHub Actions

**Dependency Groups:**
Dependabot groups related packages together to reduce PR noise:

- **React** - React and related packages
- **Next.js** - Next.js and framework packages
- **Testing** - Testing libraries (Vitest, Playwright, Testing Library)
- **Linting** - ESLint, Prettier, TypeScript, and related plugins
- **Styling** - Tailwind CSS and PostCSS
- **Email** - Resend and React Email packages
- **Dev Dependencies** - All development dependencies

**Pull Request Features:**

- Automatic PR creation with conventional commit messages (`chore:` or `ci:`)
- Labels applied: `dependencies`, `automated`, `github-actions`
- Assigned reviewers configured
- Automatic rebase when PRs become outdated
- Maximum 5 open PRs for npm, 3 for GitHub Actions

This ensures the project stays secure and up-to-date with minimal manual intervention.

## Development

### Getting Started

First, install dependencies:

```bash
yarn install
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit files. Start by modifying `src/app/page.tsx` for the home page.

> **Note**: This project uses Yarn 4 (Berry). The correct version is automatically used via the `.yarnrc.yml` configuration file.

### Available Scripts

All scripts are defined in `package.json` and run with Yarn:

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build Next.js production bundle (for local testing/verification)
- `yarn start` - Start production server locally
- `yarn lint` - Run comprehensive linting (ESLint, Stylelint, TypeScript) with progress indicators
- `yarn lint:fix` - Run ESLint and Stylelint with auto-fix, plus type checking
- `yarn lint:eslint` - Run only ESLint checks
- `yarn lint:css` - Run Stylelint on CSS files
- `yarn lint:css:fix` - Auto-fix CSS linting issues
- `yarn lint:types` - Run TypeScript type checking only
- `yarn format` - Format all files with Prettier
- `yarn format:check` - Check formatting without changes
- `yarn check` - Run full type checking and build validation
- `yarn preview` - Preview OpenNext build locally
- `yarn deploy` - Build and deploy to Cloudflare Workers (includes build step)
- `yarn cf-typegen` - Generate TypeScript types for Cloudflare environment
- `yarn test` - Run Vitest unit tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:ui` - Run tests with interactive UI
- `yarn test:coverage` - Generate coverage report
- `yarn test:e2e` - Run Playwright end-to-end tests
- `yarn test:e2e:ui` - Run E2E tests with UI
- `yarn test:e2e:debug` - Debug E2E tests
- `yarn test:all` - Run all tests (unit + e2e)
- `yarn prepare` - Setup Husky git hooks

### Project Structure

```
src/
├── app/
│   ├── (pages)/         # Route pages
│   │   ├── about/       # About page and components
│   │   ├── contact/     # Contact page and form
│   │   ├── faq/         # FAQ page and components
│   │   └── services/    # Services page and components
│   ├── api/             # API routes
│   │   └── contact/     # Contact form email endpoint
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Common utilities (AddressDisplay, CopyButton, cards)
│   │   ├── contact/     # Contact-related (email templates, forms)
│   │   ├── hero/        # Hero section
│   │   ├── layout/      # Navigation, Footer, Banners
│   │   └── sections/    # Section components (CallToAction, SectionHeader)
│   ├── data/            # Site data and configuration (exported via barrel)
│   └── globals.css      # Global styles and CSS variables
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

### Configuration Files

The project includes several configuration files that control different aspects of the build, deployment, and development workflow:

| File                   | Purpose                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `vitest.config.ts`     | Vitest unit test configuration (jsdom environment, coverage settings)       |
| `playwright.config.ts` | Playwright E2E test configuration (browser targets, reporters)              |
| `.stylelintrc.json`    | Stylelint rules for CSS linting (alphabetical properties, Tailwind support) |
| `commitlint.config.js` | Commit message format enforcement (Conventional Commits)                    |
| `eslint.config.mjs`    | ESLint rules and Next.js configuration                                      |
| `postcss.config.mjs`   | PostCSS with Tailwind CSS v4                                                |
| `open-next.config.ts`  | OpenNext adapter configuration for Cloudflare Workers                       |
| `wrangler.jsonc`       | Cloudflare Workers deployment configuration                                 |
| `.cursorrules`         | Project-specific coding standards and conventions                           |

### Email Setup (Contact Form)

The contact form uses [Resend](https://resend.com) for email delivery and React Email components for beautiful, responsive email templates. Here's how to set it up:

#### 1. Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day, 3,000 emails/month)
3. Verify your email address

#### 2. Get Your API Key

1. Go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it something like "AMS Law Website"
4. Copy the API key (starts with `re_`)

#### 3. Configure Environment Variables

**For Local Development:**

Create a file named `.env.local` in the root of your project:

```bash
# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here

# Email address where contact form submissions will be sent
CONTACT_EMAIL=anna@schneiderlaw.com
```

**For Production (Cloudflare Workers):**

1. Update `CONTACT_EMAIL` in `wrangler.jsonc`:

```jsonc
"vars": {
  "CONTACT_EMAIL": "your-email@example.com"
}
```

2. Set `RESEND_API_KEY` as a secret using Wrangler CLI:

```bash
yarn wrangler secret put RESEND_API_KEY
```

When prompted, paste your Resend API key. This stores it securely in Cloudflare and persists across all deployments.

#### 4. Verify Your Domain (Optional but Recommended)

For the free tier, you can use Resend's default sending domain (`onboarding@resend.dev`), but emails will be more professional from your own domain.

To use your own domain:

1. Go to [Domains](https://resend.com/domains) in Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `schneiderlaw.com`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually 5-10 minutes)
6. Update the API route to use your domain:

In `src/app/api/contact/route.ts`, change:

```typescript
from: 'AMS Law Contact Form <onboarding@resend.dev>',
```

to:

```typescript
from: 'AMS Law Contact Form <contact@yourdomain.com>',
```

#### 5. Test the Contact Form

1. Start your development server: `yarn dev`
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check your email!

#### Troubleshooting

**"Failed to send email" error:**

- Check that your `.env.local` file exists and has the correct API key
- Restart your dev server after creating/updating `.env.local`
- Verify your API key is active in the Resend dashboard

**Not receiving emails:**

- Check your spam folder
- Verify the `CONTACT_EMAIL` is correct (in `.env.local` for local, `wrangler.jsonc` for production)
- Check the Resend dashboard [Emails](https://resend.com/emails) to see if they're being sent
- For production, verify you've set the `RESEND_API_KEY` secret using `yarn wrangler secret put RESEND_API_KEY`

**Environment Variables:**

- ✅ Local: Use `.env.local` (never commit this file)
- ✅ Production: Set `CONTACT_EMAIL` in `wrangler.jsonc` and `RESEND_API_KEY` via Wrangler CLI
- Make sure you've verified your domain for better deliverability

**Security Notes:**

- Never commit your `.env.local` file to git
- The API key is server-side only (Next.js API route)
- Users cannot see or access your API key from the browser

### Yelp Reviews Display

The About page displays client reviews from Yelp with star ratings and reviewer information. These are currently stored as static data for reliability and performance.

#### How It Works

- Reviews are stored in `src/app/data/reviews.tsx`
- Displays with Yelp-style formatting (star ratings, reviewer names, dates)
- Includes link to view all reviews on Yelp
- Fast loading (no external API calls)

#### Updating Reviews

When you receive a new Yelp review:

1. Go to your Yelp business page: https://www.yelp.com/biz/anna-m-schneider-torrance
2. Find the new review and click **"Share review"** directly on the review
3. Click "Copy Link" to get the review URL (it will include `?hrid=` and tracking parameters)
4. Open `src/app/data/reviews.tsx`
5. Add the new review to the `yelpReviews` array:

```typescript
{
  id: "reviewer-name-year",
  url: "https://www.yelp.com/biz/anna-m-schneider-torrance?hrid=xxxxx", // Use the URL from step 3
  text: "The review text from Yelp",
  rating: 5, // 1-5 stars
  time_created: "2024-01-15T00:00:00Z", // ISO format
  user: {
    id: "reviewer-id",
    profile_url: "https://www.yelp.com/user_details?userid=reviewer-id",
    image_url: null, // or URL to profile image if available
    name: "Reviewer Name",
  },
}
```

6. Save the file and deploy

**Tip:** The `?hrid=` parameter in the URL ensures the "Read more on Yelp" link goes directly to that specific review.

#### Why Static Reviews?

We use static reviews instead of the Yelp API because:

- ✅ **Reliable**: No API issues or rate limits
- ✅ **Fast**: Instant page loads, no external API calls
- ✅ **Simple**: No API keys or credentials needed
- ✅ **Free**: No API costs
- ✅ **Maintained**: Easy to update when you get new reviews

Since reviews don't change frequently, this approach provides the best user experience.

## Deployment

### Automatic Deployment

The site is deployed to Cloudflare Workers with automatic build and deployment configured through Cloudflare's Git integration. Every push to the `main` branch automatically:

- Builds the Next.js application
- Generates the Cloudflare Workers bundle using OpenNext
- Deploys to production at [annamschneiderlaw.com](https://annamschneiderlaw.com)

### Manual Deployment

You can also deploy manually using the following commands:

| Command        | Action                                 |
| :------------- | :------------------------------------- |
| `yarn build`   | Build your Next.js production site     |
| `yarn preview` | Preview OpenNext build locally         |
| `yarn deploy`  | Build and deploy to Cloudflare Workers |
| `yarn lint`    | Run ESLint to check code quality       |
| `yarn check`   | Build and run TypeScript type checking |

**Important:** `yarn deploy` automatically runs the build process internally (via `opennextjs-cloudflare build`), so you don't need to run `yarn build` before deploying. The standalone `yarn build` command is useful for:

- Local verification of the Next.js build
- Type checking with `yarn check` (which runs `yarn build && tsc`)
- Testing the build without deploying

For Cloudflare deployment, just run `yarn deploy` - it handles everything in one command.

### OpenNext Configuration

This project uses **OpenNext** to adapt Next.js for Cloudflare Workers. The configuration is in `open-next.config.ts`.

**Current Setup:**

- Uses default OpenNext settings optimized for Cloudflare Workers
- Automatic static asset handling
- Server-side rendering support on the edge

**Optional Performance Enhancement:**

You can enable R2 incremental cache for improved performance:

1. Uncomment the R2 cache configuration in `open-next.config.ts`
2. Import the R2 cache override: `import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache"`
3. Add to config: `incrementalCache: r2IncrementalCache`

See [OpenNext Cloudflare Caching](https://opennext.js.org/cloudflare/caching) for more details.

### Wrangler CLI Tools

The project uses Wrangler CLI for Cloudflare Workers management. Useful commands:

**TypeScript Types:**

```bash
yarn cf-typegen
```

Generates TypeScript types for Cloudflare environment variables defined in `wrangler.jsonc`.

**Managing Secrets:**

```bash
# Set a secret (encrypted)
yarn wrangler secret put SECRET_NAME

# List all secrets
yarn wrangler secret list

# Delete a secret
yarn wrangler secret delete SECRET_NAME
```

**Configuration in `wrangler.jsonc`:**

- `vars` - Public environment variables (e.g., `CONTACT_EMAIL`)
- `compatibility_date` - Cloudflare Workers compatibility date
- `compatibility_flags` - Node.js compatibility and other feature flags
- `observability` - Logging and monitoring configuration
- `upload_source_maps` - Enable source maps for better debugging

### Environment Variables in Production

Environment variables are configured in `wrangler.jsonc`:

- **Non-sensitive variables** (like `CONTACT_EMAIL`, `NEXT_PUBLIC_SITE_URL`): Set in the `vars` section of `wrangler.jsonc`
- **Secrets** (like `RESEND_API_KEY`): Set using `yarn wrangler secret put VARIABLE_NAME`

Secrets set via Wrangler CLI are encrypted and stored securely in Cloudflare, persisting across all deployments.

**Note:** The `NEXT_PUBLIC_SITE_URL` variable is used for SEO features (sitemap, Open Graph images, structured data). Set it to your production domain (e.g., `https://annamschneiderlaw.com`).

## Design System

This project uses a custom design system with CSS variables defined in `src/app/globals.css`:

- **Color Variables** - Consistent color palette using CSS custom properties
- **Dark Mode Support** - Automatic theme switching with CSS variables for light and dark modes
- **Utility Classes** - Pre-defined button styles, text colors, and backgrounds
- **Responsive Breakpoints** - Tailwind CSS breakpoints for responsive design
- **Focus Indicators** - WCAG-compliant focus styles for keyboard navigation

### Dark Mode

The site includes full dark mode support:

- **Theme Toggle** - Sun/moon icon button in navigation to switch themes
- **Persistence** - Theme preference saved in localStorage
- **System Preference** - Respects user's OS dark mode setting on first visit
- **No Flash** - Theme applied before page render to prevent flash of wrong theme
- **Consistent Colors** - Primary blue brand color maintained across both themes

To use dark mode in your components:

```typescript
import { useTheme } from "@/app/components/common"

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  // theme is "light" or "dark"
}
```

### Code Quality Workflow

The project uses a comprehensive linting setup with a custom script for better developer experience:

**Comprehensive Linting (`yarn lint`):**

The `yarn lint` command runs a custom script (`scripts/lint-with-progress.mjs`) that executes three checks sequentially with visual progress indicators:

1. **ESLint** - JavaScript/TypeScript code quality and Next.js best practices
2. **Stylelint** - CSS formatting and Tailwind CSS compliance
3. **TypeScript** - Type checking across the entire codebase

The script shows a spinner progress indicator while running each check and provides clear success/failure feedback.

**Individual Linters:**

For faster feedback during development, you can run individual linters:

- `yarn lint:eslint` - Only ESLint checks
- `yarn lint:css` - Only Stylelint checks
- `yarn lint:types` - Only TypeScript type checking
- `yarn lint:fix` - Auto-fix ESLint and Stylelint issues, then type check

**Pre-commit Hooks:**

Git hooks via Husky automatically run lint-staged on committed files:

- Auto-fixes ESLint and Stylelint issues
- Formats code with Prettier
- Only processes staged files for speed
- Configured in `package.json` under `lint-staged`

**Stylelint Configuration:**

CSS linting enforces:

- Alphabetical property ordering
- Tailwind CSS compatibility
- Hex color format consistency (long form)
- No named colors (except in functions)
- Custom rules for `globals.css` exceptions

See `.stylelintrc.json` for complete configuration.

### Key Guidelines

- Always use CSS variables and utility classes for colors (never hardcode colors)
- Use absolute imports with `@/` alias for all local files
- Follow TypeScript strict mode for type safety
- Keep components focused and single-responsibility
- Ensure all interactive elements are keyboard accessible
- Add proper ARIA labels for screen readers
- Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages

See `.cursorrules` for complete coding standards and conventions.

### Commit Messages

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This is enforced automatically via git hooks.

**Format:**

```
<type>[optional scope]: <description>
```

**Example:**

```bash
feat: add contact form validation
fix(nav): resolve mobile menu focus trap
docs: update deployment instructions
```

See the [Commit Message Guide](docs/COMMIT_MESSAGE_GUIDE.md) for detailed information and examples.

## Documentation

Additional documentation is available in the `docs/` directory:

### Development Documentation

- **[Git Hooks Setup](docs/GIT_HOOKS.md)** - Pre-commit and pre-push hooks for code quality
- **[Commit Message Guide](docs/COMMIT_MESSAGE_GUIDE.md)** - Quick reference for writing conventional commits
- **[Testing Guide](docs/TESTING.md)** - Comprehensive testing documentation for unit and E2E tests

### Legal Service Reference

The `docs/reference/` directory contains detailed markdown documentation about legal services:

- **[Living Trusts](docs/reference/living_trust.md)** - Comprehensive information about living trusts
- **[Wills](docs/reference/wills.md)** - Information about wills and estate planning

These documents serve as content reference for the website and can be used for FAQ content or service descriptions.

## Resources

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [React Documentation](https://react.dev/) - React 19 features and hooks
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Utility-first CSS framework
- [React Email](https://react.email/) - Build and send emails with React components
- [Resend Documentation](https://resend.com/docs) - Email delivery API
- [OpenNext Documentation](https://opennext.js.org/) - Learn about the deployment adapter
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) - Deployment platform
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript language reference
