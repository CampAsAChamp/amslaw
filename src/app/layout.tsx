import "@/app/globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import ConstructionBanner from "@/app/components/layout/ConstructionBanner";
import Footer from "@/app/components/layout/Footer";
import type { Metadata } from "next";
import Navigation from "@/app/components/layout/Navigation";

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
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
