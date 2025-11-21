import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { SpotlightCard } from './shared/SpotlightCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Mail, Lock, User, Github } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Signup() {
  const navigate = useNavigate();
  const { signup, signupWithGoogle, signupWithGithub } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    identifier: '', // can be email or user id
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Allow signup using either an email or a user id.
      // If user entered an identifier without '@', create a placeholder email.
      const identifier = formData.identifier.trim();
      const emailToUse = identifier.includes('@')
        ? identifier
        : `${identifier}@veltryn.local`;

      await signup(emailToUse, formData.password, formData.name);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await signupWithGoogle();
      toast.success('Signed up with Google successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    try {
      setLoading(true);
      await signupWithGithub();
      toast.success('Signed up with GitHub successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up with GitHub');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/" 
          className={`inline-flex items-center gap-2 mb-6 transition-opacity hover:opacity-70 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        {/* Signup Card with Spotlight */}
        <SpotlightCard>
          <div className={`rounded-2xl p-8 border ${
            theme === 'dark' 
              ? 'bg-black border-amber-500/20 shadow-2xl shadow-amber-500/10' 
              : 'bg-white border-blue-500/20 shadow-2xl shadow-blue-500/10'
          }`}>
            <div className="text-center mb-8">
              <h1 className={`text-3xl mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Create Account
              </h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Join Veltryn today and start learning
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGithubSignup}
                disabled={loading}
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                }`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-4 ${
                  theme === 'dark' ? 'bg-black text-gray-400' : 'bg-white text-gray-600'
                }`}>
                  Or sign up with email
                </span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Full Name
                </Label>
                <div className="relative mt-1">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`pl-10 ${
                      theme === 'dark' 
                        ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-black'
                    }`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="identifier" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Email or User ID
                  </Label>
                  <div className="relative mt-1">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <Input
                      id="identifier"
                      name="identifier"
                      type="text"
                      placeholder="you@example.com or username123"
                      value={formData.identifier}
                      onChange={handleChange}
                      required
                      className={`pl-10 ${
                        theme === 'dark' 
                          ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' 
                          : 'bg-white border-gray-300 text-black'
                      }`}
                    />
                  </div>
              </div>

              <div>
                <Label htmlFor="password" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className={`pl-10 ${
                      theme === 'dark' 
                        ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-black'
                    }`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Confirm Password
                </Label>
                <div className="relative mt-1">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className={`pl-10 ${
                      theme === 'dark' 
                        ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-black'
                    }`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            <p className={`text-center mt-6 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className={theme === 'dark' ? 'text-amber-500 hover:text-amber-400' : 'text-blue-600 hover:text-blue-700'}
              >
                Log in
              </Link>
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}