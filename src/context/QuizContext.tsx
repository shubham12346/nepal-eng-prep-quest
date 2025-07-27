import React, { createContext, useContext, useState, useEffect } from 'react';
import { Question, QuizSession } from '../types/quiz';
import { usePremium } from './PremiumContext';

interface QuizContextType {
  session: QuizSession | null;
  startQuiz: (questions: Question[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAnswer: (answer: number) => void;
  endQuiz: () => void;
  currentQuestion: Question | null;
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
  timeRemaining: number;
  canProceed: boolean;
}

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: React.ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { canAccessQuestion, useQuestion } = usePremium();

  // Timer effect
  useEffect(() => {
    if (!session || session.isCompleted || !session.timeLimit) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - new Date(session.startTime).getTime();
      const remaining = Math.max(0, (session.timeLimit! * 60 * 1000) - elapsed);
      
      setTimeRemaining(Math.floor(remaining / 1000));
      
      if (remaining <= 0) {
        endQuiz();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  const startQuiz = (questions: Question[]) => {
    const newSession: QuizSession = {
      id: `quiz_${Date.now()}`,
      questions,
      currentQuestionIndex: 0,
      answers: {},
      startTime: new Date().toISOString(),
      timeLimit: 60, // 60 minutes default
      isCompleted: false
    };
    
    setSession(newSession);
    
    // Use the first question for free users
    if (questions.length > 0) {
      useQuestion(questions[0].id);
    }
  };

  const nextQuestion = () => {
    if (!session) return;
    
    const nextIndex = session.currentQuestionIndex + 1;
    if (nextIndex < session.questions.length) {
      const nextQuestion = session.questions[nextIndex];
      
      // Check access for the next question
      if (canAccessQuestion(nextQuestion.id)) {
        useQuestion(nextQuestion.id);
        setSession(prev => prev ? {
          ...prev,
          currentQuestionIndex: nextIndex
        } : null);
      }
    }
  };

  const previousQuestion = () => {
    if (!session) return;
    
    const prevIndex = session.currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setSession(prev => prev ? {
        ...prev,
        currentQuestionIndex: prevIndex
      } : null);
    }
  };

  const submitAnswer = (answer: number) => {
    if (!session) return;
    
    const currentQuestionId = session.questions[session.currentQuestionIndex].id;
    setSession(prev => prev ? {
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestionId]: answer
      }
    } : null);
  };

  const endQuiz = () => {
    if (!session) return;
    
    setSession(prev => prev ? {
      ...prev,
      isCompleted: true,
      endTime: new Date().toISOString()
    } : null);
  };

  const currentQuestion = session ? session.questions[session.currentQuestionIndex] : null;
  
  const progress = session ? {
    current: session.currentQuestionIndex + 1,
    total: session.questions.length,
    percentage: Math.round(((session.currentQuestionIndex + 1) / session.questions.length) * 100)
  } : { current: 0, total: 0, percentage: 0 };

  const canProceed = currentQuestion ? canAccessQuestion(currentQuestion.id) : false;

  const value: QuizContextType = {
    session,
    startQuiz,
    nextQuestion,
    previousQuestion,
    submitAnswer,
    endQuiz,
    currentQuestion,
    progress,
    timeRemaining,
    canProceed
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};