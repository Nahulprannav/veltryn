import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SpotlightCard } from './shared/SpotlightCard';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Palette, Code, Globe, Cloud, GraduationCap, Folder, Lock, Sparkles, X } from 'lucide-react';

export function Services() {
  const { theme } = useTheme();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const services = [
    {
      id: 'penetration-testing',
      icon: Shield,
      title: 'Penetration Testing',
      shortDescription: 'Comprehensive security testing to identify vulnerabilities',
      fullDescription: 'Our expert penetration testing services help identify security vulnerabilities before attackers do. We provide comprehensive assessments including network penetration testing, web application testing, mobile app security testing, and social engineering assessments. Get detailed reports with actionable remediation strategies.',
      features: [
        'Network Security Assessment',
        'Web Application Testing',
        'Mobile App Security',
        'Social Engineering Tests',
        'Detailed Vulnerability Reports',
        'Remediation Guidance'
      ],
      price: 'Custom Quote',
    },
    {
      id: 'ui-ux-design',
      icon: Palette,
      title: 'UI/UX Design',
      shortDescription: 'Professional design services for web and mobile applications',
      fullDescription: 'Transform your digital products with our expert UI/UX design services. We create intuitive, visually stunning interfaces that enhance user experience and drive engagement. From wireframes to high-fidelity prototypes, we cover the entire design process.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Responsive Design',
        'Design Systems',
        'Usability Testing'
      ],
      price: 'Our staff will contact you for details',
    },
    {
      id: 'software-development',
      icon: Code,
      title: 'Software Development',
      shortDescription: 'Custom software solutions tailored to your business needs',
      fullDescription: 'We build robust, scalable software solutions using cutting-edge technologies. Our team delivers custom applications that streamline your business processes, improve efficiency, and drive growth. From concept to deployment, we handle it all.',
      features: [
        'Custom Software Development',
        'API Development & Integration',
        'Database Design',
        'Cloud Architecture',
        'Microservices',
        'Maintenance & Support'
      ],
      price: 'Our staff will contact you for details',
    },
    {
      id: 'website-development',
      icon: Globe,
      title: 'Website Development',
      shortDescription: 'Modern, responsive websites that convert visitors into customers',
      fullDescription: 'Get a stunning, high-performance website that represents your brand perfectly. We create responsive, SEO-optimized websites using modern technologies like React, Next.js, and more. Whether you need an eCommerce platform, portfolio, or corporate website, we deliver excellence.',
      features: [
        'Responsive Web Design',
        'E-Commerce Solutions',
        'CMS Integration',
        'SEO Optimization',
        'Performance Optimization',
        'Analytics Integration'
      ],
      price: 'Our staff will contact you for details',
    },
    {
      id: 'cloud-devops',
      icon: Cloud,
      title: 'Cloud & DevOps',
      shortDescription: 'Streamline deployment and infrastructure management',
      fullDescription: 'Optimize your infrastructure with our Cloud & DevOps services. We help you migrate to the cloud, set up CI/CD pipelines, implement containerization, and automate deployments. Work with AWS, Azure, Google Cloud, and modern DevOps tools.',
      features: [
        'Cloud Migration',
        'CI/CD Pipeline Setup',
        'Docker & Kubernetes',
        'Infrastructure as Code',
        'Monitoring & Logging',
        'Cost Optimization'
      ],
      price: 'Our staff will contact you for details',
    },
    {
      id: 'edtech-solutions',
      icon: GraduationCap,
      title: 'EdTech Solutions',
      shortDescription: 'Educational platforms and learning management systems',
      fullDescription: 'Build the future of education with our EdTech solutions. We create interactive learning platforms, LMS systems, online course platforms, and educational apps that engage learners and simplify content delivery for educators.',
      features: [
        'Learning Management Systems',
        'Interactive Course Platforms',
        'Student Progress Tracking',
        'Video Conferencing Integration',
        'Assessment & Grading Tools',
        'Mobile Learning Apps'
      ],
      price: 'Our staff will contact you for details',
    },
    {
      id: 'project-development',
      icon: Folder,
      title: 'Project Development',
      shortDescription: 'End-to-end project development from idea to deployment',
      fullDescription: 'Turn your ideas into reality with our comprehensive project development services. We handle everything from initial planning and requirements gathering to design, development, testing, and deployment. Perfect for startups and businesses launching new products.',
      features: [
        'Project Planning & Strategy',
        'Agile Development',
        'MVP Development',
        'Full-Stack Development',
        'Quality Assurance',
        'Deployment & Launch Support'
      ],
      price: 'Our staff will contact you for details',
    },
    {
      id: 'cyber-security',
      icon: Lock,
      title: 'Cyber Security Consultancy',
      shortDescription: 'Expert security consulting to protect your digital assets',
      fullDescription: 'Protect your business from cyber threats with our comprehensive security consultancy services. We provide security audits, compliance assessments, incident response planning, and ongoing security monitoring to keep your organization safe.',
      features: [
        'Security Audits',
        'Compliance Assessment',
        'Incident Response Planning',
        'Security Training',
        'Risk Management',
        '24/7 Security Monitoring'
      ],
      price: 'Custom Quote',
    },
    {
      id: 'branding',
      icon: Sparkles,
      title: 'Branding Services',
      shortDescription: 'Create a memorable brand identity that stands out',
      fullDescription: 'Build a powerful brand that resonates with your audience. Our branding services include logo design, brand strategy, visual identity systems, brand guidelines, and marketing collateral. We help you create a cohesive brand experience across all touchpoints.',
      features: [
        'Logo Design',
        'Brand Strategy',
        'Visual Identity System',
        'Brand Guidelines',
        'Marketing Collateral',
        'Brand Messaging'
      ],
      price: 'Our staff will contact you for details',
    },
  ];

  const handleCardClick = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-white to-gray-50'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-6xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Comprehensive IT and EdTech solutions to transform your business and educational initiatives
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedCard === service.id;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  className={isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}
                >
                  <SpotlightCard>
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-blue-100'}`}>
                          <Icon className={`w-8 h-8 ${theme === 'dark' ? 'text-yellow-600' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl mb-2">{service.title}</h3>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                {service.fullDescription}
                              </p>
                              <h4 className="mb-3">Features:</h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                {service.features.map((feature, idx) => (
                                  <li key={idx} className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-yellow-600' : 'bg-blue-600'}`} />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-blue-50'}`}>
                                <span className={`text-sm ${theme === 'dark' ? 'text-yellow-600' : 'text-blue-600'}`}>
                                  💰 {service.price}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => handleCardClick(service.id)}
                        className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors ${
                          theme === 'dark'
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                      </button>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Classes Payment Note */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-6 rounded-xl border-2 ${
              theme === 'dark' ? 'border-yellow-600 bg-yellow-900/20' : 'border-blue-600 bg-blue-50'
            }`}
          >
            <h3 className="text-xl mb-3">📚 About Our Courses & Live Classes</h3>
            <p className={`mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              All our courses are <strong>FREE to access</strong>! You can learn at your own pace with our comprehensive course materials.
            </p>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              For <strong>Live Classes</strong>, our staff will contact you with pricing details and schedules. Live classes offer real-time interaction with instructors and personalized guidance.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
