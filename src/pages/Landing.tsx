import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Clock, Target, Trophy, Users, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { PremiumModal } from '@/components/premium/PremiumModal';
import heroImage from '@/assets/hero-image.jpg';
import { QUIZ_SUBJECTS } from '@/utils/constants';

export const Landing: React.FC = () => {
  const handleStartQuiz = () => {
    // TODO: Navigate to quiz or implement quiz start logic
    console.log('Starting quiz...');
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Question Bank',
      description: '1000+ questions covering all engineering disciplines for Nepal license exam'
    },
    {
      icon: Target,
      title: 'Subject-wise Practice',
      description: 'Focused practice sessions for Civil, Mechanical, Electrical and other branches'
    },
    {
      icon: Clock,
      title: 'Timed Mock Exams',
      description: 'Simulate real exam conditions with time-bound practice sessions'
    },
    {
      icon: Trophy,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics and improvement suggestions'
    }
  ];

  const stats = [
    { label: 'Questions Available', value: '1000+' },
    { label: 'Engineering Subjects', value: '7' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Students Helped', value: '5000+' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  <Users className="mr-1 h-3 w-3" />
                  Trusted by 5000+ Engineers
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Master the{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Nepal Engineering
                  </span>{' '}
                  License Exam
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Comprehensive preparation platform with 1000+ practice questions, 
                  detailed explanations, and performance analytics designed specifically 
                  for Nepal Engineering License Examination.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleStartQuiz}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  Start Free Practice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  View Question Bank
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Nepal Engineering Exam Preparation" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources designed to help you pass the Nepal Engineering License Exam on your first attempt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border hover:border-primary/30">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              All Engineering Disciplines Covered
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practice questions from all major engineering fields included in the Nepal license examination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUIZ_SUBJECTS.map((subject, index) => (
              <Card key={index} className="group hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/30">
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <div className="flex-1">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {subject}
                    </CardTitle>
                  </div>
                  <CheckCircle className="h-5 w-5 text-success" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 lg:p-16 text-center text-primary-foreground">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Your Preparation?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of engineers who have successfully passed their license exam with our comprehensive preparation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleStartQuiz}
                className="bg-white text-primary hover:bg-gray-100"
              >
                Start Free Practice Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                View Premium Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PremiumModal />
    </div>
  );
};