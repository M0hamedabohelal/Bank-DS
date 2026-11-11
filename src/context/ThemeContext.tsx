import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types/quiz';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  fontSize: 'normal' | 'large' | 'huge';
  setFontSize: (size: 'normal' | 'large' | 'huge') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('cs314_theme') as ThemeMode;
    return saved || 'light';
  });

  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'huge'>(() => {
    const saved = localStorage.getItem('cs314_font_size') as 'normal' | 'large' | 'huge';
    return saved || 'normal';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cs314_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-fontsize', fontSize);
    localStorage.setItem('cs314_font_size', fontSize);
  }, [fontSize]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setFontSize = (newSize: 'normal' | 'large' | 'huge') => {
    setFontSizeState(newSize);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
