import React, { useState } from 'react';
import { X, Search, Volume2, BookOpen } from 'lucide-react';
import { WORD_BANK } from '../data/wordBank';
import { CategoryType } from '../types/game';
import { soundManager } from '../utils/sound';

interface WordBankModalProps {
  onClose: () => void;
}

export const WordBankModal: React.FC<WordBankModalProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: CategoryType | 'all'; label: string }[] = [
    { id: 'all', label: `All (${WORD_BANK.length})` },
    { id: 'noun', label: `Nouns (${WORD_BANK.filter(w => w.category === 'noun').length})` },
    { id: 'verb', label: `Verbs (${WORD_BANK.filter(w => w.category === 'verb').length})` },
    { id: 'particle', label: `Particles (${WORD_BANK.filter(w => w.category === 'particle').length})` },
    { id: 'prophet', label: `Prophets (${WORD_BANK.filter(w => w.category === 'prophet').length})` },
  ];

  const filteredWords = WORD_BANK.filter((pair) => {
    const matchesCategory = activeCategory === 'all' || pair.category === activeCategory;
    const matchesSearch =
      pair.arabic.includes(searchQuery) ||
      pair.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pair.transliteration && pair.transliteration.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePlayWordSound = () => {
    soundManager.playFlip();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl text-slate-100 flex flex-col h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 leading-none">Quranic Dictionary</h2>
              <span className="text-[10px] text-slate-400 font-medium">Authentic Vocabulary & Meanings</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative my-3 shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Arabic, English, or transliteration..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 shrink-0 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Word Cards List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 mt-2">
          {filteredWords.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No matching Quranic terms found.
            </div>
          ) : (
            filteredWords.map((pair) => (
              <div
                key={pair.id}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={handlePlayWordSound}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-300 transition-colors shrink-0"
                    title="Audio Cue"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex flex-col">
                    <span dir="rtl" className="font-arabic text-lg font-bold text-amber-300 leading-tight">
                      {pair.arabic}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {pair.transliteration}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end text-right">
                  <span className="text-xs font-bold text-slate-100">{pair.english}</span>
                  {pair.surahReference && (
                    <span className="text-[10px] text-indigo-400 font-medium mt-0.5">
                      {pair.surahReference}
                    </span>
                  )}
                  <span className="text-[8px] uppercase tracking-wider font-bold text-slate-500 mt-0.5 px-1.5 py-0.25 rounded bg-slate-900 border border-slate-800">
                    {pair.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
