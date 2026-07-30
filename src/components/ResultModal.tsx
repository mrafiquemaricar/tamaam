import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, RotateCcw, Home, Sparkles, BookOpen } from 'lucide-react';
import { GameStats, GameMode, CardItem, ThemeMode } from '../types/game';
import { WORD_BANK } from '../data/wordBank';

interface ResultModalProps {
  stats: GameStats;
  mode: GameMode;
  cards: CardItem[];
  theme: ThemeMode;
  onPlayAgain: () => void;
  onChangeMode: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  stats,
  mode,
  cards,
  theme,
  onPlayAgain,
  onChangeMode,
}) => {
  const isLight = theme === 'light';
  const isWon = stats.pairsMatched === stats.totalPairs;

  useEffect(() => {
    if (isWon) {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899']
        });
      } catch (e) {
        // Fallback
      }
    }
  }, [isWon]);

  // Extract unique pairs featured in this game session
  const featuredPairIds = Array.from(new Set(cards.map((c) => c.pairId)));
  const featuredPairs = WORD_BANK.filter((p) => featuredPairIds.includes(p.id));

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in select-none ${
        isLight ? 'bg-slate-900/40' : 'bg-slate-950/80'
      }`}
    >
      <div
        className={`w-full max-w-md border rounded-2xl p-5 shadow-xl flex flex-col max-h-[90vh] overflow-hidden ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
      >
        {/* Header Icon & Title */}
        <div
          className={`flex flex-col items-center text-center space-y-2 pb-3 border-b ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
              isWon
                ? isLight
                  ? 'bg-amber-100 border-amber-300 text-amber-800'
                  : 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                : isLight
                ? 'bg-slate-100 border-slate-300 text-slate-500'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {isWon ? (
              <Trophy className={`w-6 h-6 ${isLight ? 'text-amber-700' : 'text-amber-300'}`} />
            ) : (
              <Clock className="w-6 h-6" />
            )}
          </div>

          <h2
            className={`text-xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-slate-100'
            }`}
          >
            {isWon ? 'MashaAllah! Complete!' : "Time's Up!"}
          </h2>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            {isWon
              ? 'You matched all 12 pairs successfully!'
              : `Matched ${stats.pairsMatched} of 12 pairs before time ran out.`}
          </p>
        </div>

        {/* Score & Stats Grid */}
        <div className="grid grid-cols-3 gap-2 my-3">
          <div
            className={`p-2.5 rounded-xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <span className="block text-[9px] uppercase font-bold text-slate-400">Pairs</span>
            <span className="font-mono text-base font-extrabold text-indigo-600">
              {stats.pairsMatched}/{stats.totalPairs}
            </span>
          </div>

          <div
            className={`p-2.5 rounded-xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <span className="block text-[9px] uppercase font-bold text-slate-400">Accuracy</span>
            <span className="font-mono text-base font-extrabold text-emerald-600">
              {stats.accuracy}%
            </span>
          </div>

          <div
            className={`p-2.5 rounded-xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <span className="block text-[9px] uppercase font-bold text-slate-400">Score</span>
            <span
              className={`font-mono text-base font-extrabold ${
                isLight ? 'text-amber-700' : 'text-amber-300'
              }`}
            >
              {stats.score}
            </span>
          </div>
        </div>

        {/* Time Remaining Bonus Info */}
        {isWon && mode !== 'zen' && (
          <div
            className={`border rounded-xl p-2.5 mb-2 flex items-center justify-between text-xs ${
              isLight
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center space-x-1.5 font-medium">
              <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-amber-600' : 'text-amber-300'}`} />
              <span>Time Bonus ({stats.timeRemaining}s left)</span>
            </span>
            <span className="font-mono font-bold text-indigo-600">+{stats.timeRemaining * 10} pts</span>
          </div>
        )}

        {/* Interactive Round Vocabulary Review List */}
        {featuredPairs.length > 0 && (
          <div
            className={`flex-1 min-h-0 flex flex-col my-1 rounded-xl border p-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                <BookOpen className="w-3 h-3 text-indigo-600" />
                <span>Round Words ({featuredPairs.length})</span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {featuredPairs.map((pair) => (
                <div
                  key={pair.id}
                  className={`p-2 rounded-lg border flex items-center justify-between ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900'
                      : 'bg-slate-900 border-slate-800 text-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      dir="rtl"
                      className={`font-arabic text-sm font-bold ${
                        isLight ? 'text-amber-800' : 'text-amber-300'
                      }`}
                    >
                      {pair.arabic}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">({pair.transliteration})</span>
                  </div>
                  <span className="font-medium text-right">{pair.english}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div
          className={`grid grid-cols-2 gap-2 mt-3 pt-3 border-t ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <button
            onClick={onChangeMode}
            className={`py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Menu</span>
          </button>

          <button
            onClick={onPlayAgain}
            className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs flex items-center justify-center space-x-1.5 transition-colors border border-indigo-600"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
