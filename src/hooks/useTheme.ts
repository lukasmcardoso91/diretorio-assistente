import React from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = React.useState<Theme>('system');

  React.useEffect(() => {
    const stored = localStorage.getItem('ajudadiretora-theme') as Theme;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    root.classList.add(effectiveTheme);
  }, [theme]);

  const setThemeValue = (newTheme: Theme) => {
    localStorage.setItem('ajudadiretora-theme', newTheme);
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeValue(newTheme);
  };

  return {
    theme,
    setTheme: setThemeValue,
    toggleTheme,
  };
};