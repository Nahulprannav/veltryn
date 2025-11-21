import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { DashboardOverview } from './DashboardOverview';
import { CoursesManager } from './CoursesManager';
import { ServicesManager } from './ServicesManager';
import { ProjectsManager } from './ProjectsManager';
import { WebinarsManager } from './WebinarsManager';
import { LiveClassesManager } from './LiveClassesManager';
import { BlogManager } from './BlogManager';
import { MessagesManager } from './MessagesManager';
import { RegistrationsManager } from './RegistrationsManager';
import { UsersManager } from './UsersManager';
import { LayoutDashboard, BookOpen, Briefcase, FolderOpen, Video, Calendar, FileText, MessageSquare, UserCheck, Users, Settings, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminDashboard() {
  const { theme } = useTheme();
  const ImportData = React.lazy(() => import('./ImportData.tsx'));
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { path: '/admin/services', icon: Briefcase, label: 'Services' },
    { path: '/admin/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/admin/webinars', icon: Video, label: 'Webinars' },
    { path: '/admin/live-classes', icon: Calendar, label: 'Live Classes' },
    { path: '/admin/blog', icon: FileText, label: 'Blog' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admin/registrations', icon: UserCheck, label: 'Registrations' },
    { path: '/admin/users', icon: Users, label: 'Access & Permissions' },
    { path: '/admin/import', icon: Settings, label: 'Import Data' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-72 min-h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-500 dark:to-orange-500 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path, item.exact);
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                          active
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-600 dark:to-orange-600 text-white shadow-lg shadow-blue-500/50 dark:shadow-yellow-500/50'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-600 dark:to-orange-600"
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                          />
                        )}
                        <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${active ? '' : 'group-hover:scale-110'}`} />
                        <span className="text-sm font-medium relative z-10">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Admin Dashboard
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="courses" element={<CoursesManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="webinars" element={<WebinarsManager />} />
              <Route path="live-classes" element={<LiveClassesManager />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="messages" element={<MessagesManager />} />
              <Route path="registrations" element={<RegistrationsManager />} />
              <Route path="users" element={<UsersManager />} />
              <Route path="import" element={
                // lazy import to avoid adding heavy code to top
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ImportData />
                </React.Suspense>
              } />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
}