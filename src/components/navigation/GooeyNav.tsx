import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
];

export function GooeyNav() {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-blue-600 dark:bg-yellow-600 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
