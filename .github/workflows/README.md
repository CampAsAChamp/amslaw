# GitHub Actions Workflows

## CI/CD Workflow

The `ci.yml` workflow automatically runs on every push and pull request to ensure code quality and deploy to Cloudflare.

### What It Does

- ✅ Runs ESLint to catch code quality issues
- ✅ Builds your Next.js application
- ✅ Builds the Cloudflare Worker bundle with OpenNext
- ✅ Automatically deploys to Cloudflare Workers (on `main` branch only)

### Email Notifications

GitHub will automatically send you an email at your GitHub account email address when:
- ❌ A workflow run fails (build, lint, or deployment)
- ✅ A previously failing workflow succeeds again

**To ensure you receive notifications:**
1. Go to: https://github.com/settings/notifications
2. Make sure notifications are enabled under the "Actions" section
3. GitHub will email you when builds or deployments fail

### Required Secrets

You need to add these secrets to your GitHub repository for automatic deployment:

1. **CLOUDFLARE_API_TOKEN**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Create a new token with "Edit Cloudflare Workers" permissions
   - Add as GitHub secret

2. **CLOUDFLARE_ACCOUNT_ID**
   - Go to: https://dash.cloudflare.com/
   - Click on "Workers & Pages"
   - Your Account ID is shown in the right sidebar
   - Add as GitHub secret

### Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret listed above

### Workflow Behavior

- **On Pull Requests**: Runs build & lint checks (no deployment)
- **On Push to Main**: Runs build, lint, AND automatically deploys to Cloudflare Workers

### Two Layers of Protection

1. **Pre-push hook** (local): Runs linter before you can push - fast feedback
2. **GitHub Actions** (CI/CD): Runs full build checks and deploys after pushing

This ensures:
- Fast feedback locally with the pre-push hook
- Complete validation on GitHub in case the hook is bypassed
- Automatic deployment to Cloudflare on every push to main
- Email alerts if anything fails

