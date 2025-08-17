import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Globe className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('language.switch')}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleChange('en')} className={language === 'en' ? 'font-semibold' : ''}>
          EN - {t('language.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('zh')} className={language === 'zh' ? 'font-semibold' : ''}>
          中文 - {t('language.zh')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;