'use client';

import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-secondary hover:bg-accent transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
        suppressHydrationWarning
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-[#D4AF37]" />
        )}
      </motion.div>
    </motion.button>
  );
}
