'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { translations, Lang, TranslationKey } from '@/lib/i18n';

interface LangCtx {
  lang: Lang;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
  isRTL: boolean;
}

const Ctx = createContext<LangCtx>({
  lang: 'en',
  t: (k) => translations.en[k] as string,
  toggleLang: () => {},
  isRTL: false,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'ar' || saved === 'en') {
      setLang(saved);
      applyRTL(saved);
    }
  }, []);

  const applyRTL = (l: Lang) => {
    document.documentElement.dir  = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'ar' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    applyRTL(next);
  };

  const t = (key: TranslationKey): string => translations[lang][key] as string;

  return (
    <Ctx.Provider value={{ lang, t, toggleLang, isRTL: lang === 'ar' }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
