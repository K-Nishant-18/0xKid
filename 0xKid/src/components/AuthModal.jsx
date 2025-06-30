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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {mode === 'login' ? 'Welcome Back!' : 
                 mode === 'parent-signup' ? 'Parent Account' : 'Join CodeVerse'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all ${
                mode === 'login' 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all ${
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
            <div className="mb-4 p-2 sm:p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm font-medium text-blue-300">Demo Credentials</span>
              </div>
              <div className="text-xs text-gray-300">
                Email: demo@codeverse.com<br />
                Password: demo123
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-3 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-3 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Age *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="8"
                    max="18"
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-3 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your age (8-18)"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-10 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-3 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && parseInt(formData.age) < 13 && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Parent Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-3 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Parent's email address"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-xs sm:text-sm text-red-300">{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition-all duration-200 text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Safety Features */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span>COPPA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
                <span>Child Safe</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;