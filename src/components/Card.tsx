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

  // Dynamic Font Size Calculators based on Character Length to prevent overflow/cropping on small screens
  const getArabicMainClass = (text: string) => {
    const len = text.length;
    if (len > 16) return 'text-xs sm:text-sm leading-tight';
    if (len > 11) return 'text-sm sm:text-base leading-tight';
    if (len > 7) return 'text-base sm:text-xl leading-snug';
    return 'text-lg sm:text-2xl leading-snug';
  };

  const getEnglishMainClass = (text: string) => {
    const len = text.length;
    if (len > 20) return 'text-[9px] sm:text-xs leading-tight font-semibold';
    if (len > 14) return 'text-[11px] sm:text-xs leading-tight font-bold';
    if (len > 8) return 'text-xs sm:text-sm leading-tight font-bold';
    return 'text-sm sm:text-base leading-tight font-extrabold';
  };

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
        className={`w-full h-full rounded-lg sm:rounded-xl shadow-md transform-style-3d relative ${
          isFlippedOrMatched ? 'rotate-y-180' : ''
        } ${isShaking ? 'animate-shake' : ''}`}
      >
        {/* ================= CARD BACK (Face Down) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-lg sm:rounded-xl bg-islamic-pattern border border-amber-500/40 shadow-inner flex items-center justify-center backface-hidden overflow-hidden group">
          {/* Subtle Golden Inner Border */}
          <div className="absolute inset-1 border border-amber-400/30 rounded pointer-events-none" />

          {/* Central Emblem */}
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-emerald-900/80 border border-amber-400/60 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-400 fill-amber-400/20" viewBox="0 0 24 24">
              <path d="M12 2L14.5 8.5L21 9L16 13.5L18 20L12 16L6 20L8 13.5L3 9L9.5 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* ================= CARD FRONT (Face Up) ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-lg sm:rounded-xl border rotate-y-180 backface-hidden p-1 sm:p-2 flex flex-col justify-between items-center text-center overflow-hidden transition-all duration-300 ${
            card.isMatched
              ? 'bg-gradient-to-b from-emerald-900/95 to-teal-950/95 border-amber-400/80 text-amber-100 animate-match shadow-amber-500/20'
              : 'bg-slate-900/95 border-amber-500/50 text-slate-100 shadow-md'
          }`}
        >
          {/* Top Badge (Compact for Max Text Area) */}
          <div className="w-full flex items-center justify-between px-0.5 shrink-0">
            <span
              className={`text-[8px] sm:text-[9px] font-bold tracking-tight uppercase px-1 py-0.25 rounded-sm ${
                card.type === 'arabic'
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
                  : 'bg-teal-900/80 text-teal-300 border border-teal-700/50'
              }`}
            >
              {card.type === 'arabic' ? 'Arabic' : 'English'}
            </span>

            {card.isMatched && (
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shrink-0">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
              </span>
            )}
          </div>

          {/* MAIN WORD (Dynamically Scaled & Centered) */}
          <div className="flex-1 flex items-center justify-center w-full min-h-0 my-0.5 px-0.5 text-center overflow-hidden">
            {card.type === 'arabic' ? (
              <span
                dir="rtl"
                className={`font-arabic text-amber-200 font-bold drop-shadow-sm select-none max-w-full break-words ${getArabicMainClass(
                  card.mainText
                )}`}
              >
                {card.mainText}
              </span>
            ) : (
              <span
                className={`font-sans text-slate-100 drop-shadow-sm select-none max-w-full break-words ${getEnglishMainClass(
                  card.mainText
                )}`}
              >
                {card.mainText}
              </span>
            )}
          </div>

          {/* SECONDARY WORD LABEL (Compact Bottom Label) */}
          <div className="w-full pt-0.5 border-t border-slate-800/80 shrink-0">
            {card.type === 'arabic' ? (
              <span className="block text-[9px] sm:text-[11px] text-slate-400 font-medium truncate px-0.5">
                {card.subText}
              </span>
            ) : (
              <span
                dir="rtl"
                className="block font-arabic text-[10px] sm:text-[12px] text-amber-400/90 font-medium truncate px-0.5"
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
