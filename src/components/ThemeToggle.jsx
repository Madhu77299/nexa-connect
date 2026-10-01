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
      className={`p-2 rounded-xl bg-neutral-100 dark:bg-[#0A1224] text-neutral-600 dark:text-[#00D2FF] hover:bg-neutral-200 dark:hover:bg-[#0F1D38] transition-all cursor-pointer border border-neutral-200 dark:border-[#0055FF]/20 shadow-sm hover:shadow-[0_0_12px_rgba(0,210,255,0.25)] ${className}`}
      aria-label="Toggle light and dark theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[#00D2FF] animate-fade-in" />
      ) : (
        <Moon className="h-4 w-4 text-neutral-700 animate-fade-in" />
      )}
    </button>
  );
}
