import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 py-6 mt-auto"
    >
      <div className="text-center text-base-content/60">
        <p className="flex items-center justify-center gap-2 mb-2 text-primary">
          Made with <Heart className="w-4 h-4 text-error fill-error" /> by Quote Generator
        </p>
        <p className="text-sm">
          Quotes powered by{' '}
          <a 
            href="https://zenquotes.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link link-primary inline-flex items-center gap-1 hover:underline"
          >
            ZenQuotes API <ExternalLink className="w-3 h-3" />
          </a>
        </p>
        <p className="text-xs mt-2 opacity-70 text-secondary">
          Built with Next.js, Tailwind CSS, DaisyUI & Framer Motion
        </p>
      </div>
    </motion.footer>
  );
}; 