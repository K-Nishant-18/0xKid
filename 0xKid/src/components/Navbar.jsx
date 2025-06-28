import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Map, 
  Code, 
  Heart, 
  BarChart3, 
  Settings, 
  Sparkles,
  Menu,
  X,
  User,
  Users,
  Brain,
  Gamepad2,
  Globe,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';
import NotificationCenter from './NotificationCenter';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/quests', icon: Map, label: 'Quests' },
  { path: '/ai-teaching', icon: Brain, label: 'AI Teaching' },
  { path: '/projects', icon: Code, label: 'Projects' },
  { path: '/game-studio', icon: Gamepad2, label: 'Game Studio' },
  { path: '/collaboration', icon: Users, label: 'Collaborate' },
//   { path: '/community', icon: Globe, label: 'Community' },
  { path: '/mindfulness', icon: Heart, label: 'Mindfulness' },
  { path: '/parent-dashboard', icon: BarChart3, label: 'Parent View' },
  { path: '/code-editor', icon: Code, label: 'Code Editor' }
];

const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                0xKid
              </span>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden lg:flex items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                      isActive(item.path)
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* User Section */}
            <div className="flex items-center gap-4">
              {isAuthenticated && user ? (
                <>
                  {/* Notifications */}
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </button>

                  {/* User Profile */}
                  <div className="hidden md:flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 cursor-pointer hover:bg-white/15 transition-colors"
                       onClick={() => setShowProfile(true)}>
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-sm text-gray-300">Level {user.level}</div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">{user.xp}</span>
                    </div>
                  </div>

                  {/* Settings */}
                  <button 
                    onClick={() => setShowProfile(true)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-black/40 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
              {isAuthenticated ? (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-white/20 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                  
                  {user && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3 px-4 py-2 mb-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="font-semibold text-white">{user.name}</div>
                          <div className="text-sm text-gray-300">Level {user.level} • {user.xp} XP</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowProfile(true);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      >
                        <User className="w-5 h-5" />
                        <span>Profile Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4">
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      <UserProfile 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
};

export default Navbar;