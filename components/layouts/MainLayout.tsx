'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Home, Bell, Bookmark, User, Settings } from 'lucide-react';
import NavItem from '@/app/NavItem';

interface LayoutProps {
  children: ReactNode;
}

// Main layout component
const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip link for keyboard navigation */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white"
      >
        Skip to main content
      </a>

      <div className="flex">
        {/* Left Sidebar - Navigation */}
        <aside className="fixed h-screen w-64 border-r border-gray-200 p-4 bg-white">
          <nav className="space-y-2" aria-label="Main Navigation">
            <Link 
              href="/"
              className="flex items-center p-3 text-xl font-bold text-blue-500 hover:bg-blue-50 rounded-full"
            >
              <span className="text-2xl">📝</span>
              <span className="ml-4">Blog</span>
            </Link>

            <NavItem href="/" icon={<Home className="w-6 h-6" />}>Home</NavItem>
            <NavItem href="/notifications" icon={<Bell className="w-6 h-6" />}>Notifications</NavItem>
            <NavItem href="/bookmarks" icon={<Bookmark className="w-6 h-6" />}>Bookmarks</NavItem>
            <NavItem href="/profile" icon={<User className="w-6 h-6" />}>Profile</NavItem>
            <NavItem href="/settings" icon={<Settings className="w-6 h-6" />}>Settings</NavItem>
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          id="main-content" 
          className="ml-64 flex-1 min-h-screen border-r border-gray-200 bg-white"
        >
          {children}
        </main>

        {/* Right Sidebar - Trending/Search */}
        <aside className="fixed right-0 h-screen w-80 p-4 bg-gray-50">
          <div className="sticky top-4 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <input
                type="search"
                placeholder="Search posts..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search posts"
              />
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
              <div className="space-y-4">
                {/* Add trending topics here */}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default MainLayout;

// // Reusable navigation item component
// interface NavItemProps {
//   href: string;
//   icon: ReactNode;
//   children: ReactNode;
// }

// function NavItem({ href, icon, children }: NavItemProps) {
//   return (
//     <Link 
//       href={href}
//       className="flex items-center p-3 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
//     >
//       {icon}
//       <span className="ml-4 text-lg">{children}</span>
//     </Link>
//   );
// }

