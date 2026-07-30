import React from 'react';
import { Play, Sparkles, BookOpen, Clock, Zap, Infinity as InfinityIcon, Image, BookText, Layers } from 'lucide-react';
import { GameMode, CardContentType } from '../types/game';
import { UserStats } from '../utils/storage';
import { WORD_BANK } from '../data/wordBank';

interface StartScreenProps {
  selectedMode: GameMode;
  selectedContentType: CardContentType;
  onSelectMode: (mode: GameMode) => void;
  onSelectContentType: (type: CardContentType) => void;
  onStartGame: () => void;
  onOpenWordBank: () => void;
  stats: UserStats;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  selectedMode,
  selectedContentType,
  onSelectMode,
  onSelectContentType,
  onStartGame,
  onOpenWordBank,
  stats,
}) => {
  const modeOptions: { id: GameMode; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 60,
      label: '60 Seconds',
      desc: 'Standard Challenge',
      icon: <Clock className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 90,
      label: '90 Seconds',
      desc: 'Relaxed Timer',
      icon: <Clock className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 45,
      label: '45 Seconds',
      desc: 'Speed Sprint',
      icon: <Zap className="w-4 h-4 text-orange-400" />,
    },
    {
      id: 'zen',
      label: 'Zen Mode',
      desc: 'Untimed Learning',
      icon: <InfinityIcon className="w-4 h-4 text-teal-400" />,
    },
  ];

  const contentOptions: { id: CardContentType; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'quran_vocab',
      label: 'Quran Vocab',
      desc: 'Arabic ↔ English Words',
      icon: <BookText className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'visual_symbols',
      label: 'Visual Symbols',
      desc: 'Images Only Deck',
      icon: <Image className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 'hybrid',
      label: 'Hybrid Deck',
      desc: 'Image Card ↔ Word Card',
      icon: <Layers className="w-4 h-4 text-teal-400" />,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-3 sm:p-6 bg-mesh-radial text-slate-100 overflow-y-auto z-10 select-none">
      {/* Top Banner / Logo */}
      <div className="flex flex-col items-center text-center mt-1 sm:mt-4 space-y-1 sm:space-y-2">
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-950 border-2 border-amber-400/80 shadow-2xl flex items-center justify-center relative">
          <span className="font-arabic text-2xl sm:text-4xl font-bold text-amber-300 drop-shadow-md">
            تمام
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1.5 -right-1.5 animate-pulse" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 mt-1">
          Tamaam
        </h1>
        <p className="text-[11px] sm:text-xs text-emerald-200/90 font-medium max-w-xs leading-relaxed">
          Quranic Vocabulary & Image Matching
        </p>
      </div>

      {/* 1. DECK CONTENT TYPE SELECTION */}
      <div className="w-full max-w-sm my-2 space-y-2">
        <label className="block text-center text-[10px] uppercase tracking-wider text-amber-300/90 font-extrabold">
          1. Select Card Content Type
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {contentOptions.map((opt) => {
            const isSelected = selectedContentType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectContentType(opt.id)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all duration-200 active:scale-95 text-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-emerald-900/90 to-emerald-950 border-amber-400 shadow-md text-amber-200 ring-2 ring-amber-400/40'
                    : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                }`}
              >
                {opt.icon}
                <span className="text-xs font-bold leading-none">{opt.label}</span>
                <span className="text-[9px] text-slate-400 leading-none">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TIMER MODE SELECTION */}
      <div className="w-full max-w-sm my-2 space-y-2">
        <label className="block text-center text-[10px] uppercase tracking-wider text-amber-300/90 font-extrabold">
          2. Select Game Timer
        </label>
        <div className="grid grid-cols-2 gap-2">
          {modeOptions.map((opt) => {
            const isSelected = selectedMode === opt.id;
            return (
              <button
                key={String(opt.id)}
                onClick={() => onSelectMode(opt.id)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-b from-emerald-900/90 to-emerald-950 border-amber-400 shadow-md text-amber-200 ring-2 ring-amber-400/40'
                    : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                }`}
              >
                {opt.icon}
                <span className="text-xs font-bold leading-none">{opt.label}</span>
                <span className="text-[9px] text-slate-400 leading-none">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Bar */}
      {stats.gamesPlayed > 0 && (
        <div className="w-full max-w-sm bg-slate-900/80 border border-emerald-900/60 rounded-xl p-2.5 flex items-center justify-around text-center my-1">
          <div>
            <span className="block text-[9px] uppercase text-slate-400 font-semibold">High Score</span>
            <span className="font-mono text-sm font-bold text-amber-400">{stats.highScore}</span>
          </div>
          <div className="w-px h-5 bg-slate-800" />
          <div>
            <span className="block text-[9px] uppercase text-slate-400 font-semibold">Played</span>
            <span className="font-mono text-sm font-bold text-emerald-400">{stats.gamesPlayed}</span>
          </div>
          <div className="w-px h-5 bg-slate-800" />
          <div>
            <span className="block text-[9px] uppercase text-slate-400 font-semibold">Matched</span>
            <span className="font-mono text-sm font-bold text-teal-400">{stats.totalMatchedPairs}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-2 mb-2 sm:mb-4">
        <button
          onClick={onStartGame}
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-base sm:text-lg shadow-xl shadow-amber-500/20 border border-amber-300 flex items-center justify-center space-x-2 transition-transform active:scale-98"
        >
          <Play className="w-5 h-5 fill-emerald-950" />
          <span>Start Playing</span>
        </button>

        <button
          onClick={onOpenWordBank}
          className="w-full py-2 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-700/50 text-emerald-300 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Browse Quran Dictionary ({WORD_BANK.length} Terms)</span>
        </button>
      </div>
    </div>
  );
};
