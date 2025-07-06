"use client";
import React, { useEffect, useState, useCallback } from "react";
import { QuoteCard } from "../components/QuoteCard";
import { Header } from "../components/Header";
import { FavoritesModal } from "../components/FavoritesModal";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import { Star, StarOff, Heart } from 'lucide-react';
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
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

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

  // Check for shared quote in URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedQuote = urlParams.get('quote');
    const sharedAuthor = urlParams.get('author');
    
    if (sharedQuote && sharedAuthor) {
      setQuote({
        content: decodeURIComponent(sharedQuote),
        author: decodeURIComponent(sharedAuthor),
        tags: [],
      });
      setQuoteKey((k) => k + 1);
      // Clear URL parameters after loading
      window.history.replaceState({}, document.title, window.location.pathname);
      toast.success("Shared quote loaded!");
    } else {
      fetchQuote();
    }
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

  const isFavorite = quote && favorites.some(q => q.content === quote.content && q.author === quote.author);
  
  const toggleFavorite = () => {
    if (!quote) return;
    setFavorites((prev) => {
      if (prev.some(q => q.content === quote.content && q.author === quote.author)) {
        toast.success("Quote removed from favorites!");
        return prev.filter(q => !(q.content === quote.content && q.author === quote.author));
      } else {
        toast.success("Quote added to favorites! ⭐");
        return [quote, ...prev];
      }
    });
  };

  const removeFavorite = (quoteToRemove: Quote) => {
    setFavorites(prev => prev.filter(q => !(q.content === quoteToRemove.content && q.author === quoteToRemove.author)));
    toast.success("Quote removed from favorites!");
  };

  const handleCopy = () => {
    if (quote) {
      navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
      toast.success("📋 Quote copied to clipboard!", {
        description: "You can now paste it anywhere you want!"
      });
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
      toast.success("🚀 Opening Twitter to share quote!");
    }
  };

  const handleShareLink = () => {
    if (!quote) return;
    const shareUrl = `${window.location.origin}?quote=${encodeURIComponent(quote.content)}&author=${encodeURIComponent(quote.author)}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("🔗 Shareable link copied!", {
      description: "Share this link with friends to show them this quote!"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-base-200 via-base-100 to-base-300 transition-all duration-500">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-2xl">
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
              onShareLink={handleShareLink}
              onNewQuote={fetchQuote}
            />
          </AnimatePresence>
          
          {/* Favorite Star Button */}
          <motion.button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 z-10 bg-base-100/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-base-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff className="w-6 h-6 text-base-content/60" />
            )}
          </motion.button>
        </div>

        {/* Favorites Button */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <button
              onClick={() => setIsFavoritesModalOpen(true)}
              className="btn btn-primary gap-2"
            >
              <Heart className="w-5 h-5" />
              View Favorites ({favorites.length})
            </button>
          </motion.div>
        )}
      </main>

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
      />
    </div>
  );
}
