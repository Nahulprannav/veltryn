import { Video, Calendar, Clock, Users, Star } from 'lucide-react';
import { SpotlightCard } from './shared/SpotlightCard';

export function LiveClasses() {
  const liveClasses = [
    {
      title: 'Python Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      schedule: 'Mon, Wed, Fri - 6:00 PM EST',
      duration: '8 weeks',
      students: '45/50',
      rating: 4.8,
      price: '$299',
      level: 'Beginner',
      nextSession: 'Nov 22, 2025',
    },
    {
      title: 'Full Stack Development',
      instructor: 'Mike Chen',
      schedule: 'Tue, Thu - 7:00 PM EST',
      duration: '12 weeks',
      students: '38/40',
      rating: 4.9,
      price: '$499',
      level: 'Intermediate',
      nextSession: 'Nov 23, 2025',
    },
    {
      title: 'Data Science Bootcamp',
      instructor: 'Emma Wilson',
      schedule: 'Sat, Sun - 10:00 AM EST',
      duration: '10 weeks',
      students: '42/45',
      rating: 4.7,
      price: '$599',
      level: 'Advanced',
      nextSession: 'Nov 25, 2025',
    },
    {
      title: 'Mobile App Development',
      instructor: 'Alex Martinez',
      schedule: 'Mon, Wed - 8:00 PM EST',
      duration: '10 weeks',
      students: '35/40',
      rating: 4.8,
      price: '$449',
      level: 'Intermediate',
      nextSession: 'Nov 22, 2025',
    },
    {
      title: 'Cybersecurity Essentials',
      instructor: 'David Brown',
      schedule: 'Tue, Thu, Sat - 5:00 PM EST',
      duration: '6 weeks',
      students: '48/50',
      rating: 4.9,
      price: '$399',
      level: 'Beginner',
      nextSession: 'Nov 23, 2025',
    },
    {
      title: 'Cloud Architecture',
      instructor: 'Lisa Anderson',
      schedule: 'Wed, Fri - 6:30 PM EST',
      duration: '8 weeks',
      students: '30/35',
      rating: 4.8,
      price: '$549',
      level: 'Advanced',
      nextSession: 'Nov 24, 2025',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Live Classes</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Join interactive live classes with expert instructors and learn alongside peers in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveClasses.map((course, index) => (
          <SpotlightCard key={index}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-yellow-900/20">
                  <Video className="w-6 h-6 text-blue-600 dark:text-yellow-600" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm">{course.rating}</span>
                </div>
              </div>

              <h3 className="text-xl mb-2">{course.title}</h3>
              <p className="text-sm text-blue-600 dark:text-yellow-600 mb-4">{course.instructor}</p>

              <div className="space-y-2 text-sm mb-4 flex-1">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} • Next: {course.nextSession}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{course.students} enrolled</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                  {course.level}
                </span>
                <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-500 dark:to-orange-500 bg-clip-text text-transparent">
                  {course.price}
                </span>
              </div>

              <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white transition-colors">
                Enroll Now
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
