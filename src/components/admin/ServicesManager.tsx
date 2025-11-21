import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { SpotlightCard } from '../shared/SpotlightCard';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

export function ServicesManager() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [services, setServices] = useState([
    {
      id: '1',
      title: 'Penetration Testing',
      description: 'Comprehensive security testing services',
      price: 'Custom',
      category: 'Security'
    },
    {
      id: '2',
      title: 'UI/UX Design',
      description: 'Professional design services',
      price: '$2,000+',
      category: 'Design'
    },
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this service?')) {
      setServices(services.filter(s => s.id !== id));
      toast.success('Service deleted');
    }
  };

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Services Manager
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage your services offerings
          </p>
        </div>
        <Button className={
          theme === 'dark'
            ? 'bg-amber-500 hover:bg-amber-600 text-black'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300'
          }`}
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <SpotlightCard key={service.id}>
            <Card className={
              theme === 'dark'
                ? 'bg-black border-amber-500/20 shadow-xl shadow-amber-500/5'
                : 'bg-white border-blue-500/20 shadow-xl shadow-blue-500/5'
            }>
              <CardHeader>
                <CardTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                  {service.title}
                </CardTitle>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {service.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 text-red-500"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}