import { Target, Users, Award, Lightbulb } from 'lucide-react';
import { SpotlightCard } from './shared/SpotlightCard';

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower individuals and organizations with cutting-edge technology education and professional IT services.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly innovate our teaching methods and services to stay ahead of industry trends.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive community of learners and professionals who grow together.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality education and services to all our clients.',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Lead Instructor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Mike Chen',
      role: 'CTO & Full Stack Expert',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Emma Wilson',
      role: 'Head of Data Science',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
    {
      name: 'Alex Martinez',
      role: 'Cloud Architecture Lead',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl mb-4">About Veltryn</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          We are a leading education technology and IT services company dedicated to transforming lives through quality education and innovative solutions.
        </p>
      </div>

      {/* Story Section */}
      <div className="mb-20">
        <SpotlightCard>
          <div className="p-8">
            <h2 className="text-3xl mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Founded in 2020, Veltryn emerged from a simple vision: to bridge the gap between traditional education and the rapidly evolving technology industry. What started as a small team of passionate educators has grown into a comprehensive platform serving thousands of students worldwide.
              </p>
              <p>
                Our journey began with a handful of courses in programming fundamentals. Today, we offer an extensive catalog of courses, professional services, and innovative solutions that cater to individuals and enterprises alike.
              </p>
              <p>
                We believe that quality education should be accessible to everyone. That's why we've built a platform that combines expert instruction, hands-on projects, and real-world applications to ensure our students are truly job-ready.
              </p>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <SpotlightCard key={value.title}>
                <div className="p-6">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-yellow-900/20 w-fit mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-yellow-600" />
                  </div>
                  <h3 className="text-xl mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <SpotlightCard key={member.name}>
              <div className="p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 dark:text-yellow-600">{member.role}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Years of Excellence', value: '5+' },
          { label: 'Students Trained', value: '10,000+' },
          { label: 'Expert Instructors', value: '50+' },
          { label: 'Success Rate', value: '95%' },
        ].map((stat) => (
          <SpotlightCard key={stat.label}>
            <div className="p-6 text-center">
              <div className="text-3xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-500 dark:to-orange-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
