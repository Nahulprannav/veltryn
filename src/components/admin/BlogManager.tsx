import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export function BlogManager() {
  const { theme } = useTheme();
  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Blog Manager</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage blog posts and articles
          </p>
        </div>
        <Button className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'bg-blue-600 hover:bg-blue-700 text-white'}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>
      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
        Blog management interface - Create, edit, and publish blog posts
      </p>
    </div>
  );
}
