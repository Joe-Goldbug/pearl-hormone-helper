import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationProps {
  variant?: 'default' | 'transparent';
}

const Navigation: React.FC<NavigationProps> = ({ variant = 'default' }) => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/how-it-works', label: t('nav.howItWorks'), key: 'howItWorks' },
    { path: '/about', label: t('nav.about'), key: 'about' },
    { path: '/pricing', label: t('nav.pricing'), key: 'pricing' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const navClasses = variant === 'transparent' 
    ? "border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50"
    : "border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/pearl-logo.jpg" 
              alt="Pearl Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-muted/30 rounded-full p-1 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`
                    px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                    ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg shadow-primary/25 transform scale-105'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/dashboard">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;