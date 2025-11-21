import { Code, Globe, Smartphone, Database } from 'lucide-react';
import { SpotlightCard } from './shared/SpotlightCard';

export function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with payment integration, inventory management, and admin dashboard.',
      category: 'Web Development',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      icon: Globe,
      status: 'Completed',
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with real-time transactions and biometric authentication.',
      category: 'Mobile Development',
      tech: ['React Native', 'Firebase', 'Node.js'],
      icon: Smartphone,
      status: 'In Progress',
    },
    {
      title: 'AI Chatbot System',
      description: 'Intelligent chatbot with natural language processing for customer support automation.',
      category: 'AI/ML',
      tech: ['Python', 'TensorFlow', 'Flask', 'PostgreSQL'],
      icon: Code,
      status: 'Completed',
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Interactive dashboard for business intelligence with real-time data visualization.',
      category: 'Data Science',
      tech: ['Python', 'Pandas', 'D3.js', 'PostgreSQL'],
      icon: Database,
      status: 'Completed',
    },
    {
      title: 'Learning Management System',
      description: 'Comprehensive LMS with course management, student tracking, and assessment tools.',
      category: 'EdTech',
      tech: ['MERN Stack', 'AWS', 'WebRTC'],
      icon: Globe,
      status: 'In Progress',
    },
    {
      title: 'Healthcare Management System',
      description: 'Patient management system with appointment scheduling and medical records.',
      category: 'Healthcare',
      tech: ['Java', 'Spring Boot', 'MySQL', 'React'],
      icon: Database,
      status: 'Completed',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Our Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore our portfolio of successful projects across various domains and technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <SpotlightCard key={index}>
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-yellow-900/20">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-yellow-600" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    project.status === 'Completed'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl mb-2">{project.title}</h3>
                <p className="text-sm text-blue-600 dark:text-yellow-600 mb-3">{project.category}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
