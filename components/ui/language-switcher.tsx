'use client';

import { useI18n } from '@/lib/i18n/context';
import { Globe } from 'lucide-react';
import { Button } from './button';

const localeLabels = {
  en: 'EN',
  uz: 'UZ',
} as const;

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'uz' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="gap-1.5 text-muted-foreground hover:text-foreground"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{localeLabels[locale]}</span>
    </Button>
  );
}
