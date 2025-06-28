import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import QuestMap from './components/QuestMap';
import QuestDetail from './components/QuestDetail';
import ProjectLab from './components/ProjectLab';
import MindfulnessMission from './components/MindfulnessMission';
import ParentDashboard from './components/ParentDashboard';
import CollaborationHub from './components/CollaborationHub';
import AITeachingStudio from './components/AITeachingStudio';
import GameStudio from './components/GameStudio';
import CommunityShowcase from './components/CommunityShowcase';
import Navbar from './components/Navbar';
import AIMentor from './components/AIMentor';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './contexts/AuthContext';
import AboutUs from './components/AboutUs';

function AppContent() {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Welcome to CodeVerse! Loading your adventure..." />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/quests" element={
            <ProtectedRoute>
              <Navbar />
              {selectedQuest ? (
                <QuestDetail 
                  questId={selectedQuest} 
                  onBack={() => setSelectedQuest(null)} 
                />
              ) : (
                <QuestMap onQuestSelect={setSelectedQuest} />
              )}
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute>
              <Navbar />
              <ProjectLab />
            </ProtectedRoute>
          } />
          <Route path="/mindfulness" element={
            <ProtectedRoute>
              <Navbar />
              <MindfulnessMission />
            </ProtectedRoute>
          } />
          <Route path="/collaboration" element={
            <ProtectedRoute>
              <Navbar />
              <CollaborationHub />
            </ProtectedRoute>
          } />
          <Route path="/ai-teaching" element={
            <ProtectedRoute>
              <Navbar />
              <AITeachingStudio />
            </ProtectedRoute>
          } />
          <Route path="/game-studio" element={
            <ProtectedRoute>
              <Navbar />
              <GameStudio />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <Navbar />
              <CommunityShowcase />
            </ProtectedRoute>
          } />
          <Route path="/parent-dashboard" element={
            <ProtectedRoute>
              <Navbar />
              <ParentDashboard />
            </ProtectedRoute>
          } />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global AI Mentor - Only show when authenticated */}
        {isAuthenticated && (
          <>
            <AIMentor 
              isOpen={isMentorOpen} 
              onClose={() => setIsMentorOpen(false)} 
            />

            {/* Floating AI Mentor Button */}
            {!isMentorOpen && (
              <button
                onClick={() => setIsMentorOpen(true)}
                className="fixed bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
              >
                🤖
              </button>
            )}
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;