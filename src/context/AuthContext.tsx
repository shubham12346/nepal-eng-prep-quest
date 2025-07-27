import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '../types/auth';
import { storage } from '../utils/storage';

interface AuthContextType extends AuthState {
  login: (googleToken: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Check for existing auth token on app start
    const token = storage.getAuthToken();
    if (token) {
      // TODO: Validate token with backend and get user data
      // For now, we'll simulate this
      setTimeout(() => {
        setState({
          user: null, // Will be set after API call
          isLoading: false,
          isAuthenticated: false
        });
      }, 1000);
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (googleToken: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // TODO: Send googleToken to backend for verification
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        name: 'Test User',
        isPremium: false,
        subscriptionTier: 'free',
        createdAt: new Date().toISOString()
      };

      storage.setAuthToken('mock-jwt-token');
      
      setState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Login failed:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    storage.removeAuthToken();
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
  };

  const updateUser = (updates: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null
    }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};