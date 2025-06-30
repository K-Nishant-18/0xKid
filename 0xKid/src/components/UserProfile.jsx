import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Star, 
  Trophy, 
  Calendar, 
  Globe,
  Shield,
  Bell,
  Palette,
  Volume2,
  Moon,
  Sun,
  Save,
  LogOut,
  Edit3,
  Camera,
  Pin,
  CheckCircle,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GamifiedLevel from './GamifiedLevel'; // Assume this is in a separate file
import Map from './Map'; // New Map component

const UserProfile = ({ isOpen, onClose }) => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '🧑‍💻',
    language: user?.language || 'English'
  });
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(1);

  const avatarOptions = ['🧑‍💻', '👩‍💻', '👨‍💻', '🧒', '👧', '👦', '🤓', '😎', '🚀', '🎮', '🎨', '🎵'];
  const languageOptions = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Mandarin', 'Japanese'];

  const handleSave = () => {
    if (user) {
      updateUser(editData);
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  useEffect(() => {
    if (user) {
      const maxXP = 500; // Adjust based on your XP system
      const calculatedProgress = Math.min((user.xp / maxXP) * 100, 100);
      setProgress(calculatedProgress);
      const newLevel = Math.min(Math.floor(calculatedProgress / 20) + 1, 5);
      setLevel(newLevel);
    }
  }, [user]);

  const advanceProgress = () => {
    let newProgress = progress + 10;
    if (newProgress > 100) newProgress = 100;
    setProgress(newProgress);
    const newLevel = Math.min(Math.floor(newProgress / 20) + 1, 5);
    if (newLevel !== level) {
      setLevel(newLevel);
    } else if (newProgress === 100) {
      // No need to update message as it's handled in useEffect
    } else {
      // No need to update message as it's handled in useEffect
    }
  };

  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Sidebar */}
              <div className="w-full lg:w-64 bg-white/10 border-b lg:border-b-0 lg:border-r border-white/20 p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                  <div className="text-2xl sm:text-3xl">{user.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-sm sm:text-base truncate">{user.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-300">Level {user.level}</p>
                  </div>
                </div>

                <nav className="space-y-1 sm:space-y-2">
                  {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'preferences', label: 'Preferences', icon: Settings },
                    { id: 'achievements', label: 'Achievements', icon: Trophy },
                    { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'map', label: 'Map', icon: Pin }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-xs sm:text-sm ${
                        activeTab === tab.id
                          ? 'bg-white/20 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 border-t border-white/20">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-red-400 hover:bg-red-500/20 rounded-lg transition-all text-xs sm:text-sm"
                  >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {activeTab === 'profile' && 'Profile Settings'}
                    {activeTab === 'preferences' && 'Preferences'}
                    {activeTab === 'achievements' && 'Achievements'}
                    {activeTab === 'privacy' && 'Privacy & Safety'}
                    {activeTab === 'notifications' && 'Notifications'}
                    {activeTab === 'map' && 'Map'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">Basic Information</h3>
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-xs sm:text-sm"
                        >
                          <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                          {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editData.name}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base"
                            />
                          ) : (
                            <div className="bg-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base">{user.name}</div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Age</label>
                          <div className="bg-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base">{user.age} years old</div>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Avatar</label>
                          {isEditing ? (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                              {avatarOptions.map((avatar) => (
                                <button
                                  key={avatar}
                                  onClick={() => setEditData({ ...editData, avatar })}
                                  className={`p-2 rounded-lg text-lg sm:text-xl transition-all ${
                                    editData.avatar === avatar
                                      ? 'bg-purple-600 ring-2 ring-purple-400'
                                      : 'bg-white/10 hover:bg-white/20'
                                  }`}
                                >
                                  {avatar}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-2xl sm:text-3xl">{user.avatar}</div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Language</label>
                          {isEditing ? (
                            <select
                              value={editData.language}
                              onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base"
                            >
                              {languageOptions.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="bg-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base">{user.language}</div>
                          )}
                        </div>
                      </div>

                      {isEditing && (
                        <div className="mt-4 sm:mt-6 flex justify-end">
                          <button
                            onClick={handleSave}
                            className="px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white text-sm sm:text-base font-medium"
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="bg-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Your Stats</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{user.level}</div>
                          <div className="text-sm text-gray-300">Level</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{user.xp.toLocaleString()}</div>
                          <div className="text-sm text-gray-300">XP Points</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{user.streak}</div>
                          <div className="text-sm text-gray-300">Day Streak</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-400">12</div>
                          <div className="text-sm text-gray-300">Quests Done</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <div className="bg-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Learning Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Voice Guidance</div>
                            <div className="text-sm text-gray-400">Enable AI voice explanations</div>
                          </div>
                          <button className="bg-green-500 w-12 h-6 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Auto-Save Progress</div>
                            <div className="text-sm text-gray-400">Automatically save your work</div>
                          </div>
                          <button className="bg-green-500 w-12 h-6 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Hints & Tips</div>
                            <div className="text-sm text-gray-400">Show helpful hints during challenges</div>
                          </div>
                          <button className="bg-green-500 w-12 h-6 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Accessibility</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Font Size</label>
                          <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                            <option value="small" className="bg-gray-800">Small</option>
                            <option value="medium" className="bg-gray-800" selected>Medium</option>
                            <option value="large" className="bg-gray-800">Large</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                          <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg">
                              <Moon className="w-4 h-4" />
                              Dark
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                              <Sun className="w-4 h-4" />
                              Light
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { icon: "🏆", title: "First Quest", description: "Completed your first coding quest", earned: true },
                        { icon: "🔥", title: "Week Streak", description: "Coded for 7 days straight", earned: true },
                        { icon: "🎯", title: "Bug Hunter", description: "Fixed 10 code bugs", earned: true },
                        { icon: "🚀", title: "Project Master", description: "Built your first game", earned: false },
                        { icon: "🧠", title: "AI Collaborator", description: "Used AI mentor 50 times", earned: false },
                        { icon: "👥", title: "Team Player", description: "Completed a collaborative project", earned: false }
                      ].map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            achievement.earned
                              ? 'bg-yellow-500/20 border-yellow-500/30'
                              : 'bg-white/10 border-white/20 opacity-60'
                          }`}
                        >
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <h4 className="font-semibold text-white mb-1">{achievement.title}</h4>
                          <p className="text-sm text-gray-300">{achievement.description}</p>
                          {achievement.earned && (
                            <div className="mt-2 text-xs text-yellow-400">✓ Earned</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <GamifiedLevel progress={progress} setProgress={setProgress} level={level} setLevel={setLevel} />
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="bg-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Safety Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Chat Moderation</div>
                            <div className="text-sm text-gray-400">AI monitors all conversations</div>
                          </div>
                          <div className="text-green-400">✓ Active</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Content Filter</div>
                            <div className="text-sm text-gray-400">Blocks inappropriate content</div>
                          </div>
                          <div className="text-green-400">✓ Active</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Parent Notifications</div>
                            <div className="text-sm text-gray-400">Parents receive activity updates</div>
                          </div>
                          <div className="text-green-400">✓ Enabled</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Data Privacy</h3>
                      <div className="space-y-3 text-sm text-gray-300">
                        <p>• We only collect data necessary for your learning experience</p>
                        <p>• Your code and projects are private by default</p>
                        <p>• You can delete your account and data at any time</p>
                        <p>• We comply with COPPA for users under 13</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="bg-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Quest Reminders</div>
                            <div className="text-sm text-gray-400">Daily coding reminders</div>
                          </div>
                          <button className="bg-green-500 w-12 h-6 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Achievement Alerts</div>
                            <div className="text-sm text-gray-400">When you earn new badges</div>
                          </div>
                          <button className="bg-green-500 w-12 h-6 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Break Reminders</div>
                            <div className="text-sm text-gray-400">Mindfulness break notifications</div>
                          </div>
                          <button className="bg-green-500 w-12 h-6 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Map Tab */}
                {activeTab === 'map' && (
                  <div className="space-y-6">
                    <div className="bg-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Learning Map</h3>
                      <Map progress={progress} advanceProgress={advanceProgress} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;