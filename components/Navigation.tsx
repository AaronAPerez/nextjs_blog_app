'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white shadow-sm" aria-label="Main Navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/"
            className={`text-lg font-medium ${
              pathname === '/' ? 'text-blue-600' : 'text-gray-700'
            }`}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Blog
          </Link>
          
          <div className="flex space-x-4">
            <Link
              href="/tags"
              className={`px-3 py-2 rounded-md ${
                pathname === '/tags' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              aria-current={pathname === '/tags' ? 'page' : undefined}
            >
              Tags
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}