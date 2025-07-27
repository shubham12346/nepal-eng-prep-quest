export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPremium: boolean;
  subscriptionTier: 'free' | 'basic' | 'premium';
  subscriptionExpiry?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface GoogleAuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}