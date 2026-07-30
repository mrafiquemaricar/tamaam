import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, CheckCircle2, RotateCcw, Home, Sparkles, BookOpen } from 'lucide-react';
import { GameStats, GameMode, CardItem } from '../types/game';
import { WORD_BANK } from '../data/wordBank';

interface ResultModalProps {
  stats: GameStats;
  mode: GameMode;
  cards: CardItem[];
  onPlayAgain: () => void;
  onChangeMode: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  stats,
  mode,
  cards,
  onPlayAgain,
  onChangeMode,
}) => {
  const isWon = stats.pairsMatched === stats.totalPairs;

  useEffect(() => {
    if (isWon) {
      // Trigger festive canvas confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#14b8a6', '#fbbf24']
        });
      } catch (e) {
        // Fallback if canvas-confetti fails
      }
    }
  }, [isWon]);

  // Extract unique pairs featured in this game session
  const featuredPairIds = Array.from(new Set(cards.map((c) => c.pairId)));
  const featuredPairs = WORD_BANK.filter((p) => featuredPairIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-5 shadow-2xl text-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center space-y-2 pb-3 border-b border-slate-800">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${
              isWon
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {isWon ? <Trophy className="w-8 h-8 animate-bounce" /> : <Clock className="w-8 h-8" />}
          </div>

          <h2 className="text-2xl font-black tracking-tight text-amber-200">
            {isWon ? 'MashaAllah! Complete!' : "Time's Up!"}
          </h2>
          <p className="text-xs text-slate-400">
            {isWon
              ? 'You successfully matched all 12 Quranic word pairs!'
              : `You matched ${stats.pairsMatched} of 12 pairs before time ran out.`}
          </p>
        </div>

        {/* Score & Stats Grid */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="block text-[10px] uppercase font-semibold text-slate-400">Pairs</span>
            <span className="font-mono text-lg font-extrabold text-emerald-400">
              {stats.pairsMatched}/{stats.totalPairs}
            </span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="block text-[10px] uppercase font-semibold text-slate-400">Accuracy</span>
            <span className="font-mono text-lg font-extrabold text-teal-400">
              {stats.accuracy}%
            </span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="block text-[10px] uppercase font-semibold text-slate-400">Score</span>
            <span className="font-mono text-lg font-extrabold text-amber-400">
              {stats.score}
            </span>
          </div>
        </div>

        {/* Time Remaining Bonus Info */}
        {isWon && mode !== 'zen' && (
          <div className="bg-emerald-950/70 border border-emerald-700/50 rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs text-emerald-200">
            <span className="flex items-center space-x-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Time Bonus ({stats.timeRemaining}s left)</span>
            </span>
            <span className="font-mono font-bold text-amber-300">+{stats.timeRemaining * 10} pts</span>
          </div>
        )}

        {/* Interactive Round Vocabulary Review List */}
        <div className="flex-1 min-h-0 flex flex-col my-1 bg-slate-950/60 rounded-xl border border-slate-800/80 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Words in this Round ({featuredPairs.length})</span>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs">
            {featuredPairs.map((pair) => (
              <div
                key={pair.id}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800/70 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <span dir="rtl" className="font-arabic text-base font-bold text-amber-300">
                    {pair.arabic}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">({pair.transliteration})</span>
                </div>
                <span className="text-slate-200 font-medium">{pair.english}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={onChangeMode}
            className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Change Mode</span>
          </button>

          <button
            onClick={onPlayAgain}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-sm shadow-md flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
