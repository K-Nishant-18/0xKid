import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ghost, Mail, MessageSquare, Github, Twitter, Globe, Star, Send, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    reason: 'general'
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('Your message has been sent to the Mystery Haveli! We’ll get back to you soon.');
      setFormData({ name: '', email: '', message: '', reason: 'general' });
    }, 1500);
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
            <Ghost className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
            Contact the Mystery Shack
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Got a question, suggestion, or just want to share a mysterious coding tale? Reach out to us, and let’s unravel the secrets together!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-800/50 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-300" />
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900 p-3 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Your name, young detective..."
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900 p-3 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Your email address..."
              />
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm text-gray-300 mb-1">Reason for Contact</label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full bg-gray-900 p-3 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="collaboration">Collaboration</option>
                <option value="contribution">Contribute to Project</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                className="w-full bg-gray-900 p-3 rounded-md text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Share your mysterious message..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-yellow-200 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {formStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-600/20 rounded-md text-center text-green-400"
            >
              {formStatus}
            </motion.div>
          )}
        </motion.div>

        {/* Contribute Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-800/50 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-300" />
            Contribute to the Mystery
          </h2>
          <p className="text-gray-300 mb-4">
            Are you a coding wizard or a creative storyteller? Join us in building the 0xKid! Contribute to our open-source project on GitHub, where you can help create new quests, enhance the AI Mentor, or design magical interfaces.
          </p>
          <a
            href="https://github.com/mystery-shack-code"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-yellow-600 hover:from-blue-700 hover:to-yellow-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-yellow-200"
          >
            <Github className="w-5 h-5" />
            Visit Our GitHub
          </a>
        </motion.div>

        {/* Connect with Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-800/50 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-300" />
            Connect with Us
          </h2>
          <p className="text-gray-300 mb-4">
            Stay in touch with the 0xKid community! Follow us on social media for updates, coding tips, and mysterious surprises.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://twitter.com/mysteryshackcode"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-300 hover:text-yellow-200 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </a>
            <a
              href="https://discord.gg/mysteryshackcode"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-300 hover:text-yellow-200 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Discord
            </a>
            <a
              href="mailto:contact@mysteryshackcode.com"
              className="flex items-center gap-2 text-blue-300 hover:text-yellow-200 transition-colors"
            >
              <Mail className="w-5 h-5" />
              contact@mysteryshackcode.com
            </a>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-800/50 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <Star className="w-6 h-6 text-blue-300" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-yellow-200">What is 0xKid?</h3>
              <p className="text-gray-300">
                0xKid is an interactive platform inspired by Gravity Falls, designed to teach kids programming through story-driven quests and games, focusing on C programming.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-200">How can I get support?</h3>
              <p className="text-gray-300">
                Use the contact form above or email us at contact@mysteryshackcode.com. Our AI Mentor and team are here to help with any coding mysteries or technical issues!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-200">Can I contribute to the platform?</h3>
              <p className="text-gray-300">
                Absolutely! Visit our GitHub repository to contribute code, quests, or ideas. We welcome all detectives to join the adventure!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200">Join the Mystery!</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you’re a curious coder, a parent, or a contributor, we’d love to hear from you. Let’s make coding magical together!
          </p>
          <Link
            to="/quests"
            className="bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-yellow-200 inline-flex items-center gap-2"
          >
            <Ghost className="w-5 h-5" />
            Start Your Adventure
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;