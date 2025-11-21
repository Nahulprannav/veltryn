import { Link } from 'react-router-dom';
import { Code, Database, Server, Layout, Cpu, Lock, Globe } from 'lucide-react';
import { SpotlightCard } from './shared/SpotlightCard';

export function Courses() {
  const courses = [
    {
      id: 'python',
      title: 'Python Programming',
      description: 'Master Python from basics to advanced topics including data structures, OOP, and frameworks.',
      icon: Code,
      duration: '12 weeks',
      level: 'Beginner to Advanced',
      students: '5,000+',
      link: '/courses/python',
    },
    {
      id: 'java',
      title: 'Java Development',
      description: 'Complete Java programming course covering core concepts, advanced features, and frameworks.',
      icon: Cpu,
      duration: '14 weeks',
      level: 'Beginner to Advanced',
      students: '4,500+',
      link: '/courses/java',
    },
    {
      id: 'mern',
      title: 'MERN Stack',
      description: 'Build full-stack applications using MongoDB, Express, React, and Node.js.',
      icon: Server,
      duration: '16 weeks',
      level: 'Intermediate',
      students: '3,800+',
      link: '/courses/mern-stack',
    },
    {
      id: 'mean',
      title: 'MEAN Stack',
      description: 'Learn to build scalable applications with MongoDB, Express, Angular, and Node.js.',
      icon: Database,
      duration: '16 weeks',
      level: 'Intermediate',
      students: '3,200+',
      link: '/courses/mean-stack',
    },
    {
      id: 'oops',
      title: 'Object-Oriented Programming',
      description: 'Deep dive into OOP concepts, design patterns, and best practices.',
      icon: Layout,
      duration: '8 weeks',
      level: 'Intermediate',
      students: '6,000+',
      link: '/courses/oops',
    },
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      description: 'Master essential DSA concepts for coding interviews and problem-solving.',
      icon: Lock,
      duration: '12 weeks',
      level: 'Intermediate to Advanced',
      students: '7,500+',
      link: '/courses/dsa',
    },
    {
      id: 'php',
      title: 'PHP & MySQL Development',
      description: 'Build dynamic websites and web applications with PHP and MySQL.',
      icon: Globe,
      duration: '10 weeks',
      level: 'Beginner to Intermediate',
      students: '2,800+',
      link: '/courses/php',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Our Courses</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Learn from industry experts with our comprehensive courses designed to take you from beginner to professional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const Icon = course.icon;
          return (
            <SpotlightCard key={course.id}>
              <Link to={course.link} className="block p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-yellow-900/20 w-fit mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-yellow-600" />
                  </div>
                  <h3 className="text-xl mb-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">{course.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Level:</span>
                      <span>{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Students:</span>
                      <span>{course.students}</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </Link>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
