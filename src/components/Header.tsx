import React from 'react';
import { Volume2, VolumeX, Pause, Play, RefreshCw, Trophy, Sun, Moon } from 'lucide-react';
import { GameStats, GameMode, ThemeMode } from '../types/game';

interface HeaderProps {
  stats: GameStats;
  mode: GameMode;
  theme: ThemeMode;
  isPaused: boolean;
  isMuted: boolean;
  onToggleTheme: () => void;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onRestart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  mode,
  theme,
  isPaused,
  isMuted,
  onToggleTheme,
  onTogglePause,
  onToggleMute,
  onRestart,
}) => {
  const isLight = theme === 'light';
  const isZen = mode === 'zen';
  const timePercentage = isZen || stats.timeTotal === 0 ? 100 : (stats.timeRemaining / stats.timeTotal) * 100;
  const isLowTime = !isZen && stats.timeRemaining <= 10;

  return (
    <header
      className={`w-full px-3 py-2 border-b flex items-center justify-between shadow-xs shrink-0 z-20 transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}
    >
      {/* Brand / Logo Title */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onRestart}
          className={`group px-2.5 py-1 rounded-lg border transition-colors flex items-center space-x-1.5 ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
          }`}
          title="Restart Game"
        >
          <span className="font-arabic font-bold text-base text-amber-600 leading-none">تمام</span>
          <span className="text-xs font-bold text-slate-800">Tamaam</span>
          <RefreshCw className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-300" />
        </button>
      </div>

      {/* Center Stats: Timer & Matched Count */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* TIMER DISPLAY */}
        <div
          className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg border ${
            isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-slate-950 border-slate-800'
          }`}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 transform -rotate-90">
              <circle
                cx="10"
                cy="10"
                r="7.5"
                stroke="currentColor"
                strokeWidth="2"
                className={isLight ? 'text-slate-200' : 'text-slate-800'}
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
                  isLowTime ? 'text-rose-500 animate-pulse' : 'text-indigo-600'
                }`}
                fill="transparent"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span
              className={`text-[8px] uppercase tracking-wider font-extrabold leading-none ${
                isLight ? 'text-slate-400' : 'text-slate-400'
              }`}
            >
              Time
            </span>
            <span
              className={`font-mono text-xs font-bold leading-none mt-0.5 ${
                isLowTime
                  ? 'text-rose-500 font-black'
                  : isLight
                  ? 'text-slate-800'
                  : 'text-slate-200'
              }`}
            >
              {isZen ? '∞' : `${stats.timeRemaining}s`}
            </span>
          </div>
        </div>

        {/* PAIRS MATCHED DISPLAY */}
        <div
          className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg border ${
            isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-slate-950 border-slate-800'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-wider text-slate-400 font-extrabold leading-none">
              Matched
            </span>
            <span
              className={`font-mono text-xs font-bold leading-none mt-0.5 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              {stats.pairsMatched} / {stats.totalPairs}
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-1">
        {/* THEME TOGGLE (Sun / Moon) */}
        <button
          onClick={onToggleTheme}
          className={`p-1.5 rounded-lg border transition-colors ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-amber-600'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-indigo-300'
          }`}
          title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {isLight ? <Sun className="w-3.5 h-3.5 text-amber-600" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
        </button>

        <button
          onClick={onToggleMute}
          className={`p-1.5 rounded-lg border transition-colors ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
          }`}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {!isZen && (
          <button
            onClick={onTogglePause}
            className={`p-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-indigo-600" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </header>
  );
};
