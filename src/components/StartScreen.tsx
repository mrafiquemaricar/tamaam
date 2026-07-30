import React from 'react';
import { Play, BookOpen, Clock, Zap, Infinity as InfinityIcon, Image, BookText, Layers } from 'lucide-react';
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
      icon: <Clock className="w-4 h-4 text-slate-300" />,
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
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'zen',
      label: 'Zen Mode',
      desc: 'Untimed Practice',
      icon: <InfinityIcon className="w-4 h-4 text-indigo-400" />,
    },
  ];

  const contentOptions: { id: CardContentType; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'quran_vocab',
      label: 'Quran Vocab',
      desc: 'Arabic ↔ English',
      icon: <BookText className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'visual_symbols',
      label: 'Visual Icons',
      desc: 'Images Only Deck',
      icon: <Image className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 'hybrid',
      label: 'Hybrid Deck',
      desc: 'Image ↔ Word',
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 bg-flat-app text-slate-100 overflow-y-auto z-10 select-none">
      {/* Top Banner / Logo */}
      <div className="flex flex-col items-center text-center mt-2 sm:mt-6 space-y-1.5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-sm">
          <span className="font-arabic text-2xl sm:text-3xl font-bold text-amber-300">
            تمام
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 mt-1">
          Tamaam
        </h1>
        <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed">
          Quranic Vocabulary & Visual Memory Match
        </p>
      </div>

      {/* 1. DECK CONTENT TYPE SELECTION */}
      <div className="w-full max-w-sm my-2 space-y-2">
        <label className="block text-center text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">
          1. Select Card Content Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {contentOptions.map((opt) => {
            const isSelected = selectedContentType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectContentType(opt.id)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all text-center ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400'
                }`}
              >
                {opt.icon}
                <span className="text-xs font-bold leading-none">{opt.label}</span>
                <span className="text-[9px] opacity-75 leading-none">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TIMER MODE SELECTION */}
      <div className="w-full max-w-sm my-2 space-y-2">
        <label className="block text-center text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">
          2. Select Game Timer
        </label>
        <div className="grid grid-cols-2 gap-2">
          {modeOptions.map((opt) => {
            const isSelected = selectedMode === opt.id;
            return (
              <button
                key={String(opt.id)}
                onClick={() => onSelectMode(opt.id)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400'
                }`}
              >
                {opt.icon}
                <span className="text-xs font-bold leading-none">{opt.label}</span>
                <span className="text-[9px] opacity-75 leading-none">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Bar */}
      {stats.gamesPlayed > 0 && (
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex items-center justify-around text-center my-1">
          <div>
            <span className="block text-[9px] uppercase text-slate-500 font-bold">High Score</span>
            <span className="font-mono text-sm font-bold text-amber-300">{stats.highScore}</span>
          </div>
          <div className="w-px h-5 bg-slate-800" />
          <div>
            <span className="block text-[9px] uppercase text-slate-500 font-bold">Played</span>
            <span className="font-mono text-sm font-bold text-slate-300">{stats.gamesPlayed}</span>
          </div>
          <div className="w-px h-5 bg-slate-800" />
          <div>
            <span className="block text-[9px] uppercase text-slate-500 font-bold">Matched</span>
            <span className="font-mono text-sm font-bold text-indigo-400">{stats.totalMatchedPairs}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-2 mb-2 sm:mb-4">
        <button
          onClick={onStartGame}
          className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-base border border-indigo-400 flex items-center justify-center space-x-2 transition-colors"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Game</span>
        </button>

        <button
          onClick={onOpenWordBank}
          className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs flex items-center justify-center space-x-2 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>Browse Quran Dictionary ({WORD_BANK.length} Terms)</span>
        </button>
      </div>
    </div>
  );
};
