import React from 'react';
import { Volume2, VolumeX, Pause, Play, RefreshCw, Trophy } from 'lucide-react';
import { GameStats, GameMode } from '../types/game';

interface HeaderProps {
  stats: GameStats;
  mode: GameMode;
  isPaused: boolean;
  isMuted: boolean;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onRestart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  mode,
  isPaused,
  isMuted,
  onTogglePause,
  onToggleMute,
  onRestart,
}) => {
  const isZen = mode === 'zen';
  const timePercentage = isZen || stats.timeTotal === 0 ? 100 : (stats.timeRemaining / stats.timeTotal) * 100;
  const isLowTime = !isZen && stats.timeRemaining <= 10;

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-amber-500/30 px-3 py-2 text-slate-100 flex items-center justify-between shadow-lg shrink-0 z-20">
      {/* Brand / Logo Title */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onRestart}
          className="group p-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-700/50 transition-colors text-amber-400 flex items-center space-x-1.5"
          title="Restart Game"
        >
          <span className="font-arabic font-bold text-lg text-amber-400 leading-none">تمام</span>
          <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
        </button>
      </div>

      {/* Center Stats: Timer & Matched Count */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* TIMER DISPLAY */}
        <div className="flex items-center space-x-2 bg-slate-950/70 px-3 py-1 rounded-full border border-slate-800">
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Circular Progress SVG */}
            <svg className="w-6 h-6 transform -rotate-90">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={56.5}
                strokeDashoffset={56.5 - (56.5 * timePercentage) / 100}
                strokeLinecap="round"
                className={`transition-all duration-300 ${
                  isLowTime ? 'text-rose-500 animate-pulse' : 'text-amber-400'
                }`}
                fill="transparent"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
              Time
            </span>
            <span
              className={`font-mono text-sm font-bold leading-none ${
                isLowTime ? 'text-rose-400 font-black scale-110 transition-transform' : 'text-slate-100'
              }`}
            >
              {isZen ? '∞' : `${stats.timeRemaining}s`}
            </span>
          </div>
        </div>

        {/* PAIRS MATCHED DISPLAY */}
        <div className="flex items-center space-x-2 bg-slate-950/70 px-3 py-1 rounded-full border border-slate-800">
          <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
              Matched
            </span>
            <span className="font-mono text-sm font-bold text-amber-300 leading-none">
              {stats.pairsMatched} / {stats.totalPairs}
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons (Pause, Sound) */}
      <div className="flex items-center space-x-1.5">
        <button
          onClick={onToggleMute}
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-amber-300 transition-colors"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {!isZen && (
          <button
            onClick={onTogglePause}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-amber-300 transition-colors"
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play className="w-4 h-4 text-amber-400" /> : <Pause className="w-4 h-4 text-slate-300" />}
          </button>
        )}
      </div>
    </header>
  );
};
