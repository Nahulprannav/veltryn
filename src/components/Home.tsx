import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase, Code, Users, Sparkles, Zap, Award, TrendingUp } from 'lucide-react';
import { SpotlightCard } from './shared/SpotlightCard';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const { user } = useAuth();
  
  const features = [
    {
      icon: BookOpen,
      title: 'Expert Courses',
      description: 'Learn from industry experts with comprehensive courses in Python, Java, MERN, and more.',
      link: '/courses',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Briefcase,
      title: 'Professional Services',
      description: 'Get professional IT services including web development, cybersecurity, and cloud solutions.',
      link: '/services',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Code,
      title: 'Real Projects',
      description: 'Work on real-world projects and build your portfolio with guided project development.',
      link: '/projects',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Users,
      title: 'Live Learning',
      description: 'Join live classes and webinars to interact with instructors and peers in real-time.',
      link: '/live-classes',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const benefits = [
    {
      icon: Sparkles,
      title: 'Industry-Relevant Curriculum',
      description: 'Stay ahead with cutting-edge technologies',
    },
    {
      icon: Zap,
      title: 'Hands-On Learning',
      description: 'Build real projects while you learn',
    },
    {
      icon: Award,
      title: 'Certified Programs',
      description: 'Earn recognized certifications',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Advance your career with expert guidance',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-yellow-900/20 text-blue-600 dark:text-yellow-600 text-sm font-medium">
            🚀 Transform Your Career with Veltryn
          </span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-yellow-500 dark:via-orange-500 dark:to-red-500 bg-clip-text text-transparent animate-gradient">
          Welcome to Veltryn
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Your comprehensive education technology and IT services platform. Learn, grow, and succeed with our expert-led courses and professional services.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            to="/courses"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-600 dark:to-orange-600 hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-yellow-500/50 text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group"
          >
            Explore Courses
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 rounded-xl border-2 border-blue-600 dark:border-yellow-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            View Services
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <SpotlightCard>
                <Link to={feature.link} className="block p-8 h-full group">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl mb-3 group-hover:text-blue-600 dark:group-hover:text-yellow-600 transition-colors">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-yellow-600 group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-4xl text-center mb-12">Why Choose Veltryn?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <div className="p-6 text-center h-full">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block p-3 rounded-full bg-blue-100 dark:bg-yellow-900/20 mb-4"
                    >
                      <Icon className="w-6 h-6 text-blue-600 dark:text-yellow-600" />
                    </motion.div>
                    <h3 className="text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
      >
        {[
          { label: 'Active Students', value: '10,000+' },
          { label: 'Expert Instructors', value: '50+' },
          { label: 'Courses Offered', value: '25+' },
          { label: 'Success Rate', value: '95%' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: 'spring' }}
          >
            <SpotlightCard>
              <div className="p-6 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-500 dark:to-orange-500 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-yellow-600 dark:via-orange-600 dark:to-red-600 rounded-3xl p-12 text-white shadow-2xl"
      >
        <h2 className="text-4xl mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of students already learning on Veltryn
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={user ? "/courses" : "/signup"}
            className="inline-block px-8 py-4 rounded-xl bg-white text-blue-600 dark:text-orange-600 hover:bg-gray-100 transition-colors shadow-xl"
          >
            {user ? "Explore Courses" : "Get Started Today"}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}