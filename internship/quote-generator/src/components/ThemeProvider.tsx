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
  const [currentTheme, setCurrentTheme] = useState('pastel');

  useEffect(() => {
    // Get saved theme or default to pastel
    const savedTheme = localStorage.getItem('theme') || 'pastel';
    console.log('Loading saved theme:', savedTheme);
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: string) => {
    console.log('Applying theme:', theme);
    
    // Force a complete theme refresh
    const html = document.documentElement;
    
    // Remove existing data-theme
    html.removeAttribute('data-theme');
    
    // Force a reflow
    void html.offsetHeight;
    
    // Set new data-theme
    html.setAttribute('data-theme', theme);
    
    // Force another reflow to ensure changes are applied
    void html.offsetHeight;
    
    console.log('Theme applied. Current data-theme:', html.getAttribute('data-theme'));
  };

  const changeTheme = (theme: string) => {
    console.log('Changing theme to:', theme);
    setCurrentTheme(theme);
    
    // Apply theme with a small delay to ensure state updates
    setTimeout(() => {
      applyTheme(theme);
    }, 0);
    
    localStorage.setItem('theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 