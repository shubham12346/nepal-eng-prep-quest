import { useEffect, useState } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { usePremium } from '@/context/PremiumContext';
import { QuestionCard } from './QuestionCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { PremiumModal } from '@/components/premium/PremiumModal';

export const QuizContainer: React.FC = () => {
  const { 
    session, 
    currentQuestion, 
    progress, 
    timeRemaining, 
    nextQuestion, 
    previousQuestion, 
    submitAnswer, 
    endQuiz,
    canProceed 
  } = useQuiz();
  
  const { canAccessQuestion, upgradeModalVisible } = usePremium();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Reset answer and explanation when question changes
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [currentQuestion?.id]);

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
    submitAnswer(answer);
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    
    // Show explanation before moving to next question
    if (!showExplanation && selectedAnswer !== null) {
      setShowExplanation(true);
      return;
    }

    // Check if user can access next question
    const nextIndex = session!.currentQuestionIndex + 1;
    if (nextIndex < session!.questions.length) {
      const nextQ = session!.questions[nextIndex];
      if (canAccessQuestion(nextQ.id)) {
        nextQuestion();
      }
    } else {
      // Quiz completed
      endQuiz();
    }
  };

  const handlePrevious = () => {
    if (showExplanation) {
      setShowExplanation(false);
    } else {
      previousQuestion();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session || !currentQuestion) {
    return null;
  }

  const isLastQuestion = progress.current === progress.total;
  const canAccessNext = !isLastQuestion && canProceed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                Question {progress.current} of {progress.total}
              </Badge>
              {session.timeLimit && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
              )}
            </div>
            <Progress value={progress.percentage} className="w-full sm:w-48" />
          </div>
        </Card>

        {/* Question */}
        <div className="mb-6">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            showExplanation={showExplanation}
            isAnswered={selectedAnswer !== null}
          />
        </div>

        {/* Navigation */}
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={progress.current === 1 && !showExplanation}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {showExplanation ? 'Back to Question' : 'Previous'}
            </Button>

            <div className="flex items-center gap-2">
              {selectedAnswer !== null && !showExplanation && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Answered
                </Badge>
              )}
            </div>

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null && !showExplanation}
              className="flex items-center gap-2"
            >
              {isLastQuestion && showExplanation ? 'Finish Quiz' : 
               showExplanation ? 'Next Question' : 'Show Answer'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {!canAccessNext && !isLastQuestion && showExplanation && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-warning/20">
              <p className="text-sm text-muted-foreground text-center">
                You've reached your free question limit. Upgrade to premium to continue!
              </p>
            </div>
          )}
        </Card>

        {/* Premium Modal */}
        {upgradeModalVisible && <PremiumModal />}
      </div>
    </div>
  );
};