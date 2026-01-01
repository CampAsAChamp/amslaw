#!/usr/bin/env node
import { spawn } from "child_process"

/**
 * Runs a command with a progress indicator
 * @param {string} command - The command to run
 * @param {string[]} args - Command arguments
 * @param {string} label - Label to display
 * @returns {Promise<number>} Exit code
 */
function runWithProgress(command, args, label) {
  return new Promise((resolve) => {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
    let frameIndex = 0
    let hasOutput = false
    const isTTY = process.stdout.isTTY

    let spinner = null

    // Only use spinner if we're in a TTY
    if (isTTY) {
      spinner = setInterval(() => {
        if (!hasOutput) {
          process.stdout.clearLine(0)
          process.stdout.cursorTo(0)
          process.stdout.write(`${frames[frameIndex]} ${label}`)
          frameIndex = (frameIndex + 1) % frames.length
        }
      }, 80)
    } else {
      // Non-TTY: just print the label once
      console.log(`▸ ${label}`)
    }

    // Spawn the process with inherited stdio to preserve colors
    const env = { ...process.env }
    // Remove NO_COLOR if present to allow colors, and set FORCE_COLOR for better support
    delete env.NO_COLOR
    env.FORCE_COLOR = "1"

    const proc = spawn(command, args, {
      stdio: ["inherit", "pipe", "pipe"],
      env,
    })

    // Stream stdout directly
    proc.stdout.on("data", (data) => {
      if (spinner && !hasOutput) {
        clearInterval(spinner)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        spinner = null
        hasOutput = true
      }
      process.stdout.write(data)
    })

    // Stream stderr directly
    proc.stderr.on("data", (data) => {
      if (spinner && !hasOutput) {
        clearInterval(spinner)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        spinner = null
        hasOutput = true
      }
      process.stderr.write(data)
    })

    proc.on("close", (code) => {
      if (spinner) {
        clearInterval(spinner)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
      }

      if (code === 0) {
        console.log(`✓ ${label}`)
      } else {
        if (hasOutput) {
          console.log(`\n✗ ${label}\n`)
        } else {
          console.log(`✗ ${label}\n`)
        }
      }

      resolve(code)
    })
  })
}

/**
 * Main function to run all lint checks
 */
async function main() {
  console.log("\n🔍 Running linting checks...\n")

  // Run ESLint with color output
  const eslintCode = await runWithProgress("yarn", ["eslint", ".", "--color"], "Checking ESLint rules...")

  if (eslintCode !== 0) {
    console.log("\n❌ ESLint failed. Please fix the errors above.\n")
    process.exit(eslintCode)
  }

  // Run Stylelint with color output
  const stylelintCode = await runWithProgress("yarn", ["stylelint", "**/*.css", "--color"], "Checking CSS styles...")

  if (stylelintCode !== 0) {
    console.log("\n❌ Stylelint failed. Please fix the errors above.\n")
    process.exit(stylelintCode)
  }

  // Run TypeScript
  const tscCode = await runWithProgress("yarn", ["tsc", "--noEmit", "--pretty"], "Checking TypeScript types...")

  if (tscCode !== 0) {
    console.log("\n❌ TypeScript check failed. Please fix the errors above.\n")
    process.exit(tscCode)
  }

  console.log("\n✅ All linting checks passed!\n")
  process.exit(0)
}

main().catch((error) => {
  console.error("\n❌ Unexpected error:", error)
  process.exit(1)
})
