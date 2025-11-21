import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { SpotlightCard } from '../shared/SpotlightCard';
import { toast } from 'sonner';

export default function ImportData() {
  const { theme } = useTheme();
  const [registrationsJson, setRegistrationsJson] = useState('');
  const [messagesJson, setMessagesJson] = useState('');
  const [usersJson, setUsersJson] = useState('');
  const [pageViewsValue, setPageViewsValue] = useState('');

  const applyJson = (key: string, jsonStr: string) => {
    try {
      if (!jsonStr) return;
      const parsed = JSON.parse(jsonStr);
      if (key === 'pageViews') {
        const num = Number(parsed);
        if (Number.isNaN(num)) throw new Error('pageViews must be a number');
        localStorage.setItem('pageViews', String(num));
      } else {
        if (!Array.isArray(parsed)) throw new Error('Expected an array');
        localStorage.setItem(key, JSON.stringify(parsed));
      }
      toast.success(`${key} saved to localStorage`);
    } catch (e: any) {
      toast.error(`Invalid JSON for ${key}: ${e?.message || e}`);
    }
  };

  const handleApplyAll = () => {
    if (registrationsJson) applyJson('courseRegistrations', registrationsJson);
    if (messagesJson) applyJson('messages', messagesJson);
    if (usersJson) applyJson('users', usersJson);
    if (pageViewsValue) {
      // allow either pure number or JSON number
      try {
        const parsed = JSON.parse(pageViewsValue);
        applyJson('pageViews', JSON.stringify(parsed));
      } catch {
        applyJson('pageViews', pageViewsValue);
      }
    }
  };

  const clearAll = () => {
    if (confirm('Clear courseRegistrations, messages, users, pageViews from localStorage?')) {
      localStorage.removeItem('courseRegistrations');
      localStorage.removeItem('messages');
      localStorage.removeItem('users');
      localStorage.removeItem('pageViews');
      setRegistrationsJson('');
      setMessagesJson('');
      setUsersJson('');
      setPageViewsValue('');
      toast.success('All demo data cleared');
    }
  };

  const loadSample = () => {
    const sampleRegs = [
      {
        id: 'r1',
        userId: 'u1',
        userEmail: 'alice@example.com',
        userName: 'Alice',
        courseId: 'python',
        courseName: 'Python Programming',
        registeredAt: new Date().toISOString(),
        status: 'active',
      },
    ];
    const sampleMsgs = [
      { id: 'm1', name: 'Alice', email: 'alice@example.com', subject: 'Hello', message: 'Hi', createdAt: new Date().toISOString() }
    ];
    const sampleUsers = [
      { id: 'u1', email: 'admin&veltryn@gmail.com', displayName: 'Admin Veltryn', isAdmin: true }
    ];
    setRegistrationsJson(JSON.stringify(sampleRegs, null, 2));
    setMessagesJson(JSON.stringify(sampleMsgs, null, 2));
    setUsersJson(JSON.stringify(sampleUsers, null, 2));
    setPageViewsValue('1250');
  };

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="mb-6">
        <h1 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Import Demo Data</h1>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Paste JSON for collections and click "Apply" to save to localStorage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpotlightCard>
          <Card className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
            <CardHeader>
              <CardTitle>courseRegistrations</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea rows={10} value={registrationsJson} onChange={(e) => setRegistrationsJson(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-md font-mono text-sm" />
              <div className="flex gap-2 mt-3">
                <Button onClick={() => applyJson('courseRegistrations', registrationsJson)}>Apply</Button>
                <Button onClick={() => setRegistrationsJson('')}>Clear</Button>
              </div>
            </CardContent>
          </Card>
        </SpotlightCard>

        <SpotlightCard>
          <Card className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
            <CardHeader>
              <CardTitle>messages</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea rows={10} value={messagesJson} onChange={(e) => setMessagesJson(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-md font-mono text-sm" />
              <div className="flex gap-2 mt-3">
                <Button onClick={() => applyJson('messages', messagesJson)}>Apply</Button>
                <Button onClick={() => setMessagesJson('')}>Clear</Button>
              </div>
            </CardContent>
          </Card>
        </SpotlightCard>

        <SpotlightCard>
          <Card className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
            <CardHeader>
              <CardTitle>users</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea rows={6} value={usersJson} onChange={(e) => setUsersJson(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-md font-mono text-sm" />
              <div className="flex gap-2 mt-3">
                <Button onClick={() => applyJson('users', usersJson)}>Apply</Button>
                <Button onClick={() => setUsersJson('')}>Clear</Button>
              </div>
            </CardContent>
          </Card>
        </SpotlightCard>

        <SpotlightCard>
          <Card className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
            <CardHeader>
              <CardTitle>pageViews</CardTitle>
            </CardHeader>
            <CardContent>
              <input value={pageViewsValue} onChange={(e) => setPageViewsValue(e.target.value)} placeholder="1250" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-md font-mono text-sm" />
              <div className="flex gap-2 mt-3">
                <Button onClick={() => applyJson('pageViews', pageViewsValue)}>Apply</Button>
                <Button onClick={() => setPageViewsValue('')}>Clear</Button>
              </div>
            </CardContent>
          </Card>
        </SpotlightCard>
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={handleApplyAll}>Apply All</Button>
        <Button onClick={loadSample}>Load Sample</Button>
        <Button variant="destructive" onClick={clearAll}>Clear All</Button>
      </div>
    </div>
  );
}
