"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  currentTheme: string;
  changeTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme');
    const validThemes = ['light', 'dark'];
    const themeToApply = validThemes.includes(savedTheme!) ? savedTheme! : 'light';
    console.log('Loading saved theme:', themeToApply);
    setCurrentTheme(themeToApply);
    applyTheme(themeToApply);
  }, []);

  const applyTheme = (theme: string) => {
    const validThemes = ['light', 'dark'];
    const themeToApply = validThemes.includes(theme) ? theme : 'light';
    console.log('Applying theme:', themeToApply);
    
    // Force a complete theme refresh
    const html = document.documentElement;
    
    // Remove existing data-theme
    html.removeAttribute('data-theme');
    
    // Force a reflow
    void html.offsetHeight;
    
    // Set new data-theme
    html.setAttribute('data-theme', themeToApply);
    
    // Force another reflow to ensure changes are applied
    void html.offsetHeight;
    
    console.log('Theme applied. Current data-theme:', html.getAttribute('data-theme'));
  };

  const changeTheme = (theme: string) => {
    const validThemes = ['light', 'dark'];
    const themeToApply = validThemes.includes(theme) ? theme : 'light';
    console.log('Changing theme to:', themeToApply);
    setCurrentTheme(themeToApply);
    
    // Apply theme with a small delay to ensure state updates
    setTimeout(() => {
      applyTheme(themeToApply);
    }, 0);
    
    localStorage.setItem('theme', themeToApply);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 