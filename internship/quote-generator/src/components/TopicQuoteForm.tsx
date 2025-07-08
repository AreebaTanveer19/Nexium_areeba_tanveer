'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ClipboardCopy } from 'lucide-react';

const QUOTES = [
  { topic: 'life', content: 'Life is what happens when you are busy making other plans.', author: 'John Lennon' },
  { topic: 'success', content: 'Success is not the key to happiness. Happiness is the key to success.', author: 'Albert Schweitzer' },
  { topic: 'love', content: 'We accept the love we think we deserve.', author: 'Stephen Chbosky' },
  { topic: 'motivation', content: 'Push yourself, because no one else is going to do it for you.', author: 'Unknown' },
  { topic: 'friendship', content: 'Friendship is the only cement that will ever hold the world together.', author: 'Woodrow Wilson' },
  { topic: 'wisdom', content: 'Knowing yourself is the beginning of all wisdom.', author: 'Aristotle' },
  { topic: 'creativity', content: 'Creativity is intelligence having fun.', author: 'Albert Einstein' },
  { topic: 'perseverance', content: 'Through perseverance many people win success out of what seemed destined to be certain failure.', author: 'Benjamin Disraeli' },
  { topic: 'kindness', content: 'Kindness is a language which the deaf can hear and the blind can see.', author: 'Mark Twain' },
  { topic: 'peace', content: 'Peace begins with a smile.', author: 'Mother Teresa' },
  { topic: 'happiness', content: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama' },
  { topic: 'growth', content: 'The only way to grow is to challenge yourself.', author: 'Ashley Tisdale' },
  { topic: 'courage', content: 'It takes courage to grow up and become who you really are.', author: 'E.E. Cummings' }
];

export default function QuoteGenerator() {
  const [topic, setTopic] = useState('');
  const [typedQuote, setTypedQuote] = useState('');
  const [currentQuote, setCurrentQuote] = useState<{ content: string; author: string } | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const topics = [...new Set(QUOTES.map(q => q.topic))];

  useEffect(() => {
    const lastTopic = localStorage.getItem('last_topic');
    if (lastTopic) {
      setTopic(lastTopic);
    }
  }, []);

  const handleTyping = (text: string) => {
    if (!text || text.length === 0) {
      setTypedQuote('');
      return;
    }
    setTypedQuote(text);
  };

  const handleSearch = () => {
    const filtered = QUOTES.filter(q => q.topic === topic.trim().toLowerCase());
    if (filtered.length === 0) {
      setCurrentQuote({ content: 'No quote found for this topic.', author: '' });
      setTypedQuote('');
      handleTyping('No quote found for this topic.');
      return;
    }
    const picked = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentQuote(picked);
    handleTyping(picked.content);
    localStorage.setItem('last_topic', topic);
  };

  const handleRandom = () => {
    const picked = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setCurrentQuote(picked);
    handleTyping(picked.content);
  };

  const handleCopy = () => {
    if (typedQuote) {
      navigator.clipboard.writeText(typedQuote);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleInputChange = (value: string) => {
    setTopic(value);
    const filtered = topics.filter(t => t.startsWith(value.toLowerCase()));
    setSuggestions(filtered.slice(0, 5));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-pink-100 via-purple-100 to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-6 md:p-10 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl backdrop-blur-md border border-white/30"
      >
        <div className="flex flex-col items-center gap-3">
          <Sparkles className="w-8 h-8 text-indigo-500 dark:text-indigo-300 animate-bounce" />
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white">Quote Generator</h1>
          <p className="text-center text-neutral-600 dark:text-neutral-300 text-sm">Choose a topic or try random</p>

          <select
            value={topic}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-4 py-2 rounded-md mt-3 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 text-black dark:text-white focus:ring-2 ring-indigo-400"
          >
            <option value="">Select a topic...</option>
            {topics.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
          </select>

          <div className="flex gap-2 w-full mt-4">
            <button onClick={handleSearch} className="w-full py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">Find Quote</button>
            <button onClick={handleRandom} className="w-full py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition">Random</button>
          </div>

          <AnimatePresence>
            {typedQuote && (
              <motion.div
                key={typedQuote}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-center relative"
              >
                <blockquote className="text-xl font-medium text-neutral-800 dark:text-white leading-snug">
                  “{typedQuote}”
                </blockquote>
                {currentQuote?.author && (
                  <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-300">— {currentQuote.author}</p>
                )}
                <button onClick={handleCopy} className="absolute top-0 right-0 text-indigo-500 dark:text-indigo-300 hover:text-indigo-700">
                  <ClipboardCopy size={20} />
                </button>
                {copied && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-xs mt-2 shadow">Copied!</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
