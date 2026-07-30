import React from 'react';
import { CardItem } from '../types/game';
import { Check } from 'lucide-react';

interface CardProps {
  card: CardItem;
  isShaking: boolean;
  onCardClick: (card: CardItem) => void;
  disabled: boolean;
}

export const Card: React.FC<CardProps> = ({ card, isShaking, onCardClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onCardClick(card);
    }
  };

  const isFlippedOrMatched = card.isFlipped || card.isMatched;

  return (
    <div
      onClick={handleClick}
      className={`relative w-full h-full perspective-1000 cursor-pointer touch-manipulation select-none transition-transform duration-150 active:scale-95 ${
        card.isMatched ? 'cursor-default' : ''
      }`}
      role="button"
      tabIndex={0}
      aria-label={`${card.type === 'arabic' ? 'Arabic' : 'English'} card: ${card.mainText}`}
    >
      <div
        className={`w-full h-full rounded-xl shadow-lg transform-style-3d relative ${
          isFlippedOrMatched ? 'rotate-y-180' : ''
        } ${isShaking ? 'animate-shake' : ''}`}
      >
        {/* ================= CARD BACK (Face Down) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-xl bg-islamic-pattern border-2 border-amber-500/40 shadow-inner flex items-center justify-center backface-hidden overflow-hidden group">
          {/* Subtle Golden Inner Border */}
          <div className="absolute inset-1.5 border border-amber-400/30 rounded-lg pointer-events-none" />

          {/* Central Ornamental Emblem */}
          <div className="w-9 h-9 rounded-full bg-emerald-900/80 border border-amber-400/60 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            {/* Elegant Islamic Star SVG Icon */}
            <svg className="w-5 h-5 text-amber-400 fill-amber-400/20" viewBox="0 0 24 24">
              <path d="M12 2L14.5 8.5L21 9L16 13.5L18 20L12 16L6 20L8 13.5L3 9L9.5 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* ================= CARD FRONT (Face Up) ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl border-2 rotate-y-180 backface-hidden p-2 flex flex-col justify-between items-center text-center overflow-hidden transition-all duration-300 ${
            card.isMatched
              ? 'bg-gradient-to-b from-emerald-900/90 to-teal-950/90 border-amber-400/80 text-amber-100 animate-match shadow-amber-500/20'
              : 'bg-slate-900/95 border-amber-500/50 text-slate-100 shadow-md'
          }`}
        >
          {/* Top Category / Pair Type Badge */}
          <div className="w-full flex items-center justify-between px-1">
            <span
              className={`text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full ${
                card.type === 'arabic'
                  ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/40'
                  : 'bg-teal-800/60 text-teal-200 border border-teal-600/40'
              }`}
            >
              {card.type === 'arabic' ? 'Arabic' : 'English'}
            </span>

            {card.isMatched && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            )}
          </div>

          {/* MAIN WORD (Large & Centered) */}
          <div className="flex-1 flex items-center justify-center w-full my-0.5 px-1 overflow-hidden">
            {card.type === 'arabic' ? (
              <span
                dir="rtl"
                className="font-arabic text-2xl sm:text-3xl font-bold leading-tight tracking-wide text-amber-200 drop-shadow-sm select-none"
              >
                {card.mainText}
              </span>
            ) : (
              <span className="font-sans text-base sm:text-lg font-bold text-slate-100 leading-tight tracking-tight drop-shadow-sm select-none">
                {card.mainText}
              </span>
            )}
          </div>

          {/* SECONDARY WORD LABEL (Small at Bottom) */}
          <div className="w-full pt-1 border-t border-slate-800/80">
            {card.type === 'arabic' ? (
              <span className="block text-[11px] sm:text-xs text-slate-400 font-medium truncate italic px-1">
                {card.subText}
              </span>
            ) : (
              <span
                dir="rtl"
                className="block font-arabic text-xs sm:text-sm text-amber-400/90 font-medium truncate px-1"
              >
                {card.subText}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
