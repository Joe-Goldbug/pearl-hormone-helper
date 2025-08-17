import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">{t('common.loading')}</h2>
            <p className="text-muted-foreground">{t('common.loadingAuth')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{t('auth.authRequired')}</h2>
              <p className="text-muted-foreground">
                {t('auth.signInMessage')}
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={login} 
                className="w-full" 
                size="lg"
                variant="hero"
              >
                <Heart className="w-5 h-5 mr-2" />
                {t('auth.signInWithGoogle')}
              </Button>
              
              <div className="text-xs text-muted-foreground">
                {t('auth.dataProtection')}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/'}
                className="text-sm"
              >
                ← {t('nav.backToHome')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;