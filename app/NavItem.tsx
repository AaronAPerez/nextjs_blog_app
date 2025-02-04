import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  isActive?: boolean;
}

export const NavItem = ({ href, icon: Icon, children, isActive }: NavItemProps) => {
  if (!href) {
    return null;
  }

  return (
    <Link 
      href={href}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                 ${isActive 
                   ? 'bg-blue-50 text-blue-700' 
                   : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
    >
      <Icon className="w-5 h-5 mr-3" aria-hidden="true" />
      {children}
    </Link>
  );
};

export default NavItem;