import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SpotlightCard } from '../shared/SpotlightCard';
import { Search } from 'lucide-react';

export function RegistrationsManager() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const [courseRegistrations, setCourseRegistrations] = useState<any[]>(() => {
    try {
      const regs = JSON.parse(localStorage.getItem('courseRegistrations') || '[]');
      return Array.isArray(regs) ? regs : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    let unsub: any = null;
    (async () => {
      try {
        const fb = await import('../../utils/firebase');
        unsub = fb.subscribeToCollection('courseRegistrations', (items: any[]) => {
          setCourseRegistrations(items);
        });
      } catch (e) {
        const onCustom = () => {
          try {
            const regs = JSON.parse(localStorage.getItem('courseRegistrations') || '[]');
            setCourseRegistrations(Array.isArray(regs) ? regs : []);
          } catch {
            setCourseRegistrations([]);
          }
        };
        window.addEventListener('realtime:courseRegistrations', onCustom as EventListener);
        const onStorage = (e: StorageEvent) => {
          if (!e.key) return;
          if (e.key.startsWith('__lastRealtimeEvent__courseRegistrations') || e.key === 'courseRegistrations') onCustom();
        };
        window.addEventListener('storage', onStorage);
        unsub = () => { window.removeEventListener('realtime:courseRegistrations', onCustom as EventListener); window.removeEventListener('storage', onStorage); };
      }
    })();

    return () => { if (unsub) unsub(); };
  }, []);

  const [webinarRegistrations] = useState<any[]>(() => {
    try {
      const regs = JSON.parse(localStorage.getItem('webinarRegistrations') || '[]');
      return Array.isArray(regs) ? regs : [];
    } catch (e) {
      return [];
    }
  });

  const [liveClassRegistrations] = useState<any[]>(() => {
    try {
      const regs = JSON.parse(localStorage.getItem('liveClassRegistrations') || '[]');
      return Array.isArray(regs) ? regs : [];
    } catch (e) {
      return [];
    }
  });

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Registrations
        </h1>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Track all user registrations
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <Input
          placeholder="Search registrations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300'
          }`}
        />
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className={`grid w-full grid-cols-3 mb-8 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
        }`}>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="classes">Live Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {courseRegistrations.map((reg) => (
            <SpotlightCard key={reg.id}>
              <Card className={
                theme === 'dark'
                  ? 'bg-black border-amber-500/20'
                  : 'bg-white border-blue-500/20'
              }>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={theme === 'dark' ? 'text-white' : 'text-black'}>
                        {reg.user} - {reg.course}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {reg.date}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      theme === 'dark'
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-blue-500/20 text-blue-600'
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </SpotlightCard>
          ))}
        </TabsContent>

        <TabsContent value="webinars" className="space-y-4">
          {webinarRegistrations.map((reg) => (
            <SpotlightCard key={reg.id}>
              <Card className={
                theme === 'dark'
                  ? 'bg-black border-amber-500/20'
                  : 'bg-white border-blue-500/20'
              }>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={theme === 'dark' ? 'text-white' : 'text-black'}>
                        {reg.user} - {reg.webinar}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {reg.date}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      theme === 'dark'
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-blue-500/20 text-blue-600'
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </SpotlightCard>
          ))}
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          {liveClassRegistrations.map((reg) => (
            <SpotlightCard key={reg.id}>
              <Card className={
                theme === 'dark'
                  ? 'bg-black border-amber-500/20'
                  : 'bg-white border-blue-500/20'
              }>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={theme === 'dark' ? 'text-white' : 'text-black'}>
                        {reg.user} - {reg.class}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {reg.date}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      theme === 'dark'
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-blue-500/20 text-blue-600'
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </SpotlightCard>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}