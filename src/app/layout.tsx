import "@/app/globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import ConstructionBanner from "./components/layout/ConstructionBanner";
import Footer from "./components/layout/Footer";
import type { Metadata } from "next";
import Navigation from "./components/layout/Navigation";
import PageTransition from "./components/layout/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anna M Schneider Law - Wills & Trusts Attorney",
  description: "Professional legal services specializing in estate planning, wills, trusts, and probate. Protecting your family's future with expert legal guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConstructionBanner />
        <Navigation />
        <PageTransition>
          <main className="min-h-screen">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
