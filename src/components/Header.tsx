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
    <header className="w-full bg-slate-900 border-b border-slate-800 px-3 py-2 text-slate-100 flex items-center justify-between shadow-sm shrink-0 z-20">
      {/* Brand / Logo Title */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onRestart}
          className="group px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-slate-200 flex items-center space-x-1.5"
          title="Restart Game"
        >
          <span className="font-arabic font-bold text-base text-amber-300 leading-none">تمام</span>
          <span className="text-xs font-semibold text-slate-300">Tamaam</span>
          <RefreshCw className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-300" />
        </button>
      </div>

      {/* Center Stats: Timer & Matched Count */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* TIMER DISPLAY */}
        <div className="flex items-center space-x-2 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 transform -rotate-90">
              <circle
                cx="10"
                cy="10"
                r="7.5"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="10"
                cy="10"
                r="7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={47.1}
                strokeDashoffset={47.1 - (47.1 * timePercentage) / 100}
                strokeLinecap="round"
                className={`transition-all duration-300 ${
                  isLowTime ? 'text-rose-500 animate-pulse' : 'text-indigo-400'
                }`}
                fill="transparent"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold leading-none">
              Time
            </span>
            <span
              className={`font-mono text-xs font-bold leading-none mt-0.5 ${
                isLowTime ? 'text-rose-400' : 'text-slate-200'
              }`}
            >
              {isZen ? '∞' : `${stats.timeRemaining}s`}
            </span>
          </div>
        </div>

        {/* PAIRS MATCHED DISPLAY */}
        <div className="flex items-center space-x-2 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold leading-none">
              Matched
            </span>
            <span className="font-mono text-xs font-bold text-slate-200 leading-none mt-0.5">
              {stats.pairsMatched} / {stats.totalPairs}
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-1">
        <button
          onClick={onToggleMute}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-slate-300" />}
        </button>

        {!isZen && (
          <button
            onClick={onTogglePause}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-indigo-400" /> : <Pause className="w-3.5 h-3.5 text-slate-300" />}
          </button>
        )}
      </div>
    </header>
  );
};
