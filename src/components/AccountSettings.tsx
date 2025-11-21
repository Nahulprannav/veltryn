import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { SpotlightCard } from './shared/SpotlightCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, Mail, Lock, Image as ImageIcon, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AccountSettings() {
  const { user, updateProfile, updatePassword } = useAuth();
  const { theme } = useTheme();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    photoURL: user?.photoURL || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      toast.success('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Account Settings
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage your account settings and preferences
          </p>
        </div>

        <SpotlightCard>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className={`grid w-full grid-cols-3 mb-8 ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className={
                theme === 'dark'
                  ? 'bg-black border-amber-500/20 shadow-2xl shadow-amber-500/10'
                  : 'bg-white border-blue-500/20 shadow-2xl shadow-blue-500/10'
              }>
                <CardHeader>
                  <CardTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                    Profile Information
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Update your profile information and photo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={profileData.photoURL} alt={profileData.name} />
                        <AvatarFallback className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}>
                          {profileData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Label htmlFor="photoURL" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          Photo URL
                        </Label>
                        <div className="relative mt-1">
                          <ImageIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <Input
                            id="photoURL"
                            name="photoURL"
                            type="url"
                            placeholder="https://example.com/photo.jpg"
                            value={profileData.photoURL}
                            onChange={handleProfileChange}
                            className={`pl-10 ${
                              theme === 'dark'
                                ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
                                : 'bg-white border-gray-300 text-black'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <Label htmlFor="name" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        Full Name
                      </Label>
                      <div className="relative mt-1">
                        <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          required
                          className={`pl-10 ${
                            theme === 'dark'
                              ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
                              : 'bg-white border-gray-300 text-black'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        Email Address
                      </Label>
                      <div className="relative mt-1">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className={`pl-10 ${
                            theme === 'dark'
                              ? 'bg-gray-900 border-gray-700 text-gray-500'
                              : 'bg-gray-100 border-gray-300 text-gray-500'
                          }`}
                        />
                      </div>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Email cannot be changed
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className={`flex items-center gap-2 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                      }`}
                      disabled={loading}
                    >
                      <Save className="w-4 h-4" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className={
                theme === 'dark'
                  ? 'bg-black border-amber-500/20 shadow-2xl shadow-amber-500/10'
                  : 'bg-white border-blue-500/20 shadow-2xl shadow-blue-500/10'
              }>
                <CardHeader>
                  <CardTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                    Security Settings
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Update your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        Current Password
                      </Label>
                      <div className="relative mt-1">
                        <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          placeholder="••••••••"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                          className={`pl-10 ${
                            theme === 'dark'
                              ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
                              : 'bg-white border-gray-300 text-black'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        New Password
                      </Label>
                      <div className="relative mt-1">
                        <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="••••••••"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={6}
                          className={`pl-10 ${
                            theme === 'dark'
                              ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
                              : 'bg-white border-gray-300 text-black'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        Confirm New Password
                      </Label>
                      <div className="relative mt-1">
                        <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={6}
                          className={`pl-10 ${
                            theme === 'dark'
                              ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
                              : 'bg-white border-gray-300 text-black'
                          }`}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className={`flex items-center gap-2 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                      }`}
                      disabled={loading}
                    >
                      <Save className="w-4 h-4" />
                      {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className={
                theme === 'dark'
                  ? 'bg-black border-amber-500/20 shadow-2xl shadow-amber-500/10'
                  : 'bg-white border-blue-500/20 shadow-2xl shadow-blue-500/10'
              }>
                <CardHeader>
                  <CardTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                    Preferences
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Manage your account preferences and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                    }`}>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        Additional preference options coming soon...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SpotlightCard>
      </div>
    </div>
  );
}