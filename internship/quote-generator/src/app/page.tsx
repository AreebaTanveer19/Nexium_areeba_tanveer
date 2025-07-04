"use client";
import React, { useEffect, useState, useCallback } from "react";
import { QuoteCard } from "../components/QuoteCard";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import { Star, StarOff } from 'lucide-react';
import { motion } from "framer-motion";

interface Quote {
  content: string;
  author: string;
  tags?: string[];
}

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quoteKey, setQuoteKey] = useState(0); // for animation
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<Quote[]>([]);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/quote");
      if (!res.ok) throw new Error("Failed to fetch quote");
      const data = await res.json();
      setQuote({
        content: data[0].q,
        author: data[0].a,
        tags: [], // ZenQuotes does not provide tags
      });
      setQuoteKey((k) => k + 1); // trigger animation
    } catch (err) {
      setError("Could not fetch a quote. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  // Load favorites from localStorage
  useEffect(() => {
    const favs = localStorage.getItem('favoriteQuotes');
    if (favs) setFavorites(JSON.parse(favs));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  }, [favorites]);

  // Add to recent quotes (max 5, skip duplicates)
  useEffect(() => {
    if (quote && !loading && !error) {
      setRecentQuotes((prev) => {
        if (prev.find(q => q.content === quote.content && q.author === quote.author)) return prev;
        const updated = [quote, ...prev].slice(0, 5);
        return updated;
      });
    }
  }, [quote, loading, error]);

  const isFavorite = quote && favorites.some(q => q.content === quote.content && q.author === quote.author);
  const toggleFavorite = () => {
    if (!quote) return;
    setFavorites((prev) => {
      if (prev.some(q => q.content === quote.content && q.author === quote.author)) {
        return prev.filter(q => !(q.content === quote.content && q.author === quote.author));
      } else {
        return [quote, ...prev];
      }
    });
  };

  const handleCopy = () => {
    if (quote) {
      navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
      toast.success("Quote copied to clipboard!");
    }
  };

  const handleShare = () => {
    if (!quote) return;
    const text = `"${quote.content}" — ${quote.author}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(twitterUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-[#181c2b] dark:via-[#232946] dark:to-[#1e2a23] transition-colors duration-500">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-serif drop-shadow-lg text-base-content/90">Inspirational Quote Generator</h1>
      <div className="relative">
        <AnimatePresence mode="wait">
          <QuoteCard
            key={quoteKey}
            quote={quote?.content || ""}
            author={quote?.author || ""}
            tag={quote?.tags?.[0]}
            loading={loading}
            error={error || undefined}
            onCopy={handleCopy}
            onShare={handleShare}
            onNewQuote={fetchQuote}
          />
        </AnimatePresence>
        {/* Favorite Star Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-10 bg-white/70 dark:bg-black/40 rounded-full p-2 shadow-md hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <Star className="text-yellow-400 fill-yellow-400" /> : <StarOff className="text-gray-400" />}
        </button>
      </div>
      {/* Recent Quotes */}
      {recentQuotes.length > 1 && (
        <div className="mt-10 w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-2 text-base-content/80">Recent Quotes</h2>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {recentQuotes.slice(1).map((q, i) => (
                <motion.div
                  key={q.content + q.author}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl bg-white/50 dark:bg-black/30 backdrop-blur p-4 shadow flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  <span className="font-serif text-base md:text-lg text-base-content/90">“{q.content}”</span>
                  <span className="text-sm text-base-content/60 text-right md:text-left">— {q.author}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      {/* Favorite Quotes */}
      {favorites.length > 0 && (
        <div className="mt-10 w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-2 text-base-content/80">Favorite Quotes</h2>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {favorites.map((q, i) => (
                <motion.div
                  key={q.content + q.author}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl bg-yellow-100/60 dark:bg-yellow-900/30 backdrop-blur p-4 shadow flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  <span className="font-serif text-base md:text-lg text-base-content/90">“{q.content}”</span>
                  <span className="text-sm text-base-content/60 text-right md:text-left">— {q.author}</span>
                  <button
                    onClick={() => setFavorites(favs => favs.filter(f => !(f.content === q.content && f.author === q.author)))}
                    className="ml-2 text-yellow-500 hover:text-yellow-700 transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <StarOff />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      {/* Theme Toggle */}
      {/* <div className="mt-8 flex justify-center">
        <label className="swap swap-rotate cursor-pointer">
          <input type="checkbox" className="theme-controller" value="dark" />
          <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64 17.66a9 9 0 0012.02-12.02 9 9 0 11-12.02 12.02z"/></svg>
          <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64 13.66A9 9 0 1110.34 2.36a7 7 0 0011.3 11.3z"/></svg>
        </label>
      </div> */}
    </div>
  );
}
