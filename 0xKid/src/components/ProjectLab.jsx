import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Plus, 
  Sparkles, 
  Gamepad2, 
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

const ProjectLab = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', icon: Code },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'web', label: 'Websites', icon: Globe },
    { id: 'apps', label: 'Apps', icon: Smartphone },
    { id: 'art', label: 'Creative', icon: Palette }
  ];

  const projects = [
    {
      id: 1,
      title: "Space Invaders Game",
      description: "A classic arcade game built with JavaScript and HTML5 Canvas",
      category: 'games',
      difficulty: 'Intermediate',
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
      title: "Personal Portfolio",
      description: "A responsive portfolio website to showcase your coding projects",
      category: 'web',
      difficulty: 'Beginner',
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
      title: "Weather App",
      description: "Get real-time weather updates for any city around the world",
      category: 'apps',
      difficulty: 'Intermediate',
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
      title: "Animated Logo Creator",
      description: "Design and animate your own logos with code",
      category: 'art',
      difficulty: 'Advanced',
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
      title: "Music Player",
      description: "Build a sleek music player with playlist functionality",
      category: 'apps',
      difficulty: 'Intermediate',
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
      title: "Puzzle Game",
      description: "A challenging sliding puzzle game with multiple difficulty levels",
      category: 'games',
      difficulty: 'Advanced',
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
        return 'text-yellow-400 bg-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400';
      case 'Intermediate':
        return 'text-yellow-400';
      case 'Advanced':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
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
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Code className="w-10 h-10 text-purple-400" />
                Project Lab
              </h1>
              <p className="text-xl text-gray-300">
                Build amazing projects and bring your ideas to life!
              </p>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Project
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
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
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
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group"
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
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium"
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
                      <Star className="w-4 h-4 text-yellow-400" />
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
                      <Star className="w-4 h-4" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                )}

                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    project.status === 'completed'
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : project.status === 'in-progress'
                      ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
                  }`}
                >
                  {project.status === 'completed' ? (
                    <span className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </span>
                  ) : project.status === 'in-progress' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Continue Building
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Start Building
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
          className="mt-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">AI Project Suggestions</h3>
              <p className="text-gray-300 mb-4">
                "Based on your progress, I suggest building a Calculator App next! 
                It's perfect for practicing functions and user interfaces. Want me to generate a custom project idea?"
              </p>
              <div className="flex gap-3">
                <button className="bg-purple-500/30 hover:bg-purple-500/40 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Generate Idea
                </button>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  View Suggestions
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