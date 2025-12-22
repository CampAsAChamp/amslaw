# Git Hooks Setup

This project uses Git hooks to automatically lint and format code on each commit, ensuring code quality and consistency.

## What's Configured

### Pre-Commit Hook

Automatically runs on every `git commit`:

- **ESLint**: Checks and auto-fixes JavaScript/TypeScript code
- **Prettier**: Formats code according to project style guide
- Only runs on **staged files** (files you're about to commit)

### Pre-Push Hook

Automatically runs on every `git push`:

- **ESLint**: Runs full linter check on entire codebase
- **Unit Tests**: Runs full test suite (`yarn test`)
- Prevents push if linting errors or test failures are found
- **Note**: E2E tests are NOT run on push (too slow - run those manually before merging)

## How It Works

The setup uses:

- **Husky**: Manages Git hooks
- **lint-staged**: Runs linters on staged files only (faster commits)
- **Prettier**: Code formatter
- **ESLint**: JavaScript/TypeScript linter

## Manual Commands

You can also run these commands manually:

```bash
# Format all files
yarn format

# Check formatting without making changes
yarn format:check

# Run ESLint
yarn lint

# Run ESLint and auto-fix issues
yarn lint:fix
```

## Configuration Files

- `.husky/pre-commit`: Pre-commit hook script
- `.husky/pre-push`: Pre-push hook script
- `.prettierrc`: Prettier configuration
- `.prettierignore`: Files to ignore when formatting
- `eslint.config.mjs`: ESLint configuration
- `package.json`: lint-staged configuration

## What Happens on Commit

When you run `git commit`:

1. Git triggers the pre-commit hook
2. lint-staged identifies your staged files
3. ESLint runs on staged `.js`, `.jsx`, `.ts`, `.tsx` files
4. Prettier formats staged code and config files
5. If any issues are found and can be fixed automatically, files are re-staged
6. If unfixable errors exist, the commit is blocked
7. You fix the errors and commit again

## Testing Strategy

### Why This Approach?

- **Pre-commit** (fast ~1-5s): Lint & format only staged files
- **Pre-push** (moderate ~10-30s): Full lint + unit tests
- **CI/CD or Manual**: E2E tests (slower, run before merging PRs)

This provides:

- ✅ Quick commits during development
- ✅ Verified code before it reaches remote
- ✅ No frustrating delays
- ✅ Prevents broken code in repository

### Running Tests Manually

```bash
# Run unit tests
yarn test

# Run unit tests in watch mode
yarn test:watch

# Run E2E tests
yarn test:e2e

# Run all tests (unit + E2E)
yarn test:all
```

## Skipping Hooks (Not Recommended)

In rare cases where you need to skip hooks:

```bash
# Skip pre-commit hook (skip lint/format)
git commit --no-verify

# Skip pre-push hook (skip lint/tests)
git push --no-verify
```

**Warning**: Only skip hooks if absolutely necessary. The hooks exist to maintain code quality.

**When you might skip pre-push:**

- Emergency hotfix (but run tests immediately after!)
- Known test flakiness (but fix the tests ASAP)
- Work in progress branch (but clean up before merging)

## Troubleshooting

### Hook not running

If the hook doesn't run:

```bash
# Reinstall husky
yarn prepare
```

### Formatting conflicts with ESLint

The configuration includes `eslint-config-prettier` to prevent conflicts between ESLint and Prettier rules.

### Hook fails with permission error

```bash
# Make hook files executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```
