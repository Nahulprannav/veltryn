import { Calendar, Clock, Users, Video } from 'lucide-react';
import { SpotlightCard } from './shared/SpotlightCard';

export function Webinars() {
  const upcomingWebinars = [
    {
      title: 'Introduction to Machine Learning',
      speaker: 'Dr. Sarah Johnson',
      date: 'Nov 25, 2025',
      time: '2:00 PM EST',
      duration: '90 mins',
      attendees: '245 registered',
      description: 'Learn the fundamentals of machine learning and its real-world applications.',
      status: 'upcoming',
    },
    {
      title: 'Advanced React Patterns',
      speaker: 'Mike Chen',
      date: 'Nov 28, 2025',
      time: '3:00 PM EST',
      duration: '120 mins',
      attendees: '312 registered',
      description: 'Deep dive into advanced React patterns and best practices for scalable applications.',
      status: 'upcoming',
    },
    {
      title: 'Cloud Architecture Best Practices',
      speaker: 'Alex Martinez',
      date: 'Dec 2, 2025',
      time: '1:00 PM EST',
      duration: '90 mins',
      attendees: '189 registered',
      description: 'Explore cloud architecture patterns and learn how to design scalable cloud solutions.',
      status: 'upcoming',
    },
  ];

  const pastWebinars = [
    {
      title: 'Getting Started with Python',
      speaker: 'Emma Wilson',
      date: 'Nov 15, 2025',
      duration: '60 mins',
      attendees: '450 attended',
      recording: true,
    },
    {
      title: 'Cybersecurity Fundamentals',
      speaker: 'David Brown',
      date: 'Nov 10, 2025',
      duration: '90 mins',
      attendees: '380 attended',
      recording: true,
    },
    {
      title: 'UI/UX Design Trends 2025',
      speaker: 'Lisa Anderson',
      date: 'Nov 5, 2025',
      duration: '75 mins',
      attendees: '295 attended',
      recording: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Webinars</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Join our expert-led webinars to learn about the latest technologies and industry trends.
        </p>
      </div>

      {/* Upcoming Webinars */}
      <div className="mb-16">
        <h2 className="text-3xl mb-6">Upcoming Webinars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingWebinars.map((webinar, index) => (
            <SpotlightCard key={index}>
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-yellow-900/20">
                    <Video className="w-5 h-5 text-blue-600 dark:text-yellow-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs">
                    Upcoming
                  </span>
                </div>
                <h3 className="text-xl mb-2">{webinar.title}</h3>
                <p className="text-sm text-blue-600 dark:text-yellow-600 mb-3">{webinar.speaker}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">{webinar.description}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{webinar.time} • {webinar.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{webinar.attendees}</span>
                  </div>
                </div>
                <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white transition-colors">
                  Register Now
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Past Webinars */}
      <div>
        <h2 className="text-3xl mb-6">Past Webinars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastWebinars.map((webinar, index) => (
            <SpotlightCard key={index}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  {webinar.recording && (
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-yellow-900/20 text-blue-600 dark:text-yellow-600 text-xs">
                      Recording Available
                    </span>
                  )}
                </div>
                <h3 className="text-xl mb-2">{webinar.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{webinar.speaker}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{webinar.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{webinar.attendees}</span>
                  </div>
                </div>
                <button className="w-full py-2 rounded-lg border-2 border-blue-600 dark:border-yellow-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                  Watch Recording
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
}
