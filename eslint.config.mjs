import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      // Enforce absolute imports using @/ alias - disallow parent directory traversal
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Please use absolute imports with @/ alias instead of relative imports (e.g., '@/app/components/MyComponent' instead of '../components/MyComponent'). Same-folder imports (e.g., './MyComponent') are allowed.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", ".open-next/**", "out/**", "build/**", "next-env.d.ts"]
  }
];

export default eslintConfig;
