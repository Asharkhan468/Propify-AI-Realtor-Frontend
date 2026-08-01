'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const themeStorageKey = 'theme';

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem(themeStorageKey);
      if (
        storedTheme === 'light' ||
        storedTheme === 'dark' ||
        storedTheme === 'system'
      ) {
        setTheme(storedTheme);
      }

      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const updateSystemTheme = () => setSystemTheme(media.matches ? 'dark' : 'light');
      updateSystemTheme();
      media.addEventListener('change', updateSystemTheme);

      return () => {
        media.removeEventListener('change', updateSystemTheme);
      };
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch {
    }
  }, [theme]);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  const value = useMemo(
    () => ({ theme, resolvedTheme, systemTheme, setTheme }),
    [theme, resolvedTheme, systemTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
