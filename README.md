# Anna M Schneider Law - Law Firm Website

Professional law firm website built with Next.js and deployed on Cloudflare Workers.

## Live Site

🌐 **[annamschneiderlaw.com](https://annamschneiderlaw.com)**

The site automatically deploys to production when commits are pushed to the repository.

## About This Project

This is the official website for Anna M. Schneider Law, a law firm specializing in professional legal services. The site is built with modern web technologies to provide a fast, accessible, and user-friendly experience for clients.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (React-based)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Deployment**: Cloudflare Workers via [OpenNext](https://opennext.js.org/)
- **Runtime**: Node.js 22

## Site Structure

The website includes the following pages:

- **Home** (`/`) - Hero section, key features, services overview, and call-to-action
- **About** (`/about`) - Attorney profile, philosophy, and experience
- **Services** (`/services`) - Detailed information about legal services offered
- **Contact** (`/contact`) - Contact form, office information, and map

## Prerequisites

This project requires **Node.js 22** or higher

## Features

- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Component-Based Architecture** - Reusable React components for maintainability
- **Type Safety** - Full TypeScript implementation
- **Custom Design System** - CSS variables for consistent theming and easy customization
- **Performance Optimized** - Static generation and edge deployment for fast load times
- **SEO Friendly** - Proper meta tags and semantic HTML structure
- **Contact Form** - Integrated contact form for client inquiries
- **Interactive Maps** - Office location map integration

## Development

### Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit files. Start by modifying `src/app/page.tsx` for the home page.

### Project Structure

```
src/
├── app/
│   ├── about/           # About page and components
│   ├── components/      # Reusable UI components
│   │   ├── cards/       # Card components
│   │   ├── forms/       # Form components
│   │   ├── hero/        # Hero section
│   │   ├── layout/      # Navigation, Footer
│   │   └── sections/    # Section components
│   ├── constants/       # Site data and configuration
│   ├── contact/         # Contact page
│   ├── services/        # Services page
│   └── globals.css      # Global styles and CSS variables
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

### Email Setup (Contact Form)

The contact form uses [Resend](https://resend.com) for email delivery. Here's how to set it up:

#### 1. Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day, 3,000 emails/month)
3. Verify your email address

#### 2. Get Your API Key

1. Go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it something like "AMS Law Website"
4. Copy the API key (starts with `re_`)

#### 3. Create Environment Variables File

Create a file named `.env.local` in the root of your project:

```bash
# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here

# Email address where contact form submissions will be sent
CONTACT_EMAIL=anna@schneiderlaw.com
```

**Important:** Replace the values with:
- Your actual Resend API key
- The email address where you want to receive contact form submissions

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

1. Start your development server: `npm run dev`
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
- Verify the `CONTACT_EMAIL` in `.env.local` is correct
- Check the Resend dashboard [Emails](https://resend.com/emails) to see if they're being sent

**Production Deployment:**
- Add the environment variables in your hosting provider's dashboard
- Don't commit `.env.local` to git (it's already in .gitignore)
- Make sure you've verified your domain for better deliverability

**Security Notes:**
- Never commit your `.env.local` file to git
- The API key is server-side only (Next.js API route)
- Users cannot see or access your API key from the browser

## Deployment

### Automatic Deployment (Primary Method)

Changes pushed to the repository are automatically built and deployed to [annamschneiderlaw.com](https://annamschneiderlaw.com) via Cloudflare Workers. No manual deployment steps required.

### Manual Deployment (Optional)

| Command                           | Action                                       |
| :-------------------------------- | :------------------------------------------- |
| `npm run build`                   | Build your production site                   |
| `npm run preview`                 | Preview your build locally, before deploying |
| `npm run build && npm run deploy` | Manually deploy to Cloudflare                |
| `npm run wrangler tail`           | View real-time logs for all Workers          |

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

## Resources

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [OpenNext Documentation](https://opennext.js.org/) - Learn about the deployment adapter
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) - Deployment platform
