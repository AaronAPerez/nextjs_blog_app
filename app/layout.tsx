import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blog Platform',
  description: 'A modern blog platform built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* Skip to main content link */}
          <Link 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 
                     focus:p-4 focus:bg-blue-600 focus:text-white"
          >
            Skip to main content
          </Link>

          {/* Navigation */}
          <nav className="bg-white shadow-sm" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  {/* Logo/Home link */}
                  <Link 
                    href="/"
                    className="flex items-center text-lg font-semibold text-gray-900"
                  >
                    Blog Platform
                  </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/posts/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent 
                             text-sm font-medium rounded-md text-white bg-blue-600 
                             hover:bg-blue-700 focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Post
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main id="main-content" className="pb-16 bg-gray-200">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Blog Platform. All rights reserved.
              </p>
            </div>
          </footer>

          {/* Toast Container */}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </body>
    </html>
  );
}