import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, BookOpen, Users, Heart, Globe, Zap,
  Play, Star, Rocket, Brain, Target, CheckCircle,
  ArrowRight, Home, Trophy, User as UserIcon,
  ChevronDown, ChevronUp, Menu, X, Ghost, Compass
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

// Feature data
const features = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Ages 8-12: Mystic Blocks",
    description: "Drag-and-drop coding with magical voice guidance",
    color: "from-blue-400 to-green-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Ages 13-15: Cipher Quest",
    description: "Bridge visual and text coding with cryptic challenges",
    color: "from-yellow-600 to-red-600"
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Ages 16-18: Shack Secrets",
    description: "Full code editors for supernatural projects",
    color: "from-purple-500 to-blue-600"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Multilingual Mysteries",
    description: "Learn in your language with AI-guided ciphers",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Safe Team Quests",
    description: "Solve mysteries with AI-moderated group coding",
    color: "from-green-500 to-blue-600"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Mindful Adventures",
    description: "Coding breaks with mystical breathing animations",
    color: "from-red-600 to-yellow-600"
  }
];

const testimonials = [
  {
    name: "Dipper, 12",
    avatar: "🧢",
    quote: "I cracked my first cipher game in 2 weeks! Zara the AI mentor explained loops like journal clues.",
    achievement: "Solved 5 Mysteries"
  },
  {
    name: "Mabel, 12",
    avatar: "🌈",
    quote: "The glittery mindfulness breaks keep me energized, and Grunkle Stan loves my progress reports!",
    achievement: "Level 8 Sleuth"
  },
  {
    name: "Wendy, 15",
    avatar: "🪓",
    quote: "0xKid helped me build a portfolio that unlocked my dream coding camp. The mysteries are epic!",
    achievement: "Mystery Master"
  }
];

const stats = [
  { number: "50K+", label: "Young Detectives" },
  { number: "1M+", label: "Mysteries Solved" },
  { number: "25+", label: "Languages Decoded" },
  { number: "98%", label: "Happy Guardians" }
];

const safetyFeatures = [
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    title: "Mystic Protections",
    description: "Full compliance with children's safety charms"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    title: "AI Guardians",
    description: "All chats watched by mystical AI wards"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    title: "Guardian Journal",
    description: "Full insight into your detective's progress"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    title: "Mystic Mentors",
    description: "Expert guides in coding and child safety"
  }
];

