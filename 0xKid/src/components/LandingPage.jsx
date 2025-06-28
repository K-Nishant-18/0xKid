import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Code, Users, Heart, Globe, Zap,
  Play, Star, Rocket, Brain, Target, CheckCircle,
  ArrowRight, Home, BookOpen, Gamepad2, Trophy,
  User as UserIcon, ChevronDown, ChevronUp, Menu, X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

// Feature data moved outside component for better organization
const features = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Ages 8-12: Visual Magic",
    description: "Drag-and-drop coding with voice guidance and fun animations",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Ages 13-15: Hybrid Power",
    description: "Bridge visual and text coding with guided challenges",
    color: "from-green-400 to-blue-500"
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Ages 16-18: Real World",
    description: "Full code editors and portfolio-ready projects",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Multilingual Support",
    description: "Learn in your preferred language with voice assistance",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Safe Collaboration",
    description: "Team coding with AI-moderated peer programming",
    color: "from-indigo-400 to-purple-500"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Mindfulness Missions",
    description: "Coding breaks with breathing animations and wellness",
    color: "from-pink-400 to-red-500"
  }
];

const testimonials = [
  {
    name: "Aarav, 12",
    avatar: "🧑‍💻",
    quote: "I built my first game in just 2 weeks! The AI mentor Zara helped me understand loops by comparing them to my daily routine.",
    achievement: "Built 5 games"
  },
  {
    name: "Emma, 15",
    avatar: "👩‍💻",
    quote: "The mindfulness breaks are amazing. I can code for hours without getting tired, and my parents love the progress reports!",
    achievement: "Level 8 Coder"
  },
  {
    name: "Marcus, 17",
    avatar: "👨‍💻",
    quote: "CodeVerse helped me build a portfolio that got me into my dream computer science program. The real-world projects are incredible!",
    achievement: "College Ready"
  }
];

const stats = [
  { number: "50K+", label: "Young Coders" },
  { number: "1M+", label: "Quests Completed" },
  { number: "25+", label: "Languages Supported" },
  { number: "98%", label: "Happy Parents" }
];

const safetyFeatures = [
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    title: "COPPA Compliant",
    description: "Full compliance with children's privacy laws"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    title: "AI Moderation",
    description: "All chats monitored by advanced AI systems"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    title: "Parent Dashboard",
    description: "Complete visibility into your child's progress"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    title: "Expert Mentors",
    description: "Qualified educators and child safety experts"
  }
];

const navItems = [
  { name: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
  { name: 'Courses', icon: <BookOpen className="w-5 h-5" />, path: '/courses' },
  { name: 'About Us', icon: <Users className="w-5 h-5" />, path: '/about' },
  { name: 'Leaderboard', icon: <Trophy className="w-5 h-5" />, path: '/leaderboard' },
  { name: 'Profile', icon: <UserIcon className="w-5 h-5" />, path: '/profile' },
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed w-full z-50"
        initial={{ backgroundColor: 'transparent', backdropFilter: 'blur(0)' }}
        animate={controls}
      >
        <div className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 z-50">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CodeVerse
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
                    className="flex items-center px-1 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
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
              className="hidden md:block text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span className="hidden md:inline">Get Started</span>
              <span className="md:hidden">Start</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition duration-150 ease-in-out"
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
                className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 block"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={handleSignIn}
                className="w-full flex items-center justify-center px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-yellow-400" />
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeVerse
              </h1>
              <Code className="w-8 h-8 md:w-12 md:h-12 text-cyan-400" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
              Where Stories, AI & Code Come to Life
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of young coders on an epic adventure through AI-powered quests, 
              real-world projects, and mindful learning experiences.
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
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6" />
              Start Your Adventure
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 flex items-center gap-2 justify-center">
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
                icon: <Brain className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />,
                title: "AI Code Mentor",
                description: "Personalized guidance from your AI companion"
              },
              {
                icon: <Target className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />,
                title: "Story Quests",
                description: "Learn through epic adventures and challenges"
              },
              {
                icon: <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />,
                title: "Mindful Learning",
                description: "Balanced approach to coding and wellbeing"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20"
              >
                <div className="mb-3 md:mb-4 mx-auto flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-center">{item.title}</h3>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Learn Code Through Adventure
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform adapts to every learner's pace and style, from visual drag-and-drop 
              for beginners to advanced real-world projects for teens.
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
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-5 md:p-6 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-center">{feature.title}</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">What Young Coders Say</h2>
            <p className="text-lg md:text-xl text-gray-300">Real stories from our amazing community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/20"
              >
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="text-2xl md:text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-purple-400">{testimonial.achievement}</p>
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
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Safety & Privacy First</h2>
            <p className="text-lg md:text-xl text-gray-300">Your child's safety and privacy are our top priorities</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/20 text-center"
              >
                <div className="mb-3 md:mb-4">{feature.icon}</div>
                <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{feature.title}</h3>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
              Join CodeVerse today and unlock your potential with AI-powered learning adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
              >
                <Star className="w-5 h-5 md:w-6 md:h-6" />
                Start Learning Free
              </button>
              <Link
                to="/parent-dashboard"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                Parent Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                <span className="text-lg md:text-xl font-bold">CodeVerse</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                Empowering the next generation of creators through AI-powered coding education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4">Platform</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Quests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Mentor</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4">Support</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4">Company</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} CodeVerse. All rights reserved. Made with ❤️ for young coders everywhere.</p>
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