export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
  isPremium: boolean;
}

export interface QuizSession {
  id: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>;
  startTime: string;
  endTime?: string;
  timeLimit?: number; // in minutes
  isCompleted: boolean;
  score?: number;
}

export interface QuizResult {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number; // in minutes
  difficulty: string;
  subject: string;
  completedAt: string;
}

export interface QuizProgress {
  totalAttempted: number;
  correctAnswers: number;
  subjects: Record<string, {
    attempted: number;
    correct: number;
  }>;
  averageScore: number;
  streakDays: number;
}