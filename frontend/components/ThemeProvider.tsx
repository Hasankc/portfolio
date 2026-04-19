'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
interface ThemeCtx { theme: Theme; toggle: () => void; }

const Ctx = createContext<ThemeCtx>({ theme: 'light', toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // read saved preference, fall back to system preference
    const saved = localStorage.getItem('theme') as Theme | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const t = saved ?? preferred;
    setTheme(t);
    document.body.classList.toggle('dark', t === 'dark');
    setReady(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.body.classList.toggle('dark', next === 'dark');
  };

  if (!ready) return null;
  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
