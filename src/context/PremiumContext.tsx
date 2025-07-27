import React, { createContext, useContext, useEffect, useState } from 'react';
import { PremiumState, FreeUsage } from '../types/premium';
import { FREE_QUESTIONS_LIMIT } from '../utils/constants';
import { storage } from '../utils/storage';
import { useAuth } from './AuthContext';

interface PremiumContextType extends PremiumState {
  canAccessQuestion: (questionId: string) => boolean;
  useQuestion: (questionId: string) => void;
  showUpgradeModal: () => void;
  hideUpgradeModal: () => void;
  upgradeModalVisible: boolean;
}

const PremiumContext = createContext<PremiumContextType | null>(null);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

interface PremiumProviderProps {
  children: React.ReactNode;
}

export const PremiumProvider: React.FC<PremiumProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [freeUsage, setFreeUsage] = useState<FreeUsage>(() => storage.getFreeUsage());

  const isPremium = user?.isPremium || false;
  const subscriptionTier = user?.subscriptionTier || 'free';

  useEffect(() => {
    // Update free usage when it changes
    const usage = storage.getFreeUsage();
    setFreeUsage(usage);
  }, []);

  const canAccessQuestion = (questionId: string): boolean => {
    // Premium users can access all questions
    if (isPremium) return true;
    
    // Free users check against their limit
    const usage = storage.getFreeUsage();
    
    // If they've already answered this question, they can access it
    if (usage.sessionQuestions.includes(questionId)) return true;
    
    // Check if they have questions remaining
    return usage.questionsUsed < usage.questionsLimit;
  };

  const useQuestion = (questionId: string): void => {
    if (!isPremium) {
      const newUsage = storage.incrementFreeUsage(questionId);
      setFreeUsage(newUsage);
      
      // Show upgrade modal if they've reached the limit
      if (newUsage.questionsUsed >= newUsage.questionsLimit) {
        setUpgradeModalVisible(true);
      }
    }
  };

  const showUpgradeModal = () => {
    setUpgradeModalVisible(true);
  };

  const hideUpgradeModal = () => {
    setUpgradeModalVisible(false);
  };

  const features = [
    {
      id: 'unlimited_questions',
      name: 'Unlimited Questions',
      description: 'Access all questions without daily limits',
      isAvailable: isPremium
    },
    {
      id: 'detailed_explanations',
      name: 'Detailed Explanations',
      description: 'Get comprehensive explanations for all answers',
      isAvailable: isPremium
    },
    {
      id: 'progress_analytics',
      name: 'Progress Analytics',
      description: 'Track your performance with detailed analytics',
      isAvailable: isPremium
    },
    {
      id: 'mock_exams',
      name: 'Mock Exams',
      description: 'Practice with full-length mock examinations',
      isAvailable: isPremium
    }
  ];

  const value: PremiumContextType = {
    isPremium,
    subscriptionTier,
    freeUsage,
    features,
    subscriptionExpiry: user?.subscriptionExpiry,
    canAccessQuestion,
    useQuestion,
    showUpgradeModal,
    hideUpgradeModal,
    upgradeModalVisible
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
};