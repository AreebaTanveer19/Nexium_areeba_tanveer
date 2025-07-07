import React, { useEffect, useState } from 'react';

import { Copy, Share2, RefreshCw, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuoteCardProps {
  quote: string;
  author: string;
  tag?: string;
  loading?: boolean;
  error?: string;
  onCopy: () => void;
  onShare: () => void;
  onShareLink: () => void;
  onNewQuote: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  tag,
  loading,
  error,
  onCopy,
  onShare,
  onShareLink,
  onNewQuote,
}) => {
  const [quoteColor, setQuoteColor] = useState('#000');

  useEffect(() => {
    const updateColor = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setQuoteColor(theme === 'dark' ? '#fff' : '#000');
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-2xl"
    >
      <div className="card bg-base-100 shadow-2xl rounded-3xl border border-base-300 overflow-hidden">
        <div className="card-body p-8 md:p-10 flex flex-col items-center gap-6">
          {loading ? (
            <div className="w-full space-y-4">
              <div className="h-8 bg-base-300 rounded-lg animate-pulse" />
              <div className="h-8 bg-base-300 rounded-lg animate-pulse w-3/4" />
              <div className="h-8 bg-base-300 rounded-lg animate-pulse w-1/2" />
            </div>
          ) : error ? (
            <div className="text-error text-center font-semibold text-lg">{error}</div>
          ) : (
            <>
              <motion.blockquote 
                className={`text-xl md:text-2xl lg:text-3xl font-serif font-medium text-center leading-relaxed select-text transition-colors duration-300`}
                style={{ color: quoteColor }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                &ldquo;{quote}&rdquo;
              </motion.blockquote>
              <motion.div 
                className="mt-6 text-right w-full text-base md:text-lg font-medium text-secondary font-sans"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                — {author || 'Unknown'}
              </motion.div>
              {tag && (
                <motion.div 
                  className="badge badge-primary badge-outline mt-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  {tag}
                </motion.div>
              )}
            </>
          )}
        </div>
        <div className="card-actions flex flex-col gap-3 p-6 bg-base-200 border-t border-base-300">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button 
              onClick={onNewQuote} 
              className="btn btn-primary w-full gap-2"
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> 
              New Quote
            </button>
          </motion.div>
          <div className="grid grid-cols-3 gap-2 w-full">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={onCopy} 
                className="btn btn-outline w-full gap-2"
                type="button"
              >
                <Copy size={16} /> Copy
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={onShare} 
                className="btn btn-outline w-full gap-2"
                type="button"
              >
                <Share2 size={16} /> Share
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={onShareLink} 
                className="btn btn-outline w-full gap-2"
                type="button"
              >
                <LinkIcon size={16} /> Link
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 