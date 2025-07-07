'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';

const QUOTES = [
  { topic: 'life', content: 'Life is what happens when you are busy making other plans.', author: 'John Lennon' },
  { topic: 'life', content: 'The purpose of our lives is to be happy.', author: 'Dalai Lama' },
  { topic: 'life', content: 'Get busy living or get busy dying.', author: 'Stephen King' },
  { topic: 'success', content: 'Success is not the key to happiness. Happiness is the key to success.', author: 'Albert Schweitzer' },
  { topic: 'success', content: 'Success usually comes to those who are too busy to be looking for it.', author: 'Henry David Thoreau' },
  { topic: 'success', content: 'Dont be afraid to give up the good to go for the great.', author: 'John D. Rockefeller' },
  { topic: 'love', content: 'Love all, trust a few, do wrong to none.', author: 'William Shakespeare' },
  { topic: 'love', content: 'We accept the love we think we deserve.', author: 'Stephen Chbosky' },
  { topic: 'love', content: 'To love and be loved is to feel the sun from both sides.', author: 'David Viscott' },
  { topic: 'motivation', content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { topic: 'motivation', content: 'The harder you work for something, the greater you\'ll feel when you achieve it.', author: 'Unknown' },
  { topic: 'motivation', content: 'Push yourself, because no one else is going to do it for you.', author: 'Unknown' },
  { topic: 'friendship', content: 'Friendship is the only cement that will ever hold the world together.', author: 'Woodrow Wilson' },
  { topic: 'friendship', content: 'A real friend is one who walks in when the rest of the world walks out.', author: 'Walter Winchell' },
  { topic: 'friendship', content: 'Friendship doubles your joys and divides your sorrows.', author: 'Euripides' },
  { topic: 'wisdom', content: 'Knowing yourself is the beginning of all wisdom.', author: 'Aristotle' },
  { topic: 'wisdom', content: 'Turn your wounds into wisdom.', author: 'Oprah Winfrey' },
  { topic: 'wisdom', content: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates' },
  { topic: 'creativity', content: 'Creativity is intelligence having fun.', author: 'Albert Einstein' },
  { topic: 'creativity', content: 'You can not use up creativity. The more you use, the more you have.', author: 'Maya Angelou' },
  { topic: 'creativity', content: 'Creativity takes courage.', author: 'Henri Matisse' },
  { topic: 'perseverance', content: 'Perseverance is not a long race; it is many short races one after the other.', author: 'Walter Elliot' },
  { topic: 'perseverance', content: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
  { topic: 'perseverance', content: 'Through perseverance many people win success out of what seemed destined to be certain failure.', author: 'Benjamin Disraeli' },
  { topic: 'sad', content: 'Tears come from the heart and not from the brain.', author: 'Leonardo da Vinci' },
  { topic: 'sad', content: 'Every human walks around with a certain kind of sadness. They may not wear it on their sleeves, but it\'s there if you look deep.', author: 'Taraji P. Henson' },
  { topic: 'sad', content: 'The word "happy" would lose its meaning if it were not balanced by sadness.', author: 'Carl Jung' }
];

export const TopicQuoteForm: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState<{ content: string; author: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = QUOTES.filter(q => q.topic.toLowerCase() === topic.trim().toLowerCase()).slice(0, 3);
    setResults(filtered);
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md border border-neutral-300 dark:border-neutral-700 rounded-2xl p-8 bg-neutral-100 dark:bg-neutral-800 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 font-sans text-neutral-900 dark:text-neutral-100 tracking-tight">
          Quote Generator
        </h1>
        <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8 text-base font-normal">
          Enter a topic to find relevant quotes.
        </p>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <label htmlFor="topic" className="font-medium text-neutral-700 dark:text-neutral-200 text-base">Topic (e.g., life, success, love):</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="input input-bordered w-full text-base px-4 py-2 rounded-md focus:ring-2 focus:ring-neutral-400 focus:outline-none bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            placeholder="Type a topic..."
            required
          />
          <Button type="submit" className="btn btn-primary w-full text-base py-2 rounded-md shadow-sm mt-2">Show Quotes</Button>
        </form>
        {submitted && (
          <div className="mt-8 w-full">
            {results.length > 0 ? (
              <ul className="space-y-5">
                {results.map((q, i) => (
                  <li key={i} className="p-5 bg-transparent rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <blockquote className="text-lg md:text-xl font-serif mb-2 text-neutral-800 dark:text-neutral-100 text-center leading-snug">&ldquo;{q.content}&rdquo;</blockquote>
                    <div className="text-right text-sm text-neutral-500 dark:text-neutral-400 font-medium">— {q.author}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-error mt-4 text-center text-base font-semibold">No quotes found for this topic.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
