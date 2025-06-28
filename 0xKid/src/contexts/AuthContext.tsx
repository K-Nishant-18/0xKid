import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem('codeverse_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('codeverse_user');
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading time for better UX
    setTimeout(checkExistingSession, 1000);
  }, []);

  const login = (userData) => {
    const userWithTimestamp = {
      ...userData,
      lastLogin: new Date(),
      createdAt: userData.createdAt || new Date()
    };
    
    setUser(userWithTimestamp);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem('codeverse_user', JSON.stringify(userWithTimestamp));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('codeverse_user');
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  };

  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update localStorage
      try {
        localStorage.setItem('codeverse_user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating user in localStorage:', error);
      }
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      updateUser, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;