import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { EnhancedHeader } from './components/EnhancedHeader';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Blog } from './components/Blog';
import { BlogDetail } from './components/BlogDetail';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Courses } from './components/Courses';
import { PythonCourse } from './components/courses/PythonCourse';
import { PythonLearn } from './components/courses/PythonLearn';
import { JavaCourse } from './components/courses/JavaCourse';
import { MERNStackCourse } from './components/courses/MERNStackCourse';
import { MEANStackCourse } from './components/courses/MEANStackCourse';
import { OOPSCourse } from './components/courses/OOPSCourse';
import { DSACourse } from './components/courses/DSACourse';
import { PHPCourse } from './components/courses/PHPCourse';
import { Projects } from './components/Projects';
import { Webinars } from './components/Webinars';
import { LiveClasses } from './components/LiveClasses';
import { Services } from './components/Services';
import { PenetrationTesting } from './components/services/PenetrationTesting';
import { UIUXDesign } from './components/services/UIUXDesign';
import { SoftwareDevelopment } from './components/services/SoftwareDevelopment';
import { WebsiteDevelopment } from './components/services/WebsiteDevelopment';
import { CloudDevOps } from './components/services/CloudDevOps';
import { EdTechSolutions } from './components/services/EdTechSolutions';
import { ProjectDevelopment } from './components/services/ProjectDevelopment';
import { CyberSecurity } from './components/services/CyberSecurity';
import { BrandingServices } from './components/services/BrandingServices';
import { AccountSettings } from './components/AccountSettings';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <EnhancedHeader />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Courses */}
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/python" element={<PythonCourse />} />
                <Route path="/courses/python/learn" element={<PythonLearn />} />
                <Route path="/courses/java" element={<JavaCourse />} />
                <Route path="/courses/mern-stack" element={<MERNStackCourse />} />
                <Route path="/courses/mean-stack" element={<MEANStackCourse />} />
                <Route path="/courses/oops" element={<OOPSCourse />} />
                <Route path="/courses/dsa" element={<DSACourse />} />
                <Route path="/courses/php" element={<PHPCourse />} />
                
                {/* Other Pages */}
                <Route path="/projects" element={<Projects />} />
                <Route path="/webinars" element={<Webinars />} />
                <Route path="/live-classes" element={<LiveClasses />} />
                
                {/* Services */}
                <Route path="/services" element={<Services />} />
                <Route path="/services/penetration-testing" element={<PenetrationTesting />} />
                <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
                <Route path="/services/software-development" element={<SoftwareDevelopment />} />
                <Route path="/services/website-development" element={<WebsiteDevelopment />} />
                <Route path="/services/cloud-devops" element={<CloudDevOps />} />
                <Route path="/services/edtech-solutions" element={<EdTechSolutions />} />
                <Route path="/services/project-development" element={<ProjectDevelopment />} />
                <Route path="/services/cyber-security" element={<CyberSecurity />} />
                <Route path="/services/branding" element={<BrandingServices />} />
                
                {/* Protected Routes */}
                <Route path="/account" element={
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/*" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}