import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuoteCardProps {
  quote: string;
  author: string;
  tag?: string;
  loading?: boolean;
  error?: string;
  onCopy: () => void;
  onShare: () => void;
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
  onNewQuote,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-xl"
    >
      <Card className="backdrop-blur-lg bg-white/60 dark:bg-black/40 border border-white/30 dark:border-black/30 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center gap-4">
          {loading ? (
            <div className="w-full h-24 rounded-lg bg-base-300 animate-pulse" />
          ) : error ? (
            <div className="text-error text-center font-semibold">{error}</div>
          ) : (
            <>
              <blockquote className="text-2xl md:text-3xl font-serif font-semibold text-center text-base-content drop-shadow-sm select-text">
                “{quote}”
              </blockquote>
              <div className="mt-4 text-right w-full text-base font-medium text-base-content/80 font-sans">— {author || 'Unknown'}</div>
              {tag && <div className="badge badge-primary badge-outline mt-2">{tag}</div>}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-2 p-4">
          <motion.div whileHover={{ scale: 1.08, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}>
            <Button onClick={onNewQuote} variant="primary" className="gap-2 transition-transform">
              <RefreshCw size={18} /> New Quote
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}>
            <Button onClick={onCopy} variant="secondary" className="gap-2 transition-transform">
              <Copy size={18} /> Copy
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}>
            <Button onClick={onShare} variant="accent" className="gap-2 transition-transform">
              <Share2 size={18} /> Share
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}; 