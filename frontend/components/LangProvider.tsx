'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translations, Lang, TKey } from '@/lib/i18n';

interface LangCtx {
  lang:       Lang;
  t:          (key: TKey) => string;
  toggleLang: () => void;
  isRTL:      boolean;
}

const Ctx = createContext<LangCtx>({
  lang:       'en',
  t:          (k) => translations.en[k] as string,
  toggleLang: () => {},
  isRTL:      false,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    const initial: Lang = (saved === 'ar' || saved === 'en') ? saved : 'en';
    setLang(initial);
    applyDir(initial);
  }, []);

  const applyDir = (l: Lang) => {
    document.documentElement.dir  = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
    // add/remove RTL body class so CSS can target it
    document.body.classList.toggle('rtl', l === 'ar');
  };

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next: Lang = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('lang', next);
      applyDir(next);
      return next;
    });
  }, []);

  const t = useCallback((key: TKey): string => {
    return translations[lang][key] as string;
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, t, toggleLang, isRTL: lang === 'ar' }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
