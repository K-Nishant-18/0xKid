import React from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, Sun, Moon, Globe, Bell, Shield, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  const settingsSections = [
    {
      title: 'Audio',
      icon: Volume2,
      options: [
        { label: 'Sound Effects', type: 'toggle', value: true },
        { label: 'Background Music', type: 'toggle', value: false },
        { label: 'Volume', type: 'slider', value: 80 },
      ]
    },
    {
      title: 'Display',
      icon: Sun,
      options: [
        { label: 'Dark Mode', type: 'toggle', value: true },
        { label: 'Reduce Motion', type: 'toggle', value: false },
        { label: 'High Contrast', type: 'toggle', value: false },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      options: [
        { label: 'Quest Updates', type: 'toggle', value: true },
        { label: 'Achievement Alerts', type: 'toggle', value: true },
        { label: 'Community Messages', type: 'toggle', value: true },
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      options: [
        { label: 'Show Online Status', type: 'toggle', value: true },
        { label: 'Share Progress', type: 'toggle', value: true },
        { label: 'Allow Friend Requests', type: 'toggle', value: true },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      options: [
        { label: 'Theme Color', type: 'select', value: 'purple', options: ['purple', 'blue', 'green', 'orange'] },
        { label: 'Font Size', type: 'select', value: 'medium', options: ['small', 'medium', 'large'] },
      ]
    },
    {
      title: 'Language',
      icon: Globe,
      options: [
        { label: 'Interface Language', type: 'select', value: 'English', options: ['English', 'Spanish', 'French', 'German'] },
        { label: 'Code Comments', type: 'select', value: 'English', options: ['English', 'Spanish', 'French', 'German'] },
      ]
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl shadow-xl border border-white/10"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-gray-900/95 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <section.icon className="w-5 h-5 text-purple-400" />
                <h3>{section.title}</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {section.options.map((option) => (
                  <div key={option.label} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-sm text-gray-300">{option.label}</span>
                    {option.type === 'toggle' && (
                      <button
                        className={`w-11 h-6 rounded-full transition-colors ${
                          option.value ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 m-1 rounded-full bg-white transition-transform ${
                            option.value ? 'translate-x-5' : ''
                          }`}
                        />
                      </button>
                    )}
                    {option.type === 'select' && (
                      <select className="bg-white/10 text-sm rounded-lg px-2 py-1 border border-white/20">
                        {option.options.map((opt) => (
                          <option key={opt} value={opt} selected={opt === option.value}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                    {option.type === 'slider' && (
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={option.value}
                        className="w-32 accent-purple-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings; 