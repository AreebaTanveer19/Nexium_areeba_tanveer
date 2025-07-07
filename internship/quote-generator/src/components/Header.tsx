"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const themes = [
  { name: 'light', label: 'Light' },
  { name: 'dark', label: 'Dark' }
];

export const Header: React.FC = () => {
  const { currentTheme, changeTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleThemeChange = (theme: string) => {
    changeTheme(theme);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.theme-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto px-4 py-6"
    >
      <div className="flex items-center justify-between">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-center font-serif drop-shadow-lg text-base-content/90"
          whileHover={{ scale: 1.02 }}
        >
          ✨ Quote Generator
        </motion.h1>
        
        <div className="relative theme-dropdown">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="btn btn-circle btn-ghost"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Change theme"
          >
            <Palette className="w-5 h-5" />
          </motion.button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto bg-base-100 rounded-lg shadow-xl border border-base-300 z-50"
              >
                <div className="p-2">
                  <div className="text-sm font-semibold text-base-content/70 px-3 py-2 border-b border-base-300">
                    Choose Theme
                  </div>
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => handleThemeChange(theme.name)}
                        className={`w-full text-left px-3 py-2 rounded-md hover:bg-base-200 transition-colors ${
                          currentTheme === theme.name ? 'bg-primary text-primary-content' : ''
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}; 