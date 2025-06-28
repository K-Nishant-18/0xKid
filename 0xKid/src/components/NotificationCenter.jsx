import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Star, 
  Trophy, 
  Heart, 
  Users, 
  Code,
  Calendar,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You earned the "Bug Hunter" badge for fixing 10 code errors!',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Time for a Mindful Break',
      message: "You've been coding for 45 minutes. Take a 5-minute breathing break!",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'social',
      title: 'Emma shared a project',
      message: 'Your friend Emma just shared an awesome weather app project!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/community'
    },
    {
      id: '4',
      type: 'system',
      title: 'Quest Progress Saved',
      message: 'Your progress in "Space Rescue Mission" has been automatically saved.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '5',
      type: 'wellness',
      title: 'Great Coding Session!',
      message: 'You maintained perfect focus for 30 minutes with 3 mindful breaks. Well done!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-blue-400" />;
      case 'social':
        return <Users className="w-5 h-5 text-green-400" />;
      case 'system':
        return <Info className="w-5 h-5 text-gray-400" />;
      case 'wellness':
        return <Heart className="w-5 h-5 text-pink-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'achievement':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'reminder':
        return 'border-blue-500/30 bg-blue-500/10';
      case 'social':
        return 'border-green-500/30 bg-green-500/10';
      case 'system':
        return 'border-gray-500/30 bg-gray-500/10';
      case 'wellness':
        return 'border-pink-500/30 bg-pink-500/10';
      default:
        return 'border-white/20 bg-white/10';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-2xl w-full max-w-md border border-white/20 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No notifications yet</p>
              <p className="text-sm text-gray-500 mt-1">We'll let you know when something happens!</p>
            </div>
          ) : (
            <div className="p-2">
              <AnimatePresence>
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 m-2 rounded-lg border transition-all cursor-pointer ${
                      getNotificationColor(notification.type)
                    } ${
                      !notification.read ? 'ring-1 ring-white/20' : 'opacity-75'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-white text-sm">
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2 ml-2">
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        {notification.actionUrl && (
                          <button className="mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                            View →
                          </button>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full"></div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 text-center">
          <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Notification Settings
          </button>
        </div>
      </motion.div>
    </div>
  );
};

NotificationCenter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NotificationCenter;