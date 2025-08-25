import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/Header';
import { 
  Check, 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  BookOpen, 
  Target, 
  BarChart3,
  Clock,
  Users,
  ArrowLeft
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/utils/constants';

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(planId);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: "Welcome to premium! You now have unlimited access.",
        variant: "default"
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Unlimited Questions',
      description: 'Access to all 1000+ practice questions'
    },
    {
      icon: Target,
      title: 'Subject-wise Practice',
      description: 'Focused practice sessions for all engineering disciplines'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Track your progress with comprehensive performance reports'
    },
    {
      icon: Clock,
      title: 'Mock Exams',
      description: 'Timed practice sessions simulating real exam conditions'
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 customer support with priority response'
    },
    {
      icon: Users,
      title: 'Study Groups',
      description: 'Join exclusive study groups with other premium users'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Shrestha',
      role: 'Civil Engineer',
      content: 'Thanks to Nepal Engineering Prep, I passed my license exam on the first attempt. The practice questions were exactly like the real exam!',
      rating: 5
    },
    {
      name: 'Priya Gurung',
      role: 'Electrical Engineer',
      content: 'The detailed explanations helped me understand concepts I was struggling with. Highly recommended for all engineering students.',
      rating: 5
    },
    {
      name: 'Amit Thapa',
      role: 'Mechanical Engineer',
      content: 'Best investment I made for my career. The mock exams really prepared me for the time pressure of the actual exam.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-premium mr-2" />
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Choose Your Plan
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock unlimited access to comprehensive practice questions, detailed analytics, 
            and premium features designed to help you pass the Nepal Engineering License Exam.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                'isPopular' in plan && plan.isPopular 
                  ? 'border-2 border-primary shadow-lg scale-105' 
                  : 'border hover:border-primary/30'
              }`}
            >
              {'isPopular' in plan && plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-white text-center py-2 text-sm font-medium">
                  <Star className="inline h-4 w-4 mr-1" />
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${'isPopular' in plan && plan.isPopular ? 'pt-12' : 'pt-6'}`}>
                <div className="flex items-center justify-center mb-4">
                  {plan.id === 'basic' ? (
                    <Zap className="h-8 w-8 text-primary" />
                  ) : (
                    <Crown className="h-8 w-8 text-premium" />
                  )}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-lg">
                  Perfect for {plan.id === 'basic' ? 'regular practice' : 'serious preparation'}
                </CardDescription>
                
                <div className="py-6">
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">NPR</span>
                    <span className="text-4xl font-bold text-foreground mx-1">
                      {plan.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/{plan.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.id === 'basic' 
                      ? 'Great value for money' 
                      : 'Everything you need to succeed'
                    }
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-success" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <Button
                  size="lg"
                  className={`w-full ${
                    'isPopular' in plan && plan.isPopular
                      ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90'
                      : 'bg-primary hover:bg-primary-hover'
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? (
                    'Processing...'
                  ) : (
                    <>
                      {isAuthenticated ? 'Subscribe Now' : 'Sign Up & Subscribe'}
                      {'isPopular' in plan && plan.isPopular && <Crown className="ml-2 h-4 w-4" />}
                    </>
                  )}
                </Button>

                {!isAuthenticated && (
                  <p className="text-xs text-center text-muted-foreground">
                    You'll be redirected to create an account
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What You Get with Premium
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features designed to maximize your exam preparation success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
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

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contact our support team for personalized assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              View FAQ
            </Button>
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};