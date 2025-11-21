import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export function WebinarsManager() {
  const { theme } = useTheme();
  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Webinars Manager</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Schedule and manage webinars
          </p>
        </div>
        <Button className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'bg-blue-600 hover:bg-blue-700 text-white'}>
          <Plus className="w-4 h-4 mr-2" />
          Add Webinar
        </Button>
      </div>
      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
        Webinars management interface - Schedule, edit, and track webinar registrations
      </p>
    </div>
  );
}
