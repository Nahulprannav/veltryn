import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { SpotlightCard } from '../shared/SpotlightCard';
import { Users, BookOpen, Briefcase, MessageSquare, TrendingUp, Eye } from 'lucide-react';

import blogs from '../../data/blogs.json';
import dsaCourse from '../../data/dsaCourse.json';
import javaCourse from '../../data/javaCourse.json';
import mernCourse from '../../data/mernCourse.json';
import oopCourse from '../../data/oopCourse.json';
import phpCourse from '../../data/phpCourse.json';

export function DashboardOverview() {
  const { theme } = useTheme();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [pageViews, setPageViews] = useState<number>(0);

  useEffect(() => {
    try {
      const regs = JSON.parse(localStorage.getItem('courseRegistrations') || '[]');
      setRegistrations(Array.isArray(regs) ? regs : []);
    } catch (e) {
      setRegistrations([]);
    }

    // messages may be stored in localStorage under 'messages' (optional)
    try {
      const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
      setMessagesCount(Array.isArray(msgs) ? msgs.length : 0);
    } catch (e) {
      setMessagesCount(0);
    }

    // page views can be tracked in localStorage 'pageViews' if available
    const pv = parseInt(localStorage.getItem('pageViews') || '0', 10);
    setPageViews(isNaN(pv) ? 0 : pv);
  }, []);

  // Compute dynamic stats using available data
  const courseFiles = [dsaCourse, javaCourse, mernCourse, oopCourse, phpCourse];
  const activeCoursesCount = courseFiles.filter(Boolean).length;
  const servicesCount = 9; // derived from components/services files count

  // Total users: unique emails from registrations + current logged-in user if present
  const uniqueUsers = new Set<string>();
  registrations.forEach((r: any) => {
    if (r.email) uniqueUsers.add(r.email.toLowerCase());
    if (r.user) uniqueUsers.add(r.user.toLowerCase());
  });
  try {
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (currentUser && currentUser.email) uniqueUsers.add(currentUser.email.toLowerCase());
  } catch (e) {
    // ignore
  }

  const totalUsersCount = uniqueUsers.size;

  const stats = [
    { icon: Users, label: 'Total Users', value: totalUsersCount.toString(), change: '+0%', trend: 'neutral' },
    { icon: BookOpen, label: 'Active Courses', value: activeCoursesCount.toString(), change: '0%', trend: 'neutral' },
    { icon: Briefcase, label: 'Services', value: servicesCount.toString(), change: '+0%', trend: 'neutral' },
    { icon: MessageSquare, label: 'New Messages', value: messagesCount.toString(), change: '+0', trend: 'neutral' },
    { icon: TrendingUp, label: 'Registrations', value: registrations.length.toString(), change: '+0%', trend: 'neutral' },
    { icon: Eye, label: 'Page Views', value: pageViews >= 1000 ? `${(pageViews / 1000).toFixed(1)}K` : pageViews.toString(), change: '+0%', trend: 'neutral' },
  ];

  // Build recent activity from registrations and messages
  const messages = (() => {
    try {
      const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
      return Array.isArray(msgs) ? msgs : [];
    } catch (e) {
      return [];
    }
  })();

  const recentActivity = (() => {
    // take latest 8 activities from registrations and messages
    const acts: Array<{ user: string; action: string; time: string; ts: number }> = [];

    registrations.forEach((r: any) => {
      const t = r.registeredAt ? Date.parse(r.registeredAt) : Date.now();
      acts.push({ user: r.userName || r.user || r.userEmail || 'User', action: `enrolled in ${r.courseName || r.course || 'a course'}`, time: timeAgo(t), ts: t });
    });

    messages.forEach((m: any) => {
      const t = m.createdAt ? Date.parse(m.createdAt) : Date.now();
      acts.push({ user: m.name || m.from || m.email || 'User', action: 'sent a contact message', time: timeAgo(t), ts: t });
    });

    // sort by timestamp desc and return human-friendly items
    return acts.sort((a, b) => b.ts - a.ts).slice(0, 8).map(a => ({ user: a.user, action: a.action, time: a.time }));
  })();

  // Compute top courses by counting registrations per course
  const topCourses = (() => {
    const counts: Record<string, number> = {};
    registrations.forEach((r: any) => {
      const name = r.courseName || r.course || 'Unknown Course';
      counts[name] = (counts[name] || 0) + 1;
    });
    const arr = Object.keys(counts).map(name => ({ name, enrollments: counts[name] }));
    // if no data, fall back to courses detected from courseFiles
    if (arr.length === 0) {
      return courseFiles.map((c: any) => ({ name: c.courseName || c.courseName || 'Course', enrollments: 0 })).slice(0, 4);
    }
    return arr.sort((a, b) => b.enrollments - a.enrollments).slice(0, 4);
  })();

  function timeAgo(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 48) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Dashboard Overview
        </h1>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <SpotlightCard key={index}>
              <Card className={
                theme === 'dark'
                  ? 'bg-black border-amber-500/20 shadow-xl shadow-amber-500/5'
                  : 'bg-white border-blue-500/20 shadow-xl shadow-blue-500/5'
              }>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </CardTitle>
                  <Icon className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-amber-500' : 'text-blue-600'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {stat.value}
                  </div>
                  <p className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-gray-500'
                  }`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            </SpotlightCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <SpotlightCard>
          <Card className={
            theme === 'dark'
              ? 'bg-black border-amber-500/20 shadow-xl shadow-amber-500/5'
              : 'bg-white border-blue-500/20 shadow-xl shadow-blue-500/5'
          }>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      theme === 'dark' ? 'bg-amber-500' : 'bg-blue-600'
                    }`} />
                    <div className="flex-1">
                      <p className={theme === 'dark' ? 'text-white' : 'text-black'}>
                        <span className={theme === 'dark' ? 'text-amber-500' : 'text-blue-600'}>
                          {activity.user}
                        </span>{' '}
                        {activity.action}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SpotlightCard>

        {/* Top Courses */}
        <SpotlightCard>
          <Card className={
            theme === 'dark'
              ? 'bg-black border-amber-500/20 shadow-xl shadow-amber-500/5'
              : 'bg-white border-blue-500/20 shadow-xl shadow-blue-500/5'
          }>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                Top Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className={`mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {course.name}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {course.enrollments} enrollments
                      </p>
                    </div>
                    <div className={theme === 'dark' ? 'text-amber-500' : 'text-blue-600'}>
                      {course.revenue}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SpotlightCard>
      </div>
    </div>
  );
}