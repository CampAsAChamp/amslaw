import Link from "next/link"
import { AddressDisplay, CopyButton } from "@/app/components/ui"
import { navigationLinks, officeHours, contactInfo } from "@/app/data"
import { formatPhoneNumber, formatAddressMultiLine } from "@/utils"

export default function Footer() {
  const addressLines = formatAddressMultiLine(contactInfo.address)

  return (
    <footer className="bg-primary-dark text-on-primary">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-on-primary">Anna M. Schneider Law</h3>
            <p className="text-footer mb-4">
              Professional legal services specializing in estate planning, wills, trusts, and probate. Protecting your
              family&apos;s future with expert legal guidance.
            </p>
            <div className="text-footer">
              <p className="mb-2">
                <strong>Office Hours:</strong>
              </p>
              <ul className="ml-4 space-y-1 list-disc list-inside text-sm">
                {officeHours.map((schedule, index) => (
                  <li key={index}>
                    <strong>{schedule.days}:</strong> {schedule.hours}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-on-primary">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-footer-muted hover:text-on-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-on-primary">Contact Info</h4>
            <div className="text-footer space-y-2">
              <AddressDisplay
                addressLines={addressLines}
                link={contactInfo.maps.link}
                className="text-footer-muted hover:text-on-primary transition-colors hover:underline block"
              />
              <p className="mt-4 flex items-center gap-2">
                <strong>Phone:</strong>{" "}
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-footer-muted hover:text-on-primary transition-colors hover:underline"
                >
                  {formatPhoneNumber(contactInfo.phone)}
                </a>
                <CopyButton
                  textToCopy={formatPhoneNumber(contactInfo.phone)}
                  label="Copy phone number"
                  className="text-footer-muted hover:text-on-primary"
                />
              </p>
              <p className="flex items-center gap-2">
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-footer-muted hover:text-on-primary transition-colors hover:underline"
                >
                  {contactInfo.email}
                </a>
                <CopyButton
                  textToCopy={contactInfo.email}
                  label="Copy email address"
                  className="text-footer-muted hover:text-on-primary"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-hover mt-8 pt-8 text-center text-footer-muted">
          <p>&copy; 2025 Anna M. Schneider Law. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This website is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
