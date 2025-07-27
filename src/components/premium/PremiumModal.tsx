import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/utils/constants';
import { usePremium } from '@/context/PremiumContext';
import { useAuth } from '@/context/AuthContext';

export const PremiumModal: React.FC = () => {
  const { upgradeModalVisible, hideUpgradeModal, freeUsage } = usePremium();
  const { isAuthenticated } = useAuth();

  const handleUpgrade = (planId: string) => {
    // TODO: Implement payment integration
    console.log('Upgrading to plan:', planId);
    hideUpgradeModal();
  };

  const handleSignIn = () => {
    // TODO: Trigger Google OAuth
    console.log('Sign in triggered');
    hideUpgradeModal();
  };

  return (
    <Dialog open={upgradeModalVisible} onOpenChange={hideUpgradeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-premium/10">
            <Crown className="h-6 w-6 text-premium" />
          </div>
          <DialogTitle className="text-2xl">
            {isAuthenticated ? 'Upgrade to Premium' : 'Sign In to Continue'}
          </DialogTitle>
          <DialogDescription className="text-base">
            {isAuthenticated 
              ? `You've used ${freeUsage.questionsUsed} of ${freeUsage.questionsLimit} free questions today. Upgrade to premium for unlimited access and exclusive features.`
              : 'Sign in with Google to unlock premium features and continue your Nepal Engineering License preparation.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-success/5 border border-success/20">
              <div className="flex-shrink-0">
                <Zap className="h-5 w-5 text-success" />
              </div>
              <div>
                <h4 className="font-medium">Unlimited Questions</h4>
                <p className="text-sm text-muted-foreground">Practice as much as you want</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex-shrink-0">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Detailed Explanations</h4>
                <p className="text-sm text-muted-foreground">Learn from every question</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-premium/5 border border-premium/20">
              <div className="flex-shrink-0">
                <Crown className="h-5 w-5 text-premium" />
              </div>
              <div>
                <h4 className="font-medium">Performance Analytics</h4>
                <p className="text-sm text-muted-foreground">Track your progress</p>
              </div>
            </div>
          </div>

          {isAuthenticated ? (
            /* Pricing Plans */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <Card key={plan.id} className={'isPopular' in plan && plan.isPopular ? "border-premium shadow-lg relative" : ""}>
                  {'isPopular' in plan && plan.isPopular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-premium text-premium-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold text-foreground">NPR {plan.price}</span>
                      <span className="text-muted-foreground">/{plan.duration}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={('isPopular' in plan && plan.isPopular) ? "default" : "outline"}
                      onClick={() => handleUpgrade(plan.id)}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            /* Sign In Section */
            <div className="text-center space-y-4">
              <div className="p-8 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border">
                <h3 className="text-lg font-semibold mb-4">Continue Your Journey</h3>
                <p className="text-muted-foreground mb-6">
                  Sign in with Google to access premium features and track your progress across all devices.
                </p>
                <Button size="lg" onClick={handleSignIn} className="bg-white text-gray-900 hover:bg-gray-100 border border-gray-300">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};