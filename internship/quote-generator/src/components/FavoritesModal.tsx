"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Trash2, Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface Quote {
  content: string;
  author: string;
  tags?: string[];
}

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Quote[];
  onRemoveFavorite: (quote: Quote) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
}) => {
  const handleCopy = (quote: Quote) => {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
    toast.success("📋 Quote copied to clipboard!", {
      description: "You can now paste it anywhere you want!"
    });
  };

  const handleShare = (quote: Quote) => {
    const text = `"${quote.content}" — ${quote.author}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(twitterUrl, "_blank");
      toast.success("🚀 Opening Twitter to share quote!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 z-50 flex items-center justify-center"
          >
            <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-base-300">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-base-300 bg-base-200">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  Favorite Quotes
                </h2>
                <button
                  onClick={onClose}
                  className="btn btn-circle btn-ghost btn-sm"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh] bg-base-100">
                {favorites.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="w-16 h-16 text-base-300 mx-auto mb-4" />
                    <p className="text-lg text-base-content/60">No favorite quotes yet</p>
                    <p className="text-sm text-base-content/40">Start adding quotes to your favorites!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {favorites.map((quote, index) => (
                        <motion.div
                          key={`${quote.content}-${quote.author}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-base-200 rounded-xl p-4 border border-base-300"
                        >
                          <blockquote className="text-lg font-serif mb-2 text-primary-content">
                            &ldquo;{quote.content}&rdquo;
                          </blockquote>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-secondary font-medium">
                              — {quote.author}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleCopy(quote)}
                                className="btn btn-ghost btn-sm"
                                aria-label="Copy quote"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleShare(quote)}
                                className="btn btn-ghost btn-sm"
                                aria-label="Share quote"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onRemoveFavorite(quote)}
                                className="btn btn-ghost btn-sm text-error hover:text-error"
                                aria-label="Remove from favorites"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-base-300 bg-base-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">
                    {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={onClose}
                    className="btn btn-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 