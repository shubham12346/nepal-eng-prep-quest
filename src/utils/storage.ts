import { LOCAL_STORAGE_KEYS, FREE_QUESTIONS_LIMIT } from './constants';
import { FreeUsage } from '../types/premium';
import { QuizProgress } from '../types/quiz';

export const storage = {
  // Free usage tracking
  getFreeUsage(): FreeUsage {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.FREE_USAGE);
      if (stored) {
        const usage = JSON.parse(stored);
        // Check if it's a new day - reset if needed
        const today = new Date().toDateString();
        if (usage.resetDate !== today) {
          const resetUsage = {
            questionsUsed: 0,
            questionsLimit: FREE_QUESTIONS_LIMIT,
            resetDate: today,
            sessionQuestions: []
          };
          this.setFreeUsage(resetUsage);
          return resetUsage;
        }
        return usage;
      }
    } catch (error) {
      console.error('Error reading free usage:', error);
    }
    
    // Default free usage
    const defaultUsage = {
      questionsUsed: 0,
      questionsLimit: FREE_QUESTIONS_LIMIT,
      resetDate: new Date().toDateString(),
      sessionQuestions: []
    };
    this.setFreeUsage(defaultUsage);
    return defaultUsage;
  },

  setFreeUsage(usage: FreeUsage): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.FREE_USAGE, JSON.stringify(usage));
    } catch (error) {
      console.error('Error saving free usage:', error);
    }
  },

  incrementFreeUsage(questionId: string): FreeUsage {
    const usage = this.getFreeUsage();
    if (!usage.sessionQuestions.includes(questionId)) {
      usage.questionsUsed += 1;
      usage.sessionQuestions.push(questionId);
      this.setFreeUsage(usage);
    }
    return usage;
  },

  // Quiz progress tracking
  getQuizProgress(): QuizProgress {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.QUIZ_PROGRESS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading quiz progress:', error);
    }
    
    return {
      totalAttempted: 0,
      correctAnswers: 0,
      subjects: {},
      averageScore: 0,
      streakDays: 0
    };
  },

  setQuizProgress(progress: QuizProgress): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving quiz progress:', error);
    }
  },

  // Auth token management
  getAuthToken(): string | null {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error reading auth token:', error);
      return null;
    }
  },

  setAuthToken(token: string): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  },

  removeAuthToken(): void {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  },

  clearAll(): void {
    try {
      Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};