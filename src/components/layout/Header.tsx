import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { usePremium } from '@/context/PremiumContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import appIcon from '@/assets/app-icon.jpg';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isPremium, freeUsage } = usePremium();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={appIcon} alt="Nepal Quiz" className="h-8 w-8 rounded" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Nepal Engineering Quiz</h1>
            <p className="text-xs text-muted-foreground">License Exam Preparation</p>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {/* Free Usage Indicator */}
          {!isPremium && isAuthenticated && (
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Free Questions:</span>
              <span className="font-medium text-foreground">
                {freeUsage.questionsUsed} / {freeUsage.questionsLimit}
              </span>
            </div>
          )}

          {/* Premium Badge */}
          {isPremium && (
            <div className="flex items-center space-x-1 rounded-full bg-premium px-3 py-1 text-premium-foreground">
              <Crown className="h-4 w-4" />
              <span className="text-sm font-medium">Premium</span>
            </div>
          )}

          {/* User Menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                {!isPremium && (
                  <DropdownMenuItem className="text-premium">
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};