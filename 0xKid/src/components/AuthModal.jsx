import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Calendar,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Heart,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    parentEmail: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return false;
      }
    } else {
      if (!formData.email || !formData.password || !formData.name || !formData.age) {
        setError('Please fill in all required fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (parseInt(formData.age) < 8 || parseInt(formData.age) > 18) {
        setError('Age must be between 8 and 18');
        return false;
      }
      if (parseInt(formData.age) < 13 && !formData.parentEmail) {
        setError('Parent email is required for users under 13');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === 'login') {
        // Demo login - check for demo credentials
        if (formData.email === 'demo@codeverse.com' && formData.password === 'demo123') {
          login({
            id: '1',
            name: 'Nishant',
            age: 12,
            level: 3,
            xp: 1250,
            streak: 7,
            avatar: '🧑‍💻',
            language: 'English',
            email: formData.email
          });
          onClose();
        } else {
          setError('Invalid credentials. Try demo@codeverse.com / demo123');
        }
      } else {
        // Demo signup - create new user
        const age = parseInt(formData.age);
        const avatar = age <= 12 ? '🧒' : age <= 15 ? '🧑‍💻' : '👨‍💻';
        
        login({
          id: Date.now().toString(),
          name: formData.name,
          age: age,
          level: 1,
          xp: 0,
          streak: 0,
          avatar: avatar,
          language: 'English',
          email: formData.email
        });
        onClose();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      age: '',
      parentEmail: '',
      confirmPassword: ''
    });
    setError('');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">
                {mode === 'login' ? 'Welcome Back!' : 
                 mode === 'parent-signup' ? 'Parent Account' : 'Join CodeVerse'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'login' 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'signup' 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Demo Credentials Notice */}
          {mode === 'login' && (
            <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Demo Credentials</span>
              </div>
              <div className="text-xs text-gray-300">
                Email: demo@codeverse.com<br />
                Password: demo123
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-300">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup only) */}
            {mode !== 'login' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Age Field (Signup only) */}
            {mode !== 'login' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="8"
                    max="18"
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Your age (8-18)"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Must be between 8 and 18 years old</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Parent Email (for users under 13) */}
            {mode !== 'login' && parseInt(formData.age) < 13 && parseInt(formData.age) >= 8 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Parent/Guardian Email *
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Parent's email address"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Required for COPPA compliance</p>
              </div>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup only) */}
            {mode !== 'login' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {/* Safety Notice for Signup */}
            {mode !== 'login' && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Safety First</span>
                </div>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• All chats are AI-moderated for safety</li>
                  <li>• No personal information sharing allowed</li>
                  <li>• Parents can monitor all activity</li>
                  <li>• COPPA compliant for children under 13</li>
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {mode === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;