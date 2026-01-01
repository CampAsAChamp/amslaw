/**
 * Commitlint Configuration
 * Enforces Conventional Commits specification
 * @see https://www.conventionalcommits.org/
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type enum - allowed commit types
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only changes
        "style", // Code style changes (formatting, missing semi-colons, etc)
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf", // Performance improvements
        "test", // Adding or updating tests
        "build", // Changes to build system or external dependencies
        "ci", // Changes to CI configuration files and scripts
        "chore", // Other changes that don't modify src or test files
        "revert", // Reverts a previous commit
      ],
    ],
    // Subject case - allow any case for flexibility
    "subject-case": [0],
    // Body max line length - disable for flexibility
    "body-max-line-length": [0],
    // Footer max line length - disable for flexibility
    "footer-max-line-length": [0],
  },
}

