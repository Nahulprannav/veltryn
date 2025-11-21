import { useState } from 'react';
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
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'User',
      hasEditAccess: false,
      joinedDate: '2024-01-10'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      hasEditAccess: true,
      joinedDate: '2024-01-12'
    },
  ]);

  const toggleEditAccess = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, hasEditAccess: !u.hasEditAccess, role: !u.hasEditAccess ? 'Editor' : 'User' }
        : u
    ));
    toast.success('User permissions updated');
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