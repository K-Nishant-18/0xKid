import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { 
  Home, 
  Map, 
  BookOpen, 
  Heart, 
  BarChart3, 
  Settings as SettingsIcon, 
  Ghost,
  Menu,
  X,
  User,
  Users,
  Brain,
  Compass,
  Globe,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';
import NotificationCenter from './NotificationCenter';
import Settings from './Settings';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/quests', icon: Map, label: 'Mysteries' },
    { path: '/ai-teaching', icon: Brain, label: 'AI' },
    { path: '/projects', icon: BookOpen, label: 'Projects' },
    { path: '/game-studio', icon: Compass, label: 'Games' },
    { path: '/parent-dashboard', icon: BarChart3, label: 'Guardians' },
    // { path: '/code-editor', icon: BookOpen, label: 'Code Journal' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-black/20 backdrop-blur-md border-b border-yellow-800/50 sticky top-0 z-50 font-['Creepster',_cursive]">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
            body {
              background-image: url('${mysteryShackImg}');
              background-size: cover;
              background-attachment: fixed;
              background-position: center;
            }
          `}
        </style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Ghost className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-300 to-yellow-600 bg-clip-text text-transparent">
                0xKid
              </span>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden lg:flex items-center gap-2 xl:gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                      isActive(item.path)
                        ? 'bg-gray-800/50 text-yellow-200'
                        : 'text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50'
                    }`}
                  >
                    <item.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium hidden xl:inline">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* User Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {isAuthenticated && user ? (
                <>
                  {/* Notifications - Desktop Only */}
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="relative p-1.5 sm:p-2 text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 rounded-full transition-colors hidden lg:inline-flex"
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full"></div>
                  </button>

                  {/* User Profile - Desktop */}
                  <div className="hidden md:flex items-center gap-2 lg:gap-3 bg-gray-800/50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer hover:bg-gray-700/50 transition-colors"
                       onClick={(e) => {
                         e.stopPropagation();
                         setShowProfile(true);
                       }}>
                    <div className="text-lg sm:text-xl lg:text-2xl">{user.avatar}</div>
                    <div className="hidden lg:block">
                      <div className="font-semibold text-yellow-200 text-sm">{user.name}</div>
                      <div className="text-xs text-gray-300">Level {user.level}</div>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-600/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      <Ghost className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                      <span className="text-xs sm:text-sm font-medium text-blue-300">{user.xp}</span>
                    </div>
                  </div>

                  {/* User Profile - Mobile */}
                  <div className="md:hidden flex items-center gap-2 bg-gray-800/50 rounded-full px-2 py-1.5 cursor-pointer hover:bg-gray-700/50 transition-colors"
                       onClick={(e) => {
                         e.stopPropagation();
                         setShowProfile(true);
                       }}>
                    <div className="text-lg">{user.avatar}</div>
                    <div className="flex items-center gap-1 bg-blue-600/20 px-1.5 py-0.5 rounded-full">
                      <Ghost className="w-3 h-3 text-blue-300" />
                      <span className="text-xs font-medium text-blue-300">{user.xp}</span>
                    </div>
                  </div>

                  {/* Settings - Desktop Only */}
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="p-1.5 sm:p-2 text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 rounded-full transition-colors hidden lg:inline-flex"
                  >
                    <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm text-yellow-200"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Login</span>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 rounded-full transition-colors"
              >
                {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-black/40 backdrop-blur-md border-t border-yellow-800/50"
          >
            <div className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {isAuthenticated ? (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-gray-800/50 text-yellow-200'
                          : 'text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}

                  {/* Notification and Settings - Mobile Only */}
                  <div className="flex gap-3 mt-2 mb-4">
                    <button
                      onClick={() => {
                        setShowNotifications(true);
                        setIsOpen(false);
                      }}
                      className="relative flex items-center justify-center p-2 text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 rounded-full transition-colors w-full"
                    >
                      <Bell className="w-5 h-5" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
                      <span className="ml-2 text-sm font-medium">Notifications</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowSettings(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center p-2 text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 rounded-full transition-colors w-full"
                    >
                      <SettingsIcon className="w-5 h-5" />
                      <span className="ml-2 text-sm font-medium">Settings</span>
                    </button>
                  </div>
                  
                  {user && (
                    <div className="mt-4 pt-4 border-t border-yellow-800/50">
                      <div className="flex items-center gap-3 px-4 py-2 mb-3">
                        <div className="text-xl sm:text-2xl">{user.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-yellow-200 text-sm sm:text-base truncate">{user.name}</div>
                          <div className="text-xs sm:text-sm text-gray-300">Level {user.level} • {user.xp} XP</div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowProfile(true);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 rounded-lg transition-all"
                      >
                        <User className="w-5 h-5" />
                        <span>Profile Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-600/20 rounded-lg transition-all"
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
                    className="w-full bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-yellow-200"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </Motion.div>
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
      <Settings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
};

export default Navbar;