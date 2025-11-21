import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, CheckCircle, BookOpen, Star } from 'lucide-react';
import { SpotlightCard } from '../shared/SpotlightCard';
import { CourseRegistration } from './CourseRegistration';
import { pythonCourseLevels } from './PythonCourseContent';

export function PythonCourse() {
  const [showRegistration, setShowRegistration] = useState(false);

  const features = [
    'FREE Lifetime Access',
    'Certificate of Completion',
    'Live Q&A Sessions (Paid)',
    'Project-Based Learning',
    '50 Comprehensive Levels',
    'Assignments & Points System',
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/courses" className="inline-flex items-center gap-2 text-blue-600 dark:text-yellow-600 mb-8 hover:gap-3 transition-all">
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl mb-4">🐍 Python Programming - 50 Level Master Plan</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Master Python from basics to advanced topics with comprehensive assignments and point system.
          </p>

          <SpotlightCard className="mb-8">
            <div className="p-8">
              <h2 className="text-2xl mb-4">Course Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This comprehensive Python course takes you through 50 carefully designed levels, from complete beginner to advanced programmer. You'll earn points for completing assignments, build real projects, and master Python for web development, data science, automation, and more.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-2xl mb-2">50</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Levels</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-2xl mb-2">1000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="text-2xl mb-2">12</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Weeks</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <div className="text-2xl mb-2">FREE</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cost</div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Point System */}
          <SpotlightCard className="mb-8">
            <div className="p-8">
              <h2 className="text-2xl mb-4">⭐ Point System</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <span>Easy Assignment</span>
                  <span className="text-green-600 dark:text-green-400">10 Points</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <span>Medium Assignment</span>
                  <span className="text-yellow-600 dark:text-yellow-400">20 Points</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <span>Hard Assignment</span>
                  <span className="text-orange-600 dark:text-orange-400">30 Points</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <span>Project / Mini Task</span>
                  <span className="text-purple-600 dark:text-purple-400">40–50 Points</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <span>Every level completion</span>
                  <span className="text-blue-600 dark:text-blue-400">+5 Bonus Points</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Course Curriculum */}
          <SpotlightCard className="mb-8">
            <div className="p-8">
              <h2 className="text-2xl mb-6">📚 Course Curriculum (50 Levels)</h2>
              
              {/* Level 1-10 */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-blue-600 dark:text-yellow-600">🧩 LEVEL 1–10: Python Basics (Foundation)</h3>
                <div className="space-y-2">
                  {pythonCourseLevels.slice(0, 10).map((level) => (
                    <div key={level.level} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              Level {level.level}
                            </span>
                            <span className="text-sm">{level.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            📝 {level.assignment}
                          </p>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400">{level.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level 11-20 */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-purple-600 dark:text-orange-600">🧠 LEVEL 11–20: Flow Control & Functions</h3>
                <div className="space-y-2">
                  {pythonCourseLevels.slice(10, 20).map((level) => (
                    <div key={level.level} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 rounded text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                              Level {level.level}
                            </span>
                            <span className="text-sm">{level.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            📝 {level.assignment}
                          </p>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400">{level.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level 21-30 */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-green-600 dark:text-green-500">🚀 LEVEL 21–30: Intermediate Python</h3>
                <div className="space-y-2">
                  {pythonCourseLevels.slice(20, 30).map((level) => (
                    <div key={level.level} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                              Level {level.level}
                            </span>
                            <span className="text-sm">{level.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            📝 {level.assignment}
                          </p>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400">{level.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level 31-40 */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-orange-600 dark:text-orange-500">⚙️ LEVEL 31–40: Data Handling & Automation</h3>
                <div className="space-y-2">
                  {pythonCourseLevels.slice(30, 40).map((level) => (
                    <div key={level.level} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 rounded text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                              Level {level.level}
                            </span>
                            <span className="text-sm">{level.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            📝 {level.assignment}
                          </p>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400">{level.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level 41-50 */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-red-600 dark:text-red-500">🏆 LEVEL 41–50: Advanced Python & Real Projects</h3>
                <div className="space-y-2">
                  {pythonCourseLevels.slice(40, 50).map((level) => (
                    <div key={level.level} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                              Level {level.level}
                            </span>
                            <span className="text-sm">{level.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            📝 {level.assignment}
                          </p>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400">{level.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Register Button */}
          {!showRegistration && (
            <button
              onClick={() => setShowRegistration(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-600 dark:to-orange-600 hover:shadow-2xl text-white transition-all text-lg"
            >
              Register for FREE Now
            </button>
          )}

          {/* Registration Form */}
          {showRegistration && (
            <CourseRegistration courseId="python" courseName="Python Programming - 50 Level Master Plan" />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <SpotlightCard className="sticky top-4">
            <div className="p-6">
              <div className="mb-6">
                <div className="text-3xl mb-2">FREE</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Full Course Access</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-yellow-600" />
                  <div>
                    <div className="text-sm">Duration</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">12 weeks</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600 dark:text-yellow-600" />
                  <div>
                    <div className="text-sm">Students</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">5,000+ enrolled</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-yellow-600" />
                  <div>
                    <div className="text-sm">Level</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Beginner to Advanced</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-600 dark:text-yellow-600" />
                  <div>
                    <div className="text-sm">Certificate</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Yes</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <h3 className="text-sm mb-3">This course includes:</h3>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-yellow-900/20 text-sm">
                  <p className="mb-2">💡 <strong>Live Classes Available</strong></p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    For personalized instruction, our staff will contact you with pricing details after registration.
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