const navItems = [
  { name: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
  { name: 'Code Journal', icon: <BookOpen className="w-5 h-5" />, path: '/code-editor' },
  { name: 'About the Shack', icon: <Users className="w-5 h-5" />, path: '/about' },
  { name: 'Mystery Board', icon: <Trophy className="w-5 h-5" />, path: '/leaderboard' },
  { name: 'Detective Profile', icon: <UserIcon className="w-5 h-5" />, path: '/profile' },
];

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled) {
      controls.start({
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        transition: { duration: 0.3 }
      });
    } else {
      controls.start({
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0)',
        transition: { duration: 0.3 }
      });
    }
  }, [isScrolled, controls]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    } else {
      setAuthMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-green-900 text-white font-['Creepster',_cursive] overflow-hidden">
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

      {/* Navigation */}
      <motion.nav 
        className="fixed w-full z-50"
        initial={{ backgroundColor: 'transparent', backdropFilter: 'blur(0)' }}
        animate={controls}
      >
        <div className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 z-50">
            <Ghost className="w-8 h-8 text-yellow-200" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-yellow-600 bg-clip-text text-transparent">
              Mystery Shack Code
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <motion.div 
              className="ml-10 flex items-center space-x-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center px-1 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSignIn}
              className="hidden md:block text-gray-300 hover:text-yellow-200 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-yellow-200"
            >
              <span className="hidden md:inline">Begin Mystery</span>
              <span className="md:hidden">Start</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-yellow-200 hover:bg-gray-800/50 focus:outline-none transition duration-150 ease-in-out"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-sm overflow-hidden"
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 transition-all duration-200 block"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-yellow-800/50">
              <button
                onClick={handleSignIn}
                className="w-full flex items-center justify-center px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-yellow-200 hover:bg-gray-800/50 transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-green-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <Ghost className="w-8 h-8 md:w-12 md:h-12 text-blue-300" />
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-300 to-yellow-600 bg-clip-text text-transparent">
                Mystery Shack Code
              </h1>
              <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-yellow-200" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
              Where Mysteries & Code Unravel
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
              Join young detectives on an epic adventure through AI-guided mysteries, 
              supernatural projects, and mindful coding quests.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center text-yellow-200"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6" />
              Start Your Mystery
            </button>
            <button className="bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border border-yellow-800/50 hover:border-yellow-800/30 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 flex items-center gap-2 justify-center text-yellow-200">
              <Rocket className="w-5 h-5 md:w-6 md:h-6" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: <Brain className="w-10 h-10 md:w-12 md:h-12 text-blue-300" />,
                title: "AI Code Guide",
                description: "Personalized clues from your AI mentor"
              },
              {
                icon: <Target className="w-10 h-10 md:w-12 md:h-12 text-yellow-600" />,
                title: "Mystery Quests",
                description: "Learn through cryptic adventures"
              },
              {
                icon: <Heart className="w-10 h-10 md:w-12 md:h-12 text-red-600" />,
                title: "Mindful Coding",
                description: "Balanced approach to mysteries and wellness"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-yellow-800/50"
              >
                <div className="mb-3 md:mb-4 mx-auto flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-center text-yellow-200">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-300 text-center">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-300 to-yellow-600 bg-clip-text text-transparent">
              Crack Code Through Mystery
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform adapts to every detective's pace, from visual ciphers 
              for young sleuths to advanced shack projects for teens.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gray-800/50 backdrop-blur-sm border border-yellow-800/50 rounded-xl md:rounded-2xl p-5 md:p-6 hover:bg-gray-700/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-center text-yellow-200">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-300 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-yellow-200">What Young Sleuths Say</h2>
            <p className="text-lg md:text-xl text-gray-300">Tales from our mysterious community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-yellow-800/50"
              >
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="text-2xl md:text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-yellow-200">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-blue-300">{testimonial.achievement}</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-yellow-600 bg-clip-text text-transparent mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-16 md:py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-yellow-200">Safety & Mystery Charms</h2>
            <p className="text-lg md:text-xl text-gray-300">Your detective's safety is our top priority</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-yellow-800/50 text-center"
              >
                <div className="mb-3 md:mb-4">{feature.icon}</div>
                <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-yellow-200">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-yellow-200">
              Ready to Unravel the Code?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
              Join the Mystery Shack today and unlock your potential with AI-guided coding adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center text-yellow-200"
              >
                <Star className="w-5 h-5 md:w-6 md:h-6" />
                Start Decoding Free
              </button>
              <Link
                to="/parent-dashboard"
                className="bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border border-yellow-800/50 hover:border-yellow-800/30 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 flex items-center gap-2 justify-center text-yellow-200"
              >
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                Guardian Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-yellow-800/50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Ghost className="w-5 h-5 md:w-6 md:h-6 text-yellow-200" />
                <span className="text-lg md:text-xl font-bold text-yellow-200">Mystery Shack Code</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                Empowering young detectives with AI-guided coding mysteries.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4 text-yellow-200">Shack</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Quests</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">AI Mentor</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4 text-yellow-200">Support</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4 text-yellow-200">Mystery Shack</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                <li><a href="#" className="hover:text-yellow-200 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Journal</a></li>
                <li><a href="#" className="hover:text-yellow-200 transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-yellow-800/50 mt-8 pt-8 text-center text-gray-400 text-xs md:text-sm">
            <p>© {new Date().getFullYear()} Mystery Shack Code. All rights reserved. Made with 🌟 for young detectives everywhere.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage;