"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { navigationLinks } from "@/app/data"
import { useActiveLink } from "./navigation/useActiveLink"
import DesktopNav from "./navigation/DesktopNav"
import MobileNav from "./navigation/MobileNav"
import MobileMenuButton from "./navigation/MobileMenuButton"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { setClickedLink, getIsActive } = useActiveLink(pathname)

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
          <DesktopNav links={navigationLinks} getIsActive={getIsActive} onLinkClick={setClickedLink} />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav
          isOpen={isMenuOpen}
          links={navigationLinks}
          getIsActive={getIsActive}
          onLinkClick={setClickedLink}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </nav>
  )
}
