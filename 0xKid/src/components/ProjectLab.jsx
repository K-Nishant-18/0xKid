import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Sparkles, 
  Ghost, 
  Globe, 
  Smartphone,
  Palette,
  Music,
  Calculator,
  Camera,
  Play,
  Star,
  Clock,
  Users,
  Eye,
  ExternalLink
} from 'lucide-react';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const ProjectLab = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Mysteries', icon: BookOpen },
    { id: 'games', label: 'Mystery Games', icon: Ghost },
    { id: 'web', label: 'Shack Websites', icon: Globe },
    { id: 'apps', label: 'Mystic Apps', icon: Smartphone },
    { id: 'art', label: 'Creative Ciphers', icon: Palette }
  ];

  const projects = [
    {
      id: 1,
      title: "Gnome Invasion Game",
      description: "A mystical arcade game built with JavaScript and HTML5 Canvas",
      category: 'games',
      difficulty: 'Mystery Hunter',
      duration: '2-3 hours',
      xp: 300,
      status: 'completed',
      image: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=400',
      technologies: ['JavaScript', 'HTML5', 'CSS3'],
      likes: 42,
      views: 156
    },
    {
      id: 2,
      title: "Mystery Shack Portfolio",
      description: "A responsive journal to showcase your supernatural coding projects",
      category: 'web',
      difficulty: 'New Sleuth',
      duration: '1-2 hours',
      xp: 200,
      status: 'in-progress',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      likes: 28,
      views: 89
    },
    {
      id: 3,
      title: "Mystic Weather App",
      description: "Get real-time supernatural weather updates for Gravity Falls",
      category: 'apps',
      difficulty: 'Mystery Hunter',
      duration: '3-4 hours',
      xp: 350,
      status: 'not-started',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
      technologies: ['React', 'API', 'CSS'],
      likes: 0,
      views: 0
    },
    {
      id: 4,
      title: "Animated Cipher Creator",
      description: "Design and animate your own mysterious symbols with code",
      category: 'art',
      difficulty: 'Master Detective',
      duration: '4-5 hours',
      xp: 450,
      status: 'not-started',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      technologies: ['SVG', 'CSS Animation', 'JavaScript'],
      likes: 0,
      views: 0
    },
    {
      id: 5,
      title: "Mabel's Music Player",
      description: "Build a glittery music player with playlist functionality",
      category: 'apps',
      difficulty: 'Mystery Hunter',
      duration: '2-3 hours',
      xp: 320,
      status: 'completed',
      image: 'https://images.pexels.com/photos/1631708/pexels-photo-1631708.jpeg?auto=compress&cs=tinysrgb&w=400',
      technologies: ['JavaScript', 'HTML5 Audio', 'CSS'],
      likes: 35,
      views: 124
    },
    {
      id: 6,
      title: "Cipher Puzzle Game",
      description: "A challenging puzzle game with multiple cryptic levels",
      category: 'games',
      difficulty: 'Master Detective',
      duration: '3-4 hours',
      xp: 400,
      status: 'not-started',
      image: 'https://images.pexels.com/photos/1337384/pexels-photo-1337384.jpeg?auto=compress&cs=tinysrgb&w=400',
      technologies: ['JavaScript', 'Canvas', 'Game Logic'],
      likes: 0,
      views: 0
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/20';
      case 'in-progress':
        return 'text-yellow-300 bg-yellow-600/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Mystery Solved';
      case 'in-progress':
        return 'Investigating';
      default:
        return 'New Mystery';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'New Sleuth':
        return 'text-green-400';
      case 'Mystery Hunter':
        return 'text-yellow-300';
      case 'Master Detective':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-green-900 text-white font-['Creepster',_cursive] p-4">
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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 text-yellow-200">
                <BookOpen className="w-10 h-10 text-blue-300" />
                Mystery Project Lab
              </h1>
              <p className="text-xl text-gray-300">
                Unravel coding mysteries and create supernatural projects!
              </p>
            </div>
            <button className="bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 text-yellow-200">
              <Plus className="w-5 h-5" />
              New Mystery Project
            </button>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gray-800/50 text-yellow-200 shadow-lg border border-yellow-800/50'
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50 hover:text-yellow-200 border border-yellow-800/30'
                }`}
              >
                <category.icon className="w-5 h-5" />
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-800/50 hover:bg-gray-700/50 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)} bg-black/50 backdrop-blur-sm`}>
                    {project.difficulty}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-yellow-200">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700/50 rounded-full text-xs font-medium text-yellow-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-300" />
                      <span>{project.xp} XP</span>
                    </div>
                  </div>
                </div>

                {project.status === 'completed' && (
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-300" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                )}

                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    project.status === 'completed'
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : project.status === 'in-progress'
                      ? 'bg-yellow-600/20 text-yellow-300 hover:bg-yellow-600/30'
                      : 'bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 transform hover:scale-105'
                  }`}
                >
                  {project.status === 'completed' ? (
                    <span className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Mystery
                    </span>
                  ) : project.status === 'in-progress' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Continue Investigation
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Start Mystery
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Project Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-yellow-600/20 to-red-800/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-600 to-red-800 flex items-center justify-center text-2xl">
              📖
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 text-yellow-200">Grunkle Stan's Mystery Suggestions</h3>
              <p className="text-gray-300 mb-4">
                "Nice work, kid! How about building a Mystic Calculator next? 
                It's perfect for cracking numerical ciphers. Want a new mystery idea?"
              </p>
              <div className="flex gap-3">
                <button className="bg-yellow-600/30 hover:bg-yellow-600/40 px-4 py-2 rounded-full text-sm font-medium transition-colors text-yellow-200">
                  Generate Mystery
                </button>
                <button className="bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-full text-sm font-medium transition-colors text-yellow-200">
                  View Clues
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectLab;