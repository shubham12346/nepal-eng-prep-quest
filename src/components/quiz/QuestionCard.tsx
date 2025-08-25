import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  showExplanation?: boolean;
  isAnswered?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isAnswered = false
}) => {
  return (
    <Card className="p-6 w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{question.subject}</Badge>
          <Badge variant="outline">{question.topic}</Badge>
          <Badge 
            variant={question.difficulty === 'easy' ? 'default' : 
                   question.difficulty === 'medium' ? 'secondary' : 'destructive'}
          >
            {question.difficulty}
          </Badge>
        </div>

        {/* Question Text */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {question.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrectAnswer = showExplanation && isAnswered;
            
            return (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "w-full text-left justify-start p-4 h-auto min-h-12 transition-all",
                  isSelected && !showCorrectAnswer && "ring-2 ring-primary bg-primary/5",
                  showCorrectAnswer && isCorrect && "bg-success/10 border-success text-success-foreground",
                  showCorrectAnswer && isSelected && !isCorrect && "bg-destructive/10 border-destructive text-destructive-foreground"
                )}
                onClick={() => !isAnswered && onAnswerSelect(index)}
                disabled={isAnswered}
              >
                <span className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                </span>
              </Button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && question.explanation && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
            <h3 className="font-medium text-foreground mb-2">Explanation:</h3>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </div>
    </Card>
  );
};