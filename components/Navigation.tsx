import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`
            }
          >
            Blog
          </NavLink>
          
          <div className="flex space-x-4">
            <NavLink
              to="/tags"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              Tags
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}