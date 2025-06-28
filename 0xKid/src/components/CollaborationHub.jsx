import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Video, 
  Share2, 
  Code, 
  Play,
  Star,
  Clock,
  Globe,
  Shield,
  UserPlus,
  Settings
} from 'lucide-react';

const CollaborationHub = () => {
  const [activeTab, setActiveTab] = useState('rooms');

  const codingRooms = [
    {
      id: 1,
      title: "Build a Game Together",
      description: "Creating a multiplayer space adventure game",
      participants: 4,
      maxParticipants: 6,
      difficulty: "Intermediate",
      language: "JavaScript",
      status: "active",
      mentor: "Zara",
      tags: ["Game Dev", "Collaboration", "Fun"]
    },
    {
      id: 2,
      title: "Web Design Workshop",
      description: "Learning responsive design with HTML & CSS",
      participants: 3,
      maxParticipants: 5,
      difficulty: "Beginner",
      language: "HTML/CSS",
      status: "starting-soon",
      mentor: "Alex",
      tags: ["Web Design", "CSS", "Responsive"]
    },
    {
      id: 3,
      title: "AI Chatbot Challenge",
      description: "Building smart chatbots with Python",
      participants: 2,
      maxParticipants: 4,
      difficulty: "Advanced",
      language: "Python",
      status: "waiting",
      mentor: "Sam",
      tags: ["AI", "Python", "Challenge"]
    }
  ];

  const myProjects = [
    {
      id: 1,
      title: "Weather Dashboard",
      collaborators: ["Emma", "Raj"],
      lastUpdated: "2 hours ago",
      status: "in-progress",
      progress: 75
    },
    {
      id: 2,
      title: "Quiz Game",
      collaborators: ["Lily"],
      lastUpdated: "1 day ago",
      status: "review",
      progress: 90
    }
  ];

  const friends = [
    { id: 1, name: "Emma", avatar: "👩‍💻", status: "online", level: 4 },
    { id: 2, name: "Raj", avatar: "👨‍💻", status: "coding", level: 3 },
    { id: 3, name: "Lily", avatar: "👧", status: "offline", level: 5 },
    { id: 4, name: "Alex", avatar: "🧑‍💻", status: "online", level: 6 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-500/20';
      case 'starting-soon':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'waiting':
        return 'text-blue-400 bg-blue-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
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
                <Users className="w-10 h-10 text-purple-400" />
                Collaboration Hub
              </h1>
              <p className="text-xl text-gray-300">
                Code together, learn together, grow together!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create Room
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 w-fit">
            {[
              { id: 'rooms', label: 'Coding Rooms', icon: Code },
              { id: 'projects', label: 'My Projects', icon: Share2 },
              { id: 'friends', label: 'Friends', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'rooms' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Available Coding Rooms</h2>
                {codingRooms.map((room, index) => (
                  <div key={room.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{room.title}</h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                            {room.status.replace('-', ' ')}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{room.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {room.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{room.participants}/{room.maxParticipants}</span>
                        </div>
                        <div className={`${getDifficultyColor(room.difficulty)}`}>
                          {room.difficulty}
                        </div>
                        <div className="flex items-center gap-1">
                          <Code className="w-4 h-4" />
                          <span>{room.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>Mentor: {room.mentor}</span>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
                        Join Room
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Collaborative Projects</h2>
                {myProjects.map((project, index) => (
                  <div key={project.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'in-progress' ? 'text-yellow-400 bg-yellow-500/20' : 'text-green-400 bg-green-500/20'
                      }`}>
                        {project.status.replace('-', ' ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          Collaborators: {project.collaborators.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{project.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">Progress</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-colors">
                        <Code className="w-4 h-4" />
                        Open Project
                      </button>
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        Chat
                      </button>
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition-colors">
                        <Video className="w-4 h-4" />
                        Video Call
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'friends' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Coding Friends</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {friends.map((friend, index) => (
                    <div key={friend.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl">{friend.avatar}</div>
                        <div className="flex-1">
                          <h3 className="font-bold">{friend.name}</h3>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              friend.status === 'online' ? 'bg-green-400' : 
                              friend.status === 'coding' ? 'bg-yellow-400' : 'bg-gray-400'
                            }`}></div>
                            <span className="text-sm text-gray-300 capitalize">{friend.status}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-300">Level</div>
                          <div className="font-bold text-purple-400">{friend.level}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium transition-colors">
                          Invite to Code
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Safety Guidelines */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Safety First
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>All chats are AI-moderated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>No personal info sharing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Report any issues instantly</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Mentors always present</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                  <UserPlus className="w-4 h-4" />
                  Create New Room
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                  <Users className="w-4 h-4" />
                  Find Friends
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                  <Settings className="w-4 h-4" />
                  Privacy Settings
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Active Now</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                    12
                  </div>
                  <div>
                    <div className="font-medium">Coding Rooms</div>
                    <div className="text-xs text-gray-400">Active sessions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    48
                  </div>
                  <div>
                    <div className="font-medium">Online Friends</div>
                    <div className="text-xs text-gray-400">Ready to code</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                    6
                  </div>
                  <div>
                    <div className="font-medium">Mentors Available</div>
                    <div className="text-xs text-gray-400">Ready to help</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationHub;