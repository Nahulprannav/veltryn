import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-500 dark:to-orange-500 bg-clip-text text-transparent">
              Veltryn
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive education technology and IT services platform offering courses, services, and solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-600">Courses</Link></li>
              <li><Link to="/services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-600">Services</Link></li>
              <li><Link to="/projects" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-600">Projects</Link></li>
              <li><Link to="/webinars" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-600">Webinars</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-600">Blog</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-600">About</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-600">Contact</Link></li>
              <li><Link to="/live-classes" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-600">Live Classes</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@veltryn.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>123 Tech Street, CA</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-yellow-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-yellow-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-yellow-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-yellow-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Veltryn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
