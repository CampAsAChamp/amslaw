# Anna M Schneider Law - Law Firm Website

Professional law firm website specializing in estate planning, built with Next.js 15 and React 19, deployed on Cloudflare Workers.

## Live Site

🌐 **[annamschneiderlaw.com](https://annamschneiderlaw.com)**

The site is deployed on Cloudflare Workers with automatic build and deployment on every push.

## About This Project

This is the official website for Anna M. Schneider Law, a law firm specializing in estate planning, living trusts, and wills. The site is built with modern web technologies to provide a fast, accessible, and user-friendly experience for clients seeking estate planning guidance.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15.3 with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **Email**: [Resend](https://resend.com) with React Email components
- **Notifications**: react-hot-toast for user feedback
- **Deployment**: Cloudflare Workers via [OpenNext](https://opennext.js.org/) with automatic deployment
- **Runtime**: Node.js 22
- **Package Manager**: Yarn 4 (Berry) for fast, reliable dependency management
- **Quality**: Husky for git hooks and pre-commit checks

## Site Structure

The website includes the following pages:

- **Home** (`/`) - Hero section, key features, services overview, and call-to-action
- **About** (`/about`) - Attorney profile, philosophy, and experience
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
- **Performance Optimized** - Static generation and edge deployment for fast load times
- **SEO Friendly** - Proper meta tags and semantic HTML structure
- **Contact Form** - Integrated contact form with Resend email delivery and React Email templates
- **User Notifications** - Toast notifications for form submissions and user feedback
- **Interactive Maps** - Office location map integration
- **FAQ Section** - Comprehensive answers to common estate planning questions
- **Automatic Deployment** - Cloudflare Workers automatically builds and deploys on every push

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
- `yarn build` - Build production-ready application
- `yarn start` - Start production server locally
- `yarn lint` - Run ESLint for code quality checks
- `yarn check` - Run full type checking and build validation
- `yarn preview` - Preview OpenNext build locally
- `yarn deploy` - Deploy to Cloudflare Workers
- `yarn test` - Run Vitest unit tests
- `yarn test:e2e` - Run Playwright end-to-end tests
- `yarn test:all` - Run all tests (unit + e2e)

### Project Structure

```
src/
├── app/
│   ├── about/           # About page and components
│   ├── api/             # API routes
│   │   └── contact/     # Contact form email endpoint
│   │       ├── email-components/  # Reusable email components
│   │       └── route.ts           # API handler
│   ├── components/      # Reusable UI components
│   │   ├── cards/       # Card components
│   │   ├── hero/        # Hero section
│   │   ├── layout/      # Navigation, Footer, Banners
│   │   ├── sections/    # Section components
│   │   └── ui/          # UI utilities (buttons, copy, etc.)
│   ├── constants/       # Site data and configuration
│   ├── contact/         # Contact page and form
│   ├── faq/             # FAQ page and components
│   ├── services/        # Services page and components
│   └── globals.css      # Global styles and CSS variables
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── reference/           # Documentation
    └── docs/            # Legal service documentation
```

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

## Deployment

### Automatic Deployment

The site is deployed to Cloudflare Workers with automatic build and deployment configured through Cloudflare's Git integration. Every push to the `main` branch automatically:

- Builds the Next.js application
- Generates the Cloudflare Workers bundle using OpenNext
- Deploys to production at [annamschneiderlaw.com](https://annamschneiderlaw.com)

### Manual Deployment

You can also deploy manually using the following commands:

| Command                 | Action                                      |
| :---------------------- | :------------------------------------------ |
| `yarn build`            | Build your Next.js production site          |
| `yarn preview`          | Preview OpenNext build locally              |
| `yarn deploy`           | Build and deploy to Cloudflare Workers      |
| `yarn lint`             | Run ESLint to check code quality            |
| `yarn check`            | Build and run TypeScript type checking      |

### Environment Variables in Production

Environment variables are configured in `wrangler.jsonc`:

- **Non-sensitive variables** (like `CONTACT_EMAIL`): Set in the `vars` section of `wrangler.jsonc`
- **Secrets** (like `RESEND_API_KEY`): Set using `yarn wrangler secret put VARIABLE_NAME`

Secrets set via Wrangler CLI are encrypted and stored securely in Cloudflare, persisting across all deployments.

## Design System

This project uses a custom design system with CSS variables defined in `src/app/globals.css`:

- **Color Variables** - Consistent color palette using CSS custom properties
- **Utility Classes** - Pre-defined button styles, text colors, and backgrounds
- **Responsive Breakpoints** - Tailwind CSS breakpoints for responsive design

### Key Guidelines

- Always use CSS variables and utility classes for colors (never hardcode colors)
- Use absolute imports with `@/` alias for all local files
- Follow TypeScript strict mode for type safety
- Keep components focused and single-responsibility

See `.cursorrules` for complete coding standards and conventions.

### Reference Documentation

The `reference/docs/` directory contains detailed markdown documentation about legal services:

- `living_trust.md` - Information about living trusts
- `wills.md` - Information about wills and estate planning

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
