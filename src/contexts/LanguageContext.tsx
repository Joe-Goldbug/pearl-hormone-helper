import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.howItWorks': 'How It Works',
    'nav.about': 'About',
    'nav.pricing': 'Pricing',
    'nav.dashboard': 'Dashboard',
    'nav.backToHome': 'Back to Home',
    
    // Sign In / Auth
    'auth.signIn': 'Sign In',
    'auth.signInWithGoogle': 'Sign in with Google',
    'auth.signOut': 'Sign Out',
    'auth.signingIn': 'Signing in...',
    'auth.authRequired': 'Authentication Required',
    'auth.signInMessage': 'Please sign in with your Google account to access your personalized hormone health dashboard.',
    'auth.dataProtection': 'Your data is protected with enterprise-grade security and HIPAA compliance.',
    'auth.welcomeTitle': 'Welcome to Pearl',
    'auth.welcomeMessage': 'Sign in with your Google account to start your hormone health journey',
    'auth.afterSignIn': 'After signing in, you can enjoy:',
    'auth.features.dashboard': 'Personal hormone tracking dashboard',
    'auth.features.security': 'Secure data storage and privacy protection',
    'auth.features.ai': 'AI-driven personalized health recommendations',
    'auth.features.unlimited': 'Unlimited report uploads and analysis',
    'auth.hipaaCompliance': 'We strictly comply with HIPAA standards',
    'auth.dataProtectionMessage': 'Your medical data receives the highest level of protection',
    
    // User Menu
    'user.profile': 'Profile',
    'user.healthDashboard': 'Health Dashboard',
    'user.settings': 'Settings',
    'user.reports': 'Reports',
    'user.healthScore': 'Health Score',
    'user.recommendations': 'Recommendations',
    'user.premium': 'Premium',
    
    // Common
    'common.loading': 'Loading...',
    'common.loadingAuth': 'Please wait while we verify your authentication.',
    'common.uploadReport': 'Upload Report & Analyze',
    'common.watchDemo': 'Watch Demo',
    'common.getStarted': 'Get Started',
    'common.learnMore': 'Learn More',
    
    // Language
    'language.switch': 'Language',
    'language.en': 'English',
    'language.zh': '中文',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.howItWorks': '工作原理',
    'nav.about': '关于我们',
    'nav.pricing': '价格',
    'nav.dashboard': '仪表板',
    'nav.backToHome': '返回首页',
    
    // Sign In / Auth
    'auth.signIn': '登录',
    'auth.signInWithGoogle': '使用 Google 登录',
    'auth.signOut': '退出登录',
    'auth.signingIn': '登录中...',
    'auth.authRequired': '需要身份验证',
    'auth.signInMessage': '请使用您的 Google 账户登录，以访问您的个性化激素健康仪表板。',
    'auth.dataProtection': '您的数据受到企业级安全性和 HIPAA 合规性保护。',
    'auth.welcomeTitle': '欢迎来到 Pearl',
    'auth.welcomeMessage': '使用您的 Google 账户登录，开始您的激素健康之旅',
    'auth.afterSignIn': '登录后，您可以享受：',
    'auth.features.dashboard': '个人激素跟踪仪表板',
    'auth.features.security': '安全的数据存储和隐私保护',
    'auth.features.ai': 'AI 驱动的个性化健康建议',
    'auth.features.unlimited': '无限制的报告上传和分析',
    'auth.hipaaCompliance': '我们严格遵守 HIPAA 标准',
    'auth.dataProtectionMessage': '您的医疗数据得到最高级别的保护',
    
    // User Menu
    'user.profile': '个人资料',
    'user.healthDashboard': '健康仪表板',
    'user.settings': '设置',
    'user.reports': '报告',
    'user.healthScore': '健康评分',
    'user.recommendations': '建议',
    'user.premium': '高级版',
    
    // Common
    'common.loading': '加载中...',
    'common.loadingAuth': '请稍候，我们正在验证您的身份。',
    'common.uploadReport': '上传报告并分析',
    'common.watchDemo': '观看演示',
    'common.getStarted': '开始使用',
    'common.learnMore': '了解更多',
    
    // Language
    'language.switch': '语言',
    'language.en': 'English',
    'language.zh': '中文',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem('pearl-language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('pearl-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};