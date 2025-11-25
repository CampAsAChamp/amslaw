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

This project requires **Node.js 22** or higher.

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
