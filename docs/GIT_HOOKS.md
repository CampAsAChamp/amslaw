# Git Hooks Setup

This project uses Git hooks to automatically lint and format code on each commit, ensuring code quality and consistency.

## What's Configured

### Commit Message Hook

Automatically runs on every `git commit`:

- **Commitlint**: Validates commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) specification
- Ensures consistent, parseable commit history
- Blocks commits with invalid message format

### Pre-Commit Hook

Automatically runs on every `git commit`:

- **ESLint**: Checks and auto-fixes JavaScript/TypeScript code
- **Prettier**: Formats code according to project style guide
- Only runs on **staged files** (files you're about to commit)

### Pre-Push Hook

Automatically runs on every `git push`:

- **All Tests**: Runs full test suite including unit and E2E tests (`yarn test:all`)
- Prevents push if any test failures are found
- **Note**: ESLint is NOT run on push (already runs on every commit via pre-commit hook)

## How It Works

The setup uses:

- **Husky**: Manages Git hooks
- **Commitlint**: Validates commit message format
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

- `.husky/commit-msg`: Commit message validation hook
- `.husky/pre-commit`: Pre-commit hook script
- `.husky/pre-push`: Pre-push hook script
- `commitlint.config.mjs`: Commitlint configuration
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
7. Git triggers the commit-msg hook
8. Commitlint validates your commit message format
9. If the message doesn't follow Conventional Commits, the commit is blocked
10. You fix the message and commit again

## Conventional Commits Format

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semi-colons, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Changes to build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples

```bash
# Simple feature
git commit -m "feat: add dark mode toggle"

# Bug fix with scope
git commit -m "fix(contact): resolve email validation issue"

# Documentation update
git commit -m "docs: update README with deployment instructions"

# Refactoring with body
git commit -m "refactor: extract navigation logic into custom hook

Moved navigation state management from component to useNavigation hook
for better reusability and testing."

# Breaking change
git commit -m "feat!: redesign navigation API

BREAKING CHANGE: Navigation component now requires theme prop"
```

### Why Conventional Commits?

- **Automated changelogs**: Generate changelogs from commit history
- **Semantic versioning**: Automatically determine version bumps
- **Searchable history**: Easy to find specific types of changes
- **Better collaboration**: Clear, structured commit messages
- **CI/CD integration**: Trigger specific workflows based on commit type

### Tips

- Keep the description line under 72 characters
- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize the first letter of the description
- No period at the end of the description
- Use the body to explain "what" and "why", not "how"

## Testing Strategy

### Why This Approach?

- **Pre-commit** (fast ~1-5s): Lint & format only staged files
- **Pre-push** (moderate ~30s-2min): All tests (unit + E2E)
- Ensures comprehensive test coverage before code reaches remote

This provides:

- ✅ Quick commits during development
- ✅ Fully verified code before it reaches remote
- ✅ Prevents broken code in repository
- ✅ Catches integration issues before pushing

**Why no linting on push?** Every commit already passed ESLint via the pre-commit hook, so running it again would be redundant.

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
# Skip all commit hooks (commit-msg and pre-commit)
git commit --no-verify

# Skip pre-push hook (skip tests)
git push --no-verify
```

**Warning**: Only skip hooks if absolutely necessary. The hooks exist to maintain code quality and commit message standards.

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
chmod +x .husky/commit-msg
```

### Commit message validation fails

If your commit is blocked due to message format:

```bash
# ❌ Bad - will be rejected
git commit -m "updated files"

# ✅ Good - follows Conventional Commits
git commit -m "chore: update configuration files"
```

See the [Commit Message Guide](./COMMIT_MESSAGE_GUIDE.md) for detailed examples.

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message specification
- [Commitlint](https://commitlint.js.org/) - Commit message linter
- [Husky](https://typicode.github.io/husky/) - Git hooks manager
- [lint-staged](https://github.com/okonet/lint-staged) - Run linters on staged files
- [Commit Message Guide](./COMMIT_MESSAGE_GUIDE.md) - Quick reference with examples
