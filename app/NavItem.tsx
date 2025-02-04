import { Link } from "lucide-react";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

function NavItem({ href, icon, children }: NavItemProps) {
  return (
    <Link 
      href={href}
      className="flex items-center p-3 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
    >
      {icon}
      <span className="ml-4 text-lg">{children}</span>
    </Link>
  );
}
export default NavItem;