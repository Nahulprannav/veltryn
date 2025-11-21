import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SpotlightCard } from '../shared/SpotlightCard';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CourseRegistrationProps {
  courseId: string;
  courseName: string;
}

export function CourseRegistration({ courseId, courseName }: CourseRegistrationProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    // Save registration to localStorage (simulating backend)
    const registrations = JSON.parse(localStorage.getItem('courseRegistrations') || '[]');
    
    const newRegistration = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userEmail: user.email,
      userName: user.displayName || user.email,
      courseId,
      courseName,
      registeredAt: new Date().toISOString(),
      status: 'pending'
    };

    registrations.push(newRegistration);
    // write via realtime helper (Firestore if configured, otherwise localStorage + events)
    try {
      const fb = await import('../../utils/firebase');
      await fb.addRealtimeDoc('courseRegistrations', newRegistration);
    } catch (e) {
      localStorage.setItem('courseRegistrations', JSON.stringify(registrations));
    }

    // Simulate sending confirmation email
    console.log(`Confirmation email sent to ${user.email} for course: ${courseName}`);
    
    setIsRegistered(true);
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <SpotlightCard>
          <div className="p-6 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
            <h3 className="text-xl mb-2">Login Required</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please log in to register for this course
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white transition-colors"
            >
              Login Now
            </button>
          </div>
        </SpotlightCard>
      </motion.div>
    );
  }

  if (isRegistered) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-8"
      >
        <SpotlightCard>
          <div className="p-6 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h3 className="text-2xl mb-2">Successfully Registered!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You have been registered for <strong>{courseName}</strong>
            </p>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 mb-4">
              <p className="mb-2">✅ Registration confirmed</p>
              <p className="mb-2">📧 Confirmation email sent to {user.email}</p>
              <p>🎓 You can now access all course materials for FREE!</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-yellow-900/20 border-2 border-blue-600 dark:border-yellow-600">
              <p className="mb-2">💡 <strong>Want Live Classes?</strong></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our staff will contact you with pricing details and schedules for personalized live classes with expert instructors.
              </p>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <SpotlightCard>
        <form onSubmit={handleRegister} className="p-6">
          <h3 className="text-2xl mb-4">Register for {courseName}</h3>
          
          <div className="mb-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <p className="mb-2">✅ <strong>FREE Course Access</strong></p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Get instant access to all course materials, assignments, and resources at no cost!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              💼 For paid live classes with personalized instruction, our staff will contact you after registration.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              value={user.displayName || ''}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Course</label>
            <input
              type="text"
              value={courseName}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-600 dark:to-orange-600 hover:shadow-xl text-white transition-all"
          >
            Register for FREE
          </button>
        </form>
      </SpotlightCard>
    </motion.div>
  );
}