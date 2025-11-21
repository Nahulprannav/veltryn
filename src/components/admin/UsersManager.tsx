import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { SpotlightCard } from '../shared/SpotlightCard';
import { Search, Shield, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function UsersManager() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<any[]>(() => {
    try {
      const u = JSON.parse(localStorage.getItem('users') || '[]');
      if (Array.isArray(u) && u.length) return u.map((x: any) => ({
        id: x.id || x.email || Math.random().toString(36).substr(2,9),
        name: x.displayName || x.name || (x.email ? x.email.split('@')[0] : 'User'),
        email: x.email || '',
        role: x.role || 'User',
        hasEditAccess: !!x.isEditor,
        joinedDate: x.joinedDate || (x.createdAt ? new Date(x.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0])
      }));
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const onCustom = () => {
      try {
        const u = JSON.parse(localStorage.getItem('users') || '[]');
        setUsers(Array.isArray(u) ? u : []);
      } catch {
        setUsers([]);
      }
    };
    window.addEventListener('storage', onCustom);
    window.addEventListener('realtime:users', onCustom as EventListener);
    return () => { window.removeEventListener('storage', onCustom); window.removeEventListener('realtime:users', onCustom as EventListener); };
  }, []);

  const toggleEditAccess = (userId: string) => {
    const next = users.map(u => u.id === userId ? { ...u, hasEditAccess: !u.hasEditAccess, role: !u.hasEditAccess ? 'Editor' : 'User' } : u);
    setUsers(next);
    // persist to localStorage
    try {
      const raw = JSON.parse(localStorage.getItem('users') || '[]');
      const updated = raw.map((r: any) => r.id === userId ? { ...r, isEditor: !r.isEditor } : r);
      localStorage.setItem('users', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('realtime:users', { detail: { type: 'updated', userId } }));
    } catch {
      // ignore
    }
    toast.success('User permissions updated');
  };

  const handleDelete = (userId: string) => {
    if (!window.confirm('Delete this user?')) return;
    const next = users.filter(u => u.id !== userId);
    setUsers(next);
    try {
      const raw = JSON.parse(localStorage.getItem('users') || '[]');
      const updated = raw.filter((r: any) => r.id !== userId);
      localStorage.setItem('users', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('realtime:users', { detail: { type: 'deleted', userId } }));
    } catch {}
    toast.success('User deleted');
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Access & Permissions
        </h1>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Manage user roles and edit access
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300'
          }`}
        />
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <SpotlightCard key={user.id}>
            <Card className={
              theme === 'dark'
                ? 'bg-black border-amber-500/20 shadow-xl shadow-amber-500/5'
                : 'bg-white border-blue-500/20 shadow-xl shadow-blue-500/5'
            }>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <User className={`w-6 h-6 ${
                        theme === 'dark' ? 'text-amber-500' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <p className={`mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {user.name}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.email}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Joined: {user.joinedDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      {user.hasEditAccess && (
                        <Shield className={`w-5 h-5 ${
                          theme === 'dark' ? 'text-amber-500' : 'text-blue-600'
                        }`} />
                      )}
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Edit Access
                      </span>
                      <Switch
                        checked={user.hasEditAccess}
                        onCheckedChange={() => toggleEditAccess(user.id)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}