import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  User, LogOut, Settings, Heart, Shield, 
  Mail, Calendar, CheckCircle, Sparkles 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock user state
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  isPremium: boolean;
}

interface GoogleAuthProps {
  onUserChange?: (user: User | null) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onUserChange }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { t } = useLanguage();

  // Mock Google login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: User = {
      id: '1',
      name: 'Sarah Johnson',
      email: 'xiaomei@gmail.com',
      avatar: '/api/placeholder/100/100',
      memberSince: 'January 2024',
      isPremium: true
    };
    
    setUser(mockUser);
    setIsLoading(false);
    setShowLoginDialog(false);
    onUserChange?.(mockUser);
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    onUserChange?.(null);
  };

  // If user is logged in, show user menu
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-3 p-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground mt-1">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {user.isPremium && (
                      <Badge className="bg-gradient-to-r from-primary to-primary-glow text-white text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {user.memberSince}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Quick Statistics */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Reports</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">92</div>
                  <div className="text-xs text-muted-foreground">Health Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">3</div>
                  <div className="text-xs text-muted-foreground">Recommendations</div>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            <span>Health Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // If user is not logged in, show login button
  return (
    <>
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <User className="w-4 h-4" />
            {t('auth.signIn')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {t('auth.welcomeTitle')}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              {t('auth.welcomeMessage')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Login Button */}
            <Button 
              onClick={handleGoogleLogin} 
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  <span>{t('auth.signingIn')}</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>{t('auth.signInWithGoogle')}</span>
                </div>
              )}
            </Button>
            
            {/* Feature Highlights */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-center text-muted-foreground">
                {t('auth.afterSignIn')}
              </div>
              <div className="grid gap-3">
                {[
                  { icon: Heart, text: t('auth.features.dashboard') },
                  { icon: Shield, text: t('auth.features.security') },
                  { icon: Sparkles, text: t('auth.features.ai') },
                  { icon: CheckCircle, text: t('auth.features.unlimited') }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Privacy Notice */}
            <div className="text-xs text-center text-muted-foreground space-y-1">
              <p>{t('auth.hipaaCompliance')}</p>
              <p>{t('auth.dataProtectionMessage')}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoogleAuth;