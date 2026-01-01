"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"

/**
 * Global Error Boundary
 * Catches and displays runtime errors in the application
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-surface-secondary flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">Something Went Wrong</h1>
        <p className="text-xl text-body mb-8">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mb-8 p-4 bg-surface-secondary rounded-lg text-left">
            <p className="text-sm text-muted font-mono break-all">{error.message}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button onClick={reset} className="btn-hero-primary inline-flex items-center gap-2" aria-label="Try again">
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          <Link href="/" className="btn-hero-secondary inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-surface-tertiary">
          <p className="text-muted mb-4">Need help?</p>
          <Link href="/contact" className="text-primary hover:text-primary-hover transition-colors hover:underline font-semibold">
            Contact us for assistance
          </Link>
        </div>
      </div>
    </div>
  )
}
