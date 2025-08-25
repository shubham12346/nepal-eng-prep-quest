import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { usePremium } from '@/context/PremiumContext';
import { Header } from '@/components/layout/Header';
import { PremiumModal } from '@/components/premium/PremiumModal';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Star,
  PlayCircle,
  Crown,
  BarChart3,
  Calendar
} from 'lucide-react';
import { QUIZ_SUBJECTS } from '@/utils/constants';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, freeUsage, showUpgradeModal } = usePremium();

  const handleStartPractice = () => {
    navigate('/quiz');
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  // Mock progress data
  const overallProgress = {
    questionsAttempted: freeUsage.questionsUsed + 145,
    totalQuestions: 1000,
    correctAnswers: Math.floor((freeUsage.questionsUsed + 145) * 0.78),
    averageScore: 78,
    studyStreak: 12,
    weeklyGoal: 50,
    weeklyProgress: 34
  };

  const recentActivity = [
    { subject: 'Civil Engineering', questions: 15, score: 87, date: '2 hours ago' },
    { subject: 'Mechanical Engineering', questions: 12, score: 75, date: '1 day ago' },
    { subject: 'Electrical Engineering', questions: 20, score: 92, date: '2 days ago' },
  ];

  const subjectProgress = QUIZ_SUBJECTS.slice(0, 5).map((subject, index) => ({
    name: subject,
    attempted: Math.floor(Math.random() * 50) + 10,
    total: 150,
    accuracy: Math.floor(Math.random() * 30) + 65
  }));

  const progressPercentage = Math.round((overallProgress.questionsAttempted / overallProgress.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.name || 'Engineer'}! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Ready to continue your Nepal Engineering License preparation?
              </p>
            </div>
            {!isPremium && (
              <Button 
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-premium to-primary text-white hover:opacity-90"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            )}
          </div>

          {/* Free Usage Alert */}
          {!isPremium && (
            <Card className="border-warning/30 bg-warning/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-warning/20 rounded-lg">
                      <Target className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Free Questions: {freeUsage.questionsUsed} / {freeUsage.questionsLimit} used
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {freeUsage.questionsLimit - freeUsage.questionsUsed} questions remaining today
                      </p>
                    </div>
                  </div>
                  <Button onClick={showUpgradeModal} variant="outline" size="sm">
                    Get Unlimited Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Start Practice</CardTitle>
                  <CardDescription>Begin your practice session</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleStartPractice}
                className="w-full bg-primary hover:bg-primary-hover"
              >
                Start Now
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <CardTitle className="text-lg">Progress Report</CardTitle>
                  <CardDescription>View detailed analytics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Study Streak</CardTitle>
                  <CardDescription>Keep the momentum going</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-accent">{overallProgress.studyStreak}</div>
                <div className="text-sm text-muted-foreground">days</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">🔥 Amazing streak!</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {overallProgress.questionsAttempted}
                    </div>
                    <div className="text-sm text-muted-foreground">Questions Attempted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-1">
                      {overallProgress.correctAnswers}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">
                      {overallProgress.averageScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Average Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning mb-1">
                      {overallProgress.weeklyProgress}
                    </div>
                    <div className="text-sm text-muted-foreground">Weekly Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-accent" />
                  Weekly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {overallProgress.weeklyProgress}/{overallProgress.weeklyGoal}
                    </span>
                  </div>
                  <Progress 
                    value={(overallProgress.weeklyProgress / overallProgress.weeklyGoal) * 100} 
                    className="h-3"
                  />
                  <p className="text-xs text-muted-foreground">
                    {overallProgress.weeklyGoal - overallProgress.weeklyProgress} questions to reach your weekly goal
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity & Subject Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.questions} questions • {activity.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant={activity.score >= 80 ? "default" : "secondary"}>
                      {activity.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-success" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectProgress.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{subject.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">
                          {subject.attempted}/{subject.total}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {subject.accuracy}%
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={(subject.attempted / subject.total) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <PremiumModal />
    </div>
  );
};