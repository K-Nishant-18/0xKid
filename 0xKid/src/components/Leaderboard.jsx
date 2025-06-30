import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Ghost, ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: "Arjun Sharma", xp: 1250, level: 12, avatar: "🧙‍♂️", rank: 1 },
    { id: 2, name: "Priya Mehra", xp: 1100, level: 11, avatar: "🎨", rank: 2 },
    { id: 3, name: "Vikram Patel", xp: 950, level: 10, avatar: "🤖", rank: 3 },
    { id: 4, name: "Ananya Gupta", xp: 800, level: 9, avatar: "✨", rank: 4 },
    { id: 5, name: "Rohan Desai", xp: 650, level: 7, avatar: "🦁", rank: 5 },
    { id: 6, name: "Sanya Verma", xp: 500, level: 6, avatar: "🌟", rank: 6 },
    { id: 7, name: "Kiran Rao", xp: 400, level: 5, avatar: "📜", rank: 7 },
    { id: 8, name: "Meera Singh", xp: 300, level: 4, avatar: "🎁", rank: 8 },
    { id: 9, name: "Aarav Kumar", xp: 200, level: 3, avatar: "🔮", rank: 9 },
    { id: 10, name: "Isha Nair", xp: 100, level: 2, avatar: "🌲", rank: 10 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('xp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterLevel, setFilterLevel] = useState('');
  const [filteredData, setFilteredData] = useState(leaderboardData);

  useEffect(() => {
    let updatedData = [...leaderboardData];

    // Search filter
    if (searchTerm) {
      updatedData = updatedData.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Level filter
    if (filterLevel) {
      updatedData = updatedData.filter(user => 
        user.level === parseInt(filterLevel)
      );
    }

    // Sort
    updatedData.sort((a, b) => {
      if (sortBy === 'xp') {
        return sortOrder === 'desc' ? b.xp - a.xp : a.xp - b.xp;
      } else if (sortBy === 'level') {
        return sortOrder === 'desc' ? b.level - a.level : a.level - b.level;
      } else {
        return sortOrder === 'desc' 
          ? b.name.localeCompare(a.name) 
          : a.name.localeCompare(b.name);
      }
    });

    // Update ranks
    updatedData = updatedData.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    setFilteredData(updatedData);
  }, [searchTerm, sortBy, sortOrder, filterLevel]);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-600 to-orange-600';
      case 2: return 'bg-gradient-to-r from-gray-400 to-gray-600';
      case 3: return 'bg-gradient-to-r from-orange-500 to-amber-600';
      default: return 'bg-gray-800/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-green-900 text-white p-4 sm:p-6 font-['Creepster',_cursive]">
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-3 text-yellow-200">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
            Mystery Shack Leaderboard
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Behold the top detectives of Mystery-Land! Compete, earn XP, and climb the ranks in the Mystery Haveli!
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="w-5 h-5 text-blue-300" />
              <input
                type="text"
                placeholder="Search detectives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900 p-3 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 w-full sm:w-64"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-5 h-5 text-blue-300" />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="bg-gray-900 p-3 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="">All Levels</option>
                {[...new Set(leaderboardData.map(user => user.level))].sort((a, b) => a - b).map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50"
        >
          <div className="grid grid-cols-5 gap-4 mb-4 text-yellow-200 text-sm sm:text-base">
            <button
              onClick={() => handleSort('rank')}
              className="flex items-center gap-2 font-semibold"
            >
              Rank
              {sortBy === 'rank' && (sortOrder === 'desc' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />)}
            </button>
            <button
              onClick={() => handleSort('name')}
              className="flex items-center gap-2 font-semibold"
            >
              Detective
              {sortBy === 'name' && (sortOrder === 'desc' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />)}
            </button>
            <button
              onClick={() => handleSort('xp')}
              className="flex items-center gap-2 font-semibold"
            >
              XP
              {sortBy === 'xp' && (sortOrder === 'desc' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />)}
            </button>
            <button
              onClick={() => handleSort('level')}
              className="flex items-center gap-2 font-semibold"
            >
              Level
              {sortBy === 'level' && (sortOrder === 'desc' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />)}
            </button>
            <div></div>
          </div>

          <AnimatePresence>
            {filteredData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`grid grid-cols-5 gap-4 p-4 rounded-lg mb-2 ${getRankColor(user.rank)} border border-yellow-800/50 hover:bg-gray-700/50 transition-all duration-300`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-yellow-200">{user.rank}</span>
                  {user.rank <= 3 && <Trophy className="w-5 h-5 text-blue-300" />}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-yellow-600 flex items-center justify-center text-lg">
                    {user.avatar}
                  </div>
                  <span className="text-sm sm:text-base truncate">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-300" />
                  <span className="text-sm sm:text-base">{user.xp}</span>
                </div>
                <div className="text-sm sm:text-base">Level {user.level}</div>
                <Link
                  to={`/profile/${user.id}`}
                  className="text-blue-300 hover:text-yellow-200 text-sm underline text-right"
                >
                  View Profile
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200">Join the Ranks!</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Solve mysteries, earn XP, and climb the leaderboard! Start your coding adventure in the Mystery Haveli today!
          </p>
          <Link
            to="/quests"
            className="bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-yellow-200 inline-flex items-center gap-2"
          >
            <Ghost className="w-5 h-5" />
            Start Solving Mysteries
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;