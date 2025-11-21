import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, MessageCircle } from 'lucide-react';

const cardNavItems = [
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'About', path: '/about', icon: Briefcase },
  { name: 'Contact', path: '/contact', icon: MessageCircle },
];

export function CardNav() {
  return (
    <div className="hidden lg:flex items-center gap-2">
      {cardNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-yellow-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-yellow-500/20"
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
