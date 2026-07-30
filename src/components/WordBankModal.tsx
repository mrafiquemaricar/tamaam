import React, { useState } from 'react';
import { X, Search, Volume2, BookOpen } from 'lucide-react';
import { WORD_BANK } from '../data/wordBank';
import { CategoryType, ThemeMode } from '../types/game';
import { soundManager } from '../utils/sound';

interface WordBankModalProps {
  theme: ThemeMode;
  onClose: () => void;
}

export const WordBankModal: React.FC<WordBankModalProps> = ({ theme, onClose }) => {
  const isLight = theme === 'light';
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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-fade-in select-none ${
        isLight ? 'bg-slate-900/40' : 'bg-slate-950/80'
      }`}
    >
      <div
        className={`w-full max-w-lg border rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col h-[85vh] overflow-hidden ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between pb-3 border-b shrink-0 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-indigo-600'
                  : 'bg-slate-800 border-slate-700 text-indigo-400'
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2
                className={`text-base font-bold leading-none ${
                  isLight ? 'text-slate-900' : 'text-slate-100'
                }`}
              >
                Quranic Dictionary
              </h2>
              <span className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Authentic Vocabulary & Meanings
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative my-3 shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Arabic, English, or transliteration..."
            className={`w-full border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-600 ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                : 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500'
            }`}
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
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
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
            <div className="text-center py-10 text-slate-400 text-xs">
              No matching Quranic terms found.
            </div>
          ) : (
            filteredWords.map((pair) => (
              <div
                key={pair.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-950 border-slate-800/80'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={handlePlayWordSound}
                    className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-500 hover:text-indigo-600'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-indigo-300'
                    }`}
                    title="Audio Cue"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex flex-col">
                    <span
                      dir="rtl"
                      className={`font-arabic text-lg font-bold leading-tight ${
                        isLight ? 'text-amber-800' : 'text-amber-300'
                      }`}
                    >
                      {pair.arabic}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {pair.transliteration}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end text-right">
                  <span
                    className={`text-xs font-bold ${
                      isLight ? 'text-slate-900' : 'text-slate-100'
                    }`}
                  >
                    {pair.english}
                  </span>
                  {pair.surahReference && (
                    <span className="text-[10px] text-indigo-600 font-medium mt-0.5">
                      {pair.surahReference}
                    </span>
                  )}
                  <span
                    className={`text-[8px] uppercase tracking-wider font-bold mt-0.5 px-1.5 py-0.25 rounded border ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-500'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
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
