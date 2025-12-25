'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { dictionaries, getDictionary, type Locale, type Dictionary } from './dictionaries';

const LOCALE_COOKIE_NAME = 'careerfit_locale';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
      ?.split('=')[1] as Locale | undefined;

    if (stored && dictionaries[stored]) {
      setLocaleState(stored);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'uz') {
        setLocaleState('uz');
      }
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const t = getDictionary(locale);

  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: 'en', setLocale, t: getDictionary('en') }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function useTranslation() {
  const { t } = useI18n();
  return t;
}
