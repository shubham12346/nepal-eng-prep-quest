import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { sampleQuestions } from '@/data/sampleQuestions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Home } from 'lucide-react';

export const Quiz: React.FC = () => {
  const { session, startQuiz } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-start quiz with sample questions if no session exists
    if (!session) {
      startQuiz(sampleQuestions);
    }
  }, [session, startQuiz]);

  // Show results if quiz is completed
  if (session?.isCompleted) {
    const correctAnswers = Object.entries(session.answers).filter(([questionId, answer]) => {
      const question = session.questions.find(q => q.id === questionId);
      return question && question.correctAnswer === answer;
    }).length;

    const score = Math.round((correctAnswers / session.questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
        <div className="container mx-auto px-4">
          <Card className="p-8 max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <Trophy className="h-16 w-16 mx-auto text-primary mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Completed!</h1>
              <p className="text-muted-foreground">Great job on completing the practice quiz</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{score}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-success">{correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{session.questions.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => startQuiz(sampleQuestions)}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return <QuizContainer />;
};