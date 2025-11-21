import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { SpotlightCard } from '../shared/SpotlightCard';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  level: string;
  image: string;
  instructor: string;
  enrollments: number;
}

export function CoursesManager() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Python Programming',
      description: 'Master Python from basics to advanced concepts',
      price: '$49',
      duration: '8 weeks',
      level: 'Beginner',
      image: 'https://source.unsplash.com/400x300/?python,programming',
      instructor: 'John Doe',
      enrollments: 245
    },
    {
      id: '2',
      title: 'Java Development',
      description: 'Complete Java programming course',
      price: '$59',
      duration: '10 weeks',
      level: 'Intermediate',
      image: 'https://source.unsplash.com/400x300/?java,code',
      instructor: 'Jane Smith',
      enrollments: 142
    },
    {
      id: '3',
      title: 'MERN Stack',
      description: 'Full-stack development with MongoDB, Express, React, Node',
      price: '$79',
      duration: '12 weeks',
      level: 'Advanced',
      image: 'https://source.unsplash.com/400x300/?javascript,development',
      instructor: 'Mike Johnson',
      enrollments: 198
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: 'Beginner',
    image: '',
    instructor: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      level: 'Beginner',
      image: '',
      instructor: ''
    });
    setEditingCourse(null);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      level: course.level,
      image: course.image,
      instructor: course.instructor
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
      toast.success('Course deleted successfully');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCourse) {
      // Update existing course
      setCourses(courses.map(c => 
        c.id === editingCourse.id 
          ? { ...c, ...formData }
          : c
      ));
      toast.success('Course updated successfully');
    } else {
      // Add new course
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData,
        enrollments: 0
      };
      setCourses([...courses, newCourse]);
      toast.success('Course added successfully');
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Courses Manager
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Add, edit, or remove courses
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className={`flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-amber-500 hover:bg-amber-600 text-black'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}>
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className={
            theme === 'dark'
              ? 'bg-gray-900 border-amber-500/20 text-white'
              : 'bg-white border-blue-500/20 text-black'
          }>
            <DialogHeader>
              <DialogTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="$49"
                    className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                    placeholder="8 weeks"
                    className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  required
                  className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  placeholder="https://..."
                  className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className={
                    theme === 'dark'
                      ? 'bg-amber-500 hover:bg-amber-600 text-black'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }
                >
                  {editingCourse ? 'Update' : 'Add'} Course
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
              : 'bg-white border-gray-300'
          }`}
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <SpotlightCard key={course.id}>
            <Card className={
              theme === 'dark'
                ? 'bg-black border-amber-500/20 shadow-xl shadow-amber-500/5'
                : 'bg-white border-blue-500/20 shadow-xl shadow-blue-500/5'
            }>
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                  {course.title}
                </CardTitle>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {course.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Price:
                    </span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      {course.price}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Duration:
                    </span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Enrollments:
                    </span>
                    <span className={theme === 'dark' ? 'text-amber-500' : 'text-blue-600'}>
                      {course.enrollments}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(course)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(course.id)}
                    className="flex-1 text-red-500 hover:text-red-600 border-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}