export const FREE_QUESTIONS_LIMIT = 10;

export const QUIZ_SUBJECTS = [
  'Civil Engineering',
  'Mechanical Engineering', 
  'Electrical Engineering',
  'Electronics Engineering',
  'Computer Engineering',
  'Architecture',
  'General Engineering'
] as const;

export const DIFFICULTY_LEVELS = [
  'easy',
  'medium', 
  'hard'
] as const;

export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 999,
    currency: 'NPR',
    duration: 'monthly' as const,
    features: [
      'Unlimited quiz attempts',
      'Detailed explanations',
      'Progress tracking',
      'Subject-wise analysis'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1999,
    currency: 'NPR', 
    duration: 'monthly' as const,
    features: [
      'All Basic features',
      'Mock exam simulator',
      'Performance analytics',
      'Study planner',
      'Offline access',
      'Priority support'
    ],
    isPopular: true
  }
] as const;

export const LOCAL_STORAGE_KEYS = {
  FREE_USAGE: 'nepal_quiz_free_usage',
  QUIZ_PROGRESS: 'nepal_quiz_progress',
  AUTH_TOKEN: 'nepal_quiz_auth_token',
  USER_PREFERENCES: 'nepal_quiz_preferences'
} as const;