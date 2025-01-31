import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Define fonts with subset optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata for SEO and accessibility
export const metadata: Metadata = {
  title: "Blog Platform",
  description: "A modern, accessible blog platform built with Next.js",
  authors: [{ name: "Author's Name" }],
  // Add OpenGraph metadata for better social sharing
  openGraph: {
    title: "Blog Platform",
    description: "A modern, accessible blog platform built with Next.js",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html 
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Skip to main content link for keyboard users */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white"
        >
          Skip to main content
        </a>
        
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}