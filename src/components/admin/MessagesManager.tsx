import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SpotlightCard } from '../shared/SpotlightCard';
import { Search, Mail, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function MessagesManager() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
      return Array.isArray(msgs) ? msgs : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    let unsub: any = null;
    (async () => {
      try {
        const fb = await import('../../utils/firebase');
        unsub = fb.subscribeToCollection('messages', (items: any[]) => {
          setMessages(items);
        });
      } catch (e) {
        // fallback: listen to storage/custom events
        const onCustom = () => {
          try {
            const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
            setMessages(Array.isArray(msgs) ? msgs : []);
          } catch {
            setMessages([]);
          }
        };
        window.addEventListener('realtime:messages', onCustom as EventListener);
        const onStorage = (e: StorageEvent) => {
          if (!e.key) return;
          if (e.key.startsWith('__lastRealtimeEvent__messages') || e.key === 'messages') onCustom();
        };
        window.addEventListener('storage', onStorage);
        unsub = () => { window.removeEventListener('realtime:messages', onCustom as EventListener); window.removeEventListener('storage', onStorage); };
      }
    })();

    return () => { if (unsub) unsub(); };
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this message?')) {
      const next = messages.filter(m => m.id !== id);
      setMessages(next);
      localStorage.setItem('messages', JSON.stringify(next));
      toast.success('Message deleted');
    }
  };

  const filteredMessages = messages.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Messages
        </h1>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Contact form submissions
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300'
          }`}
        />
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <SpotlightCard key={msg.id}>
            <Card className={
              theme === 'dark'
                ? 'bg-black border-amber-500/20 shadow-xl shadow-amber-500/5'
                : 'bg-white border-blue-500/20 shadow-xl shadow-blue-500/5'
            }>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.read && (
                      <div className={`w-2 h-2 rounded-full ${
                        theme === 'dark' ? 'bg-amber-500' : 'bg-blue-600'
                      }`} />
                    )}
                    <CardTitle className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {msg.subject}
                    </CardTitle>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    From: {msg.name} ({msg.email})
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {msg.date}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-500 border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {msg.message}
                </p>
              </CardContent>
            </Card>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}