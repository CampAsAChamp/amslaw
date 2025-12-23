"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { navigationLinks } from "@/app/data"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [clickedLink, setClickedLink] = useState<string | null>(null)
  const pathname = usePathname()

  // Clear clicked state when pathname updates to match
  useEffect(() => {
    if (clickedLink && pathname === clickedLink) {
      setClickedLink(null)
    }
  }, [pathname, clickedLink])

  return (
    <nav className="bg-surface shadow-lg sticky top-0 z-50">
      <div className="container-page">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/schneider-law-logo.svg"
                alt="Schneider Law"
                width={360}
                height={120}
                className="h-6 md:h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => {
                // Use optimistic state for immediate feedback
                const isActive = pathname === link.href || clickedLink === link.href

                return (
                  <motion.div key={link.href} layout transition={{ duration: 0.2, ease: "easeInOut" }}>
                    <Link
                      href={link.href}
                      onClick={() => setClickedLink(link.href)}
                      className={
                        link.isButton
                          ? `btn-nav-animated ${isActive ? "btn-nav-animated-active" : ""} relative`
                          : "nav-link-wipe px-3 py-2 text-sm font-semibold relative"
                      }
                    >
                      {link.label}
                      {isActive && !link.isButton && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        />
                      )}
                      {isActive && link.isButton && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-primary"
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-8 h-8 flex items-center justify-center focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                {/* Top line */}
                <span
                  className={`block h-0.5 w-full bg-nav transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45 translate-y-[9px]" : ""
                  }`}
                />
                {/* Middle line */}
                <span
                  className={`block h-0.5 w-full bg-nav transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                {/* Bottom line */}
                <span
                  className={`block h-0.5 w-full bg-nav transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {navigationLinks.map((link, index) => {
                  // Use optimistic state for immediate feedback
                  const isActive = pathname === link.href || clickedLink === link.href

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        className={
                          link.isButton
                            ? `btn-nav-mobile-animated ${isActive ? "btn-nav-mobile-animated-active" : ""} relative block`
                            : `text-nav hover:text-primary-dark block px-3 py-2 text-base font-semibold relative ${
                                isActive ? "text-primary" : ""
                              }`
                        }
                        onClick={() => {
                          setClickedLink(link.href)
                          setIsMenuOpen(false)
                        }}
                      >
                        {link.label}
                        {isActive && !link.isButton && (
                          <motion.div
                            layoutId="activeTabMobile"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            }}
                          />
                        )}
                        {isActive && link.isButton && (
                          <motion.div
                            layoutId="activeTabMobile"
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-primary"
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
