import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`p-2 rounded-xl bg-neutral-100 dark:bg-slate-800/90 text-neutral-600 dark:text-amber-400 hover:bg-neutral-200 dark:hover:bg-slate-700 transition-all cursor-pointer border border-neutral-200 dark:border-slate-700 ${className}`}
      aria-label="Toggle light and dark theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 animate-fade-in" />
      ) : (
        <Moon className="h-4 w-4 text-neutral-700 animate-fade-in" />
      )}
    </button>
  );
}
