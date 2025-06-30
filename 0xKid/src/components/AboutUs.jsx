import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, BookOpen, Sparkles, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Arjun Sharma",
      role: "Lead Developer",
      bio: "Arjun, our code wizard, conjures the magic behind 0xKid’s interactive mysteries. With a passion for teaching kids to code, he weaves C programming into enchanting adventures.",
      avatar: "🧙‍♂️",
      color: "from-blue-600 to-green-600"
    },
    {
      name: "Priya Mehra",
      role: "Creative Director",
      bio: "Priya crafts the whimsical stories and visuals that bring Mystery-Land to life. Her creativity ensures every quest feels like a page from a magical journal.",
      avatar: "🎨",
      color: "from-yellow-600 to-red-600"
    },
    {
      name: "Vikram Patel",
      role: "AI Specialist",
      bio: "Vikram, the AI Mentor master, designs the clever hints and guidance that help young detectives solve coding mysteries with confidence.",
      avatar: "🤖",
      color: "from-purple-600 to-blue-600"
    },
    {
      name: "Ananya Gupta",
      role: "UX Designer",
      bio: "Ananya ensures the Mystery Shack is a welcoming place for kids and parents alike, designing intuitive interfaces that make learning a breeze.",
      avatar: "✨",
      color: "from-green-600 to-teal-600"
    }
  ];

  const vision = `
    At 0xKid, we believe every child has a spark of curiosity waiting to be ignited. Our vision is to transform coding education into a thrilling adventure, inspired by the mysteries of Gravity Falls. We aim to empower young minds to explore programming through storytelling, games, and hands-on challenges, making learning C as exciting as uncovering secrets in the Mystery Haveli. Our goal is to foster creativity, problem-solving, and a lifelong love for coding in kids worldwide.
  `;

  const mission = `
    Our mission is to create a magical learning environment where kids can master programming concepts through immersive, story-driven quests. By blending the enchantment of Gravity Falls with interactive coding challenges, we make learning accessible, engaging, and fun. We’re committed to supporting young learners and their guardians with tools, AI guidance, and a supportive community to unlock their full potential.
  `;

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
            About 0xKid
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Uncover the story behind our magical coding adventure, where learning meets mystery in the heart of the Mystery Haveli!
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-800/50 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-300" />
            Our Vision
          </h2>
          <p className="text-gray-300 leading-relaxed">{vision}</p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-800/50 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-300" />
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">{mission}</p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-yellow-200 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-300" />
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-2xl`}>
                    {member.avatar}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-yellow-200 text-center">{member.name}</h3>
                <p className="text-sm text-blue-300 text-center mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why We Do It */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-gradient-to-r from-blue-600/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-600/30 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <Star className="w-6 h-6 text-blue-300" />
            Why We Do It
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Inspired by the quirky and mysterious world of Gravity Falls, we created 0xKid to make coding as exciting as solving a supernatural puzzle. We believe that every child deserves a chance to discover the magic of programming in a way that’s fun, engaging, and accessible. Our team is driven by a passion for education and technology, and we’re dedicated to sparking curiosity and creativity in the next generation of coders. Join us in the Mystery Haveli, and let’s unravel the secrets of coding together!
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200">Join the Adventure!</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Ready to dive into the mysteries of coding? Explore our quests, games, and AI-guided lessons to start your journey in the Mystery Haveli!
          </p>
          <Link
            to="/quests"
            className="bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-yellow-200 inline-flex items-center gap-2"
          >
            <Ghost className="w-5 h-5" />
            Start Exploring
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;