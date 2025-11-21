import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ChevronDown, Play, Code, BookOpen, CheckCircle, Lock } from 'lucide-react';

export function PythonLearn() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [codeOutput, setCodeOutput] = useState('');

  const modules = [
    {
      title: 'Python Basics',
      lessons: [
        { id: 0, title: 'Introduction to Python', duration: '10 min' },
        { id: 1, title: 'Variables and Data Types', duration: '15 min' },
        { id: 2, title: 'Operators and Expressions', duration: '12 min' },
        { id: 3, title: 'Input and Output', duration: '10 min' },
      ],
    },
    {
      title: 'Control Flow',
      lessons: [
        { id: 4, title: 'If-Else Statements', duration: '15 min' },
        { id: 5, title: 'For Loops', duration: '20 min' },
        { id: 6, title: 'While Loops', duration: '18 min' },
        { id: 7, title: 'Break and Continue', duration: '12 min' },
      ],
    },
    {
      title: 'Data Structures',
      lessons: [
        { id: 8, title: 'Lists', duration: '25 min' },
        { id: 9, title: 'Tuples', duration: '15 min' },
        { id: 10, title: 'Dictionaries', duration: '20 min' },
        { id: 11, title: 'Sets', duration: '15 min' },
      ],
    },
    {
      title: 'Functions',
      lessons: [
        { id: 12, title: 'Defining Functions', duration: '20 min' },
        { id: 13, title: 'Parameters and Arguments', duration: '18 min' },
        { id: 14, title: 'Return Values', duration: '15 min' },
        { id: 15, title: 'Lambda Functions', duration: '12 min' },
      ],
    },
  ];

  const lessonContent: Record<number, { title: string; content: string; code: string; explanation: string }> = {
    0: {
      title: 'Introduction to Python',
      content: 'Python is a high-level, interpreted programming language known for its simplicity and readability. It\'s widely used in web development, data science, artificial intelligence, and automation.',
      code: `# Your first Python program
print("Hello, World!")
print("Welcome to Python programming!")

# Python is easy to learn
name = "Student"
print(f"Hello, {name}!")`,
      explanation: 'The print() function displays output to the console. Python uses simple syntax that\'s easy to read and write.',
    },
    1: {
      title: 'Variables and Data Types',
      content: 'Variables are containers for storing data values. Python has several built-in data types including integers, floats, strings, and booleans.',
      code: `# Different data types in Python
name = "Alice"          # String
age = 25                # Integer
height = 5.6            # Float
is_student = True       # Boolean

# Print variables
print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Student:", is_student)`,
      explanation: 'Python automatically determines the data type based on the value assigned. You don\'t need to explicitly declare variable types.',
    },
    2: {
      title: 'Operators and Expressions',
      content: 'Operators are used to perform operations on variables and values. Python supports arithmetic, comparison, logical, and assignment operators.',
      code: `# Arithmetic operators
x = 10
y = 3

print("Addition:", x + y)
print("Subtraction:", x - y)
print("Multiplication:", x * y)
print("Division:", x / y)
print("Floor Division:", x // y)
print("Modulus:", x % y)
print("Exponent:", x ** y)`,
      explanation: 'Arithmetic operators perform mathematical calculations. The // operator performs floor division, and ** is the exponentiation operator.',
    },
  };

  const runCode = () => {
    const lesson = lessonContent[selectedLesson];
    if (lesson) {
      setCodeOutput(`Executing code...

${lesson.code}

Output:
Hello, World!
Welcome to Python programming!
Hello, Student!`);
    }
  };

  const markComplete = () => {
    if (!completedLessons.includes(selectedLesson)) {
      setCompletedLessons([...completedLessons, selectedLesson]);
    }
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="mb-6">
            <Lock className="w-16 h-16 mx-auto text-blue-600 dark:text-yellow-600 mb-4" />
            <h1 className="text-3xl mb-4">Registration Required</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please sign up or log in to access the Python course content and start learning.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-lg border-2 border-blue-600 dark:border-yellow-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              Log In
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentLesson = lessonContent[selectedLesson];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex h-screen">
        {/* Sidebar - Course Navigation */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto"
        >
          <div className="p-6">
            <h2 className="text-2xl mb-2">Python Course</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {completedLessons.length} of {Object.keys(lessonContent).length} lessons completed
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedLessons.length / Object.keys(lessonContent).length) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-600 dark:to-orange-600 rounded-full"
              />
            </div>

            {/* Modules */}
            <div className="space-y-2">
              {modules.map((module, moduleIndex) => (
                <div key={moduleIndex}>
                  <button
                    onClick={() => setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium">{module.title}</span>
                    {expandedModule === moduleIndex ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>

                  {expandedModule === moduleIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="ml-4 space-y-1"
                    >
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson.id)}
                          className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                            selectedLesson === lesson.id
                              ? 'bg-blue-100 dark:bg-yellow-900/20 text-blue-600 dark:text-yellow-600'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-700 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="text-sm">{lesson.title}</div>
                            <div className="text-xs text-gray-500">{lesson.duration}</div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl">{currentLesson?.title}</h1>
              <button
                onClick={markComplete}
                disabled={completedLessons.includes(selectedLesson)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  completedLessons.includes(selectedLesson)
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {completedLessons.includes(selectedLesson) ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <motion.div
              key={selectedLesson}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Lesson Content */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-yellow-600" />
                  <h2 className="text-2xl">Lesson Overview</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentLesson?.content}
                </p>
              </div>

              {/* Code Example */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-blue-600 dark:text-yellow-600" />
                    <h3 className="font-medium">Code Example</h3>
                  </div>
                  <button
                    onClick={runCode}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Run Code
                  </button>
                </div>
                <pre className="p-6 bg-gray-900 dark:bg-black text-gray-100 overflow-x-auto">
                  <code>{currentLesson?.code}</code>
                </pre>
              </div>

              {/* Code Output */}
              {codeOutput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium">Output</h3>
                  </div>
                  <pre className="p-6 bg-gray-50 dark:bg-gray-800 text-sm overflow-x-auto">
                    <code>{codeOutput}</code>
                  </pre>
                </motion.div>
              )}

              {/* Explanation */}
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
                <h3 className="font-medium mb-3 text-blue-900 dark:text-blue-300">💡 Key Concept</h3>
                <p className="text-blue-800 dark:text-blue-200">
                  {currentLesson?.explanation}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
                  disabled={selectedLesson === 0}
                  className="px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous Lesson
                </button>
                <button
                  onClick={() => {
                    markComplete();
                    setSelectedLesson(Math.min(Object.keys(lessonContent).length - 1, selectedLesson + 1));
                  }}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white transition-colors"
                >
                  Next Lesson
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
