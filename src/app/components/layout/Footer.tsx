import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-on-primary">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-on-primary">AMS Law</h3>
            <p className="text-footer mb-4">
              Professional legal services specializing in estate planning, wills, trusts, and probate. 
              Protecting your family&apos;s future with expert legal guidance.
            </p>
            <div className="text-footer">
              <p className="mb-2">
                <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
              </p>
              <p className="mb-2">
                <strong>Emergency:</strong> Available 24/7 for urgent matters
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-on-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-footer-muted hover:text-on-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-footer-muted hover:text-on-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-footer-muted hover:text-on-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-footer-muted hover:text-on-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-on-primary">Contact Info</h4>
            <div className="text-footer space-y-2">
              <p>123 Legal Street</p>
              <p>Suite 100</p>
              <p>Your City, ST 12345</p>
              <p className="mt-4">
                <strong>Phone:</strong> (555) 123-4567
              </p>
              <p>
                <strong>Email:</strong> info@amslaw.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-hover mt-8 pt-8 text-center text-footer-muted">
          <p>&copy; 2025 Anna M. Schneider Law. All rights reserved. | 
            <Link href="/privacy" className="hover:text-on-primary transition-colors ml-2">
              Privacy Policy
            </Link> | 
            <Link href="/terms" className="hover:text-on-primary transition-colors ml-2">
              Terms of Service
            </Link>
          </p>
          <p className="mt-2 text-sm">
            This website is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
