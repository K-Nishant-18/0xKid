import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Code, 
  Users, 
  Globe, 
  Shield, 
  Award,
  Lightbulb,
  Sparkles,
  Heart,
  Zap,
  BrainCircuit,
  GitBranch,
  Gamepad2
} from 'lucide-react';

// Import team member images (replace with your actual images)
import TeamMember1 from '../assets/team/xxx.jpg';
import TeamMember2 from '../assets/team/xxx.jpg';
import TeamMember3 from '../assets/team/xxx.jpg';
import TeamMember4 from '../assets/team/xxx.jpg';

const AboutUs = () => {
  // Team data with social links
  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Ex-game developer turned edtech entrepreneur. Believes coding should feel like play.",
      image: TeamMember1,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Head of Learning",
      bio: "Learning scientist passionate about making CS education accessible to all.",
      image: TeamMember2,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Jamal Williams",
      role: "Lead Developer",
      bio: "Full-stack wizard who builds the magic behind the scenes.",
      image: TeamMember3,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Community Manager",
      bio: "Connects our learners and makes everyone feel welcome.",
      image: TeamMember4,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    }
  ];

  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Adventure Learning",
      description: "Learn through epic quests and story-driven challenges"
    },
    {
      icon: <BrainCircuit className="w-8 h-8" />,
      title: "AI Mentor",
      description: "24/7 personalized coding assistance"
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Real Projects",
      description: "Build portfolio-worthy apps and games"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Game-Based",
      description: "Master concepts through interactive gameplay"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-white/10"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            {['</>', '{ }', '=>', '()', '#'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block mb-8"
          >
            <Rocket className="w-16 h-16 text-pink-400" />
          </motion.div>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
            We're Changing How Kids Code
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            At CodeVerse, we've transformed programming education into an epic adventure where kids 
            learn by doing, creating, and playing.
          </p>
        </motion.section>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28"
        >
          {[
            { value: "50K+", label: "Young Coders" },
            { value: "120+", label: "Interactive Quests" },
            { value: "10M", label: "Lines of Code Written" },
            { value: "100%", label: "Fun Guaranteed" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-28"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                      <div className="text-center p-8">
                        <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                        <p className="text-gray-300">
                          A world where every child sees themselves as a creator, not just a consumer of technology.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <Lightbulb className="w-10 h-10 text-yellow-400" />
                Why We Exist
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Traditional coding education often feels dry and disconnected from what excites kids. 
                We're here to change that by making learning to code as engaging as their favorite video game.
              </p>
              <ul className="space-y-4">
                {[
                  "Game-based learning that actually teaches marketable skills",
                  "Safe, moderated community for young coders",
                  "Projects that solve real problems",
                  "AI mentor that grows with each student"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-28"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            The CodeVerse Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-purple-400/30 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-28"
        >
          <h2 className="text-4xl font-bold mb-4 text-center">
            Meet The Crew
          </h2>
          <p className="text-xl text-gray-400 mb-12 text-center max-w-3xl mx-auto">
            The passionate team behind the CodeVerse magic
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gray-900 rounded-2xl h-full p-6 border border-white/10 overflow-hidden">
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-purple-400 mb-3">{member.role}</p>
                  <p className="text-gray-300 mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-90"></div>
            <div className="relative z-10 py-16 px-6">
              <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Coding Journey?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join our community of young innovators and start creating magic with code.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-white text-purple-900 font-bold rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg text-lg hover:bg-white/10 transition-colors">
                  Meet Our Mentors
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;