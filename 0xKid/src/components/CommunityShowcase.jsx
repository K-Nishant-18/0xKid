import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Star, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Play,
  Code,
  Trophy,
  Calendar,
  Filter,
  Search,
  Gamepad2,
  Globe,
  Smartphone,
  Palette,
  Music,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

const CommunityShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Projects', icon: Code },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'websites', label: 'Websites', icon: Globe },
    { id: 'apps', label: 'Apps', icon: Smartphone },
    { id: 'art', label: 'Digital Art', icon: Palette },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'stories', label: 'Interactive Stories', icon: BookOpen }
  ];

  const projects = [
    {
      id: 1,
      title: "Space Adventure Game",
      description: "An epic space exploration game with multiple levels and power-ups",
      author: "Aarav K.",
      authorAge: 12,
      authorAvatar: "🧑‍💻",
      category: 'games',
      language: 'JavaScript',
      difficulty: 'Intermediate',
      likes: 156,
      views: 1240,
      comments: 23,
      createdAt: '2 days ago',
      thumbnail: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Space', 'Adventure', 'Multiplayer'],
      featured: true,
      xpEarned: 450
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "A beautiful weather app that shows forecasts with animated backgrounds",
      author: "Priya S.",
      authorAge: 15,
      authorAvatar: "👩‍💻",
      category: 'apps',
      language: 'React',
      difficulty: 'Advanced',
      likes: 89,
      views: 567,
      comments: 12,
      createdAt: '1 week ago',
      thumbnail: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Weather', 'API', 'Responsive'],
      featured: false,
      xpEarned: 380
    },
    {
      id: 3,
      title: "Digital Art Gallery",
      description: "An interactive gallery showcasing pixel art created with code",
      author: "Maya L.",
      authorAge: 13,
      authorAvatar: "👧",
      category: 'art',
      language: 'P5.js',
      difficulty: 'Beginner',
      likes: 234,
      views: 890,
      comments: 45,
      createdAt: '3 days ago',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Art', 'Creative', 'Interactive'],
      featured: true,
      xpEarned: 290
    },
    {
      id: 4,
      title: "Music Composer",
      description: "Create your own melodies with this visual music composition tool",
      author: "Alex R.",
      authorAge: 14,
      authorAvatar: "🧑‍🎤",
      category: 'music',
      language: 'JavaScript',
      difficulty: 'Intermediate',
      likes: 67,
      views: 345,
      comments: 8,
      createdAt: '5 days ago',
      thumbnail: 'https://images.pexels.com/photos/1631708/pexels-photo-1631708.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Music', 'Audio', 'Creative'],
      featured: false,
      xpEarned: 320
    },
    {
      id: 5,
      title: "Virtual Pet Simulator",
      description: "Take care of your virtual pet by feeding, playing, and training",
      author: "Sam T.",
      authorAge: 11,
      authorAvatar: "🧒",
      category: 'games',
      language: 'Scratch',
      difficulty: 'Beginner',
      likes: 178,
      views: 1100,
      comments: 34,
      createdAt: '1 day ago',
      thumbnail: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Pet', 'Simulation', 'Fun'],
      featured: false,
      xpEarned: 250
    },
    {
      id: 6,
      title: "Interactive Story: Mystery Island",
      description: "A choose-your-own-adventure story with multiple endings",
      author: "Luna M.",
      authorAge: 16,
      authorAvatar: "👩‍🎨",
      category: 'stories',
      language: 'HTML/CSS/JS',
      difficulty: 'Advanced',
      likes: 145,
      views: 678,
      comments: 19,
      createdAt: '4 days ago',
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Story', 'Interactive', 'Adventure'],
      featured: true,
      xpEarned: 420
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400 bg-green-500/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
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
                <Users className="w-10 h-10 text-purple-400" />
                Community Showcase
              </h1>
              <p className="text-xl text-gray-300">
                Discover amazing projects created by young coders worldwide!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">Featured Projects</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.filter(project => project.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{project.authorAvatar}</div>
                    <div>
                      <div className="font-medium">{project.author}</div>
                      <div className="text-sm text-gray-400">Age {project.authorAge} • {project.createdAt}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>{project.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-green-400" />
                        <span>{project.comments}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.xpEarned} XP</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                      <Play className="w-4 h-4" />
                      Try It
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Code className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            All Projects ({sortedProjects.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{project.authorAvatar}</div>
                    <div>
                      <div className="font-medium">{project.author}</div>
                      <div className="text-sm text-gray-400">Age {project.authorAge} • {project.createdAt}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>{project.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-green-400" />
                        <span>{project.comments}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                      <Play className="w-4 h-4" />
                      Try It
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Code className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Community Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">2,847</div>
              <div className="text-gray-300">Projects Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">15,692</div>
              <div className="text-gray-300">Lines of Code</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">1,234</div>
              <div className="text-gray-300">Young Creators</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">89,456</div>
              <div className="text-gray-300">Project Views</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityShowcase; 