export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  isAvailable: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

export interface FreeUsage {
  questionsUsed: number;
  questionsLimit: number;
  resetDate: string;
  sessionQuestions: string[];
}

export interface PremiumState {
  isPremium: boolean;
  subscriptionTier: 'free' | 'basic' | 'premium';
  freeUsage: FreeUsage;
  features: PremiumFeature[];
  subscriptionExpiry?: string;
}